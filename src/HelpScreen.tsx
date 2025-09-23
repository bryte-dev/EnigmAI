import { motion } from "framer-motion";

type HelpScreenProps = { goBack: () => void };

export default function HelpScreen({ goBack }: HelpScreenProps) {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      
      {/* Particules d'ambiance */}
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

      {/* Header épuré */}
      <motion.header 
        className="absolute p-8 w-[100%] flex justify-evenly items-start "
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Bouton retour stylé */}
        <motion.button
          onClick={goBack}
          className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300"
          whileHover={{ scale: 1.02, x: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.span 
            className="text-lg"
            animate={{ x: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ←
          </motion.span>
          <span className="text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity">
            Retour
          </span>
        </motion.button>

        {/* Titre central */}
        <motion.h1
          className="text-3xl md:text-4xl font-light tracking-wider"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text">
            Aide
          </span>
        </motion.h1>

        <div className="w-[120px]" /> 
      </motion.header>

      
      <motion.footer
      className="absolute bottom-0 p-8 w-[100%] flex justify-evenly items-start "
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
