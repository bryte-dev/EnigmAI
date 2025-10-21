import os
from fastapi import FastAPI
from llama_cpp import Llama

app = FastAPI()

model_path = os.path.abspath("python_service\models\llama-2-7b.Q4_K_M.gguf")
print("✅ Model path:", model_path)
assert os.path.exists(model_path), f"Le modèle n'existe pas à {model_path}"

llm = Llama(
    model_path=model_path,
    n_ctx=1024,
    n_threads=6,
    n_batch=128,
    verbose=True  # 👀 pour voir les logs
)

@app.post("/raw")
def raw_output():
    prompt = (
        "Tu es un modèle de test. Réponds librement à ce prompt : "
        "Invente une énigme courte et logique avec sa réponse et un indice."
    )

    output = llm(
        prompt,
        max_tokens=300,
        temperature=0.7,
        top_p=0.9,
        repeat_penalty=1.1
    )

    text = output["choices"][0]["text"].strip()
    print("\n🧠 Sortie brute du modèle :\n", text, "\n")
    return {"raw_output": text}
