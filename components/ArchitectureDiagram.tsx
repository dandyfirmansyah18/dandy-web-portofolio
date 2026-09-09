'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { useTheme } from '@/app/theme-context';

export default function ArchitectureDiagram({ chart }: { chart: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>("");
    const { isDarkMode } = useTheme();

    useEffect(() => {
        // Configure mermaid based on theme
        mermaid.initialize({
            startOnLoad: false,
            theme: isDarkMode ? 'dark' : 'default',
            securityLevel: 'loose',
            themeVariables: isDarkMode
                ? {
                      darkMode: true,
                      background: '#0f172a',
                      primaryColor: '#1e293b',
                      primaryBorderColor: '#38bdf8',
                      primaryTextColor: '#f8fafc',
                      lineColor: '#94a3b8',
                      tertiaryColor: '#1e293b',
                  }
                : {
                      darkMode: false,
                      background: '#ffffff',
                      primaryColor: '#1e293b',
                      primaryBorderColor: '#38bdf8',
                      primaryTextColor: '#0f172a',
                      lineColor: '#94a3b8',
                      tertiaryColor: '#e2e8f0',
                  },
        });

        const renderChart = async () => {
            try {
                const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
                const { svg } = await mermaid.render(id, chart);
                setSvg(svg);
            } catch (error) {
                console.error("Mermaid rendering failed:", error);
                // Fallback: show error message
                setSvg(`<foreignObject width="100%" height="100%">
                  <div xmlns="http://www.w3.org/1999/xhtml" style="padding: 10px; color: ${isDarkMode ? '#f8fafc' : '#0f172a'}">
                    Diagram rendering failed. Please check the Mermaid syntax.
                  </div>
                </foreignObject>`);
            }
        };

        renderChart();
    }, [chart, isDarkMode]);

    return (
        <div className="my-6 p-4 bg-surface-1 border border-surface-2 rounded-xl overflow-x-auto">
            <div
                ref={containerRef}
                className="flex justify-center min-w-[500px]"
                dangerouslySetInnerHTML={{ __html: svg }}
            />
        </div>
    );
}