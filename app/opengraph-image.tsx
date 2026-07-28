import { ImageResponse } from "next/og";

export const alt = "Miguel Barra - Desarrollador Full Stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Ported brand tokens from /legacy-reference/css/style.css (--bg, --text,
// --text-soft light-theme values, --teal-500). ImageResponse renders via
// Satori, which can't read our CSS custom properties, so the literal hex
// values are duplicated here.
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0e7db",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 140,
          height: 140,
          borderRadius: "50%",
          backgroundColor: "#319795",
          color: "#fff",
          fontSize: 76,
          fontWeight: 700,
          marginBottom: 40,
        }}
      >
        M
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 72,
          fontWeight: 800,
          color: "#1a202c",
          marginBottom: 16,
        }}
      >
        Miguel Barra
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 32,
          color: "rgba(26, 32, 44, 0.75)",
        }}
      >
        Desarrollador Full Stack — React · Next.js · TypeScript
      </div>
    </div>,
    { ...size },
  );
}
