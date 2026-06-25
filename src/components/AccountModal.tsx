import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../lib/supabase";

interface AccountModalProps {
  open: boolean;
  onClose: () => void;
}

const blankForm = {
  fullName: "",
  companyName: "",
  email: "",
  password: "",
  phone: "",
  country: "",
  message: "",
};

export default function AccountModal({ open, onClose }: AccountModalProps) {
  const [form, setForm] = useState(blankForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      setError("");
      setSuccess("");
    }, 0);

    return () => window.clearTimeout(timer);
  }, [open]);

  const update = (field: keyof typeof blankForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.fullName.trim() || !form.companyName.trim() || !form.email.trim() || !form.password) {
      setError("Please enter your name, company, email, and password.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
        options: {
          data: {
            full_name: form.fullName.trim(),
            company_name: form.companyName.trim(),
            phone: form.phone.trim(),
            country: form.country.trim(),
            account_request_message: form.message.trim(),
            requested_access: "b2b",
          },
        },
      });

      if (signUpError) throw signUpError;

      setSuccess("Your account request has been created. DiVision must approve access before you can use protected areas.");
      setForm(blankForm);
    } catch (err) {
      const message = err instanceof Error ? err.message : "We could not create the account request.";
      setError(`${message} Please try again or email division.eyewear@gmail.com.`);
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
            aria-labelledby="account-modal-title"
          >
            <div className="modal-head">
              <div>
                <div className="modal-small">B2B account approval</div>
                <h3 id="account-modal-title" className="modal-title">
                  Create an Account
                </h3>
              </div>
              <button className="modal-x" onClick={onClose} aria-label="Close account form">
                x
              </button>
            </div>

            <form className="quote-form" onSubmit={handleSubmit}>
              <p className="account-note">
                Create your account now. DiVision reviews and approves wholesale access before protected features are available.
              </p>
              <div className="quote-grid">
                <label className="form-group">
                  <span className="form-label">Full name *</span>
                  <input className="form-input" value={form.fullName} onChange={(event) => update("fullName", event.target.value)} />
                </label>
                <label className="form-group">
                  <span className="form-label">Company *</span>
                  <input className="form-input" value={form.companyName} onChange={(event) => update("companyName", event.target.value)} />
                </label>
                <label className="form-group">
                  <span className="form-label">Email *</span>
                  <input className="form-input" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} />
                </label>
                <label className="form-group">
                  <span className="form-label">Password *</span>
                  <input className="form-input" type="password" value={form.password} onChange={(event) => update("password", event.target.value)} />
                </label>
                <label className="form-group">
                  <span className="form-label">Phone / WhatsApp</span>
                  <input className="form-input" value={form.phone} onChange={(event) => update("phone", event.target.value)} />
                </label>
                <label className="form-group">
                  <span className="form-label">Country</span>
                  <input className="form-input" value={form.country} onChange={(event) => update("country", event.target.value)} />
                </label>
              </div>
              <label className="form-group">
                <span className="form-label">Message</span>
                <textarea className="form-input quote-textarea" value={form.message} onChange={(event) => update("message", event.target.value)} />
              </label>
              {error && <p className="form-error">{error}</p>}
              {success && <p className="quote-success">{success}</p>}
              <button className="modal-submit" type="submit" disabled={submitting}>
                {submitting ? "Creating..." : "Create account for approval"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
