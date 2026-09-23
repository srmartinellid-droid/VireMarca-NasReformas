import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0B3A64", borderRadius: 36 }}>
      <img src="https://www.nascimentoreformas.com.br/logo.png" width="132" height="132" style={{ objectFit: "contain" }} />
    </div>,
    size
  );
}
