import { useCallback, useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { supabase } from "../lib/supabase";
import {
  deleteProduct,
  emptyProduct,
  fetchAdminProducts,
  fetchQuoteRequests,
  saveProduct,
  updateQuoteStatus,
  uploadProductImage,
  type FrameShape,
  type Product,
  type ProductColor,
  type QuoteRequest,
  type QuoteStatus,
} from "../cms/products";

const SHAPES: FrameShape[] = ["round", "square", "wayfarer", "aviator"];
const QUOTE_STATUSES: QuoteStatus[] = ["new", "contacted", "quoted", "won", "lost"];

function cloneProduct(product: Product): Product {
  return JSON.parse(JSON.stringify(product)) as Product;
}

function makeProductDraft(product?: Product): Product {
  const draft = product ? cloneProduct(product) : emptyProduct();
  return {
    ...draft,
    colors: draft.colors.length > 0 ? draft.colors : [{ label: "Black", hex: "#111111" }],
    sizes: draft.sizes.length > 0 ? draft.sizes : ["48 MM", "50 MM", "52 MM"],
  };
}

export default function AdminPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [adminReady, setAdminReady] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activeSection, setActiveSection] = useState<"products" | "quotes">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [notice, setNotice] = useState("");

  const loadDashboard = useCallback(async () => {
    setLoadingData(true);
    setNotice("");
    try {
      const [nextProducts, nextQuotes] = await Promise.all([
        fetchAdminProducts(),
        fetchQuoteRequests(),
      ]);
      setProducts(nextProducts);
      setQuotes(nextQuotes);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not load admin data.");
    } finally {
      setLoadingData(false);
    }
  }, []);

  const checkAdmin = useCallback(async () => {
    setAuthLoading(true);
    setAuthError("");
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData.session) {
      setAdminReady(false);
      setAuthLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", sessionData.session.user.id)
      .single();

    if (error || data?.role !== "admin") {
      setAdminReady(false);
      setAuthError("You are signed in, but this account is not an admin yet.");
      setAuthLoading(false);
      return;
    }

    setAdminReady(true);
    setAuthLoading(false);
    await loadDashboard();
  }, [loadDashboard]);

  useEffect(() => {
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.setAttribute("lang", "en");
    const timer = window.setTimeout(() => void checkAdmin(), 0);
    return () => window.clearTimeout(timer);
  }, [checkAdmin]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message);
      setAuthLoading(false);
      return;
    }

    await checkAdmin();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAdminReady(false);
    setProducts([]);
    setQuotes([]);
    setPassword("");
  };

  if (authLoading) {
    return (
      <div className="admin-login">
        <div className="admin-login-box">
          <div className="admin-logo">Di<em>Vision</em> <span>Admin</span></div>
          <p className="admin-muted">Loading admin...</p>
        </div>
      </div>
    );
  }

  if (!adminReady) {
    return (
      <div className="admin-login">
        <div className="admin-login-box">
          <div className="admin-logo">Di<em>Vision</em> <span>Admin</span></div>
          <form onSubmit={handleLogin}>
            <div className="af-field">
              <label className="af-label">Admin email</label>
              <input
                className="af-input"
                type="email"
                autoFocus
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="af-field">
              <label className="af-label">Password</label>
              <input
                className="af-input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {authError && <p className="admin-error">{authError}</p>}
            <button className="admin-save-btn" type="submit">Sign in</button>
          </form>
          <a href="/" className="admin-back">Back to site</a>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-wrap">
      <aside className="admin-sidebar">
        <div className="admin-logo">Di<em>Vision</em> <span>Admin</span></div>
        <nav className="admin-nav">
          <button
            className={`admin-nav-btn ${activeSection === "products" ? "active" : ""}`}
            onClick={() => setActiveSection("products")}
          >
            Products
          </button>
          <button
            className={`admin-nav-btn ${activeSection === "quotes" ? "active" : ""}`}
            onClick={() => setActiveSection("quotes")}
          >
            Quote requests
          </button>
        </nav>
        <div className="admin-sidebar-footer">
          <a href="/" className="admin-back">View site</a>
          <button className="admin-reset-btn admin-logout" onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      <div className="admin-main">
        <div className="admin-topbar">
          <div className="admin-section-title">
            {activeSection === "products" ? "Products" : "Quote Requests"}
          </div>
          <div className="admin-actions">
            <button className="admin-reset-btn" onClick={loadDashboard} disabled={loadingData}>
              {loadingData ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>
        {notice && <div className="admin-notice">{notice}</div>}
        <div className="admin-form">
          {activeSection === "products" ? (
            <ProductsManager products={products} onChange={setProducts} onNotice={setNotice} />
          ) : (
            <QuotesManager quotes={quotes} onChange={setQuotes} onNotice={setNotice} />
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="af-section">
      <div className="af-section-title">{title}</div>
      {children}
    </div>
  );
}

function ProductsManager({
  products,
  onChange,
  onNotice,
}: {
  products: Product[];
  onChange: (products: Product[]) => void;
  onNotice: (message: string) => void;
}) {
  const [editing, setEditing] = useState<Product | null>(null);

  if (editing) {
    return (
      <ProductForm
        initialProduct={editing}
        onCancel={() => setEditing(null)}
        onSaved={(saved) => {
          const exists = products.some((product) => product.dbId === saved.dbId);
          onChange(exists
            ? products.map((product) => product.dbId === saved.dbId ? saved : product)
            : [...products, saved]);
          setEditing(null);
          onNotice("Product saved.");
        }}
        onDeleted={(deleted) => {
          onChange(products.filter((product) => product.dbId !== deleted.dbId));
          setEditing(null);
          onNotice("Product deleted.");
        }}
        onNotice={onNotice}
      />
    );
  }

  return (
    <Section title={`All Products (${products.length})`}>
      <div className="prod-list">
        {products.map((product) => (
          <div key={product.dbId || product.id} className="prod-row">
            <div className="prod-row-thumb">
              {product.colors[0]?.image ? (
                <img src={product.colors[0].image} alt="" />
              ) : (
                <span className="prod-row-initial">{product.name.en.charAt(0) || "D"}</span>
              )}
            </div>
            <div className="prod-row-info">
              <div className="prod-row-name">{product.name.en || "(unnamed)"}</div>
              <div className="prod-row-ref">{product.ref} · {product.active ? "Active" : "Inactive"}</div>
            </div>
            <div className="prod-row-actions">
              <button className="prod-edit-btn" onClick={() => setEditing(makeProductDraft(product))}>Edit</button>
            </div>
          </div>
        ))}
        <button className="prod-add-btn" onClick={() => setEditing(makeProductDraft())}>
          + Add New Product
        </button>
      </div>
    </Section>
  );
}

function ProductForm({
  initialProduct,
  onCancel,
  onSaved,
  onDeleted,
  onNotice,
}: {
  initialProduct: Product;
  onCancel: () => void;
  onSaved: (product: Product) => void;
  onDeleted: (product: Product) => void;
  onNotice: (message: string) => void;
}) {
  const [product, setProduct] = useState<Product>(() => makeProductDraft(initialProduct));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [contentLang, setContentLang] = useState<"en" | "fr" | "ar">("en");
  const isNew = !initialProduct.dbId;

  const colorJson = useMemo(() => JSON.stringify(product.colors, null, 2), [product.colors]);

  const setField = <K extends keyof Product>(key: K, value: Product[K]) => {
    setProduct((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadProductImage(file);
      setProduct((prev) => ({
        ...prev,
        colors: prev.colors.map((color, index) => index === 0 ? { ...color, image: url } : color),
        images: Array.from(new Set([url, ...prev.images])),
      }));
      onNotice("Image uploaded. Save the product to keep it.");
    } catch (error) {
      onNotice(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleColorsJson = (value: string) => {
    try {
      const parsed = JSON.parse(value) as ProductColor[];
      if (Array.isArray(parsed)) {
        setField("colors", parsed);
      }
    } catch {
      onNotice("Colors JSON is not valid yet.");
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      const saved = await saveProduct(product);
      onSaved(saved);
    } catch (error) {
      onNotice(error instanceof Error ? error.message : "Product could not be saved.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${product.name.en || "this product"}"?`)) return;
    setSaving(true);
    try {
      await deleteProduct(product);
      onDeleted(product);
    } catch (error) {
      onNotice(error instanceof Error ? error.message : "Product could not be deleted.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="prod-form-header">
        <button className="prod-back-btn" type="button" onClick={onCancel}>Back</button>
        <span className="prod-form-title">{isNew ? "New Product" : product.name.en || "Edit Product"}</span>
      </div>

      <Section title="Basic Info">
        <div className="af-grid-2">
          <label className="af-field">
            <span className="af-label">Slug</span>
            <input className="af-input" value={product.id} onChange={(event) => setField("id", event.target.value)} required />
          </label>
          <label className="af-field">
            <span className="af-label">Reference</span>
            <input className="af-input" value={product.ref} onChange={(event) => setField("ref", event.target.value)} required />
          </label>
          <label className="af-field">
            <span className="af-label">Frame Shape</span>
            <select className="af-input" value={product.shape} onChange={(event) => setField("shape", event.target.value as FrameShape)}>
              {SHAPES.map((shape) => <option key={shape} value={shape}>{shape}</option>)}
            </select>
          </label>
          <label className="af-field">
            <span className="af-label">Category</span>
            <select
              className="af-input"
              value={product.filterTags.includes("sunglasses") ? "sunglasses" : "optical"}
              onChange={(event) => setField("filterTags", [event.target.value as "optical" | "sunglasses", "womens"])}
            >
              <option value="optical">Optical</option>
              <option value="sunglasses">Sunglasses</option>
            </select>
          </label>
          <label className="af-field">
            <span className="af-label">Material</span>
            <input className="af-input" value={product.material || ""} onChange={(event) => setField("material", event.target.value)} />
          </label>
          <label className="af-field">
            <span className="af-label">Minimum order quantity</span>
            <input
              className="af-input"
              type="number"
              min="1"
              value={product.minimumOrderQuantity || 1}
              onChange={(event) => setField("minimumOrderQuantity", Number.parseInt(event.target.value, 10) || 1)}
            />
          </label>
          <label className="af-field">
            <span className="af-label">Production lead time</span>
            <input className="af-input" value={product.productionLeadTime || ""} onChange={(event) => setField("productionLeadTime", event.target.value)} />
          </label>
          <label className="af-field product-toggle">
            <input type="checkbox" checked={product.active ?? true} onChange={(event) => setField("active", event.target.checked)} />
            Active on website
          </label>
          <label className="af-field product-toggle">
            <input type="checkbox" checked={product.sampleAvailable ?? true} onChange={(event) => setField("sampleAvailable", event.target.checked)} />
            Sample available
          </label>
          <label className="af-field product-toggle">
            <input type="checkbox" checked={product.privateLabelAvailable ?? true} onChange={(event) => setField("privateLabelAvailable", event.target.checked)} />
            Private label available
          </label>
        </div>
      </Section>

      <Section title="Product Content">
        <div className="prod-lang-tabs">
          {(["en", "fr", "ar"] as const).map((code) => (
            <button
              key={code}
              type="button"
              className={`prod-lang-tab ${contentLang === code ? "active" : ""}`}
              onClick={() => setContentLang(code)}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
        <label className="af-field">
          <span className="af-label">Name</span>
          <input
            className="af-input"
            value={product.name[contentLang] || ""}
            onChange={(event) => setField("name", { ...product.name, [contentLang]: event.target.value })}
            required={contentLang === "en"}
          />
        </label>
        <label className="af-field">
          <span className="af-label">Description</span>
          <textarea
            className="af-input af-textarea"
            rows={4}
            value={product.description[contentLang] || ""}
            onChange={(event) => setField("description", { ...product.description, [contentLang]: event.target.value })}
          />
        </label>
      </Section>

      <Section title="Images And Colors">
        <label className="af-field">
          <span className="af-label">Upload main product image</span>
          <input
            className="af-input"
            type="file"
            accept="image/*"
            onChange={(event) => void handleUpload(event.target.files?.[0])}
          />
        </label>
        {uploading && <p className="admin-muted">Uploading image...</p>}
        {product.colors[0]?.image && (
          <img className="admin-product-preview" src={product.colors[0].image} alt="" />
        )}
        <label className="af-field">
          <span className="af-label">Colors JSON</span>
          <textarea
            className="af-input af-textarea code-textarea"
            rows={10}
            value={colorJson}
            onChange={(event) => handleColorsJson(event.target.value)}
          />
        </label>
        <label className="af-field">
          <span className="af-label">Sizes, comma separated</span>
          <input
            className="af-input"
            value={product.sizes.join(", ")}
            onChange={(event) => setField("sizes", event.target.value.split(",").map((size) => size.trim()).filter(Boolean))}
          />
        </label>
      </Section>

      <div className="admin-form-actions">
        <button className="prod-save-btn" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Product"}
        </button>
        {!isNew && (
          <button className="prod-del-product-btn" type="button" onClick={handleDelete} disabled={saving}>
            Delete Product
          </button>
        )}
      </div>
    </form>
  );
}

function QuotesManager({
  quotes,
  onChange,
  onNotice,
}: {
  quotes: QuoteRequest[];
  onChange: (quotes: QuoteRequest[]) => void;
  onNotice: (message: string) => void;
}) {
  const handleStatusChange = async (quote: QuoteRequest, status: QuoteStatus) => {
    try {
      await updateQuoteStatus(quote.id, status);
      onChange(quotes.map((item) => item.id === quote.id ? { ...item, status } : item));
      onNotice("Quote status updated.");
    } catch (error) {
      onNotice(error instanceof Error ? error.message : "Quote status could not be updated.");
    }
  };

  return (
    <Section title={`Quote Requests (${quotes.length})`}>
      {quotes.length === 0 ? (
        <p className="admin-muted">No quote requests yet.</p>
      ) : (
        <div className="quote-admin-list">
          {quotes.map((quote) => (
            <div className="quote-admin-card" key={quote.id}>
              <div>
                <strong>{quote.name}</strong>
                <span>{quote.company || "No company"} · {quote.email}</span>
                <span>{quote.country || "No country"} · Qty {quote.quantity || "not set"}</span>
                <span>{quote.selected_colors || "No color selected"}</span>
                {quote.message && <p>{quote.message}</p>}
              </div>
              <select
                className="af-input quote-status-select"
                value={quote.status}
                onChange={(event) => void handleStatusChange(quote, event.target.value as QuoteStatus)}
              >
                {QUOTE_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
