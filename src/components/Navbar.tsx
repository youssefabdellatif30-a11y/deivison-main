import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useLang } from "../context/LanguageContext";
import { LANGUAGES } from "../cms/content";

interface NavbarProps {
  onOpenQuote: () => void;
  onNavigate: (path: string) => void;
}

export default function Navbar({ onOpenQuote, onNavigate }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navCollections = {
    [t.navbar.dropdownOptical]: t.navbar.dropdownItems.optical,
    [t.navbar.dropdownSunglasses]: t.navbar.dropdownItems.sunglasses,
  };

  return (
    <>
      <div className="top-bar">
        <span className="top-bar-tagline">{t.meta.tagline}</span>
        <div className="top-bar-right">
          <a href={`tel:${t.meta.phone.replace(/\s/g, "")}`}>{t.meta.phone}</a>
          <span className="tb-sep">·</span>
          <a href={`mailto:${t.meta.email}`}>{t.meta.email}</a>
          <span className="tb-sep">·</span>
          <div className="lang-switcher-top">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                className={`lang-btn ${lang === l.code ? "active" : ""}`}
                onClick={() => setLang(l.code)}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-inner">
          <button className="logo" onClick={() => onNavigate("/")}>
            <svg className="logo-icon" viewBox="0 0 46 46" fill="none">
              <circle
                cx="23"
                cy="23"
                r="22"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.3"
              />
              <path
                d="M8 23 C8 14.716 14.716 8 23 8 C31.284 8 38 14.716 38 23"
                stroke="#0D9DA8"
                strokeWidth="2"
              />
              <circle cx="23" cy="23" r="6" fill="#0D9DA8" opacity="0.2" />
              <circle cx="23" cy="23" r="2.5" fill="#0D9DA8" />
            </svg>
            <span className="logo-wordmark">
              Di<em>Vision</em>
            </span>
          </button>

          <ul className="nav-links">
            <li>
              <button
                className="nav-link-btn"
                onClick={() => onNavigate("/")}
              >
                {t.navbar.home}
              </button>
            </li>
            <li
              className="has-dropdown"
              onMouseEnter={() => setCollectionsOpen(true)}
              onMouseLeave={() => setCollectionsOpen(false)}
            >
              <button
                className="nav-link-btn"
                onClick={() => onNavigate("/collections")}
              >
                {t.navbar.collections}{" "}
                <ChevronDown
                  size={11}
                  className={`nav-caret ${collectionsOpen ? "open" : ""}`}
                />
              </button>
              <AnimatePresence>
                {collectionsOpen && (
                  <motion.div
                    className="nav-dropdown"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="dropdown-cols">
                      {Object.entries(navCollections).map(([cat, items]) => (
                        <div key={cat}>
                          <div className="dropdown-col-title">{cat}</div>
                          <ul className="dropdown-links">
                            {items.map((item) => (
                              <li key={item}>
                                <button
                                  onClick={() => {
                                    onNavigate("/collections");
                                    setCollectionsOpen(false);
                                  }}
                                >
                                  {item}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="dropdown-footer">
                      <button
                        className="dropdown-all"
                        onClick={() => {
                          onNavigate("/collections");
                          setCollectionsOpen(false);
                        }}
                      >
                        {t.collections.viewAll} →
                      </button>
                      <span className="dropdown-new">New 2025</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            <li>
              <button
                className="nav-link-btn"
                onClick={() => onNavigate("/manufacturing")}
              >
                Manufacturing
              </button>
            </li>
            <li>
              <button
                className="nav-link-btn"
                onClick={() => onNavigate("/private-label")}
              >
                Private Label
              </button>
            </li>
            <li>
              <button
                className="nav-link-btn"
                onClick={() => onNavigate("/about")}
              >
                {t.navbar.about}
              </button>
            </li>
            <li>
              <button
                className="nav-link-btn"
                onClick={() => onNavigate("/contact")}
              >
                {t.navbar.contact}
              </button>
            </li>
            <li>
              <button
                className="nav-link-btn"
                onClick={() => onNavigate("/faq")}
              >
                FAQ
              </button>
            </li>
          </ul>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={17} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={17} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button className="btn-b2b" onClick={onOpenQuote}>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Request a Quote
            </button>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              onClick={() => {
                onNavigate("/");
                setMobileOpen(false);
              }}
            >
              {t.navbar.home}
            </button>
            <button
              onClick={() => {
                onNavigate("/collections");
                setMobileOpen(false);
              }}
            >
              {t.navbar.collections}
            </button>
            <button
              onClick={() => {
                onNavigate("/manufacturing");
                setMobileOpen(false);
              }}
            >
              Manufacturing
            </button>
            <button
              onClick={() => {
                onNavigate("/private-label");
                setMobileOpen(false);
              }}
            >
              Private Label
            </button>
            <button
              onClick={() => {
                onNavigate("/about");
                setMobileOpen(false);
              }}
            >
              {t.navbar.about}
            </button>
            <button
              onClick={() => {
                onNavigate("/contact");
                setMobileOpen(false);
              }}
            >
              {t.navbar.contact}
            </button>
            <button
              onClick={() => {
                onNavigate("/faq");
                setMobileOpen(false);
              }}
            >
              FAQ
            </button>
            <div className="mobile-lang">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  className={`lang-btn ${lang === l.code ? "active" : ""}`}
                  onClick={() => setLang(l.code)}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <button
              className="mobile-b2b"
              onClick={() => {
                onOpenQuote();
                setMobileOpen(false);
              }}
            >
              Request a Quote
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
