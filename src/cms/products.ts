import { supabase } from "../lib/supabase";

export interface ProductColor {
  label: string;
  hex: string;
  image?: string;
  sideImage?: string;
}

export type FilterTag = "optical" | "sunglasses" | "womens" | "mens";
export type FrameShape = "round" | "square" | "wayfarer" | "aviator";

export interface Product {
  dbId?: string;
  id: string;
  ref: string;
  shape: FrameShape;
  cardBg: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  price: string;
  wholesalePrice: string;
  filterTags: FilterTag[];
  badge: string | null;
  material?: string;
  minimumOrderQuantity?: number;
  productionLeadTime?: string;
  sampleAvailable?: boolean;
  privateLabelAvailable?: boolean;
  active?: boolean;
  name: Record<string, string>;
  category: Record<string, string>;
  description: Record<string, string>;
}

export interface QuoteRequest {
  id: string;
  product_id: string | null;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  country: string | null;
  quantity: number | null;
  selected_colors: string | null;
  custom_logo_required: boolean;
  packaging_requirements: string | null;
  target_delivery_date: string | null;
  message: string | null;
  status: "new" | "contacted" | "quoted" | "won" | "lost";
  created_at: string;
}

export type QuoteStatus = QuoteRequest["status"];

interface ProductRow {
  id: string;
  reference: string;
  slug: string;
  name_en: string;
  name_fr: string | null;
  name_ar: string | null;
  description_en: string | null;
  description_fr: string | null;
  description_ar: string | null;
  frame_shape: string | null;
  material: string | null;
  category: string;
  colors: ProductColor[] | null;
  sizes: string[] | null;
  main_image_url: string | null;
  additional_images: string[] | null;
  minimum_order_quantity: number | null;
  production_lead_time: string | null;
  sample_available: boolean | null;
  private_label_available: boolean | null;
  active: boolean | null;
}

export interface QuoteRequestInput {
  product_id?: string | null;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  quantity?: number | null;
  selected_colors?: string;
  custom_logo_required?: boolean;
  packaging_requirements?: string;
  target_delivery_date?: string | null;
  message?: string;
}

export const PRODUCTS_KEY = "division-products-v6";
export const PRODUCTS_CHANGED_EVENT = "division-products-changed";

function product(
  id: string,
  ref: string,
  shape: FrameShape,
  cardBg: string,
  tags: FilterTag[],
  colors: ProductColor[],
  description: string,
): Product {
  const displayId = id.split("-")[0];
  const name = displayId.charAt(0).toUpperCase() + displayId.slice(1);
  return {
    id,
    ref,
    shape,
    cardBg,
    images: colors.flatMap((color) =>
      [color.image, color.sideImage].filter(Boolean) as string[],
    ),
    colors,
    sizes: ["48 MM", "50 MM", "52 MM"],
    price: "Contact for retail",
    wholesalePrice: "B2B price on request",
    filterTags: tags,
    badge: null,
    name: { en: name, fr: name, ar: name },
    category: tags.includes("sunglasses")
      ? { en: "Sunglasses", fr: "Lunettes solaires", ar: "Sunglasses" }
      : {
          en: tags.includes("mens") ? "Men's Optical Frame" : "Women's Optical Frame",
          fr: tags.includes("mens") ? "Monture optique homme" : "Monture optique femme",
          ar: tags.includes("mens") ? "Men's Optical Frame" : "Women's Optical Frame",
        },
    description: { en: description, fr: description, ar: description },
  };
}

