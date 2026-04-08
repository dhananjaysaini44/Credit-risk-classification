# Design System Document: The Celestial Ledger

## 1. Overview & Creative North Star
**Creative North Star: "The Ethereal Vault"**

This design system moves away from the rigid, boxed-in layouts of traditional fintech and toward an immersive, editorial "Glass-on-Void" experience. The goal is to evoke the feeling of high-end watchmaking—where precision meets luxury. 

To break the "template" look, we utilize **intentional asymmetry**. Hero elements should overlap container boundaries, and typography should utilize aggressive scale shifts (large displays vs. microscopic labels) to create a sense of hierarchy that feels curated rather than generated. By using a deep midnight base with electric accents, we position the interface as a high-performance tool for the digital elite.

---

## 2. Colors & Surface Philosophy

### The Midnight Palette
Our foundation is built on deep cosmic tones, moving from the infinite black of the background to the electric energy of the functional accents.

*   **Background (`#121318`):** The absolute foundation.
*   **Primary (`#c3c0ff`):** An ethereal indigo used for high-importance interactions.
*   **Secondary (`#4cd7f6`):** An electric cyan for precision data and secondary actions.
*   **Surface Tiers:** 
    *   `surface-container-lowest` (`#0d0e13`): Used for "cut-outs" or recessed areas.
    *   `surface-container-highest` (`#34343a`): Used for elevated, interactive elements.

### The "No-Line" Rule
**Standard 1px solid borders are strictly prohibited.** Separation of concerns must be achieved through:
1.  **Tonal Shifts:** Placing a `surface-container-low` element against the `surface` background.
2.  **Negative Space:** Using the spacing scale to group related information.
3.  **Backdrop Blurs:** Using glassmorphism to define a region without a hard edge.

### Glass & Gradient Implementation
To achieve the "signature" look, all primary containers must utilize:
*   **Surface:** Semi-transparent variants of `surface-container` (Alpha 40-60%).
*   **Blur:** `backdrop-filter: blur(20px)`.
*   **The Inner Glow:** A subtle `inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)` to catch "light" on the top edge of glass cards.

---

## 3. Typography
We pair the geometric authority of **Manrope** with the technical clarity of **Inter**.

*   **The Editorial Hook:** Use `display-lg` (Manrope, 3.5rem) for hero stats and balance headers. The tight letter-spacing and massive scale create a premium, high-contrast impact against the dark void.
*   **The Technical Core:** Use `body-md` (Inter, 0.875rem) for all transactional data. Inter’s tall x-height ensures that complex financial figures remain legible even at lower opacities.
*   **Visual Hierarchy:** Titles (`title-lg`) should always be 100% white (`on-surface`), while secondary labels (`label-md`) should drop to `on-surface-variant` to create depth.

---

## 4. Elevation & Depth

### The Layering Principle
Depth is not a shadow; it is a stack.
1.  **Layer 0 (The Void):** The `surface` background with dynamic 3D floating assets.
2.  **Layer 1 (The Glass):** `surface-container-low` with `blur(20px)`.
3.  **Layer 2 (The Interactive):** `surface-container-high` for hovered states or active cards.

### Ambient Shadows
Traditional black shadows are forbidden. If an element must "float," use a tinted shadow:
*   **Shadow Color:** `rgba(10, 11, 16, 0.5)`
*   **Properties:** Large blur (30px - 60px), 0px offset. This mimics the occlusion of light in a dark space rather than a "drop shadow."

### Ghost Borders
Where accessibility requires a stroke (e.g., input fields), use a "Ghost Border":
*   **Stroke:** 1px `outline-variant` at 15% opacity.
*   **Accent:** Use a 2px `primary` or `secondary` stroke only for the active/focused state.

---

## 5. Components

### Buttons
*   **Primary:** A gradient transition from `primary_container` (`#4f46e5`) to `primary` (`#c3c0ff`). Roundedness: `lg` (16px).
*   **Secondary:** Glass-based. `surface-container-highest` at 40% opacity with a `blur(10px)`.
*   **Tertiary:** Text-only in `secondary` (`#4cd7f6`) with a subtle underline on hover.

### Cards (The "Glass Ledger" Card)
*   **Structure:** No divider lines. Separate header from body using a `surface-container-highest` background for the header and `surface-container-low` for the body.
*   **Corner Radius:** Always `xl` (1.5rem / 24px) for parent cards, nesting `lg` (16px) elements inside.

### Input Fields
*   **Style:** Minimalist. A `surface-container-lowest` background with a bottom-only `outline-variant` (20% opacity).
*   **Focus State:** The bottom border transforms into a `secondary` (`#4cd7f6`) glow.

### Chips & Tags
*   **Style:** Pill-shaped (`full` roundness). Use `secondary_container` with `on_secondary_container` text for positive trends (growth) and `error_container` for negative trends.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use extreme white space. Let the midnight background "breathe" between functional groups.
*   **Do** overlap elements. Let a 3D coin asset sit 20% outside of its glass container.
*   **Do** use `secondary_fixed_dim` for data visualization (charts/graphs) to provide a neon glow effect.

### Don't:
*   **Don't** use pure white (`#FFFFFF`) for body text. Use `on_surface_variant` (`#c7c4d8`) to reduce eye strain.
*   **Don't** use 100% opaque cards. The "magic" of this system relies on the dynamic background subtly bleeding through the UI layers.
*   **Don't** use sharp corners. Everything must adhere to the `lg` (16px) or `xl` (24px) radius to maintain the organic, premium feel.