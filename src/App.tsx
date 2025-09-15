import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import HomeScreen from "./HomeScreen";
import GameScreen from "./GameScreen.tsx";
import SettingsScreen from "./SettingsScreen";
import HelpScreen from "./HelpScreen";
import './index.css';


export default function App() {
  const [screen, setScreen] = useState<"home" | "game" | "settings" | "help">("home");

  const startGame = () => setScreen("game");
  const openSettings = () => setScreen("settings");
  const openHelp = () => setScreen("help");

  return (
    <>
      <AnimatePresence mode="wait">
        {screen === "home" && <HomeScreen startGame={startGame} openSettings={openSettings} openHelp={openHelp} />}
        {screen === "game" && <GameScreen goBack={() => setScreen("home")} />}
        {screen === "settings" && <SettingsScreen goBack={() => setScreen("home")} />}
        {screen === "help" && <HelpScreen goBack={() => setScreen("home")} />}
      </AnimatePresence>
    </>
  );
}