export const defaultProducts: Product[] = [
  product(
    "anna",
    "DV-OPT-ANNA",
    "wayfarer",
    "#f5f2ee",
    ["optical", "womens"],
    [
      {
        label: "Black",
        hex: "#111111",
        image: "/products/anna-black-front.png",
        sideImage: "/products/anna-black-side.png",
      },
      {
        label: "Burgundy",
        hex: "#7d2230",
        image: "/products/anna-burgundy-front-stage.png",
        sideImage: "/products/anna-burgundy-side.png",
      },
      {
        label: "Havana",
        hex: "#6b351d",
        image: "/products/anna-havana-front-stage.png",
        sideImage: "/products/anna-havana-side.png",
      },
    ],
    "A soft cat-eye optical frame with a polished acetate finish and a confident everyday profile.",
  ),
  product(
    "emma",
    "DV-OPT-EMMA",
    "square",
    "#eef5f7",
    ["optical", "womens"],
    [
      {
        label: "Black",
        hex: "#111111",
        image: "/products/emma-black-front.png",
        sideImage: "/products/emma-black-side.png",
      },
      {
        label: "Blue Gradient",
        hex: "#1d5f8f",
        image: "/products/emma-blue-front.png",
        sideImage: "/products/emma-blue-side.png",
      },
      {
        label: "Brown",
        hex: "#6c5144",
        image: "/products/emma-brown-front.png",
        sideImage: "/products/emma-brown-side.png",
      },
      {
        label: "Crystal",
        hex: "#e8ded0",
        image: "/products/emma-crystal-front.png",
        sideImage: "/products/emma-crystal-side.png",
      },
    ],
    "A geometric optical frame with strong edges, transparent colorways, and a modern wholesale-ready look.",
  ),
  product(
    "flora",
    "DV-OPT-FLORA",
    "round",
    "#f7f0f2",
    ["optical", "womens"],
    [
      {
        label: "Brown",
        hex: "#7b4b35",
        image: "/products/flora-brown-front-stage.png",
        sideImage: "/products/flora-brown-side.png",
      },
      {
        label: "Pink",
        hex: "#c98091",
        image: "/products/flora-pink-front-stage.png",
        sideImage: "/products/flora-pink-side.png",
      },
      {
        label: "Purple",
        hex: "#4a164f",
        image: "/products/flora-purple-front-stage.png",
        sideImage: "/products/flora-purple-side.png",
      },
      {
        label: "White",
        hex: "#d8cdbc",
        image: "/products/flora-white-front-stage.png",
        sideImage: "/products/flora-white-side.png",
      },
    ],
    "A rounded statement frame with soft fashion colors and a lightweight optical silhouette.",
  ),
  product(
    "grace",
    "DV-OPT-GRACE",
    "wayfarer",
    "#f5f1ea",
    ["optical", "womens"],
    [
      {
        label: "Crystal",
        hex: "#eadfce",
        image: "/products/grace-crystal-front-stage.png",
        sideImage: "/products/grace-crystal-side.png",
      },
      {
        label: "Havana",
        hex: "#6e351a",
        image: "/products/grace-havana-front-stage.png",
        sideImage: "/products/grace-havana-side.png",
      },
      {
        label: "White",
        hex: "#d2c8bb",
        image: "/products/grace-white-front-stage.png",
        sideImage: "/products/grace-white-side.png",
      },
    ],
    "A refined optical frame with elegant temples, soft transparent tones, and polished feminine styling.",
  ),
  product(
    "jean",
    "DV-OPT-JEAN",
    "square",
    "#eef3f4",
    ["optical", "mens"],
    [
      {
        label: "Black",
        hex: "#101418",
        image: "/products/jean-black-front.png",
        sideImage: "/products/jean-black-side.png",
      },
      {
        label: "Blue Gradient",
        hex: "#1d5f8f",
        image: "/products/jean-blue-front.png",
        sideImage: "/products/jean-blue-side.png",
      },
      {
        label: "Brown",
        hex: "#6f5041",
        image: "/products/jean-brown-front.png",
        sideImage: "/products/jean-brown-side.png",
      },
      {
        label: "Crystal",
        hex: "#e8ded0",
        image: "/products/jean-crystal-front.png",
        sideImage: "/products/jean-crystal-side.png",
      },
    ],
    "A structured optical frame with a clean bridge, angular lenses, and a professional everyday fit.",
  ),
  product(
    "june",
    "DV-OPT-JUNE",
    "wayfarer",
    "#f4f1f2",
    ["optical", "womens"],
    [
      {
        label: "Black",
        hex: "#111111",
        image: "/products/june-black-front.png",
        sideImage: "/products/june-black-side.png",
      },
      {
        label: "Crystal",
        hex: "#eadfce",
        image: "/products/june-crystal-front.png",
        sideImage: "/products/june-crystal-side.png",
      },
      {
        label: "Pink",
        hex: "#d08798",
        image: "/products/june-pink-front.png",
        sideImage: "/products/june-pink-side.png",
      },
    ],
    "A lifted optical frame with a soft cat-eye influence and clear retail appeal.",
  ),
  product(
    "louisse",
    "DV-OPT-LOUISSE",
    "round",
    "#f7f1ef",
    ["optical", "womens"],
    [
      {
        label: "Crystal",
        hex: "#eadfce",
        image: "/products/louisse-crystal-front.png",
        sideImage: "/products/louisse-crystal-side.png",
      },
      {
        label: "Red",
        hex: "#a3122a",
        image: "/products/louisse-red-front.png",
        sideImage: "/products/louisse-red-side.png",
      },
    ],
    "A narrow rounded optical frame with expressive colors and a light, stylish profile.",
  ),
  product(
    "sonia",
    "DV-OPT-SONIA",
    "round",
    "#f5f0ea",
    ["optical", "womens"],
    [
      {
        label: "Crystal",
        hex: "#eadfce",
        image: "/products/sonia-crystal-front.png",
        sideImage: "/products/sonia-crystal-side.png",
      },
    ],
    "A clean oval optical frame with transparent acetate and a delicate boutique feel.",
  ),
  product(
    "bruce",
    "DV-SUN-BRUCE",
    "wayfarer",
    "#f2f1ee",
    ["sunglasses", "mens"],
    [
      { label: "Black", hex: "#111111", image: "/products/sun-bruce-black-front.png", sideImage: "/products/sun-bruce-black-side.png" },
      { label: "Black 2", hex: "#1c1c1c", image: "/products/sun-bruce-black-2-front.png", sideImage: "/products/sun-bruce-black-2-side.png" },
      { label: "Blue", hex: "#1f4f80", image: "/products/sun-bruce-blue-front.png", sideImage: "/products/sun-bruce-blue-side.png" },
      { label: "Crystal", hex: "#ddd7cc", image: "/products/sun-bruce-crystal-front.png", sideImage: "/products/sun-bruce-crystal-side.png" },
    ],
    "A confident sunglass frame with polished colorways and a strong everyday profile.",
  ),
  product(
    "bruno",
    "DV-SUN-BRUNO",
    "wayfarer",
    "#f4f0eb",
    ["sunglasses", "mens"],
    [
      { label: "Black", hex: "#111111", image: "/products/sun-bruno-black-front.png", sideImage: "/products/sun-bruno-black-side.png" },
      { label: "Havana", hex: "#6b351d", image: "/products/sun-bruno-havana-front.png", sideImage: "/products/sun-bruno-havana-side.png" },
    ],
    "A classic sunglass silhouette with clean lines and wholesale-ready finishes.",
  ),
  product(
    "clark",
    "DV-SUN-CLARK",
    "square",
    "#eef3f4",
    ["sunglasses", "mens"],
    [
      { label: "Black", hex: "#111111", image: "/products/sun-clark-black-front.png", sideImage: "/products/sun-clark-black-side.png" },
      { label: "Blue", hex: "#264f7c", image: "/products/sun-clark-blue-front.png", sideImage: "/products/sun-clark-blue-side.png" },
      { label: "Gun", hex: "#55565a", image: "/products/sun-clark-gun-front.png", sideImage: "/products/sun-clark-gun-side.png" },
    ],
    "A structured sunglass model with a modern square lens and compact bridge.",
  ),
  product(
    "elena",
    "DV-SUN-ELENA",
    "wayfarer",
    "#f5f1ea",
    ["sunglasses", "womens"],
    [
      { label: "Black", hex: "#111111", image: "/products/sun-elena-black-front.png", sideImage: "/products/sun-elena-black-side.png" },
      { label: "Havana", hex: "#6b351d", image: "/products/sun-elena-havana-front.png", sideImage: "/products/sun-elena-havana-side.png" },
    ],
    "A polished sunglass frame with a boutique look and easy retail appeal.",
  ),
  product(
    "ellaoui",
    "DV-SUN-ELLAOUI",
    "round",
    "#f6f0f1",
    ["sunglasses", "womens"],
    [
      { label: "Havana", hex: "#6b351d", image: "/products/sun-ellaoui-havana-front.png", sideImage: "/products/sun-ellaoui-havana-side.png" },
      { label: "Pink", hex: "#d990a1", image: "/products/sun-ellaoui-pink-front.png", sideImage: "/products/sun-ellaoui-pink-side.png" },
    ],
    "A rounded fashion sunglass with warm acetate tones and a soft statement profile.",
  ),
  product(
    "emily",
    "DV-SUN-EMILY",
    "square",
    "#eef4f6",
    ["sunglasses", "womens"],
    [
      { label: "Blue", hex: "#244f86", image: "/products/sun-emily-blue-front.png", sideImage: "/products/sun-emily-blue-side.png" },
      { label: "Crystal", hex: "#ddd7cc", image: "/products/sun-emily-crystal-front.png", sideImage: "/products/sun-emily-crystal-side.png" },
      { label: "Grey", hex: "#777777", image: "/products/sun-emily-grey-front.png", sideImage: "/products/sun-emily-grey-side.png" },
    ],
    "A contemporary sunglass frame with light colorways and a clean lens shape.",
  ),
  product(
    "ibiza",
    "DV-SUN-IBIZA",
    "wayfarer",
    "#f5f1ea",
    ["sunglasses", "womens"],
    [
      { label: "Black", hex: "#111111", image: "/products/sun-ibiza-black-front.png", sideImage: "/products/sun-ibiza-black-side.png" },
      { label: "Black 2", hex: "#1c1c1c", image: "/products/sun-ibiza-black-2-front.png", sideImage: "/products/sun-ibiza-black-2-side.png" },
      { label: "Crystal", hex: "#ddd7cc", image: "/products/sun-ibiza-crystal-front.png", sideImage: "/products/sun-ibiza-crystal-side.png" },
      { label: "Crystal 2", hex: "#eee6da", image: "/products/sun-ibiza-crystal-2-front.png", sideImage: "/products/sun-ibiza-crystal-2-side.png" },
      { label: "Pink", hex: "#d990a1", image: "/products/sun-ibiza-pink-front.png", sideImage: "/products/sun-ibiza-pink-side.png" },
    ],
    "A bold sunglass model with multiple transparent and dark color options.",
  ),
  product(
    "karma",
    "DV-SUN-KARMA",
    "aviator",
    "#f6f2ec",
    ["sunglasses", "womens"],
    [
      { label: "Black", hex: "#111111", image: "/products/sun-karma-black-front.png", sideImage: "/products/sun-karma-black-side.png" },
      { label: "Gold", hex: "#c49a44", image: "/products/sun-karma-gold-front.png", sideImage: "/products/sun-karma-gold-side.png" },
      { label: "Havana", hex: "#6b351d", image: "/products/sun-karma-havana-front.png", sideImage: "/products/sun-karma-havana-side.png" },
    ],
    "A refined sunglass frame with warm metallic and acetate-inspired colorways.",
  ),
  product(
    "natasha",
    "DV-SUN-NATASHA",
    "square",
    "#eef3f6",
    ["sunglasses", "womens"],
    [
      { label: "Black", hex: "#111111", image: "/products/sun-natasha-black-front.png", sideImage: "/products/sun-natasha-black-side.png" },
      { label: "Blue", hex: "#1f4f80", image: "/products/sun-natasha-blue-front.png", sideImage: "/products/sun-natasha-blue-side.png" },
      { label: "Crystal", hex: "#ddd7cc", image: "/products/sun-natasha-crystal-front.png", sideImage: "/products/sun-natasha-crystal-side.png" },
      { label: "Havana", hex: "#6b351d", image: "/products/sun-natasha-havana-front.png", sideImage: "/products/sun-natasha-havana-side.png" },
    ],
    "A versatile sunglass frame with a balanced shape and broad color range.",
  ),
  product(
    "sicilia",
    "DV-SUN-SICILIA",
    "wayfarer",
    "#f6f1ef",
    ["sunglasses", "womens"],
    [
      { label: "Black", hex: "#111111", image: "/products/sun-sicilia-black-front.png", sideImage: "/products/sun-sicilia-black-side.png" },
      { label: "Crystal", hex: "#ddd7cc", image: "/products/sun-sicilia-crystal-front.png", sideImage: "/products/sun-sicilia-crystal-side.png" },
      { label: "Pink", hex: "#d990a1", image: "/products/sun-sicilia-pink-front.png", sideImage: "/products/sun-sicilia-pink-side.png" },
      { label: "White", hex: "#e5dfd4", image: "/products/sun-sicilia-white-front.png", sideImage: "/products/sun-sicilia-white-side.png" },
    ],
    "A fashion-forward sunglass with soft colorways and a polished feminine profile.",
  ),
  product(
    "sonia-sun",
    "DV-SUN-SONIA",
    "round",
    "#f5f0ea",
    ["sunglasses", "womens"],
    [
      { label: "Crystal", hex: "#ddd7cc", image: "/products/sun-sonia-crystal-front.png", sideImage: "/products/sun-sonia-crystal-side.png" },
    ],
    "A rounded sunglass model with expressive colors and a clean boutique finish.",
  ),
];

