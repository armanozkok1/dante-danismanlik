"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface MermaidProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Mermaid diagram syntax string */
  chart: string;
  /** Custom theme: "dark" | "default" | "forest" | "neutral" | "base" */
  theme?: "dark" | "default" | "forest" | "neutral" | "base";
  /** Custom primary color override for nodes and accents */
  primaryColor?: string;
  /** Allow copying SVG or source code */
  showControls?: boolean;
}

export function Mermaid({
  chart,
  theme,
  primaryColor = "#e11d48",
  showControls = true,
  className,
  ...props
}: MermaidProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [copiedSvg, setCopiedSvg] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const uniqueId = React.useId().replace(/[:]/g, "_");

  // Dark mode takibi
  React.useEffect(() => {
    const checkDark = () => {
      const isDark =
        document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(isDark);
    };

    checkDark();

    const observer = new MutationObserver(() => {
      checkDark();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    let isMounted = true;

    async function renderChart() {
      if (!chart.trim()) return;

      try {
        setError(null);
        let mermaidModule;
        try {
          mermaidModule = await import("mermaid");
        } catch {
          throw new Error(
            "Mermaid kütüphanesi bulunamadı. Bu bileşeni kullanmak için lütfen projenize 'npm install mermaid' veya 'pnpm add mermaid' kurun."
          );
        }
        const mermaid = mermaidModule.default;

        const isDark = isDarkMode;
        const brandColor = primaryColor || "#e11d48";

        mermaid.initialize({
          startOnLoad: false,
          theme: theme || "base",
          securityLevel: "loose",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          themeVariables: {
            darkMode: isDark,
            background: "transparent",
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontSize: "13px",

            // Ana Renkler
            primaryColor: isDark ? "#1e1e24" : "#ffffff",
            primaryTextColor: isDark ? "#f4f4f5" : "#0f172a",
            primaryBorderColor: isDark ? "#3f3f46" : "#cbd5e1",
            lineColor: isDark ? "#94a3b8" : "#475569",
            textColor: isDark ? "#f4f4f5" : "#0f172a",

            // Genel Node / Kutu Renkleri
            mainBkg: isDark ? "#18181b" : "#ffffff",
            nodeBorder: isDark ? "#3f3f46" : "#cbd5e1",
            nodeTextColor: isDark ? "#f4f4f5" : "#0f172a",
            clusterBkg: isDark ? "#18181b80" : "#f8fafc99",
            clusterBorder: isDark ? "#27272a" : "#e2e8f0",
            titleColor: isDark ? "#f4f4f5" : "#0f172a",
            edgeLabelBackground: isDark ? "#18181b" : "#ffffff",

            // Sequence Diagram Özel Renkleri
            actorBkg: isDark ? "#18181b" : "#ffffff",
            actorBorder: isDark ? "#3f3f46" : "#cbd5e1",
            actorTextColor: isDark ? "#f4f4f5" : "#0f172a",
            actorLineColor: isDark ? "#52525b" : "#cbd5e1",
            signalColor: isDark ? "#a1a1aa" : "#334155",
            signalTextColor: isDark ? "#f4f4f5" : "#0f172a",
            labelBoxBkgColor: isDark ? "#27272a" : "#f8fafc",
            labelBoxBorderColor: isDark ? "#3f3f46" : "#cbd5e1",
            labelTextColor: isDark ? "#f4f4f5" : "#0f172a",
            loopTextColor: isDark ? "#f4f4f5" : "#0f172a",
            sequenceNumberColor: "#ffffff",
            activationBkgColor: isDark ? "#27272a" : "#f1f5f9",
            activationBorderColor: isDark ? "#3f3f46" : "#94a3b8",

            // Not Kutuları
            noteBkgColor: isDark ? "#27272a" : "#fefce8",
            noteBorderColor: isDark ? "#3f3f46" : "#fef08a",
            noteTextColor: isDark ? "#f4f4f5" : "#854d0e",

            // Class & ER Diyagramları
            classText: isDark ? "#f4f4f5" : "#0f172a",
            attributeBackgroundColorOdd: isDark ? "#18181b" : "#ffffff",
            attributeBackgroundColorEven: isDark ? "#27272a" : "#f8fafc",

            // Git Graph
            git0: brandColor,
            git1: "#6366f1",
            git2: "#10b981",
            git3: "#f59e0b",
            git4: "#8b5cf6",
            git5: "#06b6d4",
            gitBranchLabel0: "#ffffff",
            gitBranchLabel1: "#ffffff",
            gitBranchLabel2: "#ffffff",
            gitBranchLabel3: "#ffffff",

            // Pie Chart
            pie1: brandColor,
            pie2: "#6366f1",
            pie3: "#10b981",
            pie4: "#f59e0b",
            pie5: "#8b5cf6",
            pie6: "#06b6d4",
            pieTitleTextColor: isDark ? "#f4f4f5" : "#0f172a",
            pieSectionTextColor: "#ffffff",
            pieLegendTextColor: isDark ? "#cbd5e1" : "#334155",
          },
        });

        const id = `mermaid_${uniqueId}_${Date.now()}`;
        const { svg } = await mermaid.render(id, chart);

        if (isMounted) {
          setSvgContent(svg);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error("Mermaid Render Error:", err);
          setError(err?.message || "Diyagram çizilirken sözdizimi hatası oluştu.");
        }
      }
    }

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [chart, theme, primaryColor, uniqueId, isDarkMode]);

  const handleCopySource = () => {
    navigator.clipboard.writeText(chart);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySvg = () => {
    if (svgContent) {
      navigator.clipboard.writeText(svgContent);
      setCopiedSvg(true);
      setTimeout(() => setCopiedSvg(false), 2000);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative rounded-2xl border border-border bg-card overflow-hidden shadow-xs group",
        className
      )}
      {...props}
    >
      {/* Controls Header */}
      {showControls && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/60 bg-muted/20">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] font-mono font-medium text-muted-foreground uppercase tracking-wider">
              Mermaid Diagram
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleCopySvg}
              disabled={!svgContent}
              className="text-[11px] font-medium px-2 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              title="SVG formatında kopyala"
            >
              {copiedSvg ? "SVG Kopyalandı" : "SVG Kopyala"}
            </button>

            <button
              type="button"
              onClick={handleCopySource}
              className="text-[11px] font-medium px-2.5 py-1 rounded-md border border-border/60 bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Kaynak Kodu Kopyala"
            >
              {copied ? "Kopyalandı" : "Kodu Kopyala"}
            </button>
          </div>
        </div>
      )}

      {/* Render Area with SVG Style Enhancements */}
      <div className="p-6 md:p-10 flex items-center justify-center min-h-[260px] overflow-x-auto bg-background/50">
        {error ? (
          <div className="p-4 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-xs font-mono max-w-md text-center">
            <p className="font-bold mb-1">Mermaid Çizim Hatası</p>
            <p className="opacity-90">{error}</p>
          </div>
        ) : svgContent ? (
          <div
            className={cn(
              "w-full flex items-center justify-center transition-all duration-300",
              "[&_svg]:max-w-full [&_svg]:h-auto [&_svg]:drop-shadow-xs",
              // Metin netliği ve kontrast güçlendirmeleri
              "[&_text]:font-sans [&_text]:tracking-normal",
              "[&_.messageText]:fill-foreground [&_.messageText]:font-medium [&_.messageText]:text-[12.5px]",
              "[&_.actor_text]:fill-foreground [&_.actor_text]:font-semibold [&_text.actor]:fill-foreground",
              "[&_.nodeLabel]:fill-foreground [&_.nodeLabel]:font-medium",
              "[&_.labelText]:fill-foreground [&_.labelText]:font-medium",
              "[&_.sequenceNumber]:fill-white! [&_.sequenceNumber]:font-bold",
              "[&_.noteText]:fill-foreground [&_.noteText]:font-medium"
            )}
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span>Diyagram yükleniyor...</span>
          </div>
        )}
      </div>
    </div>
  );
}

