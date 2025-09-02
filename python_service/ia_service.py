"""import os
from fastapi import FastAPI
from gpt4all import GPT4All
import json

app = FastAPI()

# Chemin absolu vers ton fichier .gguf (à placer toi-même dans ce dossier)
model_path = os.path.abspath("python_service/models/Llama-3.2-3B-Instruct-Q3_K_L.gguf")

print("Loading model from:", model_path)
assert os.path.exists(model_path), "Le fichier modèle n'existe pas !"

# Load GPT4All en mode local (CPU)
model = GPT4All(model_path, n_ctx=512, allow_download=False)

@app.post("/generate")
def generate_riddle():
    prompt = ""
Tu es un générateur d'énigmes logiques, qui requiert une certaine réfléxion humaine.
Réponds STRICTEMENT en JSON:
{"riddle":"...","answer":"...","hint":"..."}
""
    try:
        return json.loads(model.prompt(prompt))
    except Exception as e:
        print("Erreur GPT4All:", e)
        return {"riddle": "Fallback", "answer": "test", "hint": "indice"}
"""

import os
import json
import re
from fastapi import FastAPI
from llama_cpp import Llama

app = FastAPI()

# Chemin vers ton modèle
model_path = os.path.abspath("python_service/models/Llama-3.2-3B-Instruct-Q3_K_L.gguf")
print("Path exists?", os.path.exists(model_path))
assert os.path.exists(model_path), f"Le modèle n'existe pas à {model_path}"

# Initialisation du modèle
llm = Llama(
    model_path=model_path,
    n_ctx=2048,
    max_tokens=512,
    n_threads=6,
    n_batch=128,
    verbose=True,
    stop=None
)

@app.post("/generate")
def generate_riddle():
    prompt = """
Génère **une seule énigme cohérente et facile à comprendre par tous les humains, quelque chose de très logique, qui requiert une bonne réfléxion**.  
Répond STRICTEMENT au format JSON valide avec ces champs :

{
  "riddle": "Écris l'énigme ici",
  "answer": "Écris la réponse ici",
  "hint": "Écris un indice ici"
}

Ne mets aucun texte avant ou après le JSON.
Ne te répète JAMAIS.
Une seule énigme par génération.
"""

    try:
        output = llm(prompt, max_tokens=512, temperature=0.7)
        text = output["choices"][0]["text"].strip()

        # Extraire le premier JSON rencontré dans la sortie
        match = re.search(r'\{.*?\}', text, re.DOTALL)
        if match:
            try:
                data = json.loads(match.group(0))
                # S'assurer que tous les champs existent
                for field in ["riddle", "answer", "hint"]:
                    if field not in data:
                        data[field] = "non défini"
                return data
            except json.JSONDecodeError:
                print("Erreur JSON sur la partie extraite :", repr(match.group(0)))

        print("Pas de JSON trouvé, sortie brute :", repr(text))
        return {"riddle": "Fallback riddle", "answer": "Fallback answer", "hint": "Fallback hint"}

    except Exception as e:
        print("Erreur génération:", e)
        return {"riddle": "Fallback riddle", "answer": "Fallback answer", "hint": "Fallback hint"}