export function loadProducts(): Product[] {
  return JSON.parse(JSON.stringify(defaultProducts));
}

function normalizeShape(shape: string | null): FrameShape {
  if (shape === "round" || shape === "square" || shape === "wayfarer" || shape === "aviator") {
    return shape;
  }
  return "wayfarer";
}

function categoryLabel(category: string, product: ProductRow): Record<string, string> {
  if (category === "sunglasses") {
    return { en: "Sunglasses", fr: "Lunettes solaires", ar: "Sunglasses" };
  }

  const isMens = product.slug.includes("jean") || product.reference.includes("-MEN-");
  return {
    en: isMens ? "Men's Optical Frame" : "Women's Optical Frame",
    fr: isMens ? "Monture optique homme" : "Monture optique femme",
    ar: isMens ? "Men's Optical Frame" : "Women's Optical Frame",
  };
}

function tagsFromRow(product: ProductRow): FilterTag[] {
  const tags: FilterTag[] = product.category === "sunglasses" ? ["sunglasses"] : ["optical"];
  if (product.slug.includes("jean") || product.reference.includes("-MEN-")) {
    tags.push("mens");
  } else {
    tags.push("womens");
  }
  return tags;
}

function rowToProduct(row: ProductRow): Product {
  const colors = Array.isArray(row.colors) ? row.colors : [];
  const images = [
    row.main_image_url,
    ...(Array.isArray(row.additional_images) ? row.additional_images : []),
    ...colors.flatMap((color) => [color.image, color.sideImage]),
  ].filter(Boolean) as string[];

  return {
    dbId: row.id,
    id: row.slug,
    ref: row.reference,
    shape: normalizeShape(row.frame_shape),
    cardBg: "#f5f2ee",
    images: Array.from(new Set(images)),
    colors,
    sizes: Array.isArray(row.sizes) && row.sizes.length > 0 ? row.sizes : ["48 MM", "50 MM", "52 MM"],
    price: "Contact for retail",
    wholesalePrice: "B2B price on request",
    filterTags: tagsFromRow(row),
    badge: null,
    material: row.material ?? "Premium acetate",
    minimumOrderQuantity: row.minimum_order_quantity ?? 1,
    productionLeadTime: row.production_lead_time ?? "",
    sampleAvailable: Boolean(row.sample_available),
    privateLabelAvailable: Boolean(row.private_label_available),
    active: row.active ?? true,
    name: {
      en: row.name_en,
      fr: row.name_fr || row.name_en,
      ar: row.name_ar || row.name_en,
    },
    category: categoryLabel(row.category, row),
    description: {
      en: row.description_en || "",
      fr: row.description_fr || row.description_en || "",
      ar: row.description_ar || row.description_en || "",
    },
  };
}

