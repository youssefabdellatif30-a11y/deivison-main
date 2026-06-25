/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  content as defaultContent,
  LANGUAGES,
  type Lang,
  type SiteContent,
} from "../cms/content";

export const CMS_STORAGE_KEY = "division-cms";
export const CMS_CHANGED_EVENT = "division-cms-changed";

function loadContent(): Record<Lang, SiteContent> {
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Fall back to bundled content if saved CMS data is missing or invalid.
  }
  return {
    en: defaultContent.en,
    fr: defaultContent.fr,
    ar: defaultContent.ar,
  };
}

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: SiteContent;
  isRTL: boolean;
  reloadContent: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("division-lang");
    if (saved === "en" || saved === "fr" || saved === "ar") return saved;
    return "en";
  });

  const [cmsContent, setCmsContent] =
    useState<Record<Lang, SiteContent>>(loadContent);

  const reloadContent = useCallback(() => {
    setCmsContent(loadContent());
  }, []);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === CMS_STORAGE_KEY) reloadContent();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(CMS_CHANGED_EVENT, reloadContent);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(CMS_CHANGED_EVENT, reloadContent);
    };
  }, [reloadContent]);

  const isRTL = LANGUAGES.find((l) => l.code === lang)?.dir === "rtl";

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("division-lang", l);
  };

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", isRTL ? "rtl" : "ltr");
  }, [lang, isRTL]);

  return (
    <LangContext.Provider
      value={{ lang, setLang, t: cmsContent[lang], isRTL, reloadContent }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
