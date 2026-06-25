import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, ChevronDown, ChevronUp, Truck } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { fetchProducts, loadProducts } from '../cms/products';
import QuoteModal from './QuoteModal';

// ─── SVG shapes – large display version ─────────────────────────
function FrameSVGLarge({ shape, color }: { shape: string; color: string }) {
  const s = color;
  if (shape === 'round') return (
    <svg viewBox="0 0 480 300" fill="none" className="pp-svg-art">
      <ellipse cx="130" cy="150" rx="110" ry="110" fill={s} fillOpacity="0.1" stroke={s} strokeWidth="3.5" strokeOpacity="0.85" />
      <ellipse cx="350" cy="150" rx="110" ry="110" fill={s} fillOpacity="0.1" stroke={s} strokeWidth="3.5" strokeOpacity="0.85" />
      <path d="M240 150 Q240 134 256 150" stroke={s} strokeWidth="2.5" strokeOpacity="0.65" fill="none" />
      <line x1="20" y1="104" x2="0" y2="62" stroke={s} strokeWidth="3" strokeOpacity="0.6" strokeLinecap="round" />
      <line x1="460" y1="104" x2="480" y2="62" stroke={s} strokeWidth="3" strokeOpacity="0.6" strokeLinecap="round" />
      <line x1="130" y1="110" x2="130" y2="190" stroke={s} strokeWidth="1" strokeOpacity="0.12" />
      <line x1="90" y1="150" x2="170" y2="150" stroke={s} strokeWidth="1" strokeOpacity="0.12" />
      <line x1="350" y1="110" x2="350" y2="190" stroke={s} strokeWidth="1" strokeOpacity="0.12" />
      <line x1="310" y1="150" x2="390" y2="150" stroke={s} strokeWidth="1" strokeOpacity="0.12" />
    </svg>
  );
  if (shape === 'square') return (
    <svg viewBox="0 0 480 300" fill="none" className="pp-svg-art">
      <rect x="24" y="66" width="188" height="162" rx="12" fill={s} fillOpacity="0.1" stroke={s} strokeWidth="3.5" strokeOpacity="0.85" />
      <rect x="268" y="66" width="188" height="162" rx="12" fill={s} fillOpacity="0.1" stroke={s} strokeWidth="3.5" strokeOpacity="0.85" />
      <line x1="212" y1="147" x2="268" y2="147" stroke={s} strokeWidth="3.5" strokeOpacity="0.7" />
      <line x1="24" y1="106" x2="0" y2="62" stroke={s} strokeWidth="3" strokeOpacity="0.6" strokeLinecap="round" />
      <line x1="456" y1="106" x2="480" y2="62" stroke={s} strokeWidth="3" strokeOpacity="0.6" strokeLinecap="round" />
    </svg>
  );
  if (shape === 'wayfarer') return (
    <svg viewBox="0 0 480 300" fill="none" className="pp-svg-art">
      <path d="M24 96 L196 76 L212 188 L28 212 Z" fill={s} fillOpacity="0.1" stroke={s} strokeWidth="3.5" strokeOpacity="0.85" />
      <path d="M284 76 L456 96 L452 212 L268 188 Z" fill={s} fillOpacity="0.1" stroke={s} strokeWidth="3.5" strokeOpacity="0.85" />
      <line x1="212" y1="138" x2="268" y2="138" stroke={s} strokeWidth="3.5" strokeOpacity="0.7" />
      <line x1="24" y1="96" x2="0" y2="62" stroke={s} strokeWidth="3" strokeOpacity="0.6" strokeLinecap="round" />
      <line x1="456" y1="96" x2="480" y2="62" stroke={s} strokeWidth="3" strokeOpacity="0.6" strokeLinecap="round" />
    </svg>
  );
  return (
    <svg viewBox="0 0 480 300" fill="none" className="pp-svg-art">
      <path d="M24 84 Q130 44 212 96 L196 216 Q130 240 24 192 Z" fill={s} fillOpacity="0.1" stroke={s} strokeWidth="3.5" strokeOpacity="0.85" />
      <path d="M456 84 Q350 44 268 96 L284 216 Q350 240 456 192 Z" fill={s} fillOpacity="0.1" stroke={s} strokeWidth="3.5" strokeOpacity="0.85" />
      <line x1="212" y1="144" x2="268" y2="144" stroke={s} strokeWidth="3.5" strokeOpacity="0.7" />
      <line x1="24" y1="84" x2="0" y2="48" stroke={s} strokeWidth="3" strokeOpacity="0.6" strokeLinecap="round" />
      <line x1="456" y1="84" x2="480" y2="48" stroke={s} strokeWidth="3" strokeOpacity="0.6" strokeLinecap="round" />
    </svg>
  );
}

