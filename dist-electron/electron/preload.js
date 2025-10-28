"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("enigmatik", {
    generateRiddle: async () => {
        const result = await electron_1.ipcRenderer.invoke("gpt:generateRiddle");
        return {
            id: crypto.randomUUID(),
            riddle: result.enigme || "Erreur de génération",
            answer: result.reponse || "inconnue",
            hint: result.indice || "Pas d'indice",
        };
    },
    submitAnswer: async (riddleId, answer, correct) => {
        try {
            await electron_1.ipcRenderer.invoke("submit-answer", { riddleId, answer, correct });
        }
        catch (err) {
            console.error("Erreur submitAnswer:", err);
        }
    },
});
