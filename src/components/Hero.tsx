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
      <img
        className="hero-bg-image"
        src="/hero-division-desert.png?v=2"
        alt=""
        aria-hidden="true"
      />
      <div className="hero-bg-overlay" />
      <div className="hero-inner">
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
                Create Account
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
      </div>

      <div className="hero-scroll">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
