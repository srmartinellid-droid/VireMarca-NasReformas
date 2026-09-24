import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0B3A64", borderRadius: 36 }}>
      <img src="https://whgznodgurkuskmsejos.supabase.co/storage/v1/object/public/site-media/brand/2c5157fa-8537-430e-b192-04ee916f7c30.png" width="132" height="132" style={{ objectFit: "contain" }} />
    </div>,
    size
  );
}
