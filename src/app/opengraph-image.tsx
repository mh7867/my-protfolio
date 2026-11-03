import { ImageResponse } from "next/og";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export const alt = `${site.fullName} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The card a shared link unfurls into: name, role and the project colours. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#0b0b0b", color: "#fff", padding: 64 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "rgba(255,255,255,.6)" }}>
          <span>{site.fullName}</span>
          <span>
            {site.role} · {site.company}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 148, fontWeight: 800, lineHeight: 0.88, letterSpacing: -6, textTransform: "uppercase" }}>
          <span>Full-stack</span>
          <span style={{ color: "#d8fb4b" }}>developer</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {projects.map((p) => (
            <div key={p.slug} style={{ display: "flex", background: p.theme.bg, color: p.theme.fg, borderRadius: 999, padding: "10px 16px", fontSize: 18 }}>
              {p.name}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
