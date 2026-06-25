import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { fetchProducts, loadProducts } from "../cms/products";

function EyewearSVG({ shape }: { shape: string }) {
  if (shape === "round")
    return (
      <svg viewBox="0 0 200 130" fill="none" className="product-svg">
        <ellipse
          cx="54"
          cy="65"
          rx="46"
          ry="46"
          stroke="#0D9DA8"
          strokeWidth="2.5"
          strokeOpacity="0.7"
        />
        <ellipse
          cx="146"
          cy="65"
          rx="46"
          ry="46"
          stroke="#0D9DA8"
          strokeWidth="2.5"
          strokeOpacity="0.7"
        />
        <path
          d="M100 65 Q100 58 108 65"
          stroke="#0D9DA8"
          strokeWidth="2"
          strokeOpacity="0.5"
          fill="none"
        />
        <line
          x1="8"
          y1="45"
          x2="0"
          y2="26"
          stroke="#0D9DA8"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
        <line
          x1="192"
          y1="45"
          x2="200"
          y2="26"
          stroke="#0D9DA8"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
      </svg>
    );
  if (shape === "square")
    return (
      <svg viewBox="0 0 200 130" fill="none" className="product-svg">
        <rect
          x="10"
          y="28"
          width="78"
          height="68"
          rx="6"
          stroke="#0D9DA8"
          strokeWidth="2.5"
          strokeOpacity="0.7"
        />
        <rect
          x="112"
          y="28"
          width="78"
          height="68"
          rx="6"
          stroke="#0D9DA8"
          strokeWidth="2.5"
          strokeOpacity="0.7"
        />
        <line
          x1="88"
          y1="62"
          x2="112"
          y2="62"
          stroke="#0D9DA8"
          strokeWidth="2.5"
          strokeOpacity="0.5"
        />
        <line
          x1="10"
          y1="44"
          x2="0"
          y2="26"
          stroke="#0D9DA8"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
        <line
          x1="190"
          y1="44"
          x2="200"
          y2="26"
          stroke="#0D9DA8"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
      </svg>
    );
  if (shape === "wayfarer")
    return (
      <svg viewBox="0 0 200 130" fill="none" className="product-svg">
        <path
          d="M10 40 L82 32 L88 78 L12 88 Z"
          stroke="#0D9DA8"
          strokeWidth="2.5"
          strokeOpacity="0.7"
        />
        <path
          d="M118 32 L190 40 L188 88 L112 78 Z"
          stroke="#0D9DA8"
          strokeWidth="2.5"
          strokeOpacity="0.7"
        />
        <line
          x1="88"
          y1="58"
          x2="112"
          y2="58"
          stroke="#0D9DA8"
          strokeWidth="2.5"
          strokeOpacity="0.5"
        />
        <line
          x1="10"
          y1="40"
          x2="0"
          y2="26"
          stroke="#0D9DA8"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
        <line
          x1="190"
          y1="40"
          x2="200"
          y2="26"
          stroke="#0D9DA8"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
      </svg>
    );
  // aviator
  return (
    <svg viewBox="0 0 200 130" fill="none" className="product-svg">
      <path
        d="M10 35 Q54 18 88 40 L82 90 Q54 100 10 80 Z"
        stroke="#0D9DA8"
        strokeWidth="2.5"
        strokeOpacity="0.7"
      />
      <path
        d="M190 35 Q146 18 112 40 L118 90 Q146 100 190 80 Z"
        stroke="#0D9DA8"
        strokeWidth="2.5"
        strokeOpacity="0.7"
      />
      <line
        x1="88"
        y1="60"
        x2="112"
        y2="60"
        stroke="#0D9DA8"
        strokeWidth="2.5"
        strokeOpacity="0.5"
      />
      <line
        x1="10"
        y1="35"
        x2="0"
        y2="20"
        stroke="#0D9DA8"
        strokeWidth="2"
        strokeOpacity="0.5"
      />
      <line
        x1="190"
        y1="35"
        x2="200"
        y2="20"
        stroke="#0D9DA8"
        strokeWidth="2"
        strokeOpacity="0.5"
      />
    </svg>
  );
}

interface CollectionsProps {
  onOpenModal: () => void;
  isB2B: boolean;
  onViewProduct?: (id: string) => void;
  onOpenQuote?: () => void;
}