// ─── SVG – small thumbnail version ──────────────────────────────
function FrameSVGThumb({ shape, color }: { shape: string; color: string }) {
  const s = color;
  if (shape === 'round') return (
    <svg viewBox="0 0 200 130" fill="none" width="100%" height="100%">
      <ellipse cx="54" cy="65" rx="46" ry="46" fill={s} fillOpacity="0.15" stroke={s} strokeWidth="2" strokeOpacity="0.85" />
      <ellipse cx="146" cy="65" rx="46" ry="46" fill={s} fillOpacity="0.15" stroke={s} strokeWidth="2" strokeOpacity="0.85" />
      <path d="M100 65 Q100 58 108 65" stroke={s} strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
      <line x1="8" y1="45" x2="0" y2="26" stroke={s} strokeWidth="1.5" strokeOpacity="0.55" />
      <line x1="192" y1="45" x2="200" y2="26" stroke={s} strokeWidth="1.5" strokeOpacity="0.55" />
    </svg>
  );
  if (shape === 'square') return (
    <svg viewBox="0 0 200 130" fill="none" width="100%" height="100%">
      <rect x="10" y="28" width="78" height="68" rx="6" fill={s} fillOpacity="0.15" stroke={s} strokeWidth="2" strokeOpacity="0.85" />
      <rect x="112" y="28" width="78" height="68" rx="6" fill={s} fillOpacity="0.15" stroke={s} strokeWidth="2" strokeOpacity="0.85" />
      <line x1="88" y1="62" x2="112" y2="62" stroke={s} strokeWidth="2" strokeOpacity="0.65" />
      <line x1="10" y1="44" x2="0" y2="26" stroke={s} strokeWidth="1.5" strokeOpacity="0.55" />
      <line x1="190" y1="44" x2="200" y2="26" stroke={s} strokeWidth="1.5" strokeOpacity="0.55" />
    </svg>
  );
  if (shape === 'wayfarer') return (
    <svg viewBox="0 0 200 130" fill="none" width="100%" height="100%">
      <path d="M10 40 L82 32 L88 78 L12 88 Z" fill={s} fillOpacity="0.15" stroke={s} strokeWidth="2" strokeOpacity="0.85" />
      <path d="M118 32 L190 40 L188 88 L112 78 Z" fill={s} fillOpacity="0.15" stroke={s} strokeWidth="2" strokeOpacity="0.85" />
      <line x1="88" y1="58" x2="112" y2="58" stroke={s} strokeWidth="2" strokeOpacity="0.65" />
      <line x1="10" y1="40" x2="0" y2="26" stroke={s} strokeWidth="1.5" strokeOpacity="0.55" />
      <line x1="190" y1="40" x2="200" y2="26" stroke={s} strokeWidth="1.5" strokeOpacity="0.55" />
    </svg>
  );
  return (
    <svg viewBox="0 0 200 130" fill="none" width="100%" height="100%">
      <path d="M10 35 Q54 18 88 40 L82 90 Q54 100 10 80 Z" fill={s} fillOpacity="0.15" stroke={s} strokeWidth="2" strokeOpacity="0.85" />
      <path d="M190 35 Q146 18 112 40 L118 90 Q146 100 190 80 Z" fill={s} fillOpacity="0.15" stroke={s} strokeWidth="2" strokeOpacity="0.85" />
      <line x1="88" y1="60" x2="112" y2="60" stroke={s} strokeWidth="2" strokeOpacity="0.65" />
      <line x1="10" y1="35" x2="0" y2="20" stroke={s} strokeWidth="1.5" strokeOpacity="0.55" />
      <line x1="190" y1="35" x2="200" y2="20" stroke={s} strokeWidth="1.5" strokeOpacity="0.55" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────
interface ProductPageProps {
  productId: string;
  onBack: () => void;
  isB2B: boolean;
  onOpenModal: () => void;
}

export default function ProductPage({ productId, onBack, isB2B, onOpenModal }: ProductPageProps) {
  const { lang } = useLang();
  const [products, setProducts] = useState(() => loadProducts());
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productLoadError, setProductLoadError] = useState('');
  const product = products.find(p => p.id === productId);

  const [activeView, setActiveView]   = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const [activeSize, setActiveSize]   = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteMode, setQuoteMode] = useState<'quote' | 'sample'>('quote');

  useEffect(() => {
    let mounted = true;

    fetchProducts()
      .then((liveProducts) => {
        if (!mounted) return;
        setProducts(liveProducts.length > 0 ? liveProducts : loadProducts());
        setProductLoadError('');
      })
      .catch(() => {
        if (!mounted) return;
        setProducts(loadProducts());
        setProductLoadError('Live product data is unavailable, so this page is showing the starter catalog.');
      })
      .finally(() => {
        if (mounted) setLoadingProducts(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveColor(0);
      setActiveView(0);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [productId]);

  if (!product && loadingProducts) {
    return (
      <div className="pp-not-found">
        <button className="pp-back-btn" onClick={onBack}>
          <ArrowLeft size={14} /> Back to collections
        </button>
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pp-not-found">
        <button className="pp-back-btn" onClick={onBack}>
          <ArrowLeft size={14} /> Back to collections
        </button>
        <p>Product not found.</p>
      </div>
    );
  }

  const name        = product.name[lang]        || product.name.en;
  const category    = product.category[lang]    || product.category.en;
  const description = product.description[lang] || product.description.en;
  const selColor    = product.colors[activeColor] ?? { label: '', hex: '#0D9DA8' };
  const colorImages = [selColor.image, selColor.sideImage].filter(Boolean) as string[];
  const hasImages   = colorImages.length > 0;
  const activeImage = colorImages[activeView] ?? colorImages[0];
  const displayColor = hasImages ? selColor.hex : (product.colors[activeView]?.hex ?? '#0D9DA8');

  const openProductEmail = (subject: string) => {
    const body = encodeURIComponent(
      [
        `Product: ${name}`,
        `Reference: ${product.ref}`,
        `Color: ${selColor.label || 'Not selected'}`,
        `Size: ${product.sizes[activeSize] || 'Not selected'}`,
        '',
        'Hello DiVision, I would like more wholesale information about this model.',
      ].join('\n'),
    );
    window.open(
      `mailto:division.eyewear@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`,
      '_self',
    );
  };

  const handleColorSelect = (index: number) => {
    const nextColor = product.colors[index];
    setActiveColor(index);
    setActiveView((currentView) => {
      if (currentView === 1 && nextColor?.sideImage) return nextColor.image ? 1 : 0;
      return 0;
    });
  };

  const handleMainCta = () => {
    if (isB2B) {
      openProductEmail(`Wholesale order inquiry: ${product.ref}`);
      return;
    }

    onOpenModal();
  };

  const handleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('division-wishlist') || '[]') as string[];
    const next = Array.from(new Set([...wishlist, product.id]));
    localStorage.setItem('division-wishlist', JSON.stringify(next));
    openProductEmail(`Wishlist inquiry: ${product.ref}`);
  };

  return (
    <div className="pp-wrap">
      {/* Breadcrumb */}
      <div className="pp-breadcrumb">
        <button className="pp-back-btn" onClick={onBack}>
          <ArrowLeft size={14} />
          Collections
        </button>
        <span className="pp-bread-sep">/</span>
        <span className="pp-bread-cur">{name}</span>
      </div>

      {productLoadError && <div className="catalog-state catalog-state-error">{productLoadError}</div>}

      <div className="pp-layout">
        {/* ── Thumbnail strip ───────────────────────────────── */}
        <div className="pp-thumbs">
          {hasImages
            ? colorImages.map((url, i) => (
                <button
                  key={i}
                  className={`pp-thumb ${activeView === i ? 'active' : ''}`}
                  onClick={() => setActiveView(i)}
                >
                  <img src={url} alt={`${name} ${selColor.label} view ${i + 1}`} loading="lazy" />
                </button>
              ))
            : product.colors.map((col, i) => (
                <button
                  key={i}
                  className={`pp-thumb ${activeView === i ? 'active' : ''}`}
                  onClick={() => { setActiveView(i); setActiveColor(i); }}
                  title={col.label}
                >
                  <FrameSVGThumb shape={product.shape} color={col.hex} />
                </button>
              ))}
        </div>

        {/* ── Main image area ────────────────────────────────── */}
        <div className="pp-main-img">
          <AnimatePresence mode="wait">
            {hasImages ? (
              <motion.img
                key={activeView}
                src={activeImage}
                alt={name}
                className="pp-img-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
              />
            ) : (
              <motion.div
                key={`${activeView}-${activeColor}`}
                className="pp-svg-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
              >
                <FrameSVGLarge shape={product.shape} color={displayColor} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Info panel ────────────────────────────────────── */}
        <div className="pp-info">
          {product.badge && (
            <span className="pp-badge">{product.badge}</span>
          )}
          <h1 className="pp-name">{name.toUpperCase()}</h1>
          <p className="pp-ref">{product.ref}</p>
          <p className="pp-cat">{category}</p>

          {/* Price */}
          <div className="pp-price-block">
            {isB2B ? (
              <>
                <span className="pp-price-tag">WHOLESALE PRICE</span>
                <span className="pp-price">{product.wholesalePrice}</span>
              </>
            ) : (
              <span className="pp-price">{product.price}</span>
            )}
          </div>

          <hr className="pp-rule" />

          {/* Color selector */}
          {product.colors.length > 0 && (
            <div className="pp-option">
              <div className="pp-option-hd">
                <span className="pp-option-label">COLOR:</span>
                <span className="pp-option-val">{selColor.label}</span>
              </div>
              <div className="pp-colors">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    className={`pp-color-swatch ${activeColor === i ? 'active' : ''}`}
                    style={{ background: c.hex }}
                    title={c.label}
                    aria-label={`Select ${c.label}`}
                    onClick={() => handleColorSelect(i)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          {product.sizes.length > 0 && (
            <div className="pp-option">
              <div className="pp-option-hd">
                <span className="pp-option-label">SIZE</span>
              </div>
              <div className="pp-size-wrap">
                <select
                  className="pp-size-sel"
                  value={product.sizes[activeSize]}
                  onChange={e => setActiveSize(product.sizes.indexOf(e.target.value))}
                >
                  {product.sizes.map(s => <option key={s}>{s}</option>)}
                </select>
                <ChevronDown size={13} className="pp-size-chevron" />
              </div>
            </div>
          )}

          <div className="pp-facts">
            <div><span>Shape</span><strong>{product.shape}</strong></div>
            <div><span>Material</span><strong>{product.material || 'To confirm'}</strong></div>
            <div><span>MOQ</span><strong>{product.minimumOrderQuantity ? `${product.minimumOrderQuantity} pcs` : 'To confirm'}</strong></div>
            <div><span>Lead time</span><strong>{product.productionLeadTime || 'To confirm'}</strong></div>
            <div><span>Samples</span><strong>{product.sampleAvailable ? 'Available' : 'To confirm'}</strong></div>
            <div><span>Private label</span><strong>{product.privateLabelAvailable ? 'Available' : 'To confirm'}</strong></div>
          </div>

          {/* CTAs */}
          <div className="pp-cta-group">
            <button
              className="pp-cta-main"
              onClick={onOpenModal}
            >
              CREATE ACCOUNT
            </button>
            <button
              className="pp-cta-wish"
              onClick={() => {
                setQuoteMode('sample');
                setQuoteOpen(true);
              }}
            >
              REQUEST A SAMPLE
            </button>
            <button
              className="pp-cta-wish"
              onClick={handleMainCta}
            >
              {isB2B ? 'ADD TO ORDER' : 'ACCOUNT APPROVAL'}
            </button>
            <button className="pp-cta-wish" onClick={handleWishlist}>
              <Heart size={14} /> ADD TO WISHLIST
            </button>
          </div>

          {/* Shipping */}
          <div className="pp-shipping">
            <div className="pp-ship-hd">
              <Truck size={14} />
              <span>WHOLESALE DELIVERY · ORDER SUPPORT AVAILABLE</span>
            </div>
            <p className="pp-ship-sub">Delivery timing is confirmed with each wholesale order.</p>
          </div>

          {/* Description */}
          {description && (
            <p className="pp-desc">{description}</p>
          )}

          {/* Details accordion */}
          <div className="pp-accordion">
            <button className="pp-accordion-hd" onClick={() => setDetailsOpen(v => !v)}>
              <span>DETAILS</span>
              {detailsOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
            <AnimatePresence initial={false}>
              {detailsOpen && (
                <motion.div
                  className="pp-accordion-bd"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  style={{ overflow: 'hidden' }}
                >
                  <dl className="pp-specs">
                    <dt>Reference</dt>       <dd>{product.ref}</dd>
                    <dt>Frame Shape</dt>     <dd style={{ textTransform: 'capitalize' }}>{product.shape}</dd>
                    <dt>Material</dt>        <dd>{product.material || 'Material to confirm'}</dd>
                    <dt>Category</dt>        <dd>{category}</dd>
                    <dt>Colours</dt>         <dd>{product.colors.map((color) => color.label).join(', ') || 'To confirm'}</dd>
                    <dt>Sizes</dt>           <dd>{product.sizes.join(', ') || 'To confirm'}</dd>
                    <dt>Minimum Order</dt>   <dd>{product.minimumOrderQuantity ? `${product.minimumOrderQuantity} pieces` : 'To confirm'}</dd>
                    <dt>Lead Time</dt>       <dd>{product.productionLeadTime || 'To confirm'}</dd>
                    <dt>Samples</dt>         <dd>{product.sampleAvailable ? 'Available' : 'To confirm'}</dd>
                    <dt>Private Label</dt>   <dd>{product.privateLabelAvailable ? 'Available' : 'To confirm'}</dd>
                    <dt>Origin</dt>          <dd>Made in Tunisia</dd>
                  </dl>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <QuoteModal
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        product={product}
        selectedColor={selColor.label}
        selectedSize={product.sizes[activeSize]}
        mode={quoteMode}
      />
    </div>
  );
}
