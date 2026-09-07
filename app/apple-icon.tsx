import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Mismo glifo "M" que app/icon.svg, en el tamaño que pide iOS.
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#15181a",
        color: "#fff",
        fontFamily: "Georgia, serif",
        fontSize: 104,
      }}
    >
      M
    </div>,
    { ...size },
  );
}
