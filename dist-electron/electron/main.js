"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
const node_fetch_1 = __importDefault(require("node-fetch"));
const db_1 = __importDefault(require("../src/db")); // CommonJS import natif
let win = null;
let riddleTimer = null;
async function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 1000,
        height: 700,
        show: false,
        backgroundColor: "#0a0a0a",
        webPreferences: {
            preload: path_1.default.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false,
        },
    });
    if (process.env.VITE_DEV_SERVER_URL) {
        await win.loadURL(process.env.VITE_DEV_SERVER_URL);
    }
    else {
        await win.loadFile(path_1.default.join(__dirname, "../../dist/index.html"));
    }
    win.once("ready-to-show", () => win?.show());
}
// --- DB ---
function saveRiddle(riddle, answer, hint) {
    const stmt = db_1.default.prepare("INSERT INTO riddles (question, answer, hint) VALUES (?, ?, ?)");
    stmt.run(riddle, answer, hint);
}
// --- LLM ---
async function generateAndSaveRiddle() {
    try {
        const res = await (0, node_fetch_1.default)("http://127.0.0.1:8000/generate", { method: "POST" });
        const data = await res.json();
        if (data?.enigme && data?.reponse) {
            saveRiddle(data.enigme, data.reponse, data.indice || null);
        }
        return data;
    }
    catch (err) {
        console.error("Erreur génération LLM:", err);
        return null;
    }
}
// --- IPC handlers ---
electron_1.ipcMain.handle("riddle:startAuto", () => {
    if (!riddleTimer) {
        riddleTimer = setInterval(generateAndSaveRiddle, 5000);
    }
    return { status: "started" };
});
electron_1.ipcMain.handle("riddle:stopAuto", () => {
    if (riddleTimer) {
        clearInterval(riddleTimer);
        riddleTimer = null;
    }
    return { status: "stopped" };
});
electron_1.ipcMain.handle("riddle:getLatest", () => {
    const riddle = db_1.default
        .prepare("SELECT * FROM riddles ORDER BY created_at DESC LIMIT 1")
        .get();
    if (!riddle)
        return { loading: true };
    return { riddle };
});
electron_1.ipcMain.handle("gpt:generateRiddle", async () => {
    try {
        const res = await (0, node_fetch_1.default)("http://127.0.0.1:8000/generate", { method: "POST" });
        return await res.json();
    }
    catch (err) {
        console.error("Erreur génération LLM:", err);
        return { enigme: null, reponse: null, indice: null };
    }
});
electron_1.ipcMain.handle("submit-answer", async (event, { riddleId, answer, correct }) => {
    console.log("Réponse reçue :", { riddleId, answer, correct });
    return { success: true };
});
electron_1.app.whenReady().then(async () => {
    await createWindow();
    electron_1.app.on("activate", () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
