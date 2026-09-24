import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
      }}
    >
      <img
        src="https://whgznodgurkuskmsejos.supabase.co/storage/v1/object/public/site-media/brand/2c5157fa-8537-430e-b192-04ee916f7c30.png"
        width="48"
        height="48"
        style={{ objectFit: "contain" }}
      />
    </div>,
    size
  );
}
