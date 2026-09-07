"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

export default function ArchitectureDiagram({ chart }: { chart: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>("");

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            theme: "dark",
            securityLevel: "loose",
            themeVariables: {
                darkMode: true,
                background: "#0f172a",
                primaryColor: "#1e293b",
                primaryBorderColor: "#38bdf8",
                primaryTextColor: "#f8fafc",
                lineColor: "#94a3b8",
                tertiaryColor: "#1e293b",
            },
        });

        const renderChart = async () => {
            try {
                const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
                const { svg } = await mermaid.render(id, chart);
                setSvg(svg);
            } catch (error) {
                console.error("Mermaid rendering failed:", error);
            }
        };

        renderChart();
    }, [chart]);

    return (
        <div className="my-6 p-4 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
            <div
                ref={containerRef}
                className="flex justify-center min-w-[500px]"
                dangerouslySetInnerHTML={{ __html: svg }}
            />
        </div>
    );
}