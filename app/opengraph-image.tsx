import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TAGS = ["Serverless AWS", "Terraform", "Bedrock IA"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          background: "linear-gradient(135deg, #09090b 0%, #18181b 55%, #1e1b3a 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #6366f1, #7c3aed)",
            }}
          >
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.9}>
              <circle cx="11" cy="11" r="6.5" strokeLinecap="round" />
              <path d="m20 20-3.8-3.8" strokeLinecap="round" />
              <circle cx="11" cy="11" r="2.4" fill="white" stroke="none" />
            </svg>
          </div>
          <span style={{ fontSize: 76, fontWeight: 600, color: "white", letterSpacing: -1.5 }}>
            VintedLens
          </span>
        </div>

        <span style={{ marginTop: 32, fontSize: 34, color: "#a1a1aa", maxWidth: 900 }}>
          Inventario y ventas de LoopVTG en Vinted — métricas y sugerencias de IA por artículo
        </span>

        <div style={{ display: "flex", gap: 16, marginTop: 52 }}>
          {TAGS.map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "12px 24px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#c4b5fd",
                fontSize: 24,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
