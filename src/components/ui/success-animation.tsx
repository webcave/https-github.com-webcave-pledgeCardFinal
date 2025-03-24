import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "@/lib/confetti";

interface SuccessAnimationProps {
  show: boolean;
  message: string;
  subMessage?: string;
  onComplete?: () => void;
  duration?: number;
}

const SuccessAnimation = ({
  show,
  message,
  subMessage,
  onComplete,
  duration = 3000,
}: SuccessAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);

      // Trigger confetti
      // Trigger multiple confetti bursts for a more dramatic effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.3, x: 0.3 },
      });

      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.3, x: 0.7 },
        });
      }, 300);

      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.4, x: 0.5 },
        });
      }, 600);

      // Hide after duration
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) {
          setTimeout(onComplete, 500); // Give time for exit animation
        }
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-md"
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 text-center border border-purple-100"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 15, -15, 0] }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg"
            >
              <svg
                className="w-12 h-12 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>

            <motion.h2
              className="text-2xl font-bold text-gray-800 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {message}
            </motion.h2>

            {subMessage && (
              <motion.p
                className="text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {subMessage}
              </motion.p>
            )}

            <motion.div
              className="mt-8 flex justify-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div
                className="w-3 h-3 rounded-full bg-purple-600 animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-3 h-3 rounded-full bg-purple-600 animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-3 h-3 rounded-full bg-purple-600 animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessAnimation;