function productToPayload(product: Product) {
  const slug = (product.id || product.name.en || "product")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const category = product.filterTags.includes("sunglasses") ? "sunglasses" : "optical";
  const images = [
    ...product.colors.flatMap((color) => [color.image, color.sideImage]),
    ...product.images,
  ].filter(Boolean) as string[];

  return {
    reference: product.ref.trim(),
    slug,
    name_en: product.name.en.trim(),
    name_fr: product.name.fr || product.name.en,
    name_ar: product.name.ar || product.name.en,
    description_en: product.description.en || "",
    description_fr: product.description.fr || product.description.en || "",
    description_ar: product.description.ar || product.description.en || "",
    frame_shape: product.shape,
    material: product.material || "Premium acetate",
    category,
    colors: product.colors,
    sizes: product.sizes,
    main_image_url: product.colors.find((color) => color.image)?.image || product.images[0] || null,
    additional_images: Array.from(new Set(images)).filter((url) => url !== product.images[0]),
    minimum_order_quantity: product.minimumOrderQuantity ?? 1,
    production_lead_time: product.productionLeadTime || "2-4 weeks",
    sample_available: product.sampleAvailable ?? true,
    private_label_available: product.privateLabelAvailable ?? true,
    active: product.active ?? true,
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data as ProductRow[]).map(rowToProduct);
}

