import { motion } from "framer-motion";
import './index.css';

type HomeScreenProps = {
  startGame: () => void;
  openSettings: () => void;
  openHelp: () => void;
};

export default function HomeScreen({ startGame, openSettings, openHelp }: HomeScreenProps) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}   // départ de l'animation (petit et transparent)
      animate={{ scale: 1, opacity: 1 }}     // état final (taille normale et visible)
      exit={{ scale: -3.05, opacity: 0 }}      // quand tu quittes l'écran (zoom out)
      transition={{ duration: 0.3, ease: "easeInOut" }} // durée et easing
    >
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-6 bg-purple-800 text-white">
        
        {/* Logo */}
        <motion.h1 
          className="text-6xl font-extrabold mb-16 text-center mb-[150px]"
          initial={{ opacity: 0, y: -1000 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          EnigmAI
        </motion.h1>

        {/* Boutons principaux */}
        <div className="flex flex-col gap-6">
          <motion.button
            className="bg-red-700 hover:bg-red-800 px-12 py-4 rounded-lg text-2xl font-semibold shadow-lg mb-[50px]"
            
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
          >
            Commencer
          </motion.button>

          <motion.button
            className="bg-gray-700 hover:bg-gray-600 px-12 py-4 rounded-lg text-xl font-medium mb-[50px]"
            
            whileTap={{ scale: 0.95 }}
            onClick={openSettings}
          >
            Paramètres
          </motion.button>

          <motion.button
            className="bg-gray-700 hover:bg-gray-600 px-12 py-4 rounded-lg text-xl font-medium mb-[50px]"
            
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
    </motion.div>
  );
}
