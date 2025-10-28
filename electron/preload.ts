import { contextBridge, ipcRenderer } from "electron";


contextBridge.exposeInMainWorld("enigmatik", {
  generateRiddle: async () => {
    console.log("⚡ [preload] generateRiddle appelé !");
    try {
      const res = await fetch("http://127.0.0.1:8000/generate", { method: "POST" });
      const data = await res.json();
      console.log("✅ [preload] reçu du serveur:", data);
      return {
        riddle: data.enigme || "Erreur de génération",
        answer: data.reponse || "",
        hint: data.indice || "",
      };
    } catch (err) {
      console.error("💥 [preload] Erreur fetch:", err);
      return { riddle: "Erreur de génération", answer: "", hint: "" };
    }
  }
});
