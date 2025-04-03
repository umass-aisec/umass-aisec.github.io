document.getElementById('year').textContent = new Date().getFullYear();

const roster = [
    {
        "date": "Mon, Feb 03",
        "name": "Anshuman Suri",
        "affiliation": "Northeastern University",
        "link": "https://www.anshumansuri.com/",
        "title": "White-box vs Black-box: Privacy Auditing for Machine Learning",
        "abstract": "Machine learning models pose privacy risks through memorization, with  membership inference being the most studied threat—determining whether a specific record was in the training data. State-of-the-art attacks assume black-box access, and prior theoretical work suggests that parameter access is unnecessary for optimal membership inference. This view is reinforced by prevailing research folklore, with little work exploring MIAs under parameter access. In this talk, I will challenge these assumptions and demonstrate that, contrary to common belief, optimal membership inference does require parameter access. I will then discuss the implications for privacy auditing and how it differs from inference attacks designed for adversarial or demonstrative purposes.",
        "bio": "Anshuman Suri is a postdoctoral fellow at Northeastern University's Khoury College of Computer Sciences, working with Alina Oprea. He earned his PhD from the University of Virginia in 2024 under David Evans, focusing on security and privacy in machine learning. His research spans membership inference, user inference, and attacks on large language models. He has worked as an Applied Scientist at Microsoft and interned at Oracle Research. His work has received several honors, including the John A. Stankovic Graduate Research Award. He has also served as a reviewer for top ML conferences, earning Outstanding Reviewer awards at ICLR, ICML, and ICCV."
    },
    {
        "date": "Mon, Feb 10",
        "name": "Sahar Abdelnabi",
        "affiliation": "Microsoft",
        "link": "https://s-abdelnabi.github.io/",
        "title": "Evaluating and Securing LLM-Agentic Networks",
        "abstract": "There is an increasing interest in using LLM agents to autonomously automate tasks and workflows. For example, the new OpenAI operator may be used to design travel plans for the user. Service providers now use LLM chatbots to assist users as well. Soon, it is very likely that these two sides are going to communicate, forming agentic networks. Such paradigms will unlock new use cases where agents can negotiate, deliberate, adapt, and find creative solutions on behalf of entities they represent. In this talk, I will discuss our work on evaluating multi-agent negotiations, and how that can be beneficial to test reasoning and create evolving, dynamic benchmarks. We use this benchmark to study manipulation and safety risks, such as how cooperative agents can be steered by greedy or adversarial ones. In the second part of the talk, I will present our new work to identify security and privacy risks in adaptive agentic networks where an assistant communicates with an external party to fulfil a multi-goal task. The assistant must perform actions that are entailed by the goal, not over share information, and maintain utility against greedy agents. We create a firewalling mitigation that allow agents to dynamically communicate and adapt, while balancing these security and privacy risks.",
        "bio": "Sahar Abdelnabi is an AI security researcher at Microsoft's Security Response Center. She completed her PhD at the CISPA Helmholtz Center for Information  Security under the supervision of Prof. Dr. Mario Fritz and holds an MSc from Saarland University. Her research focuses on the intersection of machine learning with security, safety, and sociopolitical aspects, including understanding and mitigating failure modes of machine learning models, addressing biases, and exploring emergent safety challenges posed by large language models."
    },
    {
        "date": "Thu, Feb 20",
        "name": "Javier Rando",
        "affiliation": "ETH Zurich",
        "link": "https://javirando.com/",
        "title": "Gradient-based Jailbreak Images for Multimodal Fusion Models",
        "abstract": "Augmenting language models with image inputs may enable more effective jailbreak attacks through continuous optimization, unlike text inputs that require discrete optimization. However, new multimodal fusion models tokenize all input modalities using non-differentiable functions, which hinders straightforward attacks. In this work, we introduce the notion of a tokenizer shortcut that approximates tokenization with a continuous function and enables continuous optimization. We use tokenizer shortcuts to create the first end-to-end gradient image attacks against multimodal fusion models. We evaluate our attacks on Chameleon models and obtain jailbreak images that elicit harmful information for 72.5% of prompts. Jailbreak images outperform text jailbreaks optimized with the same objective and require 3x lower compute budget to optimize 50x more input tokens. Finally, we find that representation engineering defenses, like Circuit Breakers, trained only on text attacks can effectively transfer to adversarial image inputs.",
        "bio": "Javier Rando is a doctoral student at ETH Zurich, advised by Florian Tramèr and Mrinmaya Sachan. His research focuses on identifying potential failures in deploying advanced AI models in real-world applications, particularly through red-teaming large language models. His PhD is supported by the ETH AI Center Doctoral Fellowship. In the summer of 2024, he interned with Meta's GenAI Safety & Trust team. Javier holds an MSc in Computer Science from ETH Zurich and a BSc in Data Science from Pompeu Fabra University. He has also been a visiting researcher at NYU under He He and founded EXPAI, an explainable AI startup in Spain. He has received the spotlight award for one of his recent papers at ICLR 2025."
    },
    {
        "date": "Mon, Feb 24",
        "name": "Norman Mu",
        "affiliation": "xAI",
        "link": "https://www.normanmu.com/",
        "title": "A Closer Look at System Prompt Robustness",
        "abstract": "System prompts have emerged as a critical control surface for specifying the behavior of LLMs in chat and agent settings. Developers depend on system prompts to specify important context, output format, personalities, guardrails, content policies, and safety countermeasures, all of which require models to robustly adhere to the system prompt, especially when facing conflicting or adversarial user inputs. In practice, models often forget to consider relevant guardrails or fail to resolve conflicting demands between the system and the user. In this work, we study various methods for improving system prompt robustness by creating realistic new evaluation and fine-tuning datasets based on prompts collected from OpenAI's GPT Store and HuggingFace's HuggingChat. Our experiments assessing models with a panel of new and existing benchmarks show that performance can be considerably improved with realistic fine-tuning data, as well as inference-time interventions such as classifier-free guidance. Finally, we analyze the results of recently released reasoning models from OpenAI and DeepSeek, which show exciting but uneven improvements on the benchmarks we study. Overall, current techniques fall short of ensuring system prompt robustness and further study is warranted.",
        "bio": "Norman Mu is a Member of Technical Staff at xAI, focusing on AI safety. He earned his Ph.D. in Computer Science from the University of California, Berkeley, where he was supported by the NSF Graduate Research Fellowship. During his doctoral studies, he was also a visiting researcher at Facebook AI Research. He holds a bachelor's degree in Computer Science from the University of California, Berkeley. His research interests include robustness and uncertainty in machine learning models."
    },
    {
        "date": "Mon, Mar 03",
        "name": "Harsh Chaudhari",
        "affiliation": "Northeastern University",
        "link": "https://harshch1803.github.io/",
        "title": "Propagation of Adversarial Bias to Distilled Language Models",
        "abstract": "The widespread deployment of Large Language Models (LLMs) trained by knowledge distillation is increasingly raising concerns about their resilience to adversarial manipulation.This paper investigates the vulnerability of distilled language models to adversarial injection of biased content during training. More broadly, we demonstrate how malicious vendors can inject  adversarial biased data into a large ``teacher'' LLM's training set, causing the adversarial bias to not only propagate to a smaller student model, but also become amplified. Using  data poisoning techniques, we manipulate the teacher's output to include adversarial bias in the generated content, such as promoting a particular brand or generating phishing links. We show that the attack transfers to the student model, where the adversarial bias becomes even more pronounced and impacts unseen tasks. With only 25 poisoned samples, or 0.25% poisoning rate in the teacher's training data, the student model generates a large fraction 76.9% of biased responses. Moreover, the student model's fraction of biased responses is 8.1x higher on unseen tasks compared to the teacher model. Our findings highlight significant security and trustworthiness concerns for distilled language models deployed in user-facing applications.",
        "bio": "Harsh Chaudhari is a fourth-year PhD student in Computer Science at Northeastern University, under the supervision of Professor Alina Oprea. His research focuses on the security and privacy of machine learning models, particularly in understanding and mitigating threats through adversarial attacks. Harsh has had several internship experiences, the most recent of which was at Google Deepmind, where he worked on adversarial bias in language models. He has published his works at notable venues such as ICLR, Oakland, and NDSS."
    },
    {
        "date": "Mon, Mar 10",
        "name": "Andy Zou",
        "affiliation": "Carnegie Mellon Univerosity",
        "link": "https://andyzoujm.github.io/",
        "title": "Red Teaming AI Agents in-the-wild: Revealing Deployment Vulnerabilities",
        "abstract": "This presentation demonstrates how red teaming uncovers critical vulnerabilities in AI agents that challenge assumptions about safe deployment. The talk discusses the risks of integrating AI into real-world applications and recommends practical safeguards to enhance resilience and ensure dependable deployment in high-risk settings.",
        "bio": "Andy Zou is a PhD student at CMU. He is the CTO and cofounder at Gray Swan AI and a cofounder of Center for AI Safety. He works in AI Safety and Security."
    },
    {
        "date": "Mon, Mar 24",
        "name": "Xiangyu Qi",
        "affiliation": "OpenAI",
        "link": "https://xiangyuqi.com/",
        "title": "Safety Alignment Should Be Made More Than Just A Few Tokens Deep",
        "abstract": "The safety alignment of current Large Language Models (LLMs) is vulnerable. Relatively simple attacks can jailbreak aligned models. In this talk, I will show that many of these vulnerabilities are related to a shared underlying issue: safety alignment can take shortcuts, wherein the alignment adapts a model's generative distribution primarily over only its very first few output tokens --- which we refer to as 'shallow safety alignment'. I will present case studies to explain why shallow safety alignment can exist and provide evidence that current aligned LLMs are subject to this issue. I will also show how these findings help explain multiple recently discovered vulnerabilities in LLMs. After that, I will discuss how this consolidated notion of shallow safety alignment sheds light on promising research directions for mitigating these vulnerabilities. For instance, deepening the safety alignment beyond just the first few tokens can often meaningfully improve robustness against some common exploits.",
        "bio": "Xiangyu Qi is a Member of Technical Staff at OpenAI, focusing on AI safety, security, and alignment. He completed his Ph.D. in Electrical and Computer Engineering at Princeton University in February 2025, under the guidance of Professors Prateek Mittal and Peter Henderson. His doctoral research centered on identifying vulnerabilities in AI systems and developing mitigation strategies, with his work being published in prestigious conferences such as CVPR, AAAI, and ICLR. Dr. Qi's research has also been highlighted in mainstream media outlets, including The New York Times. In addition to this, he gained industry experience through research internships at Google DeepMind and Amazon, where he contributed to enhancing the robustness of AI systems. He holds a bachelor's degree from Zhejiang University, earned in 2021."
    },
    {
        "date": "Mon, Mar 31",
        "name": "Om Thakkar",
        "affiliation": "OpenAI",
        "link": "http://www.omthakkar.com/",
        "title": "Privacy Leakage in Speech Models: Attacks and Mitigations",
        "abstract": "Recent research has highlighted the vulnerability of neural networks to unintended memorization of training examples, raising significant privacy concerns. In this talk, we first explore two primary types of privacy leakage: extraction attacks and memorization audits. Specifically, we examine novel extraction attacks targeting speech models and discuss efficient methodologies for auditing memorization. In the second half of the talk, we will present empirical privacy approaches that enable training state-of-the-art speech models while effectively reducing memorization risks.",
        "bio": "Om Thakkar is a Member of Technical Staff at OpenAI, specializing in privacy-preserving AI research with a focus on differential privacy and its applications to deep learning in production systems. Prior to joining OpenAI, he was a Senior Research Scientist at Google. He earned his Ph.D. in Computer Science from Boston University in 2019, under the guidance of Dr. Adam Smith. His doctoral research focused on differential privacy and its applications to machine learning. Dr. Thakkar holds a B.Tech. in Information and Communication Technology from the Dhirubhai Ambani Institute in India, completed in 2014. He has published his research in leading conferences such as the IEEE Symposium on Security and Privacy (S&P), NeurIPS, and ICML and has several patents under his name."
    },
    {
        "date": "Mon, Apr 07",
        "name": "Ryan McKenna",
        "affiliation": "Google",
        "link": "http://linkedin.com/in/ryan-mckenna-76772a57",
        "title": "Private Analytics and Learning at Google",
        "abstract": "In this talk, I will give a broad overview of how we think about the many dimensions of data privacy at Google, discuss some of the private analytics and learning problems we've faced here, and go over some of the research we have done in this space to solve these problems, as well as promising open research directions. To that end, I will talk about how we used our federated analytics platform to derive environmental insights from on-device location data and how Gboard trains their next-word prediction model with strong differential privacy guarantees and without centralized data collection. I will then overview a body of research we have done on improving DP-SGD, the most widely used mechanism for training machine learning models with differential privacy.",
        "bio": null,
    },
    {
        "date": "Mon, Apr 14",
        "name": "Milad Nasr",
        "affiliation": "Google",
        "link": "https://www.linkedin.com/in/milad-nasr-50ab6a56",
        "title": "Topic TBD",
        "abstract": null,
        "bio": null
    },
    {
        "date": "Fri, Apr 18",
        "name": "Edoardo Debenedetti",
        "affiliation": "ETH Zurich",
        "link": "https://edoardo.science/",
        "title": "Defeating Prompt Injections by Design",
        "abstract": null,
        "bio": null
    },
    {
        "date": "Mon, Apr 28",
        "name": "Jonas Geiping",
        "affiliation": "ELLIS Institute",
        "link": "https://jonasgeiping.github.io/",
        "title": "Topic TBD",
        "abstract": null,
        "bio": null,
    },
    {
        "date": "Mon, May 05",
        "name": "Speaker TBD",
        "affiliation": "TBD",
        "link": "#",
        "title": "Topic TBD",
        "abstract": null,
        "bio": null
    },
]

