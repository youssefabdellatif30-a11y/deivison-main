import { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider, useLang } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Collections from "./components/Collections";
import B2BCTA from "./components/B2BCTA";
import Footer from "./components/Footer";
import ProductPage from "./components/ProductPage";
import AdminPanel from "./admin/AdminPanel";
import QuoteModal from "./components/QuoteModal";
import {
  AboutPage,
  ContactPage,
  FAQPage,
  ManufacturingPage,
  NotFoundPage,
  PrivateLabelPage,
} from "./components/InfoPages";

function normalizePath(path: string) {
  return path.replace(/\/+$/, "") || "/";
}

function AppInner() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  const [quoteOpen, setQuoteOpen] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (nextPath: string) => {
    const normalized = normalizePath(nextPath);
    if (normalized !== path) {
      window.history.pushState(null, "", normalized);
      setPath(normalized);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const productSlug = useMemo(() => {
    const match = path.match(/^\/products\/([^/]+)$/);
    return match ? decodeURIComponent(match[1]) : null;
  }, [path]);

  const pageProps = {
    onOpenQuote: () => setQuoteOpen(true),
    onNavigate: navigate,
  };

  const renderRoute = () => {
    if (productSlug) {
      return (
        <ProductPage
          productId={productSlug}
          onBack={() => navigate("/collections")}
          isB2B={false}
          onOpenModal={() => setQuoteOpen(true)}
        />
      );
    }

    if (path === "/") {
      return (
        <>
          <Hero onNavigate={(page) => navigate(page === "collections" ? "/collections" : "/")} onOpenModal={() => setQuoteOpen(true)} />
          <About />
          <Collections
            onOpenModal={() => setQuoteOpen(true)}
            onOpenQuote={() => setQuoteOpen(true)}
            isB2B={false}
            onViewProduct={(id) => navigate(`/products/${encodeURIComponent(id)}`)}
          />
          <B2BCTA onOpenModal={() => setQuoteOpen(true)} />
        </>
      );
    }

    if (path === "/collections") {
      return (
        <>
          <div className="page-hero">
            <div className="page-hero-bg" />
            <div className="page-hero-content">
              <div className="colpage-eyebrow">{t.collections.eyebrow}</div>
              <h1 className="colpage-title">
                {t.collections.title}
                <em>{t.collections.titleAccent}</em>
              </h1>
              <p className="page-hero-copy">Browse active optical frames and sunglasses from the live catalogue.</p>
            </div>
          </div>
          <Collections
            onOpenModal={() => setQuoteOpen(true)}
            onOpenQuote={() => setQuoteOpen(true)}
            isB2B={false}
            onViewProduct={(id) => navigate(`/products/${encodeURIComponent(id)}`)}
          />
        </>
      );
    }

    if (path === "/manufacturing") return <ManufacturingPage {...pageProps} />;
    if (path === "/private-label") return <PrivateLabelPage {...pageProps} />;
    if (path === "/about") return <AboutPage {...pageProps} />;
    if (path === "/contact") return <ContactPage {...pageProps} />;
    if (path === "/faq") return <FAQPage {...pageProps} />;
    return <NotFoundPage {...pageProps} />;
  };

  return (
    <>
      <span className="sr-only">{t.b2bBar.text}</span>

      <Navbar
        onOpenQuote={() => setQuoteOpen(true)}
        onNavigate={navigate}
      />

      <main>{renderRoute()}</main>

      <Footer
        onNavigate={navigate}
        onOpenModal={() => setQuoteOpen(true)}
        onOpenQuote={() => setQuoteOpen(true)}
      />

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}

export default function App() {
  const isAdmin = window.location.pathname === "/admin";

  if (isAdmin) {
    return <AdminPanel />;
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppInner />
      </LanguageProvider>
    </ThemeProvider>
  );
}
