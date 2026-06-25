import { useLang } from "../context/LanguageContext";

// social icons as inline SVGs since lucide-react doesn't export brand icons
const SocialIcons = [
  <svg
    key="ig"
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>,
  <svg
    key="fb"
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.6.4-1 1-1z" />
  </svg>,
];

interface FooterProps {
  onNavigate?: (path: string) => void;
  onOpenModal?: () => void;
  onOpenQuote?: () => void;
}

const SOCIAL_LINKS = [
  "https://www.instagram.com/divisioneyewear/",
  "https://www.facebook.com/profile.php?id=61566171876882",
];
const SOCIAL_LABELS = ["Instagram", "Facebook"];

function footerHref(link: string) {
  const normalized = link.toLowerCase();
  if (normalized.includes("about") || normalized.includes("propos")) return "/about";
  if (normalized.includes("contact") || normalized.includes("support") || normalized.includes("assistance")) return "/contact";
  if (normalized.includes("collection") || normalized.includes("frame") || normalized.includes("sunglasses") || normalized.includes("solaires") || normalized.includes("optical")) return "/collections";
  if (normalized.includes("private")) return "/private-label";
  if (normalized.includes("manufacturing")) return "/manufacturing";
  if (normalized.includes("faq")) return "/faq";
  return `mailto:division.eyewear@gmail.com?subject=${encodeURIComponent(link)}`;
}

export default function Footer({ onNavigate, onOpenModal, onOpenQuote }: FooterProps) {
  const { t } = useLang();
  const cols = [
    t.footer.cols.collections,
    t.footer.cols.company,
    t.footer.cols.support,
  ];

  const handleFooterLink = (link: string) => {
    const normalized = link.toLowerCase();

    if (normalized.includes("b2b")) {
      onOpenModal?.();
      return;
    }

    if (
      normalized.includes("about") ||
      normalized.includes("propos") ||
      normalized.includes("عن")
    ) {
      onNavigate?.("/about");
      return;
    }

    if (
      normalized.includes("contact") ||
      normalized.includes("support") ||
      normalized.includes("assistance")
    ) {
      onNavigate?.("/contact");
      return;
    }

    if (normalized.includes("private")) {
      onNavigate?.("/private-label");
      return;
    }

    if (normalized.includes("manufacturing")) {
      onNavigate?.("/manufacturing");
      return;
    }

    if (normalized.includes("faq")) {
      onNavigate?.("/faq");
      return;
    }

    if (
      normalized.includes("collection") ||
      normalized.includes("frame") ||
      normalized.includes("sunglasses") ||
      normalized.includes("solaires") ||
      normalized.includes("optical")
    ) {
      onNavigate?.("/collections");
      return;
    }

    window.open(`mailto:${t.meta.email}?subject=${encodeURIComponent(link)}`, "_self");
  };

  const handleNewsletter = (email: string) => {
    const subject = encodeURIComponent("Trade newsletter request");
    const body = encodeURIComponent(`Please add ${email} to the DiVision trade newsletter.`);
    window.open(`mailto:${t.meta.email}?subject=${subject}&body=${body}`, "_self");
  };

  return (
    <footer id="contact">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <span className="footer-logo">
            Di<em>Vision</em>
          </span>
          <p className="footer-desc">{t.footer.desc}</p>
          <div className="footer-social">
            {SocialIcons.map((icon, i) => (
              <a
                key={i}
                className="social-btn"
                href={SOCIAL_LINKS[i]}
                target="_blank"
                rel="noreferrer"
                aria-label={SOCIAL_LABELS[i]}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Newsletter */}
          <div className="nl-wrap">
            <div className="nl-label">{t.footer.newsletter}</div>
            <form
              className="nl-form"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const input = form.elements.namedItem("newsletterEmail") as HTMLInputElement;
                handleNewsletter(input.value);
              }}
            >
              <input
                name="newsletterEmail"
                className="nl-input"
                type="email"
                required
                placeholder={t.footer.newsletterPlaceholder}
              />
              <button className="nl-btn" type="submit">
                →
              </button>
            </form>
          </div>
        </div>

        {/* Link columns */}
        {cols.map((col) => (
          <div key={col.title} className="footer-col">
            <div className="footer-col-title">{col.title}</div>
            <ul className="footer-links">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href={footerHref(link)}
                    onClick={(e) => {
                      e.preventDefault();
                      handleFooterLink(link);
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-quote-cta">
        <span>Need pricing, samples, or private-label information?</span>
        <button className="btn-primary" onClick={onOpenQuote}>Request a Quote</button>
      </div>

      <div className="footer-bottom">
        <span>{t.footer.copyright}</span>
        <div className="footer-bottom-links">
          {t.footer.legal.map((item) => (
            <a
              key={item}
              href={`mailto:${t.meta.email}?subject=${encodeURIComponent(item)}`}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
