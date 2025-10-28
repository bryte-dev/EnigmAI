import os
import json
import re
from fastapi import FastAPI
from llama_cpp import Llama

app = FastAPI()

# === Modèle ===
model_path = os.path.abspath("python_service/models/mistral-7b-instruct-v0.2.Q4_K_M.gguf")
print("✅ Model path:", model_path)
assert os.path.exists(model_path), f"Le modèle n'existe pas à {model_path}"

llm = Llama(
    model_path=model_path,
    n_ctx=32768,
    n_threads=12,
    n_batch=128,
    verbose=False
)

@app.post("/generate")
def generate_riddle():
    prompt = """
You are a logic riddle generator. Answer only in English.
Generate one single short and coherent riddle with its answer and a hint.
Your response must be strictly JSON, with exactly three fields:

{
  "riddle": "the riddle here",
  "answer": "the answer here",
  "hint": "a small hint here"
}

Do not write anything outside the JSON. No explanation, no text, no quotes outside fields.

Now, generate one riddle:
"""


    output = llm(
        prompt,
        max_tokens=800,
        temperature=0.5,
        top_p=0.9,
        repeat_penalty=1.3
    )

    text = output["choices"][0]["text"].strip()
    print("🧠 Sortie brute du modèle :\n", text, "\n")

    # === Extraction du dernier JSON valide ===
    matches = re.findall(r"\{.*?\}", text, re.DOTALL)
    if matches:
        for candidate in reversed(matches):  # prend le dernier trouvé
            try:
                data = json.loads(candidate)
                if all(k in data for k in ("riddle", "answer", "hint")):
                    return data
            except json.JSONDecodeError:
                continue

    return {"enigme": "Erreur de format", "reponse": "non défini", "indice": "essaie encore"}
