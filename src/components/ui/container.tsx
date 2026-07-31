import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ContainerProps {
  as?: ElementType;
  size?: "default" | "narrow" | "wide";
  className?: string;
  children: ReactNode;
}

const sizeMap = {
  narrow: "max-w-3xl",
  default: "max-w-[1180px]",
  wide: "max-w-[1320px]",
} as const;

export function Container({
  as: Tag = "div",
  size = "default",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        sizeMap[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
