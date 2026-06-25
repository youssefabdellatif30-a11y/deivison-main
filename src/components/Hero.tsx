import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "../context/LanguageContext";

interface HeroProps {
  onNavigate: (page: string) => void;
  onOpenModal: () => void;
}

export default function Hero({ onNavigate, onOpenModal }: HeroProps) {
  const { t } = useLang();

  return (
    <section className="hero">
      <div className="hero-inner">
        {/* Left Content */}
        <div className="hero-left">
          <div className="hero-content">
            <motion.div
              className="hero-eyebrow"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              {t.hero.eyebrow}
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
            >
              {t.hero.titleLine1}
              <br />
              {t.hero.titleLine2}
              <em>{t.hero.titleAccent}</em>
            </motion.h1>

            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {t.hero.sub}
            </motion.p>

            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              <button
                className="btn-primary"
                onClick={() => onNavigate("collections")}
              >
                {t.hero.cta1}
                <ArrowRight size={14} />
              </button>
              <button className="btn-ghost" onClick={onOpenModal}>
                {t.hero.cta2}
              </button>
            </motion.div>

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.6 }}
            >
              {t.hero.stats.map((s) => (
                <div key={s.label} className="hero-stat">
                  <span className="hero-stat-num">{s.num}</span>
                  <span className="hero-stat-label">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right: decorative visual */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.9, ease: "easeOut" }}
        >
          {/* Abstract eyewear graphic */}
          <div className="hero-visual-wrap">
            <svg
              viewBox="0 0 600 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hero-svg"
            >
              {/* Glow */}
              <defs>
                <radialGradient id="glowL" cx="30%" cy="50%" r="40%">
                  <stop offset="0%" stopColor="#0D9DA8" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#0D9DA8" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="glowR" cx="70%" cy="50%" r="40%">
                  <stop offset="0%" stopColor="#0D9DA8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0D9DA8" stopOpacity="0" />
                </radialGradient>
                <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="18" />
                </filter>
              </defs>
              {/* Glow blobs */}
              <ellipse
                cx="185"
                cy="200"
                rx="110"
                ry="90"
                fill="url(#glowL)"
                filter="url(#blur)"
              />
              <ellipse
                cx="415"
                cy="200"
                rx="110"
                ry="90"
                fill="url(#glowR)"
                filter="url(#blur)"
              />
              {/* Left lens */}
              <rect
                x="60"
                y="130"
                width="200"
                height="140"
                rx="70"
                stroke="#0D9DA8"
                strokeWidth="3.5"
                strokeOpacity="0.8"
              />
              <rect
                x="72"
                y="142"
                width="176"
                height="116"
                rx="58"
                stroke="#0D9DA8"
                strokeWidth="1"
                strokeOpacity="0.25"
              />
              {/* Bridge */}
              <path
                d="M260 200 Q300 185 340 200"
                stroke="#0D9DA8"
                strokeWidth="3"
                strokeOpacity="0.7"
                fill="none"
              />
              {/* Right lens */}
              <rect
                x="340"
                y="130"
                width="200"
                height="140"
                rx="70"
                stroke="#0D9DA8"
                strokeWidth="3.5"
                strokeOpacity="0.8"
              />
              <rect
                x="352"
                y="142"
                width="176"
                height="116"
                rx="58"
                stroke="#0D9DA8"
                strokeWidth="1"
                strokeOpacity="0.25"
              />
              {/* Temple left */}
              <path
                d="M60 165 L10 120"
                stroke="#0D9DA8"
                strokeWidth="2.5"
                strokeOpacity="0.6"
                strokeLinecap="round"
              />
              {/* Temple right */}
              <path
                d="M540 165 L590 120"
                stroke="#0D9DA8"
                strokeWidth="2.5"
                strokeOpacity="0.6"
                strokeLinecap="round"
              />
              {/* Inner reflections */}
              <ellipse
                cx="185"
                cy="182"
                rx="55"
                ry="32"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.06"
              />
              <ellipse
                cx="415"
                cy="182"
                rx="55"
                ry="32"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.06"
              />
              {/* Dot accents */}
              <circle cx="185" cy="200" r="4" fill="#0D9DA8" opacity="0.6" />
              <circle cx="415" cy="200" r="4" fill="#0D9DA8" opacity="0.6" />
            </svg>

            {/* Floating label */}
            <div className="hero-model-tag">
              <span className="hero-model-dot" />
              <span className="hero-model-text">
                SS 2025 — <span>New Collection</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
