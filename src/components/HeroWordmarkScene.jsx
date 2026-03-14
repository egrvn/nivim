import { motion, useReducedMotion } from "framer-motion";

export function HeroWordmarkScene({ children }) {
  const reduced = useReducedMotion();

  return (
    <div className="hero-wordmark-scene">
      <div className="hero-wordmark-scene__noise" />
      <div className="hero-wordmark-scene__aura hero-wordmark-scene__aura--one" />
      <div className="hero-wordmark-scene__aura hero-wordmark-scene__aura--two" />
      <div className="hero-wordmark-scene__edgefade" />
      <div className="hero-wordmark-scene__orb" />
      <div className="hero-wordmark-scene__orb-ring hero-wordmark-scene__orb-ring--one" />
      <div className="hero-wordmark-scene__orb-ring hero-wordmark-scene__orb-ring--two" />

      <div className="hero-wordmark-scene__wordmark-wrap">
        <motion.div
          className="hero-wordmark-scene__wordmark-motion"
          initial={reduced ? false : { opacity: 0, scale: 0.8, y: 104, filter: "blur(22px)" }}
          animate={reduced ? {} : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero-wordmark-scene__wordmark hero-wordmark-scene__wordmark--base" aria-hidden="true">
            NIVIM
          </span>

          <motion.span
            className="hero-wordmark-scene__wordmark hero-wordmark-scene__wordmark--sheen"
            aria-hidden="true"
            initial={reduced ? false : { opacity: 0.65 }}
            animate={reduced ? {} : { opacity: [0.62, 0.92, 0.68] }}
            transition={{ duration: 2.3, delay: 0.72, times: [0, 0.7, 1], ease: [0.22, 1, 0.36, 1] }}
          >
            NIVIM
          </motion.span>
        </motion.div>
      </div>

      <div className="hero-wordmark-scene__content">{children}</div>
    </div>
  );
}
