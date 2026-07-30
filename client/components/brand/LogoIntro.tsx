import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FtmLogo } from "./FtmLogo";

const SESSION_KEY = "ftm-intro-played";
const HOLD_MS = 3500;

interface Target {
  x: number;
  y: number;
  scale: number;
}

function measureNavTarget(): Target {
  const nav = document.getElementById("nav-logo");
  const fallback = { x: 0, y: 0, scale: 0.16 };
  if (!nav) return fallback;
  const rect = nav.getBoundingClientRect();
  if (!rect.width) return fallback;
  const logoSize = Math.min(window.innerWidth * 0.62, 320);
  return {
    x: rect.left + rect.width / 2 - window.innerWidth / 2,
    y: rect.top + rect.height / 2 - window.innerHeight / 2,
    scale: rect.width / logoSize,
  };
}

/**
 * Full-screen brand reveal: the mark breathes inside a rotating ring while
 * particles orbit, then collapses into the navigation bar as the site fades in.
 */
export function LogoIntro() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(SESSION_KEY) !== "1";
  });
  const [target, setTarget] = useState<Target | null>(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        angle: (i / 10) * Math.PI * 2,
        radius: 128 + (i % 3) * 26,
        delay: i * 0.22,
        size: i % 3 === 0 ? 4 : 2.5,
      })),
    [],
  );

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    const hold = reduceMotion ? 400 : HOLD_MS;
    const collapse = window.setTimeout(
      () => setTarget(measureNavTarget()),
      hold,
    );
    const finish = window.setTimeout(
      () => {
        sessionStorage.setItem(SESSION_KEY, "1");
        setVisible(false);
      },
      hold + (reduceMotion ? 200 : 1150),
    );
    return () => {
      window.clearTimeout(collapse);
      window.clearTimeout(finish);
      document.body.style.overflow = "";
    };
  }, [visible, reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ftm-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 grid-bg opacity-40"
            animate={{ opacity: target ? 0 : 0.4 }}
            transition={{ duration: 0.6 }}
          />

          <motion.div
            className="relative"
            style={{ width: "min(62vw, 320px)" }}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={
              target
                ? {
                    x: target.x,
                    y: target.y,
                    scale: target.scale,
                    opacity: 0.15,
                  }
                : { x: 0, y: 0, scale: 1, opacity: 1 }
            }
            transition={{
              duration: target ? 1.05 : 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="absolute inset-[-18%] animate-glow-pulse rounded-full bg-[radial-gradient(circle,rgba(18,224,106,0.35),rgba(34,224,208,0.16)_45%,transparent_70%)] blur-2xl" />

            {!reduceMotion &&
              particles.map((p, i) => (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-1/2 rounded-full bg-ftm-cyan"
                  style={{ width: p.size, height: p.size }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.9, 0],
                    x: [
                      Math.cos(p.angle) * p.radius,
                      Math.cos(p.angle + 1.9) * p.radius,
                      Math.cos(p.angle + 3.4) * (p.radius + 40),
                    ],
                    y: [
                      Math.sin(p.angle) * p.radius,
                      Math.sin(p.angle + 1.9) * p.radius,
                      Math.sin(p.angle + 3.4) * (p.radius + 40),
                    ],
                  }}
                  transition={{
                    duration: 3.2,
                    delay: p.delay,
                    ease: "easeInOut",
                  }}
                />
              ))}

            <FtmLogo animated={!reduceMotion} className="relative w-full" />
          </motion.div>

          <motion.p
            className="absolute bottom-16 font-mono text-[11px] uppercase tracking-[0.42em] text-ftm-green/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: target ? 0 : 1 }}
            transition={{ delay: target ? 0 : 1.1, duration: 0.6 }}
          >
            The Road to My First Funded Account
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
