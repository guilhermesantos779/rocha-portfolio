const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch' />
    <feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0' />
  </filter>
  <rect width='100%' height='100%' filter='url(#n)' />
</svg>`;

const NOISE_DATA_URL = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`;

/**
 * Discreet retro-paper grain, generated as a tiled SVG data URI (no image
 * request). Mounted once at the layout root — never per-section.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] mix-blend-overlay"
      style={{
        backgroundImage: NOISE_DATA_URL,
        backgroundSize: "180px 180px",
        opacity: 0.035,
      }}
    />
  );
}
