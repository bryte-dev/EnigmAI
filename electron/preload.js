// preload.js
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  generateRiddle: () => ipcRenderer.invoke("gpt:generateRiddle"),
});
