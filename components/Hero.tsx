'use client';

import { Download, Globe, Mail, MapPin, Share2, Terminal, Sun, Moon, ToggleLeft } from 'lucide-react';
import { useTheme } from '@/app/theme-context';
import { JSX } from 'react/jsx-runtime';

export default function Hero() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    const next =
      theme === 'system'
        ? 'light'
        : theme === 'light'
          ? 'dark'
          : 'system';
    setTheme(next);
  };

  // Theme icon based on current mode
  let themeIcon: JSX.Element;
  if (theme === 'system') themeIcon = <ToggleLeft className="h-4 w-4" />;
  else if (theme === 'dark') themeIcon = <Moon className="h-4 w-4" />;
  else themeIcon = <Sun className="h-4 w-4" />;

  return (
    <section className="relative py-16 md:py-24 overflow-hidden" id="main-content">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="h-full w-full bg-[url('/file.svg')] bg-[length:300px_300px] opacity-5"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header with Theme Toggle */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <Terminal className="h-5 w-5" />
            <span className="text-sm font-mono px-3 py-1 rounded-full bg-surface-2/50 border border-surface-2">
              Senior Software Engineer • 8+ YOE
            </span>
          </div>

          <button
            onClick={handleThemeChange}
            className="p-2 rounded-full hover:bg-surface-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
            aria-label="Toggle theme"
          >
            {themeIcon}
          </button>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 max-w-2xl">
          Dandy Firmansyah
        </h1>

        <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-8 max-w-3xl">
          Specializing in scalable backend infrastructure, microservices, and database performance.
          Proven track record in refactoring enterprise systems, migrating event pipelines, and
          optimizing high-throughput financial architectures across fintech and enterprise logistics.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-foreground/50 mb-8">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} />
            <span>Malang, Indonesia</span>
          </div>
          <span className="text-foreground/30">•</span>
          <div className="flex items-center gap-2 bg-surface-2 px-3 py-1 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary/25"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
            </span>
            <span>Open to Senior / Staff IC & Global Remote</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          {/* Primary CTA - Download CV */}
          <a
            href="/Dandy_Firmansyah_Resume_2026.pdf"
            download="Dandy_Firmansyah_Resume_2026.pdf"
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white px-5 py-2.5 rounded-lg font-semibold transition-all hover-lift"
          >
            <Download size={16} /> Download CV
          </a>

          {/* Secondary CTA - View Case Studies */}
          <a
            href="#case-studies"
            className="flex items-center gap-2 border border-surface-2 px-5 py-2.5 rounded-lg font-semibold transition-all hover-lift hover:bg-surface-2 hover:text-foreground/90"
          >
            <Share2 size={16} /> View Case Studies
          </a>

          {/* Tertiary CTA - LinkedIn */}
          <a
            href="https://linkedin.com/in/dandy-firmansyah-b12332140"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-surface-2 px-4 py-2.5 rounded-lg font-semibold transition-all hover-lift hover:bg-surface-3 hover:text-foreground"
          >
            <Globe size={16} /> LinkedIn
          </a>

          {/* Email */}
          <a
            href="mailto:dandyfirmansyah1998@gmail.com"
            className="flex items-center gap-2 bg-surface-2 px-4 py-2.5 rounded-lg font-semibold transition-all hover-lift hover:bg-surface-3 hover:text-foreground"
          >
            <Mail size={16} /> Email
          </a>
        </div>

        {/* Social Proof / Metrics */}
        <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-surface-2">
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-primary">8+</div>
            <div className="text-sm text-foreground/60">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-primary">4+</div>
            <div className="text-sm text-foreground/60">Major Companies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-primary">12+</div>
            <div className="text-sm text-foreground/60">Systems Modernized</div>
          </div>
        </div>
      </div>
    </section>
  );
}