export async function fetchAdminProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data as ProductRow[]).map(rowToProduct);
}

export async function saveProduct(product: Product): Promise<Product> {
  const payload = productToPayload(product);
  const query = product.dbId
    ? supabase.from("products").update(payload).eq("id", product.dbId).select("*").single()
    : supabase.from("products").insert(payload).select("*").single();
  const { data, error } = await query;

  if (error) throw error;
  return rowToProduct(data as ProductRow);
}

export async function deleteProduct(product: Product): Promise<void> {
  if (!product.dbId) {
    throw new Error("This product has not been saved to Supabase yet.");
  }

  const { error } = await supabase.from("products").delete().eq("id", product.dbId);
  if (error) throw error;
}

export async function uploadProductImage(file: File): Promise<string> {
  const extension = file.name.split(".").pop() || "jpg";
  const safeName = file.name
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const path = `${Date.now()}-${safeName}.${extension}`;
  const { error } = await supabase.storage.from("product-images").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw error;
  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return data.publicUrl;
}

export async function submitQuoteRequest(input: QuoteRequestInput): Promise<void> {
  const { error } = await supabase.from("quote_requests").insert({
    product_id: input.product_id || null,
    name: input.name,
    company: input.company || null,
    email: input.email,
    phone: input.phone || null,
    country: input.country || null,
    quantity: input.quantity ?? null,
    selected_colors: input.selected_colors || null,
    custom_logo_required: input.custom_logo_required ?? false,
    packaging_requirements: input.packaging_requirements || null,
    target_delivery_date: input.target_delivery_date || null,
    message: input.message || null,
  });

  if (error) throw error;
}

