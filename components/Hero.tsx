import { Globe, Mail, MapPin, Share2, Terminal } from "lucide-react";

export default function Hero() {
    return (
        <section className="py-16 md:py-24 border-b border-slate-800/80 bg-gradient-to-b from-slate-950/40 to-slate-900">
            <div className="max-w-4xl mx-auto px-6">
                <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/50 mb-6">
                    <Terminal size={14} />
                    <span>Senior Software Engineer • 8+ YOE</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                    Dandy Firmansyah
                </h1>

                <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-8 max-w-3xl">
                    Specializing in scalable backend infrastructure, microservices, and database performance. Proven track record in refactoring enterprise systems, migrating event pipelines, and optimizing high-throughput financial architectures across fintech and enterprise logistics.
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mb-8">
                    <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-slate-400" />
                        <span>Malang, Indonesia</span>
                    </div>
                    <span className="text-slate-700">•</span>
                    <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-full text-emerald-400">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span>Open to Senior / Staff IC & Global Remote</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    <a
                        href="https://linkedin.com/in/dandy-firmansyah-b12332140"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2.5 rounded-lg transition-all text-xs font-semibold shadow-lg shadow-cyan-950/20"
                    >
                        <Share2 size={16} /> LinkedIn
                    </a>
                    <a
                        href="https://github.com/dandyfirmansyah18"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-lg transition-all text-xs font-semibold"
                    >
                        <Globe size={16} /> GitHub
                    </a>
                    <a
                        href="mailto:dandyfirmansyah1998@gmail.com"
                        className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-lg transition-all text-xs font-semibold"
                    >
                        <Mail size={16} /> Email Me
                    </a>
                </div>
            </div>
        </section>
    );
}