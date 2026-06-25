import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "../context/LanguageContext";

const statsData = ["2022", "B2B", "TN"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6 },
  }),
};

export default function About() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about-inner">
        {/* Visual / stats side */}
        <motion.div
          className="about-visual"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="about-visual-bg" />
          <div className="about-visual-inner">
            {statsData.map((s, i) => (
              <motion.div
                key={i}
                className="stat-block"
                custom={i}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
              >
                <div className="stat-num">{s}</div>
                <div className="stat-label">{t.about.statLabels[i]}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="section-eyebrow">{t.about.eyebrow}</div>
          <h2 className="section-title">
            {t.about.title}
            <em>{t.about.titleAccent}</em>
          </h2>
          <p className="section-body">{t.about.body1}</p>
          <p className="section-body" style={{ marginTop: "1.2rem" }}>
            {t.about.body2}
          </p>

          <div className="about-pillars">
            {t.about.pillars.map((p, i) => (
              <motion.div
                key={p.title}
                className="about-pillar"
                custom={i}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
              >
                <div className="pillar-dot" />
                <div>
                  <div className="pillar-title">{p.title}</div>
                  <div className="pillar-desc">{p.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
