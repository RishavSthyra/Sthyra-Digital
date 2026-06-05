import { ImageResponse } from "next/og";

export const alt =
  "Sthyra Digital - performance marketing, web development, and creative management";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background:
            "linear-gradient(135deg, #f50d30 0%, #ff835f 42%, #09b7ea 100%)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: "64px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Sthyra Digital
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1,
              maxWidth: 860,
            }}
          >
            Performance marketing, web development, and creative systems.
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.92)",
              display: "flex",
              fontSize: 28,
              lineHeight: 1.4,
              maxWidth: 920,
            }}
          >
            Digital marketing agency in India building sharper campaigns,
            faster websites, and clearer brand stories.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
          }}
        >
          {["Performance marketing", "Web development", "Creative management"].map(
            (item) => (
              <div
                key={item}
                style={{
                  background: "rgba(255,255,255,0.16)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 9999,
                  display: "flex",
                  fontSize: 24,
                  padding: "14px 24px",
                }}
              >
                {item}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  );
}
