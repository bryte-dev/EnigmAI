// HelpScreen.tsx
import { motion } from "framer-motion";

type HelpScreenProps = { goBack: () => void };

export default function HelpScreen({ goBack }: HelpScreenProps) {
  return (
    <>
        <motion.h1 
          className="text-6xl font-extrabold mb-16 text-center mb-[150px]"
          initial={{ opacity: 0, y: -1000 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Aide
        </motion.h1>
        <motion.div 
        className="h-screen w-screen flex items-center justify-center bg-green-800 text-white"
        initial={{ scale: 2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: -3.05, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        >
        <button className="px-6 py-3 bg-white text-black rounded" onClick={goBack}>
            Retour
        </button>
        </motion.div>
    </>
  );
}
