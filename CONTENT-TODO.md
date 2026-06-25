# Content To Confirm Before Launch

This file lists content that still needs manual confirmation. These values should not be treated as final business facts until you replace or approve them.

## Contact Details

- `src/cms/content.ts` / `meta.phone`: `+216 12 345 678` appears in English, French, and Arabic content. Replace with the confirmed phone or WhatsApp number.
- `src/components/InfoPages.tsx` / Contact page: `Phone / WhatsApp: needs your confirmed number`.
- `src/components/InfoPages.tsx` / Contact page: `Company location: Tunisia. Full address needs confirmation.`
- `src/components/InfoPages.tsx` / Contact page: `Business hours have not been supplied yet.`

## Arabic Content Still Contains Old Unsupported Claims

- `src/cms/content.ts` / Arabic hero eyebrow: says the company was founded in `2019`. Confirm or replace with production since `2022`.
- `src/cms/content.ts` / Arabic hero stats: `+200 frame styles`, `+12 export markets`, and `+5K retail partners` are unsupported. Replace or remove.
- `src/cms/content.ts` / Arabic about copy: mentions exports to Europe, the Middle East, and Africa. Confirm before launch.
- `src/cms/content.ts` / Arabic footer description: mentions supplying regions since `2019`. Confirm or replace.

## Legacy B2B Portal Content

- `src/cms/content.ts` / modal copy: says applications are reviewed within `48 hours`. Confirm this response time before launch.

Note: public navigation now sends buyers to the working quote form, not the legacy B2B modal.

## Legal And Policy Links

- `src/cms/content.ts` / footer legal links: `Privacy Policy`, `Terms`, and `Cookie Settings` currently open email links. Provide real legal pages or approved text before launch.
- `src/cms/content.ts` / footer support: `Returns` appears as a support item. Confirm whether returns information should be public and what the policy is.

## Product And Manufacturing Details

- `src/components/InfoPages.tsx` / Manufacturing page: factory certifications, production capacity, exact quality-control standards, export countries, and factory capabilities are intentionally not stated. Supply confirmed facts if you want them displayed.
- `src/components/InfoPages.tsx` / Private-label page: logo methods, branding limitations, packaging specifications, and private-label minimums still need confirmation.
- `src/components/InfoPages.tsx` / FAQ page: shipping methods, export countries, packaging policy, and exact quotation response process still need confirmation.
- `supabase/seed.sql` / seeded products: minimum order quantity is currently `12` and production lead time is `2-4 weeks` for all seeded products. Confirm or edit per product in the admin dashboard.

## Seasonal Labels

- `src/components/Navbar.tsx` / collections dropdown footer: `New 2025` is a seasonal label. Confirm whether it should remain current.
- `src/cms/content.ts` / old collection samples: `New 2025` appears in sample CMS data. This does not control Supabase products but should be cleaned if you keep editing CMS content.
