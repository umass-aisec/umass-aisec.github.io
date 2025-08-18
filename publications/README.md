### How to update the publications file

Run the Python script `publications/prepare_pubs.py`. This will download the publication data from DBLP and process it into a JSON file in `/assets/data/pubs.json`. You will need the `requests`, `rapidfuzz`, and `pandas` library.

If there's any change to the professors or students, make sure to update the script.