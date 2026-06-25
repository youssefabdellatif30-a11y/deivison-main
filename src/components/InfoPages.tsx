import { ArrowRight, CheckCircle2, HelpCircle, Mail, MapPin, Phone } from "lucide-react";
import About from "./About";

interface PageProps {
  onOpenQuote: () => void;
  onNavigate: (path: string) => void;
}

const manufacturingSteps = [
  "Product selection or custom design",
  "Material and colour selection",
  "Prototype or sample",
  "Sample approval",
  "Production",
  "Quality control",
  "Packaging",
  "Shipping",
];

const privateLabelServices = [
  "Custom frame colours",
  "Logo placement",
  "Temple branding",
  "Lens branding",
  "Custom packaging",
  "Cases and cleaning cloths",
  "Sample development",
];

const faqs = [
  {
    question: "What is the minimum order quantity?",
    answer: "Most seeded products currently show a minimum order quantity of 12 pieces. Confirm the final MOQ for each product before launch.",
  },
  {
    question: "Can I request samples?",
    answer: "Products marked as sample available can be requested from the product page. Buyer account access is reviewed separately before protected wholesale features are available.",
  },
  {
    question: "Do you offer private-label manufacturing?",
    answer: "The product data includes private-label availability. Final branding options and limits should be confirmed in your business content.",
  },
  {
    question: "What are production lead times?",
    answer: "Seeded products currently show 2-4 weeks. Replace this with the confirmed production lead time if it changes by product or order size.",
  },
  {
    question: "What materials are available?",
    answer: "Current seeded products use Premium acetate. Add or edit product materials in the admin dashboard as your catalogue grows.",
  },
  {
    question: "Can packaging be customized?",
    answer: "Packaging requirements can be discussed after your buyer account request is reviewed. Confirm available packaging options before publishing final claims.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Shipping can be discussed during quotation. Export countries and shipping methods have not been supplied yet.",
  },
  {
    question: "How does the quotation process work?",
    answer: "Create an account for approval first. After approval, DiVision can follow up on product, colour, size, and wholesale requirements.",
  },
];

function PageHero({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="page-hero">
      <div className="page-hero-bg" />
      <div className="page-hero-content">
        <div className="colpage-eyebrow">{eyebrow}</div>
        <h1 className="colpage-title">{title}</h1>
        <p className="page-hero-copy">{body}</p>
      </div>
    </div>
  );
}

function QuoteBand({ onOpenQuote }: { onOpenQuote: () => void }) {
  return (
    <section className="quote-band">
      <div>
        <span className="section-eyebrow">Wholesale access</span>
        <h2 className="section-title">Create an approved buyer account</h2>
      </div>
      <button className="btn-primary" onClick={onOpenQuote}>
        Create Account <ArrowRight size={15} />
      </button>
    </section>
  );
}

export function ManufacturingPage({ onOpenQuote }: PageProps) {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing"
        title="Eyewear production process"
        body="A practical overview of how a wholesale eyewear order can move from product choice to delivery. Exact factory capabilities and certifications still need to be supplied before final launch copy."
      />
      <section className="info-section">
        <div className="process-grid">
          {manufacturingSteps.map((step, index) => (
            <article className="process-card" key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step}</h3>
              <p>
                {step === "Quality control"
                  ? "Inspection details and formal standards need your confirmed business information."
                  : "This stage is handled according to the selected product, order size, and buyer requirements."}
              </p>
            </article>
          ))}
        </div>
      </section>
      <QuoteBand onOpenQuote={onOpenQuote} />
    </>
  );
}

export function PrivateLabelPage({ onOpenQuote }: PageProps) {
  return (
    <>
      <PageHero
        eyebrow="Private Label"
        title="Brand-ready eyewear options"
        body="Private-label availability is tracked per product in the catalogue. Create an account for approval before discussing protected wholesale and branding details."
      />
      <section className="info-section split-info">
        <div>
          <h2 className="section-title">Available service areas</h2>
          <p className="section-body">
            The current project confirms private-label availability as a product field. Specific logo methods, minimums, and packaging specifications still need your final business details.
          </p>
        </div>
        <div className="service-list">
          {privateLabelServices.map((service) => (
            <div className="service-item" key={service}>
              <CheckCircle2 size={18} />
              <span>{service}</span>
            </div>
          ))}
        </div>
      </section>
      <QuoteBand onOpenQuote={onOpenQuote} />
    </>
  );
}

export function AboutPage({ onOpenQuote }: PageProps) {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="DiVision Eyewear"
        body="Producing since 2022, DiVision Eyewear supplies optical frames and sunglasses for professional buyers."
      />
      <About />
      <QuoteBand onOpenQuote={onOpenQuote} />
    </>
  );
}

export function ContactPage({ onOpenQuote }: PageProps) {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to DiVision"
        body="Send a product enquiry, sample request, or wholesale manufacturing question."
      />
      <section className="info-section contact-layout">
        <div className="contact-panel">
          <h2 className="section-title">Contact details</h2>
          <div className="contact-row"><Mail size={18} /><a href="mailto:division.eyewear@gmail.com">division.eyewear@gmail.com</a></div>
          <div className="contact-row"><Phone size={18} /><span>Phone / WhatsApp: needs your confirmed number</span></div>
          <div className="contact-row"><MapPin size={18} /><span>Company location: Tunisia. Full address needs confirmation.</span></div>
          <p className="content-note">Business hours have not been supplied yet.</p>
        </div>
        <div className="contact-panel">
          <h2 className="section-title">Create buyer access</h2>
          <p className="section-body">Create an account for approval before accessing protected wholesale information.</p>
          <button className="btn-primary" onClick={onOpenQuote}>Create Account</button>
        </div>
      </section>
    </>
  );
}

export function FAQPage({ onOpenQuote }: PageProps) {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Buyer questions"
        body="Answers based on the current product data and project information. Any missing policy details are marked clearly."
      />
      <section className="info-section faq-list">
        {faqs.map((item) => (
          <article className="faq-item" key={item.question}>
            <HelpCircle size={18} />
            <div>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          </article>
        ))}
      </section>
      <QuoteBand onOpenQuote={onOpenQuote} />
    </>
  );
}

export function NotFoundPage({ onNavigate }: PageProps) {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="Page not found"
        body="This page does not exist, or the link may have changed."
      />
      <section className="info-section not-found-actions">
        <button className="btn-primary" onClick={() => onNavigate("/")}>Go Home</button>
        <button className="btn-outline-light" onClick={() => onNavigate("/collections")}>View Collections</button>
      </section>
    </>
  );
}
