import { motion } from "framer-motion";

type HomeScreenProps = {
  startGame: () => void;
  openSettings: () => void;
  openHelp: () => void;
};

export default function HomeScreen({ startGame, openSettings, openHelp }: HomeScreenProps) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-6 bg-gray-900 text-white">
      
      {/* Logo */}
      <motion.h1 
        className="text-6xl font-extrabold mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        EnigmAI
      </motion.h1>

      {/* Boutons principaux */}
      <div className="flex flex-col gap-6">
        <motion.button
          className="bg-red-700 hover:bg-red-800 px-12 py-4 rounded-lg text-2xl font-semibold shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startGame}
        >
          Commencer
        </motion.button>

        <motion.button
          className="bg-gray-700 hover:bg-gray-600 px-12 py-4 rounded-lg text-xl font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openSettings}
        >
          Paramètres
        </motion.button>

        <motion.button
          className="bg-gray-700 hover:bg-gray-600 px-12 py-4 rounded-lg text-xl font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openHelp}
        >
          Aide
        </motion.button>
      </div>

      {/* Petit effet ambiance */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-transparent pointer-events-none"
        animate={{ opacity: [0, 0.2, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </div>
  );
}
