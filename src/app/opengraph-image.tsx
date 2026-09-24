import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const revalidate = false;
export const alt = "Nascimento Reformas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SYMBOL_URL =
  "https://whgznodgurkuskmsejos.supabase.co/storage/v1/object/public/site-media/brand/2c5157fa-8537-430e-b192-04ee916f7c30.png";
const WORDMARK_URL =
  "https://whgznodgurkuskmsejos.supabase.co/storage/v1/object/public/site-media/brand/wordmark_url/4c5fddec-5a4c-43c9-98b0-392d44f43c0c.png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#FFFFFF" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <img src={SYMBOL_URL} width={260} height={260} style={{ objectFit: "contain" }} />
        <div style={{ display: "flex", height: 24 }} />
        <img src={WORDMARK_URL} width={440} height={120} style={{ objectFit: "contain" }} />
      </div>
    </div>,
    size
  );
}
