import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import fetch from "node-fetch"; 

let win: BrowserWindow | null = null;

async function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    },
    backgroundColor: "#0a0a0a"
  });
  await win.loadURL(
    process.env.VITE_DEV_SERVER_URL ?? `file://${path.join(__dirname,"../renderer/index.html")}`
  );
  win.once("ready-to-show", () => win?.show());
}

app.whenReady().then(async () => {
  // IPC: générer une énigme via le service Python
  ipcMain.handle("gpt:generateRiddle", async () => {
    const res = await fetch("http://127.0.0.1:8000/generate", { method: "POST" });
    return await res.json();
  });

  app.on("activate", () => BrowserWindow.getAllWindows().length === 0 && createWindow());
  await createWindow();
});

app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
