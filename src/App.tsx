import { useState } from "react";
import HomeScreen from "./HomeScreen";

export default function App() {
  const [screen, setScreen] = useState<"home" | "game" | "settings" | "help">("home");

  const startGame = () => setScreen("game");
  const openSettings = () => setScreen("settings");
  const openHelp = () => setScreen("help");

  return (
    <>
      {screen === "home" && <HomeScreen startGame={startGame} openSettings={openSettings} openHelp={openHelp} />}
      {screen === "game" && <div>Écran de jeu ici</div>}
      {screen === "settings" && <div>Paramètres ici</div>}
      {screen === "help" && <div>Aide ici</div>}
    </>
  );
}