export default function Collections({ onOpenModal, isB2B, onViewProduct, onOpenQuote }: CollectionsProps) {
  const { t, lang } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeFilter, setActiveFilter] = useState(0);
  const [search, setSearch] = useState("");
  const [shapeFilter, setShapeFilter] = useState("");
  const [materialFilter, setMaterialFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const [catalog, setCatalog] = useState(() => loadProducts());
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let mounted = true;

    fetchProducts()
      .then((products) => {
        if (!mounted) return;
        setCatalog(products.length > 0 ? products : loadProducts());
        setLoadError("");
      })
      .catch(() => {
        if (!mounted) return;
        setCatalog(loadProducts());
        setLoadError("We could not load the live catalog. Showing the starter catalog for now.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const products = catalog.map(p => ({
    ...p,
    name: p.name[lang] || p.name.en,
    category: p.category[lang] || p.category.en,
  }));

  const shapes = Array.from(new Set(catalog.map((product) => product.shape).filter(Boolean)));
  const materials = Array.from(new Set(catalog.map((product) => product.material).filter(Boolean))) as string[];
  const colors = Array.from(new Set(catalog.flatMap((product) => product.colors.map((color) => color.label)).filter(Boolean)));

  const filtered = products.filter(p => {
    const baseMatch =
      activeFilter === 0 ||
      (activeFilter === 1 && p.filterTags.includes('optical')) ||
      (activeFilter === 2 && p.filterTags.includes('sunglasses')) ||
      (activeFilter === 3 && p.filterTags.includes('womens')) ||
      (activeFilter === 4 && p.filterTags.includes('mens'));
    const query = search.trim().toLowerCase();
    const searchMatch =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.ref.toLowerCase().includes(query) ||
      p.id.toLowerCase().includes(query);
    const shapeMatch = !shapeFilter || p.shape === shapeFilter;
    const materialMatch = !materialFilter || p.material === materialFilter;
    const colorMatch = !colorFilter || p.colors.some((color) => color.label === colorFilter);
    return baseMatch && searchMatch && shapeMatch && materialMatch && colorMatch;
  });

  return (
    <section id="collections" className="collections" ref={ref}>
      <div className="collections-header">
        <div>
          <div className="section-eyebrow">{t.collections.eyebrow}</div>
          <h2 className="section-title">
            {t.collections.title}
            <em>{t.collections.titleAccent}</em>
          </h2>
        </div>
        <button
          className="btn-ghost-dark"
          onClick={onOpenQuote}
        >
          Create Account <ArrowRight size={14} />
        </button>
      </div>

      {/* Filter bar */}
      <div className="filter-bar">
        {t.collections.filters.map((f, i) => (
          <button
            key={f}
            className={`filter-btn ${activeFilter === i ? "active" : ""}`}
            onClick={() => setActiveFilter(i)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="catalog-tools">
        <label className="catalog-search">
          <span>Search</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Name, reference, or slug"
          />
        </label>
        <label>
          <span>Shape</span>
          <select value={shapeFilter} onChange={(event) => setShapeFilter(event.target.value)}>
            <option value="">All shapes</option>
            {shapes.map((shape) => <option key={shape} value={shape}>{shape}</option>)}
          </select>
        </label>
        <label>
          <span>Material</span>
          <select value={materialFilter} onChange={(event) => setMaterialFilter(event.target.value)}>
            <option value="">All materials</option>
            {materials.map((material) => <option key={material} value={material}>{material}</option>)}
          </select>
        </label>
        <label>
          <span>Colour</span>
          <select value={colorFilter} onChange={(event) => setColorFilter(event.target.value)}>
            <option value="">All colours</option>
            {colors.map((color) => <option key={color} value={color}>{color}</option>)}
          </select>
        </label>
      </div>

      <p className="col-count">
        {t.collections.showing.replace("{n}", String(filtered.length))}
      </p>

      {loading && <div className="catalog-state">Loading products...</div>}
      {loadError && <div className="catalog-state catalog-state-error">{loadError}</div>}
      {!loading && filtered.length === 0 && (
        <div className="catalog-state">No active products are available yet.</div>
      )}

      <div className="products-grid">
        {filtered.map((p, i) => {
          const cardImage =
            p.colors.find((color) => color.image)?.image ??
            p.colors.find((color) => color.sideImage)?.sideImage ??
            p.images[0];

          return (
            <motion.div
              key={p.id}
              className={`product-card ${hovered === p.id ? "hovered" : ""} ${onViewProduct ? "clickable" : ""}`}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onViewProduct?.(p.id)}
            >
              <div className="product-img-wrap">
                {p.badge && <span className="product-badge">{p.badge}</span>}
                {cardImage ? (
                  <img className="product-photo" src={cardImage} alt={p.name} loading="lazy" />
                ) : (
                  <EyewearSVG shape={p.shape} />
                )}
                <div className="product-img-overlay" />
              </div>
              <div className="product-info">
                <div className="product-ref">{p.ref}</div>
                <div className="product-name">{p.name}</div>
                <div className="product-cat">{p.category}</div>
                {isB2B ? (
                  <div className="price-visible show">
                    <span className="price-amount">{p.wholesalePrice}</span>
                    <span className="price-badge-b2b">
                      {t.collections.b2bBadge}
                    </span>
                  </div>
                ) : (
                  <div className="price-locked">
                    <Lock size={12} />
                    <span>
                      <button onClick={e => { e.stopPropagation(); onOpenModal(); }} className="price-link">
                        {t.collections.priceLockCta}
                      </button>{" "}
                      {t.collections.priceLockText}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
