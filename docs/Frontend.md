# Frontend System Architecture: The Cinematic Interface

This document provides a technical audit and structural explanation of the **Credit Risk Classification (CRC)** interface. It details the architectural decisions, design tokens, and interaction patterns that transform raw fiscal data into a high-stakes visual experience.

---

## 1. Architectural Philosophy: Cinematic Utility
The CRC frontend was designed to solve a specific problem: **How do you make complex, cold financial analysis feel urgent and professional?**

### The Tech Stack
*   **Next.js 15 (App Router)**: Chosen for its robust routing and server-side optimization capabilities.
*   **Tailwind CSS**: Used for rapid, utility-first styling with a custom design token system.
*   **GSAP (GreenSock Animation Platform)**: Leveraged for high-performance scroll-driven storytelling (ScrollTrigger).
*   **Framer Motion**: Used for micro-interactions, layout transitions, and form state changes.
*   **Zustand**: A lightweight state management solution for real-time telemetry syncing across components.

---

## 2. Design Ethos: Glassmorphism & Depth
We moved away from generic "Dashboard" aesthetics in favor of a **Glassmorphic Cyberpunk** theme.

### Key Visual Tokens
*   **Color Palette**:
    *   `Background`: `#0a0c10` (Deep Space) — Provides maximum contrast for neon elements.
    *   `Primary`: `#c3f5ff` (Neon Cyan) — Represents the "Safe" path and analytical clarity.
    *   `Secondary`: `#ff4d4d` (Warning Red) — Reserved strictly for high-risk flags and critical errors.
*   **Structural Elements**:
    *   **Glass Panels**: `backdrop-blur-md` with low-opacity borders (`white/5`) to create depth without visual clutter.
    *   **Scanlines**: An animated overlay that creates a "Tactical Monitor" effect, reinforcing the diagnostic nature of the tool.

---

## 3. The Cinematic Engine: Three.js & GPU Acceleration
One of the most ambitious features of the CRC interface is the **Cinematic Engine (`CinematicEngine.tsx`)**, which offloads heavy sequence rendering to the GPU.

### Why Three.js?
Instead of using standard `<video>` tags or high-CPU CSS animations, we utilize **WebGL via Three.js** to render a high-performance WebP image sequence.

*   **GPU Offloading**: Using `THREE.WebGLRenderer` with `powerPreference: 'high-performance'`, we bypass the browser's main thread bottlenecks.
*   **Orthographic Projection**: We use an `OrthographicCamera` to ensure the image sequence fits perfectly 1:1 with the viewport, creating a seamless background that reacts directly to scroll position.
*   **Lazy Loading & Texture Management**: 
    - Full assets are ~300+ frames. 
    - The engine uses a hybrid strategy: fetching the first 60 frames immediately for instant interactivity and then background-throttling the remaining frames.
    - Each frame is converted to a `THREE.Texture` and cached in a map to prevent redundant memory allocation.

---

## 4. Responsive Strategy: The Fluid HUD
Bringing a high-density, cyberpunk "HUD" (Heads-Up Display) to mobile requires significant logic adaptation.

| Feature | Desktop Implementation | Mobile Adaptation |
| :--- | :--- | :--- |
| **Animation Smoothness** | `lerpFactor: 0.1` | `lerpFactor: 0.05` (Smoother transition to hide touch-scroll jitter) |
| **Panel Density** | 2-Column Grid | Single Column with `overflow-x-hidden` |
| **Custom Cursor** | Follows Mouse with magnetic effects | Fully disabled to save battery and reduce DOM recalculation |
| **Asset Quality** | High Pixel Ratio (2.0) | Capped at `Math.min(devicePixelRatio, 2)` to prevent GPU throttling |

### Touch Geometry
On mobile, the `RiskForm` inputs use larger tap targets and the semantic buttons (Housing/Education) switch to a full-width grid to ensure "Fat-Finger" compatibility without losing the technical aesthetic.

---

## 5. The Interactive Pipeline (Step-by-Step)

### Step 1: Design Token Initialization
Rather than using arbitrary colors, we extended `tailwind.config.ts` to include specific semantic keys.
*   **Why?** This ensures that if we decide to change the "Safe Glow" intensity, we update one variable instead of hunting through 50 components.

### Step 2: Orchestrated Storytelling (GSAP)
We used `gsap` to sync text appearance with user scrolling.
*   **The Logic**: As the user scrolls from Module 01 to Module 04, the "CMD" line and "STATUS" tags flicker into existence.
*   **Why not standard CSS?** Standard CSS animations are time-bound. GSAP allows the user to control the pace of the narrative, making the ML model comparisons feel earned.

### Step 3: Global Telemetry (Zustand)
The `useRiskStore` captures input changes in the `RiskForm` and updates the entire system's state immediately.
*   **The Benefit**: This allows us to potentially show "Real-time Risk Impact" visualizations in other parts of the page without re-drilling props.

### Step 4: API Bridge (Next.js -> FastAPI)
The form submits to a FastAPI endpoint (`/predict`).
*   **The Approach**: We use `AnimatePresence` to swap the form for the `ResultsDisplay` seamlessly.
*   **Why?** Traditional loading screens break the "Cinematic" flow. Our loader is embedded directly into the "Submit" trigger to maintain immersion.

---

## 6. Decision Log: Alternatives Considered

| Approach | Why we skipped it | Why our choice is better |
| :--- | :--- | :--- |
| **Lottie / JSON Animations** | Filesize for complex 3D renders becomes massive (~15MB+). | **Three.js WebP Sequences** offer better compression and true GPU acceleration. |
| **Material UI / Shadcn** | Too "standard." Feels like a corporate SaaS tool rather than a specialized diagnostic engine. | **Vanilla Tailwind** allowed for the custom glassmorphism and scanline logic without fighting library defaults. |
| **Vanilla React** | Missing the optimization and folder structure benefits of Next.js. | **Next.js** provides a "Production Ready" framework with built-in image optimization and faster routing. |
| **Recharts / Chart.js** | Can feel static and "Excel-like" if not heavily customized. | **Custom CSS Progress Bars** and SVG paths in `ResultsDisplay` feel more integrated into the HUD aesthetic. |

---

## 7. Future Roadmap: The HUD Evolution
1.  **3D Risk Topology**: Using Three.js to map risk across a 3D terrain of income vs. age.
2.  **Voice Feedback**: Text-to-speech diagnostic readouts for "High Risk" classifications.
3.  **Local History**: Persisting classifications in IndexedDB for side-by-side comparison.

---
> [!NOTE]
> This frontend is optimized for **1440p+ Cinematic Displays** but maintains accessibility for mobile through fluid grid scaling.
