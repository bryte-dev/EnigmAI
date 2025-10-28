// GameScreen.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type GameScreenProps = { goBack: () => void };

export default function GameScreen({ goBack }: GameScreenProps) {
  const [riddle, setRiddle] = useState<RiddleData | null>(null);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const maxAttempts = 3;

  const submitAnswerSafe = async (r: any, ans: string, correct: boolean) => {
    if ("submitAnswer" in window.enigmatik) {
      try { await (window.enigmatik as any).submitAnswer(r, ans, correct); } catch {}
    } else {
      console.log("submitAnswer non dispo :", { riddle: r, answer: ans, correct });
    }
  };

  const normalizeAnswer = (text: string): string => {
    return text.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ");
  };

  const fetchRiddle = async () => {
    setLoading(true);
    try {
      const data = await window.enigmatik.generateRiddle();
      setRiddle({ id: data.id, riddle: data.riddle, answer: data.answer, hint: data.hint });
      resetGame(true);
    } catch (err) {
      console.error("Erreur génération énigme :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiddle();
  }, []);

  const handleSubmit = async () => {
  if (!answer.trim() || isSubmitting || !riddle) return;

  setIsSubmitting(true);
  setFeedback(null);
  await new Promise(r => setTimeout(r, 400));

  const normalizedAnswer = normalizeAnswer(answer);
  const normalizedCorrect = normalizeAnswer(riddle.answer);

  const isCorrect = normalizedAnswer === normalizedCorrect;

  setFeedback(isCorrect ? "correct" : "wrong");

  // Compte les essais et affiche l'indice si nécessaire
  if (!isCorrect) {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    if (newAttempts >= maxAttempts && !showHint) {
      setTimeout(() => setShowHint(true), 500);
    }
  }

  // Envoi à la DB via preload
  if (riddle.id) {
    await submitAnswerSafe(riddle.id, answer, isCorrect);
  }

  setIsSubmitting(false);
};

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const resetGame = (newRiddle = false) => {
    setAnswer("");
    setFeedback(null);
    setAttempts(0);
    setShowHint(false);
    setIsSubmitting(false);
    if (newRiddle) return; // si on recharge une énigme, on garde le flow intact
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">

      {/* Particules */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/20 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header className="absolute p-8 w-[100%] flex justify-evenly items-start"
        initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>

        {/* Bouton retour */}
        <motion.button onClick={goBack} className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300"
          whileHover={{ scale: 1.02, x: -2 }} whileTap={{ scale: 0.98 }}>
          <motion.span className="text-lg" animate={{ x: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }}>←</motion.span>
          <span className="text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity">Retour</span>
        </motion.button>

        {/* Titre */}
        <motion.h1 className="text-3xl md:text-4xl font-light tracking-wider"
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, ease: "easeOut" }}>
          <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Énigme</span>
        </motion.h1>

        {/* Stats */}
        <motion.div className="flex flex-col items-end gap-1 text-xs font-medium opacity-60"
          initial={{ opacity: 0 }} animate={{ opacity: 0.6, x: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" /> <span>{attempts} essai{attempts > 1 ? 's' : ''}</span></div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full transition-colors ${showHint ? 'bg-yellow-400' : 'bg-gray-500'}`} />
            <span>indice {showHint ? 'débloqué' : 'verrouillé'}</span>
          </div>
        </motion.div>
      </motion.header>

      {/* Contenu principal */}
      <div className="h-full flex flex-col items-center justify-center px-8 max-w-4xl mx-auto">
        {loading ? (
          <motion.div className="text-xl text-white/50 mt-20 animate-pulse">Chargement de l'énigme...</motion.div>
        ) : (
          <>
            {/* Question */}
            <motion.div className="flex items-center justify-center text-center m-[50px]"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
              <div className="relative">
                <motion.div className="absolute -inset-10 rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-3xl"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4], rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
                <p className="relative text-3xl md:text-4xl font-light tracking-wide text-white drop-shadow-lg">{riddle?.riddle}</p>
              </div>
            </motion.div>

            {/* Zone réponse */}
            <motion.div className="w-[55%] overflow-hidden max-w-md mb-8"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Votre réponse..."
                className="w-full h-16 px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/40 resize-none focus:outline-none focus:border-purple-400/50 focus:bg-white/15 transition-all duration-300 text-center font-light"
                disabled={feedback === "correct" || isSubmitting}
              />
            </motion.div>

            {/* Bouton valider */}
            <motion.button onClick={handleSubmit} disabled={!answer.trim() || feedback === "correct" || isSubmitting}
              className={`relative px-12 py-4 rounded-xl text-base font-medium transition-all duration-300 ${feedback === "correct" ? "bg-emerald-500/20 border-emerald-400/30 text-emerald-200 cursor-not-allowed" : isSubmitting ? "bg-purple-500/20 border-purple-400/30 text-purple-200 cursor-wait" : "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"} border backdrop-blur-xl`}
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.span key="loading" className="flex items-center gap-2 animate-pulse">Vérification...</motion.span>
                ) : feedback === "correct" ? (
                  <motion.span key="success">✨ Résolu !</motion.span>
                ) : (
                  <motion.span key="default">Valider</motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Feedback et Hint */}
            <AnimatePresence>
              {feedback === "correct" && (
                <motion.div className="mt-8 text-center" initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: -20 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
                  <p className="text-2xl font-light text-emerald-300 mb-6">Félicitations !</p>
                  <motion.button onClick={fetchRiddle} className="px-6 py-3 bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 rounded-xl backdrop-blur-xl hover:bg-emerald-500/30 transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Nouvelle énigme</motion.button>
                </motion.div>
              )}

              {feedback === "wrong" && (
                <motion.div className="mt-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1, x: [0, -10, 10, -5, 5, 0] }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                  <p className="text-xl text-red-300 font-light mb-2">Ce n'est pas la bonne réponse</p>
                </motion.div>
              )}

              {showHint && (
                <motion.div className="mt-12 max-w-md" initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -30, scale: 0.9 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
                  <div className="relative bg-gradient-to-r from-yellow-900/20 to-orange-900/20 backdrop-blur-xl border border-yellow-500/20 rounded-xl p-6 text-center">
                    <p className="text-yellow-200 font-light">{riddle?.hint}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}
