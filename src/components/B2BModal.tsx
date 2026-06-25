import { useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff } from "lucide-react";
import { useLang } from "../context/LanguageContext";

interface B2BModalProps {
  open: boolean;
  onClose: () => void;
}

export default function B2BModal({ open, onClose }: B2BModalProps) {
  const { t } = useLang();
  const m = t.modal;
  const [tab, setTab] = useState<"login" | "register">("login");
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);

  const handleClose = useCallback(() => {
    setError("");
    setRegSuccess(false);
    onClose();
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(m.errorMsg);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegSuccess(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="modal"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="modal-head">
              <div className="modal-small">{m.smallLabel}</div>
              <h3 className="modal-title">{m.title}</h3>
              <div className="modal-tabs">
                <button
                  className={`modal-tab ${tab === "login" ? "active" : ""}`}
                  onClick={() => setTab("login")}
                >
                  {m.tabLogin}
                </button>
                <button
                  className={`modal-tab ${tab === "register" ? "active" : ""}`}
                  onClick={() => setTab("register")}
                >
                  {m.tabRegister}
                </button>
              </div>
              <button className="modal-x" onClick={handleClose} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="modal-body">
              {/* Login */}
              {tab === "login" && (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="modal-demo">
                    <strong>{m.demoLabel}</strong>
                    {m.demoHint}
                  </div>
                  <form onSubmit={handleLogin}>
                    <div className="form-group">
                      <label className="form-label">{m.emailLabel}</label>
                      <input
                        className="form-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={m.emailPlaceholder}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{m.passLabel}</label>
                      <div className="input-icon-wrap">
                        <input
                          className="form-input"
                          type={showPass ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder={m.passPh}
                          required
                        />
                        <button
                          type="button"
                          className="input-icon-btn"
                          onClick={() => setShowPass((s) => !s)}
                        >
                          {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>
                    {error && <div className="form-error show">{error}</div>}
                    <button className="btn-login" type="submit">
                      {m.loginBtn}
                    </button>
                    <p className="modal-note">
                      {m.noAccount}{" "}
                      <button type="button" onClick={() => setTab("register")}>
                        {m.requestAccess}
                      </button>
                    </p>
                  </form>
                </motion.div>
              )}

              {/* Register */}
              {tab === "register" && (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {regSuccess ? (
                    <div className="reg-success show">
                      <strong>{m.successTitle}</strong>
                      {m.successBody}
                    </div>
                  ) : (
                    <form onSubmit={handleRegister}>
                      <div className="reg-section-title">
                        {m.companySection}
                      </div>
                      <div className="reg-grid">
                        <div className="form-group">
                          <label className="form-label">
                            {m.firstName}{" "}
                            <span className="form-label-req">*</span>
                          </label>
                          <input
                            className="form-input form-input-sm"
                            type="text"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">
                            {m.lastName}{" "}
                            <span className="form-label-req">*</span>
                          </label>
                          <input
                            className="form-input form-input-sm"
                            type="text"
                            required
                          />
                        </div>
                        <div className="form-group reg-grid-full">
                          <label className="form-label">
                            {m.companyName}{" "}
                            <span className="form-label-req">*</span>
                          </label>
                          <input
                            className="form-input form-input-sm"
                            type="text"
                            required
                          />
                        </div>
                        <div className="form-group reg-grid-full">
                          <label className="form-label">
                            {m.bizEmail}{" "}
                            <span className="form-label-req">*</span>
                          </label>
                          <input
                            className="form-input form-input-sm"
                            type="email"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">{m.country}</label>
                          <input
                            className="form-input form-input-sm"
                            type="text"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">{m.phone}</label>
                          <input
                            className="form-input form-input-sm"
                            type="tel"
                          />
                        </div>
                      </div>
                      <p className="reg-note">{m.termsNote}</p>
                      <button className="btn-login" type="submit">
                        {m.submitBtn}
                      </button>
                    </form>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
