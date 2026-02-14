"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "video" | "4/3" | "1/1" | "full";
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
};

const aspectMap = {
  video: "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  full: "aspect-[16/9]",
};

export function LazyImage({
  src,
  alt,
  className,
  aspectRatio = "4/3",
  sizes = "50vw",
  priority = false,
  fill = false,
}: LazyImageProps) {
  const [error, setError] = useState(false);

  if (fill) {
    return (
      <span className={cn("absolute inset-0 block overflow-hidden bg-background/10", className)}>
        {!error ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            loading={priority ? "eager" : "lazy"}
            className="object-cover"
            onError={() => setError(true)}
          />
        ) : null}
      </span>
    );
  }
  return (
    <span className={cn("block overflow-hidden bg-background/10", aspectMap[aspectRatio], className)}>
      {!error ? (
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover"
          onError={() => setError(true)}
        />
      ) : null}
    </span>
  );
}
