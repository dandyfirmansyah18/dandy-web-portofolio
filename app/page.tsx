import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import CaseStudies from "@/components/CaseStudies";

export default function Home() {
  return (
    <>
      {/* Quick Facts / At a Glance Bar */}
      <section className="bg-surface-1/50 backdrop-blur-sm border-b border-surface-2">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm font-mono">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 items-center justify-center bg-brand-primary/20 text-brand-primary rounded-full">
                  8+
                </span>
                <span>Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 items-center justify-center bg-brand-secondary/20 text-brand-secondary rounded-full">
                  4+
                </span>
                <span>Major Companies</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 items-center justify-center bg-brand-accent/20 text-brand-accent rounded-full">
                  12+
                </span>
                <span>Systems Modernized</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 items-center justify-center bg-surface-2/50 text-foreground/60 rounded-full">
                  🌍
                </span>
                <span>Malang, Indonesia (WIB)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 items-center justify-center bg-surface-2/50 text-foreground/60 rounded-full">
                  ⏰
                </span>
                <span>Open to Global Remote</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 items-center justify-center bg-surface-2/50 text-foreground/60 rounded-full">
                  💼
                </span>
                <span>Senior / Staff IC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="min-h-screen bg-background text-foreground transition-colors">
        <Hero />
        <TechStack />
        <CaseStudies />
        <footer className="py-8 border-t border-surface-2 text-center text-xs text-foreground/50 font-mono">
          © {new Date().getFullYear()} Dandy Firmansyah. Built with Next.js & Tailwind CSS.
        </footer>
      </main>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Dandy Firmansyah",
            "jobTitle": "Senior Software Engineer",
            "image": "/icon.svg",
            "description":
              "Senior Software Engineer specializing in scalable backend infrastructure, microservices, and database performance with 8+ years of experience.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Malang",
              "addressRegion": "East Java",
              "addressCountry": "ID",
            },
            "alumniOf": [
              {
                "@type": "EducationalOrganization",
                "name": "Batumbu Fintech",
                "sameAs": "https://batumbu.com",
              },
              {
                "@type": "EducationalOrganization",
                "name": "Meratus Group",
                "sameAs": "https://meratus.co.id",
              },
            ],
            "skill": [
              "Golang",
              "PostgreSQL",
              "Microservices Architecture",
              "TypeScript",
              "Node.js",
              "AWS",
              "GCP",
              "Docker",
              "RESTful APIs",
              "Event-Driven Systems",
            ],
            "sameAs": [
              "https://linkedin.com/in/dandy-firmansyah-b12332140",
              "https://github.com/dandyfirmansyah18",
            ],
          }),
        }}
      />
    </>
  );
}