export async function fetchQuoteRequests(): Promise<QuoteRequest[]> {
  const { data, error } = await supabase
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as QuoteRequest[];
}

export async function updateQuoteStatus(id: string, status: QuoteStatus): Promise<void> {
  const { error } = await supabase.from("quote_requests").update({ status }).eq("id", id);
  if (error) throw error;
}

export function saveProducts(): void {
  window.dispatchEvent(new Event(PRODUCTS_CHANGED_EVENT));
}

export function resetProducts(): Product[] {
  window.dispatchEvent(new Event(PRODUCTS_CHANGED_EVENT));
  return JSON.parse(JSON.stringify(defaultProducts));
}

export function emptyProduct(): Product {
  return {
    id: "",
    ref: "",
    shape: "round",
    cardBg: "#e8f4f5",
    images: [],
    colors: [{ label: "Default", hex: "#0D9DA8" }],
    sizes: ["49 MM"],
    price: "0.00 TND",
    wholesalePrice: "0.00 TND",
    filterTags: ["optical"],
    badge: null,
    material: "Premium acetate",
    minimumOrderQuantity: 12,
    productionLeadTime: "2-4 weeks",
    sampleAvailable: true,
    privateLabelAvailable: true,
    active: true,
    name: { en: "", fr: "", ar: "" },
    category: { en: "", fr: "", ar: "" },
    description: { en: "", fr: "", ar: "" },
  };
}
