import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nascimento Reformas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LOGO_URL =
  "https://whgznodgurkuskmsejos.supabase.co/storage/v1/object/public/site-media/brand/wordmark_url/4c5fddec-5a4c-43c9-98b0-392d44f43c0c.png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FFFFFF",
      }}
    >
      <div
        style={{
          width: 500,
          height: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={LOGO_URL}
          alt="Nascimento Reformas"
          width={500}
          height={500}
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>,
    size
  );
}
