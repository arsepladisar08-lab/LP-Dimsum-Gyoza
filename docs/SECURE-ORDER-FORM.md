# Secure Order Form — Gyozen

## Address flow
The order form uses the hierarchical Indonesia region reference at `https://www.emsifa.com/api-wilayah-indonesia/v2`: province → regency/city → district → village/kelurahan. Child lists load only after the parent is selected and successful responses are cached in memory for the active page session. Village records include `postal_code`; customers can correct the five-digit value.

The referenced API documentation lists 38 provinces, 514 regencies/cities, 7,285 districts, and 83,762 villages. Its region dataset is marked as updated on 3 September 2026. The API aggregates public reference datasets; if a record differs, its documentation points users back to Kepmendagri and BIG as the underlying references. It is a convenience lookup, not an official postal validation service.

## Resilience
If the external lookup cannot be reached, the form offers a manual administrative-area fallback rather than silently guessing a region or preventing the customer from sending a WhatsApp inquiry. Missing postal codes are left blank; no code is invented.

## Validation and storage
- Customer name: 2–80 characters, Unicode letters with common name punctuation.
- Street-level address: 5–250 characters; newlines and control characters are normalized before message generation.
- Postal code: optional, but if supplied it must contain five digits.
- Notes: maximum 250 characters.
- Legacy `area` values from `gyozen_customer_form_v1` are retained as a visible migration note; they are not misrepresented as a selected administrative region.
- Saved customer details remain in browser localStorage for repeat orders; the customer can clear them from the form.

## Security boundary
This application is a frontend-only WhatsApp order flow. Client-side checks improve data quality and guard against malformed localStorage values, but they do not provide server-side validation, authoritative price enforcement, payment processing, or confirmed delivery coverage. The admin must confirm availability, final total, delivery fee, and payment before the order is considered confirmed.

## Conversion & trust changes
- Empty-cart primary CTAs direct customers to the menu instead of opening an empty checkout.
- Cart CTA labels reflect whether the cart already contains products.
- Ebi Chili Oil is classified separately as a condiment, not as a frozen item.
- FAQ and the moving highlight strip explain order confirmation and delivery-fee confirmation without inventing hours, payment methods, customer ratings, or coverage.
- Verified testimonials remain hidden until real customer feedback has permission to be published.
- Existing pricing, product imagery, layout, and WhatsApp order flow are preserved.
