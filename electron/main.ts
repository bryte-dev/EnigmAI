import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import db from "../src/db.ts";
import fetch from "node-fetch";

let win: BrowserWindow | null = null;
let mainWindow: BrowserWindow;
let riddleTimer: ReturnType<typeof setInterval> | null = null;

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

  function saveRiddle(riddle: string, answer: string, hint: string) {
  const stmt = db.prepare(
    "INSERT INTO riddles (question, answer, hint) VALUES (?, ?, ?)"
  );
  stmt.run(riddle, answer, hint);
  }

  async function generateAndSaveRiddle() {
  try {
    const res = await fetch("http://127.0.0.1:8000/generate", { method: "POST" });
    const data = await res.json();
    // data devrait avoir {enigme, reponse, indice} d'après ton Python
    saveRiddle(data.enigme, data.reponse, data.indice);
    return data;
  } catch (err) {
    console.error("Erreur génération LLM:", err);
    return null;
  }
}

ipcMain.handle("riddle:startAuto", () => {
  if (!riddleTimer) {
    riddleTimer = setInterval(generateAndSaveRiddle, 5000); // toutes les 5 sec
  }
  return { status: "started" };
});

ipcMain.handle("riddle:stopAuto", () => {
  if (riddleTimer) {
    clearInterval(riddleTimer);
    riddleTimer = null;
  }
  return { status: "stopped" };
});

ipcMain.handle("riddle:getLatest", () => {
  const riddle = db.prepare("SELECT * FROM riddles ORDER BY created_at DESC LIMIT 1").get();
  if (!riddle) return { loading: true };
  return { riddle };
});

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
