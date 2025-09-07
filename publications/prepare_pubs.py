

'''
    This script will retrieve publications from DBLP and output to pubs_draft.json
    DBLP updates rather slowly, so just manually add to the pubs.json file instead.
'''
import json
import pandas as pd
import urllib.parse
import requests

from rapidfuzz import fuzz

with open("../assets/data/people.json", "r") as f:
    must_have_authors = [p["name"] for p in json.load(f)]

# Construct SPARQL for https://sparql.dblp.org/
profs = {
    "Amir Houmansadr": "https://dblp.org/pid/22/1797",
    "Eugene Bagdasarian": "https://dblp.org/pid/213/9150",
    "Shiqing Ma": "https://dblp.org/pid/172/8745",
}
prof_url_filter = " ".join(f"<{url}>" for url in profs.values())
prof_name_filter = ",".join(f'"{name}"' for name in profs.keys())

venues = {
    "corr": "arXiv",
    "ndss": "NDSS",
    "ccs": "ACM CCS",
    "sp": "IEEE S&P",
    "uss": "USENIX Security",
    "pet": "PETS",
    "aaai": "AAAI",
    "iclr": "ICLR",
    "icml": "ICML",
    "nips": "NeurIPS",
    "tmlr": "TMLR",
    "acl": "ACL",
    "naacl": "NAACL",
    "emnlp": "EMNLP",
    "cvpr": "CVPR",
    "eccv": "ECCV",
    "iccv": "ICCV",
}
journals = set(["corr", "tmlr"])

venue_url_filter = ",".join([
    f"<https://dblp.org/streams/{'journals' if venue in journals else 'conf'}/{venue}>"
    for venue in venues.keys()
])

query = f"""
PREFIX dblp: <https://dblp.org/rdf/schema#>
SELECT DISTINCT ?piName ?pub ?url ?title ?year ?month ?venue ?coAuthorName ?ordinal
WHERE {{
    VALUES ?pers {{ {prof_url_filter} }}
    ?pers dblp:creatorName ?piName .
    ?pub dblp:authoredBy ?pers ;
         dblp:primaryDocumentPage ?url ;
         dblp:title ?title ;
         dblp:yearOfPublication ?year ;
         dblp:publishedInStream ?venue .
    OPTIONAL {{ ?pub dblp:monthOfPublication ?month . }}
    ?pub dblp:hasSignature ?sig .
    ?sig dblp:signatureDblpName ?coAuthorName ;
         dblp:signatureOrdinal ?ordinal .

    FILTER(
        ?venue IN ({venue_url_filter})
    )

    FILTER(
        ?piName IN ({prof_name_filter})
    )
}}
GROUP BY ?pers ?piName ?pub ?url ?title ?year ?month ?venue ?coAuthorName ?ordinal
ORDER BY DESC(?year) DESC(?month) ?venue ?pub ?ordinal
"""

# Encode the query and retrieve results
encoded_query = urllib.parse.urlencode({"query": query})
url = f"https://sparql.dblp.org/sparql?{encoded_query}"
response = requests.get(url)
data = response.json()

# Process into a dataframe
data = [{k: v["value"] for k, v in d.items()} for d in data["results"]["bindings"]]
df = pd.DataFrame.from_dict(data)
df.fillna({"month": "--00"}, inplace=True)
df["month"] = df["month"].str.removeprefix("--")

# Make nice venue name
df["venue"] = df["venue"].str.split('/').str[-1].map(venues)

# Get rid of any numbers at the end of author names
df["coAuthorName"] = df["coAuthorName"].str.replace(r'\s*\d+$', '', regex=True)

# Group and aggregate co-author names (should already be ordered by the SPARQL query)
df = (
    df.groupby(["piName", "pub", "url", "title", "year", "month", "venue"], as_index=False)
      .agg({"coAuthorName": lambda x: ", ".join(x)})
)

# Drop PI column
df = df.drop(columns="piName")

# Filter rows with the same pub url
df = df.drop_duplicates("pub")

# Filter rows where at least one of the must-have author appears
df = df[df["coAuthorName"].apply(lambda x: any(name in x.split(", ") for name in must_have_authors))]

# Filter arXiv rows whose title is NOT similar to any non-arXiv title
arxiv_rows = df[df["venue"] == "arXiv"]
non_arxiv_rows = df[df["venue"] != "arXiv"]
non_arxiv_titles = non_arxiv_rows["title"].tolist()

def is_similar(title, non_arxiv_titles, threshold=60):
    return any(fuzz.ratio(title, t) >= threshold for t in non_arxiv_titles)

arxiv_to_keep = arxiv_rows[~arxiv_rows["title"].apply(lambda t: is_similar(t, non_arxiv_titles))]
df = pd.concat([non_arxiv_rows, arxiv_to_keep], ignore_index=True)

# Final sort
df = df.sort_values(by=["year", "month", "venue"], ascending=[False, False, False])

data = df.to_dict(orient="records")
with open("../assets/data/pubs_draft.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=4)
