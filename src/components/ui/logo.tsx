import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

interface LogoProps {
  className?: string;
  priority?: boolean;
  asLink?: boolean;
  width?: number;
  height?: number;
}

export function Logo({
  className,
  priority = false,
  asLink = true,
  width = 500,
  height = 500,
}: LogoProps) {
  const image = (
    <Image
      src="/brand/logo.png"
      alt={`${siteConfig.name} — ${siteConfig.tagline}`}
      width={width}
      height={height}
      priority={priority}
      className="h-auto w-full object-contain"
      sizes="(max-width: 768px) 130px, 160px"
    />
  );

  if (!asLink) {
    return <span className={cn("block", className)}>{image}</span>;
  }

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — pagina principală`}
      className={cn("block shrink-0", className)}
    >
      {image}
    </Link>
  );
}
