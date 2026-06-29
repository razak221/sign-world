import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { ScrollProgress } from "./ScrollProgress";
import { BackToTop } from "./BackToTop";
import { LiveChat } from "./LiveChat";
import { LoadingScreen } from "./LoadingScreen";
import { GlobeBackground } from "./GlobeBackground";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function RootLayout() {
  const location = useLocation();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  if (showLoading) {
    return <LoadingScreen onComplete={() => setShowLoading(false)} />;
  }

  return (
    <>
      <ScrollProgress />
      <Header />
      <GlobeBackground />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <BackToTop />
      <LiveChat />
    </>
  );
}