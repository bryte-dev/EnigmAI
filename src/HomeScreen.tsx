import { motion } from "framer-motion";

type HomeScreenProps = {
  startGame: () => void;
  openSettings: () => void;
  openHelp: () => void;
};

export default function HomeScreen({ startGame, openSettings, openHelp }: HomeScreenProps) {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      
      {/* Particules d’ambiance */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Contenu centré */}
      <div className="h-full flex flex-col items-center justify-center gap-10 relative z-10">
        
        {/* Logo */}
        <motion.h1
          className="text-6xl md:text-7xl font-extrabold mb-12 tracking-wide"
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-lg">
            EnigmAI
          </span>
        </motion.h1>

        {/* Boutons principaux */}
        <div className="flex flex-col gap-6">
          <motion.button
            className="px-12 py-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-xl font-medium hover:bg-white/20 hover:border-white/30 transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(147, 51, 234, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Commencer
          </motion.button>

          <motion.button
            className="px-12 py-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openSettings}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Paramètres
          </motion.button>

          <motion.button
            className="px-12 py-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openHelp}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Aide
          </motion.button>
        </div>
      </div>
       <motion.footer
      className="fixed bottom-0 p-8 w-[100%] flex justify-evenly items-start "
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: -10 }}
        transition={{ duration: 0.8, ease: "easeOut" }}>

        <motion.h1
          className="text-2xl md:text-2xl font-extrabold mb-12 tracking-wide"
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-lg">
            2025 © EnigmAI
          </span>
        </motion.h1>
      </motion.footer>
    </div>
  );
}
