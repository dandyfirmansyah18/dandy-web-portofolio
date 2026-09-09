export default function TechStack() {
  // Define types for better TypeScript support
  type Skill = { name: string; level: number; learning?: boolean };
  type Category = { title: string; skills: Skill[] };

  const categories: Category[] = [
    {
      title: "Expert (8+ years)",
      skills: [
        { name: "Golang", level: 5 },
        { name: "PostgreSQL", level: 5 },
        { name: "Microservices Architecture", level: 5 },
        { name: "Distributed Systems", level: 5 },
      ],
    },
    {
      title: "Advanced (5-7 years)",
      skills: [
        { name: "TypeScript", level: 4 },
        { name: "Node.js", level: 4 },
        { name: "RESTful APIs", level: 4 },
        { name: "Docker", level: 4 },
        { name: "AWS/GCP", level: 4 },
        { name: "Event-Driven Systems", level: 4 },
      ],
    },
    {
      title: "Proficient (3-4 years)",
      skills: [
        { name: "JavaScript", level: 3 },
        { name: "RabbitMQ", level: 3 },
        { name: "MySQL", level: 3 },
        { name: "MongoDB", level: 3 },
        { name: "Redis", level: 3 },
        { name: "OpenTelemetry", level: 3 },
        { name: "Unit Testing", level: 3 },
      ],
    },
    {
      title: "Familiar (1-2 years)",
      skills: [
        { name: "C# (.NET)", level: 2 },
        { name: "PHP", level: 2 },
        { name: "SQL Server", level: 2 },
        { name: "Vue.js", level: 2 },
        { name: "Socket.io", level: 2 },
        { name: "Windmill", level: 2 },
        { name: "Quasar Framework", level: 2 },
      ],
    },
    {
      title: "Currently Learning",
      skills: [
        { name: "Rust", level: 1, learning: true },
        { name: "Kubernetes", level: 1, learning: true },
        { name: "Terraform", level: 1, learning: true },
        { name: "GraphQL", level: 1, learning: true },
      ],
    },
  ];

  return (
    <section className="py-12 border-b border-surface-2">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Technical Expertise
        </h2>
        <p className="text-sm text-foreground/50 mb-8">
          Continuously expanding expertise across backend, infrastructure, and full-stack technologies
        </p>
        <div className="space-y-6">
          {categories.map((category, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                {category.title}
                {!category.skills.some(skill => skill.learning) && (
                  <span className="text-xs bg-surface-2 px-2 py-0.5 rounded-full">
                    {category.skills.length} skills
                  </span>
                )}
              </h3>
              <div className="grid gap-3">
                {/* Different layouts based on category */}
                {category.skills.some(skill => skill.learning) ? (
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIdx) => (
                      <span
                        key={`${index}-${skillIdx}`}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-mono transition-all hover:bg-surface-2 ${skill.learning
                          ? 'border border-brand-primary/50 bg-brand-primary/5 text-brand-primary'
                          : ''
                          }`}
                      >
                        <span className="flex h-2 w-2 items-center justify-center relative">
                          {skill.learning && (
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary/25"></span>
                          )}
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary/20">
                            {skill.learning && <span className="absolute inset-0 bg-brand-primary/20" />}
                          </span>
                        </span>
                        <span>{skill.name}{skill.learning && ' •'}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className={`grid ${category.skills.length <= 4 ? 'grid-cols-1' : 'grid-cols-2'} gap-3`}>
                    {category.skills.map((skill, skillIdx) => (
                      <div
                        key={`${index}-${skillIdx}`}
                        className="flex items-center gap-3 p-4 bg-surface-1 border border-surface-2 rounded-lg hover:border-brand-primary/50 transition-all"
                      >
                        {/* Proficiency Indicator */}
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-brand-primary" />
                          <div className="h-1 w-4 bg-surface-2 rounded-full mt-0.5">
                            <div
                              className="h-1 bg-brand-primary rounded-full transition-all duration-500"
                              style={{ width: `${skill.level * 20}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <span className="font-mono text-sm">{skill.name}</span>
                          <span className="ml-2 text-xs text-foreground/50">
                            {/* Show dots for proficiency */}
                            {[1, 2, 3, 4, 5].map((dot, dotIdx) => (
                              <span
                                key={dot}
                                className={`inline-flex h-2 w-2 items-center justify-center ${dotIdx < skill.level
                                  ? 'bg-brand-primary'
                                  : 'bg-surface-2'
                                  }`}
                              >
                                <span className="text-xs">{dotIdx < skill.level ? '•' : '○'}</span>
                              </span>
                            ))}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}