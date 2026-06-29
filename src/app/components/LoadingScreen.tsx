import { motion } from "motion/react";
import { useEffect, useState } from "react";
import logo from "../../assets/signworld_real_logo.jpg";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600"
    >
      <div className="text-center">
        <motion.div
          className="mx-auto mb-8 w-24 h-24 rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center bg-black"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img 
            src={logo} 
            alt="Sign World" 
            className="w-full h-full object-cover rounded-xl"
          />
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-2 bg-white rounded-full max-w-xs mx-auto"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white mt-4 font-medium"
        >
          Loading Experience...
        </motion.p>
      </div>
    </motion.div>
  );
}