import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nascimento Reformas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px", background: "#0B3A64", color: "white", fontFamily: "Arial" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
        <img src="https://www.nascimentoreformas.com.br/logo.png" width="112" height="112" style={{ objectFit: "contain" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 48, fontWeight: 800 }}>Nascimento Reformas</div>
          <div style={{ fontSize: 24, opacity: 0.78 }}>Palhoça e Grande Florianópolis · SC</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ width: "92px", height: "6px", background: "#E47C19" }} />
        <div style={{ fontSize: 58, lineHeight: 1.02, fontWeight: 700 }}>Reformas que transformam espaços.</div>
        <div style={{ fontSize: 28, opacity: 0.82 }}>Precisão em cada detalhe.</div>
      </div>
      <div style={{ fontSize: 22, opacity: 0.7 }}>Reformas residenciais · Drywall · Gesso · Hidráulica · Acabamentos</div>
    </div>,
    size
  );
}
