import { ImageResponse } from "next/og";

// Imagen que ven Google, LinkedIn y WhatsApp al compartir el sitio.
// Se genera con next/og usando la paleta del sitio (ink + verde).
export const alt = "Miguel Barra, Full Stack Developer en Santiago de Chile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#15181a";
const GREEN = "#c9f59a";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: INK,
        color: "#fff",
        padding: "80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div
          style={{
            width: 68,
            height: 68,
            borderRadius: 16,
            background: GREEN,
            color: INK,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 42,
            fontWeight: 700,
          }}
        >
          M
        </div>
        <span
          style={{
            fontSize: 26,
            letterSpacing: 3,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          MIGUELBARRA.CL
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <span style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.02 }}>
          Miguel Barra
        </span>
        <span style={{ fontSize: 46, color: "rgba(255,255,255,0.72)" }}>
          Full Stack Developer · Santiago de Chile
        </span>
      </div>

      <span style={{ fontSize: 27, letterSpacing: 1, color: GREEN }}>
        React · Next.js · TypeScript · Node.js · PostgreSQL · Cloud
      </span>
    </div>,
    { ...size },
  );
}
