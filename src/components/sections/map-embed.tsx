import { siteConfig } from "@/config/site";

export function MapEmbed({ className }: { className?: string }) {
  const src = siteConfig.integrations.googleMapsEmbedUrl;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl shadow-card ring-1 ring-black/5 ${className ?? ""}`}
    >
      <iframe
        src={src}
        title={`Locația ${siteConfig.name} pe Google Maps`}
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