function fromHTML(html, trim = true) {
    // Process the HTML string.
    html = trim ? html.trim() : html;
    if (!html) return null;

    // Then set up a new template element.
    const template = document.createElement('template');
    template.innerHTML = html;
    const result = template.content.children;

    // Then return either an HTMLElement or HTMLCollection,
    // based on whether the input HTML had one or more roots.
    if (result.length === 1) return result[0];
    return result;
}

const nodes = [];
for (let i = 0; i < roster.length; ++i) {
    const speaker = roster[i];
    const week_num = (i < 9 ? "0" : "") + (i + 1);
    const li = fromHTML(`
        <li class="list-group-item d-flex flex-column flex-md-row align-items-md-center">
            <span class="badge bg-primary me-md-2 mx-auto mb-2 mb-md-0 mx-md-0">Week ${week_num}: ${speaker.date}</span>
            <span class="topic">
                <a target="_blank" href="${speaker.link}">${speaker.name}</a> (${speaker.affiliation}): ${speaker.title}
                <a class="collapsed ${speaker.abstract == null ? 'd-none' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">(abstract)</a>
            </span>
        </li>
    `); 
    
    nodes.push(li);
    if (speaker.abstract != null) {
        const abstract = fromHTML(`
            <div id="collapse${i}" class="accordion-collapse collapse">
                <div class="accordion-body">
                    <p class="text-start">${speaker.abstract}</p>
                    <p class="text-start ${speaker.bio == null ? 'd-none' : ''}"><span class="fw-bold">Bio</span>: ${speaker.bio}</p>
                </div>
            </div>
        `);
        nodes.push(abstract);
    }
}

document.getElementById("calendar").replaceChildren(...nodes);