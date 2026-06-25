import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { submitQuoteRequest, type Product } from "../cms/products";

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
  product?: Product | null;
  selectedColor?: string;
  selectedSize?: string;
  mode?: "quote" | "sample";
}

const blankForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  quantity: "12",
  customLogoRequired: false,
  packagingRequirements: "",
  targetDeliveryDate: "",
  message: "",
};

export default function QuoteModal({
  open,
  onClose,
  product,
  selectedColor,
  selectedSize,
  mode = "quote",
}: QuoteModalProps) {
  const [form, setForm] = useState(blankForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      setError("");
      setSuccess("");
      setForm((prev) => ({
        ...prev,
        message: mode === "sample"
          ? "I would like to request a sample for this product."
          : prev.message,
      }));
    }, 0);

    return () => window.clearTimeout(timer);
  }, [open, mode]);

  const update = (field: keyof typeof blankForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim() || !form.email.trim()) {
      setError("Please enter your name and email address.");
      return;
    }

    const quantity = Number.parseInt(form.quantity, 10);
    if (!Number.isFinite(quantity) || quantity < 1) {
      setError("Please enter a valid quantity.");
      return;
    }

    setSubmitting(true);
    try {
      await submitQuoteRequest({
        product_id: product?.dbId || null,
        name: form.name.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        country: form.country.trim(),
        quantity,
        selected_colors: selectedColor || "",
        custom_logo_required: form.customLogoRequired,
        packaging_requirements: form.packagingRequirements.trim(),
        target_delivery_date: form.targetDeliveryDate || null,
        message: [
          mode === "sample" ? "Request type: Sample request" : "Request type: Quote request",
          product ? `Product: ${product.name.en}` : "",
          product ? `Reference: ${product.ref}` : "",
          selectedSize ? `Size: ${selectedSize}` : "",
          form.message.trim(),
        ].filter(Boolean).join("\n"),
      });
      setSuccess("Thank you. Your request has been sent.");
      setForm(blankForm);
    } catch {
      setError("We could not send your request. Please try again or email division.eyewear@gmail.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal quote-modal"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 18, opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
          >
            <div className="modal-head">
              <div>
                <div className="modal-small">
                  {mode === "sample" ? "Sample request" : "Quote request"}
                </div>
                <h3 id="quote-modal-title" className="modal-title">
                  {product ? product.name.en : "Request a Quote"}
                </h3>
              </div>
              <button className="modal-x" onClick={onClose} aria-label="Close quote form">
                x
              </button>
            </div>

            <form className="quote-form" onSubmit={handleSubmit}>
              <div className="quote-product-line">
                {product ? `${product.ref} · ${selectedColor || "Selected product"}` : "General manufacturing enquiry"}
              </div>
              <div className="quote-grid">
                <label className="form-group">
                  <span className="form-label">Name *</span>
                  <input className="form-input" value={form.name} onChange={(event) => update("name", event.target.value)} />
                </label>
                <label className="form-group">
                  <span className="form-label">Company</span>
                  <input className="form-input" value={form.company} onChange={(event) => update("company", event.target.value)} />
                </label>
                <label className="form-group">
                  <span className="form-label">Email *</span>
                  <input className="form-input" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} />
                </label>
                <label className="form-group">
                  <span className="form-label">Phone / WhatsApp</span>
                  <input className="form-input" value={form.phone} onChange={(event) => update("phone", event.target.value)} />
                </label>
                <label className="form-group">
                  <span className="form-label">Country</span>
                  <input className="form-input" value={form.country} onChange={(event) => update("country", event.target.value)} />
                </label>
                <label className="form-group">
                  <span className="form-label">Quantity *</span>
                  <input className="form-input" type="number" min="1" value={form.quantity} onChange={(event) => update("quantity", event.target.value)} />
                </label>
                <label className="form-group">
                  <span className="form-label">Target delivery date</span>
                  <input className="form-input" type="date" value={form.targetDeliveryDate} onChange={(event) => update("targetDeliveryDate", event.target.value)} />
                </label>
                <label className="quote-check">
                  <input type="checkbox" checked={form.customLogoRequired} onChange={(event) => update("customLogoRequired", event.target.checked)} />
                  Custom logo required
                </label>
              </div>
              <label className="form-group">
                <span className="form-label">Packaging requirements</span>
                <textarea className="form-input quote-textarea" value={form.packagingRequirements} onChange={(event) => update("packagingRequirements", event.target.value)} />
              </label>
              <label className="form-group">
                <span className="form-label">Message</span>
                <textarea className="form-input quote-textarea" value={form.message} onChange={(event) => update("message", event.target.value)} />
              </label>
              {error && <p className="form-error">{error}</p>}
              {success && <p className="quote-success">{success}</p>}
              <button className="modal-submit" type="submit" disabled={submitting}>
                {submitting ? "Sending..." : mode === "sample" ? "Send sample request" : "Send quote request"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
