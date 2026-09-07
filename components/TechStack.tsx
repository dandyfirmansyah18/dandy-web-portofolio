export default function TechStack() {
    const categories = [
        {
            title: "Core & Languages",
            skills: ["Golang", "TypeScript", "Node.js", "JavaScript", "C# (.NET)", "PHP", "SQL"],
        },
        {
            title: "Backend & Messaging",
            skills: ["Microservices", "RESTful APIs", "GCP Pub/Sub", "RabbitMQ", "Clean Architecture", "SNAP Banking APIs"],
        },
        {
            title: "Databases & Caching",
            skills: ["PostgreSQL (SSOT)", "MySQL", "MongoDB", "Redis", "SQL Server"],
        },
        {
            title: "Cloud & Reliability",
            skills: ["Docker", "GCP (Cloud Run)", "AWS", "OpenTelemetry Tracing", "Unit Testing (10%→75%)"],
        },
    ];

    return (
        <section className="py-12 border-b border-slate-800/80">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-2xl font-bold text-white mb-6">Technical Stack</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((cat, idx) => (
                        <div
                            key={idx}
                            className="bg-slate-800/30 border border-slate-800/80 hover:border-slate-700/80 p-5 rounded-xl transition-all"
                        >
                            <h3 className="text-xs font-semibold text-cyan-400 mb-3 uppercase tracking-wider font-mono">
                                {cat.title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {cat.skills.map((skill, sIdx) => (
                                    <span
                                        key={sIdx}
                                        className="bg-slate-900/90 border border-slate-700/70 text-slate-300 text-xs px-2.5 py-1 rounded-md font-mono hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}