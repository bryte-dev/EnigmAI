const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('enigmatik', {
  generateRiddle: async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/generate');
      if (!res.ok) throw new Error('Erreur réseau');
      return await res.json();
    } catch (err) {
      console.error("Erreur generateRiddle:", err);
      return { riddle: null, answer: null, hint: null }; // fallback
    }
  }
});

