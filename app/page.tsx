import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import CaseStudies from "@/components/CaseStudies";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      <Hero />
      <TechStack />
      <CaseStudies />
      <footer className="py-8 border-t border-slate-800 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} Dandy Firmansyah. Built with Next.js & Tailwind CSS.
      </footer>
    </main>
  );
}