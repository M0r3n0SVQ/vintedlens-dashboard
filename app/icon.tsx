import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Mismo glifo (lupa) que components/icons.tsx LogoMark, redibujado
// aquí porque next/og (satori) no puede reutilizar JSX que dependa
// de Tailwind — solo entiende estilos inline.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6366f1, #7c3aed)",
          borderRadius: 7,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.4}>
          <circle cx="11" cy="11" r="6.5" strokeLinecap="round" />
          <path d="m20 20-3.8-3.8" strokeLinecap="round" />
          <circle cx="11" cy="11" r="2.4" fill="white" stroke="none" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
