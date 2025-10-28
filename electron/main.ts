import path from "path";
import { app, BrowserWindow, ipcMain } from "electron";
import fetch from "node-fetch";
import db from "../src/db"; // CommonJS import natif

let win: BrowserWindow | null = null;
let riddleTimer: ReturnType<typeof setInterval> | null = null;

async function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    show: false,
    backgroundColor: "#0a0a0a",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    await win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    await win.loadFile(path.join(__dirname, "../../dist/index.html"));
  }

  win.once("ready-to-show", () => win?.show());
}

// --- DB ---
function saveRiddle(riddle: string, answer: string, hint: string) {
  const stmt = db.prepare(
    "INSERT INTO riddles (question, answer, hint) VALUES (?, ?, ?)"
  );
  stmt.run(riddle, answer, hint);
}

// --- LLM ---
async function generateAndSaveRiddle() {
  try {
    const res = await fetch("http://127.0.0.1:8000/generate", { method: "POST" });
    const data = await res.json();
    if (data?.enigme && data?.reponse) {
      saveRiddle(data.enigme, data.reponse, data.indice || null);
    }
    return data;
  } catch (err) {
    console.error("Erreur génération LLM:", err);
    return null;
  }
}

// --- IPC handlers ---
ipcMain.handle("riddle:startAuto", () => {
  if (!riddleTimer) {
    riddleTimer = setInterval(generateAndSaveRiddle, 5000);
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
  const riddle = db
    .prepare("SELECT * FROM riddles ORDER BY created_at DESC LIMIT 1")
    .get();
  if (!riddle) return { loading: true };
  return { riddle };
});

ipcMain.handle("gpt:generateRiddle", async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/generate", { method: "POST" });
    return await res.json();
  } catch (err) {
    console.error("Erreur génération LLM:", err);
    return { enigme: null, reponse: null, indice: null };
  }
});

ipcMain.handle("submit-answer", async (event, { riddleId, answer, correct }) => {
  console.log("Réponse reçue :", { riddleId, answer, correct });
  return { success: true };
});


app.whenReady().then(async () => {
  await createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
