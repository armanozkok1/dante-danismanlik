"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type PatternType =
  | "dots"
  | "grid"
  | "cross"
  | "lines"
  | "blueprint"
  | "hexagon"
  | "circuit"
  | "radial-glow";

export interface BackgroundPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Desen türü */
  pattern?: PatternType;
  /** Desen boyutu / aralığı (varsayılan: 24) */
  size?: number;
  /** Çizgi veya nokta opaklığı (0 - 1 arası, varsayılan: 0.08) */
  opacity?: number;
  /** Özel renk (CSS rengi veya HSL değişkeni) */
  color?: string;
  /** Maske efekti: kenarlara doğru yumuşak silinme */
  mask?: "fade-out" | "radial" | "none";
  /** Arka plan rengi */
  backgroundColor?: string;
  /** Arka plan üzerinde render edilecek içerik */
  children?: React.ReactNode;
}

export const BackgroundPattern = React.forwardRef<HTMLDivElement, BackgroundPatternProps>(
  (
    {
      className,
      pattern = "grid",
      size = 24,
      opacity = 0.08,
      color,
      mask = "radial",
      backgroundColor,
      children,
      style,
      ...props
    },
    ref
  ) => {
    // Pattern SVG definitions based on pattern type
    const patternColor = color || "currentColor";

    const getPatternSvg = () => {
      switch (pattern) {
        case "dots":
          return (
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`pattern-dots-${size}`} width={size} height={size} patternUnits="userSpaceOnUse">
                  <circle cx={size / 2} cy={size / 2} r={1.5} fill={patternColor} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#pattern-dots-${size})`} />
            </svg>
          );

        case "cross":
          const half = size / 2;
          const crossSize = Math.max(3, size / 6);
          return (
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`pattern-cross-${size}`} width={size} height={size} patternUnits="userSpaceOnUse">
                  <path
                    d={`M ${half - crossSize} ${half} H ${half + crossSize} M ${half} ${half - crossSize} V ${half + crossSize}`}
                    stroke={patternColor}
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#pattern-cross-${size})`} />
            </svg>
          );

        case "lines":
          return (
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`pattern-lines-${size}`} width={size} height={size} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2={size} stroke={patternColor} strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#pattern-lines-${size})`} />
            </svg>
          );

        case "blueprint":
          return (
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`pattern-small-grid-${size}`} width={size / 4} height={size / 4} patternUnits="userSpaceOnUse">
                  <path d={`M ${size / 4} 0 L 0 0 0 ${size / 4}`} fill="none" stroke={patternColor} strokeWidth="0.5" strokeOpacity="0.4" />
                </pattern>
                <pattern id={`pattern-blueprint-${size}`} width={size} height={size} patternUnits="userSpaceOnUse">
                  <rect width={size} height={size} fill={`url(#pattern-small-grid-${size})`} />
                  <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke={patternColor} strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#pattern-blueprint-${size})`} />
            </svg>
          );

        case "hexagon":
          const w = size * 1.5;
          const h = size * Math.sqrt(3);
          return (
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`pattern-hex-${size}`} width={w} height={h} patternUnits="userSpaceOnUse">
                  <path
                    d={`M ${w / 4} 0 L ${w * 0.75} 0 L ${w} ${h / 2} L ${w * 0.75} ${h} L ${w / 4} ${h} L 0 ${h / 2} Z`}
                    fill="none"
                    stroke={patternColor}
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#pattern-hex-${size})`} />
            </svg>
          );

        case "circuit":
          return (
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`pattern-circuit-${size}`} width={size * 2} height={size * 2} patternUnits="userSpaceOnUse">
                  <path d={`M 0 ${size} H ${size} V 0`} fill="none" stroke={patternColor} strokeWidth="1" />
                  <circle cx={size} cy={0} r="2" fill={patternColor} />
                  <circle cx={0} cy={size} r="2" fill={patternColor} />
                  <path d={`M ${size * 2} ${size} H ${size * 1.5} V ${size * 2}`} fill="none" stroke={patternColor} strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#pattern-circuit-${size})`} />
            </svg>
          );

        case "radial-glow":
          return (
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${patternColor} 0%, transparent 70%)`,
              }}
            />
          );

        case "grid":
        default:
          return (
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`pattern-grid-${size}`} width={size} height={size} patternUnits="userSpaceOnUse">
                  <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke={patternColor} strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#pattern-grid-${size})`} />
            </svg>
          );
      }
    };

    const maskClass =
      mask === "radial"
        ? "[mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
        : mask === "fade-out"
        ? "[mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
        : "";

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        style={{
          backgroundColor,
          ...style,
        }}
        {...props}
      >
        {/* Pattern Layer */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 transition-opacity duration-300",
            maskClass
          )}
          style={{ opacity }}
        >
          {getPatternSvg()}
        </div>

        {/* Content */}
        {children && <div className="relative z-10">{children}</div>}
      </div>
    );
  }
);

BackgroundPattern.displayName = "BackgroundPattern";
