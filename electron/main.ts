import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fetch from "node-fetch";

let win: BrowserWindow | null = null;
let mainWindow: BrowserWindow;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    show: false,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    },
    backgroundColor: "#0a0a0a"
  });
if (process.env.VITE_DEV_SERVER_URL) {
  win.loadURL(process.env.VITE_DEV_SERVER_URL);
} else {
  win.loadFile(join(__dirname, '../index.html'));
}
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
