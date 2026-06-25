import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ClipboardList, BookOpen, Package, Users } from "lucide-react";
import { useLang } from "../context/LanguageContext";

const ICONS = [ClipboardList, BookOpen, Package, Users];

interface B2BCTAProps {
  onOpenModal: () => void;
}

export default function B2BCTA({ onOpenModal }: B2BCTAProps) {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="b2b-cta" ref={ref}>
      <div className="b2b-cta-inner">
        <motion.div
          className="section-eyebrow center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {t.b2bcta.eyebrow}
        </motion.div>

        <motion.h2
          className="section-title center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          {t.b2bcta.title}
          <em>{t.b2bcta.titleAccent}</em>
        </motion.h2>

        <motion.p
          className="b2b-cta-sub"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.16 }}
        >
          {t.b2bcta.sub}
        </motion.p>

        <div className="b2b-features">
          {t.b2bcta.features.map((label, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={label}
                className="b2b-feat"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 * i + 0.25, duration: 0.5 }}
              >
                <div className="b2b-feat-icon">
                  <Icon size={21} strokeWidth={1.5} />
                </div>
                <div className="b2b-feat-label">{label}</div>
              </motion.div>
            );
          })}
        </div>

        <motion.button
          className="btn-primary large"
          onClick={onOpenModal}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Create Account
        </motion.button>
      </div>
    </section>
  );
}
