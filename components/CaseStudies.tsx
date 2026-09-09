'use client';

import { useState, useMemo } from 'react';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import {
    Layers,
    Cpu,
    Radio,
    Database,
    Activity,
    ShieldCheck,
    Rocket,
    Box,
    Zap,
    MessageSquare,
    ChevronDown,
    ChevronUp,
    Filter,
    Search,
    Sliders,
    Layout,
    List,
    Plus,
    X,
} from 'lucide-react';

export default function CaseStudies() {
    const [selectedCompany, setSelectedCompany] = useState<string>("All");
    const [selectedTag, setSelectedTag] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [expandedIndices, setExpandedIndices] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

    const companies = [
        "All",
        "Batumbu Fintech",
        "Meratus Group",
        "Flip",
        "PT Multi Guna Gemilang",
    ];

    const cases = [
        {
            icon: <Database className="text-cyan-400" size={20} />,
            title: "Single Source of Truth (SSOT) & Domain Overhaul",
            company: "Batumbu Fintech",
            tag: "Database Modernization & Architecture",
            techStack: [
                "LMS: Node.js (Express.js) • PostgreSQL",
                "LOS: Golang • MySQL / PostgreSQL",
            ],
            problem:
                "Master entities (Borrowers, Facilities, Partners, Virtual Accounts) were duplicated across both Originating System (LOS/BOS) and Loan Management System (LMS) databases due to legacy vendor development. Async sync jobs frequently failed, causing data drift and missing Facility data for operational teams.",
            solution:
                "Stripped redundant master data from LMS PostgreSQL to enforce an SSOT model in BOS/LOS. Refactored cross-database queries into resilient service-to-service RESTful API calls. Managed rollout safely using Feature Flags and dedicated pre-requisite integration test suites.",
            diagram: `
    graph TD
        subgraph "Legacy Architecture"
            LMS_Old[LMS: Express.js] -->|Direct Join| LMS_DB_Old[(LMS DB: Postgres - Duplicated Data)]
            BOS_Old[LOS: Golang] -.->|Failed Async Sync| LMS_DB_Old
        end

        subgraph "Modernized SSOT Architecture"
            LMS_New[LMS: Express.js] -->|REST Call| BOS_New[LOS: Golang - SSOT Owner]
            LMS_New -->|Transactional Data Only| LMS_DB_New[(LMS DB: Postgres - Trimmed)]
            BOS_New -->|Master Data Query| BOS_DB[(BOS DB: MySQL/Postgres)]
        end
          `,
            impact: [
                "Eliminated master data drift and sync failure incidents across polyglot microservices.",
                "Significantly reduced PostgreSQL memory usage and database storage footprint.",
                "Enforced clean domain boundary separation across Express.js and Golang codebases.",
            ],
        },
        {
            icon: <Layers className="text-cyan-400" size={20} />,
            title: "Golang Microservices & Monorepo Standardization",
            company: "Batumbu Fintech",
            tag: "Developer Velocity & Monorepo",
            techStack: [
                "Core: Golang Monorepo",
                "Observability: OpenTelemetry • Jaeger",
            ],
            problem:
                "Rapid expansion of Golang microservices created severe code duplication across individual repositories (auto-instrumentation, custom middleware, HTTP clients, and shared utilities). Updating shared logic required tedious, repetitive PRs across all repos.",
            solution:
                "Initiated and co-architected a unified Golang Monorepo structure. Established a centralized shared internal library (pkg/) for middleware, HTTP/cURL clients, and OpenTelemetry tracing hooks.",
            diagram: `
    graph TD
        subgraph "Multi-Repo Overhead"
            RepoA[Service A Repo] -->|Duplicated Utils| CodeA[Redundant Logic]
            RepoB[Service B Repo] -->|Duplicated Utils| CodeB[Redundant Logic]
        end

        subgraph "Unified Golang Monorepo"
            Monorepo[Golang Monorepo]
            Monorepo --> SharedPkg[pkg/ Shared Packages]
            SharedPkg --> M1[Tracing & Middleware]
            SharedPkg --> M2[Standardized HTTP Clients]
            Monorepo --> ServiceA[apps/service-a]
            Monorepo --> ServiceB[apps/service-b]
        end
          `,
            impact: [
                "Reduced cross-cutting code updates from multi-repo PRs to a single atomic commit.",
                "Guaranteed 100% architectural uniformity across all Go microservices.",
                "Optimized baseline binary memory overhead across deployments.",
            ],
        },
        {
            icon: <Radio className="text-cyan-400" size={20} />,
            title: "Cloud Event Migration (RabbitMQ to GCP Pub/Sub)",
            company: "Batumbu Fintech",
            tag: "Cloud Messaging & Infrastructure",
            techStack: [
                "Stack: Express.js • GCP Pub/Sub",
                "Infra: Docker • Google Cloud Run",
            ],
            problem:
                "LMS relied on self-hosted RabbitMQ on dedicated Virtual Machines (VMs). Managing RabbitMQ clusters required continuous OS patching, VM maintenance, and manual intervention during high-volume spikes.",
            solution:
                "Migrated the async messaging pipeline to managed GCP Pub/Sub. Refactored background worker services to handle Pub/Sub subscriptions with native Dead Letter Queues (DLQ) and OpenTelemetry context propagation.",
            diagram: `
    graph LR
        Producer[LMS Event Producer] -->|Publish Event| PubSub[GCP Pub/Sub Managed Engine]
        PubSub -->|Push Subscription| Worker[Node Worker Service]
        PubSub -->|Failed Message Retry| DLQ[Dead Letter Queue]
        Worker -->|Trace Context| OTel[Cloud Logging & Tracing]
          `,
            impact: [
                "Reduced messaging VM infrastructure overhead by ~80%.",
                "Eliminated manual cluster maintenance and server downtime risks.",
                "Gained auto-scaling resilience during bulk loan extension processing.",
            ],
        },
        {
            icon: <Cpu className="text-cyan-400" size={20} />,
            title: "High-Throughput On-Demand Interest & Late Fee Engine",
            company: "Batumbu Fintech",
            tag: "System Design, Golang & Domain Modeling",
            techStack: [
                "Stack: Golang (Calculation Service) • Express.js (LMS) • PostgreSQL • Redis",
            ],
            problem:
                "Outstanding Interest (OS) and Late Fee calculations relied on nightly batch cron jobs that frequently timed out as loan volumes scaled. Furthermore, the legacy calculation formulas within the LMS were broken and produced inaccurate balance states.",
            solution:
                "Initiated and engineered a dedicated Golang Transaction Service from scratch. Collaborated closely with Product teams to align accurate financial formulas, replacing broken legacy logic with a high-throughput, on-demand calculation engine triggered directly by LMS events.",
            diagram: `
    sequenceDiagram
        autonumber
        actor User as Operational User / Borrower
        participant LMS as Legacy LMS (Express.js)
        participant Calc as Golang Calculation Service
        participant Cache as Redis Cache
        participant DB as PostgreSQL DB

        User->>LMS: Query Balance / Initiate Payment
        LMS->>Calc: Request Real-Time Calculation (REST)
        Calc->>Cache: Check Cached State
        alt Cache Miss / Expired
            Calc->>DB: Fetch Principal & Repayment Schedule
            Calc->>Calc: Execute Corrected Formula On-The-Fly
            Calc->>Cache: Update Cache State
        end
        Calc-->>LMS: Return Computed OS & Late Fees
        LMS-->>User: Display 100% Accurate Balance
          `,
            impact: [
                "Initiated and delivered a 0-to-1 Golang calculation engine, completely fixing legacy formula bugs.",
                "Eliminated 100% of nightly batch script timeouts and processing delays.",
                "Guaranteed 100% financial calculation accuracy at point-of-execution across active loans.",
            ],
        },
        {
            icon: <Activity className="text-cyan-400" size={20} />,
            title: "Automated Distributed Tracing & OpenTelemetry",
            company: "Batumbu Fintech",
            tag: "Observability & DX",
            techStack: ["Stack: Golang • OpenTelemetry • Grafana"],
            problem:
                "Manual OpenTelemetry span instantiation (NewTraceSpan) across Golang handlers, usecases, repositories, and outbound integrations led to missing trace data whenever developers forgot to write manual tracing code.",
            solution:
                "Researched and integrated automated instrumentation to capture entire API execution lifecycles (HTTP handlers, database queries, and external cURL calls) automatically without manual boilerplate.",
            diagram: `
    graph LR
        Client[API Request] -->|Auto-Traced| Handler[HTTP Handler]
        Handler -->|Context Propagation| UC[Usecase Layer]
        UC -->|Auto-Intercepted| DB[(PostgreSQL Query)]
        UC -->|Auto-Intercepted| Ext[External Service / cURL]

        Handler -.->|Export Spans| OTel[OpenTelemetry Collector]
        OTel -->|Visualize| Grafana[Grafana / Jaeger Dashboard]
          `,
            impact: [
                "Eliminated manual tracing boilerplate and developer human-error across Go microservices.",
                "Achieved end-to-end distributed trace visibility from API entry points down to SQL queries.",
                "Accelerated root-cause analysis and performance bottleneck detection in production.",
            ],
        },
        {
            icon: <Database className="text-cyan-400" size={20} />,
            title: "Database Consolidation & MongoDB Deprecation",
            company: "Batumbu Fintech",
            tag: "Infrastructure & Cost Optimization",
            techStack: [
                "Stack: Express.js (Node.js) • PostgreSQL • MongoDB • Metabase",
            ],
            problem:
                "LMS relied on a separate MongoDB cluster for transactional/config data (Loan Drafts, Repayment Configs, Loan Migrations). Maintaining Mongo alongside PostgreSQL incurred unnecessary cloud infrastructure costs and required restricted production DB access just to troubleshoot data discrepancies.",
            solution:
                "Deprecated MongoDB usage by migrating persistent configs and drafts into structured PostgreSQL schemas, eliminating redundant stored states and enabling unified query access.",
            diagram: `
    graph TD
        subgraph "Legacy Architecture"
            LMS_Old[LMS Express.js] -->|Transactional| PG_Old[(PostgreSQL)]
            LMS_Old -->|Drafts & Configs| Mongo[(MongoDB - Restricted Access)]
            Engineer_Old[Engineers] -.->|Request Escalation| ProdAccess[Prod Access Holder]
            ProdAccess -.->|Manual Query| Mongo
        end

        subgraph "Modernized Architecture"
            LMS_New[LMS Express.js] -->|Consolidated Data| PG_New[(PostgreSQL - Primary SSOT)]
            PG_New -->|Sync Read Replica| Metabase[Metabase Analytics & Tracing]
            Engineers[Engineers] -->|Self-Service Tracing| Metabase
        end
          `,
            impact: [
                "Successfully decommissioned MongoDB, cutting cloud database hosting and maintenance costs.",
                "Eliminated production DB access bottlenecks by allowing engineers to self-serve data tracing via Metabase.",
                "Streamlined missing/inconsistent data investigation across transactional loan workflows.",
            ],
        },
        {
            icon: <ShieldCheck className="text-cyan-400" size={20} />,
            title: "Automated On-Call Governance & Checker-Maker Workflow",
            company: "Batumbu Fintech",
            tag: "Engineering Operations & Internal Tooling",
            techStack: [
                "Orchestration: Windmill",
                "Languages: Golang • Node.js (TypeScript)",
                "Integrations: Google Chat Webhooks • PostgreSQL",
            ],
            problem:
                "On-call engineers frequently performed manual production database edits (e.g., loan backdating, settlement cancellations, hotfixes). This created severe security hazards, lacked audit logging, and caused operational bottlenecks waiting for lead access approvals.",
            solution:
                "Engineered an automated operational suite using Windmill for workflow orchestration paired with Google Chat webhooks. Developed polyglot automation scripts (Golang / Node.js) enabling engineers to submit parameterized fix requests that leads approve in-chat before automated execution.",
            diagram: `
    sequenceDiagram
        autonumber
        actor Engineer as On-Call Engineer
        participant WM as Windmill Platform
        participant GC as Google Chat Webhook
        actor Lead as Lead Approver
        participant Script as Polyglot Worker (Go / Node)
        participant DB as Production PostgreSQL

        Engineer->>WM: Trigger Data Fix Job (Backdate / Cancel)
        WM->>GC: Post Approval Request Card
        Lead->>GC: Click "Approve Action"
        GC->>WM: Callback Webhook Trigger
        WM->>Script: Execute Sandboxed Script (Go / Node)
        Script->>DB: Apply Mutation & Log Audit Trail
        WM->>Engineer: Notify Execution Success
          `,
            impact: [
                "Eliminated risky direct database access by engineers, establishing a 100% compliant audit log.",
                "Empowered teams to write operational scripts in their language of choice (Golang or Node.js) via Windmill.",
                "Streamlined incident response time and data hotfixes from hours to a few clicks.",
            ],
        },
        {
            icon: <Rocket className="text-cyan-400" size={20} />,
            title: "0-to-1 Enterprise SuperApp & ERP Integration",
            company: "Meratus Group",
            tag: "Greenfield Architecture & Tech Leadership",
            techStack: [
                "Backend: .NET Core • PostgreSQL",
                "Frontend: Vue.js",
                "Cloud & Security: GCP • HashiCorp Vault",
            ],
            problem:
                "Meratus required a centralized flagship SuperApp to unify fragmented logistics booking services. The system needed a greenfield architecture built from 0-to-1 that could seamlessly integrate with legacy internal ERP systems while maintaining strict transactional data integrity.",
            solution:
                "Led technical design and initial development as Tech Lead across a team of 5 engineers. Authored core Technical Design Documents (TDD), architected a relational database schema in PostgreSQL, designed synchronized REST API contracts for legacy ERP integration, and established security practices using HashiCorp Vault on GCP.",
            diagram: `
    graph TD
        subgraph "Client Layer"
            Web[Vue.js Web Portal] -->|API Request| Gateway[.NET Core API Gateway]
            Mobile[Mobile App] -->|API Request| Gateway
        end

        subgraph "Core Logistics Platform"
            Gateway -->|Business Logic| Service[.NET Core SuperApp Service]
            Service -->|Relational Data Store| PG[(PostgreSQL)]
            Service -.->|Fetch Secrets & Config| Vault[HashiCorp Vault]
        end

        subgraph "Enterprise Integration"
            Service <-->|Synchronized API Contracts| ERP[Legacy Internal ERP]
        end
          `,
            impact: [
                "Successfully architected and launched the initial 0-to-1 foundation for the flagship logistics SuperApp.",
                "Designed a high-performance PostgreSQL schema for complex logistics order bookings.",
                "Unblocked feature delivery by establishing clear API contracts with the internal ERP engineering team.",
                "Elevated engineering standards by introducing TDD templates and centralized HashiCorp Vault secrets management.",
            ],
        },
        {
            icon: <Zap className="text-cyan-400" size={20} />,
            title:
                "Sub-Second Latency Optimization for International Transfer Engine",
            company: "Flip",
            tag: "Performance Engineering & Caching Strategy",
            techStack: ["Stack: PHP (Yii2) • Redis • MySQL"],
            problem:
                "The international transfer rate-calculation engine suffered from severe latency bottlenecks (4–8 seconds). Heavy on-the-fly multi-country margin loops were re-calculated on every request, creating performance degradation as country routes scaled.",
            solution:
                "Re-architected the margin calculation pipeline by implementing an optimized multi-tier Redis caching strategy. Pre-computed dynamic country margins and exchange rates while serving cached payloads to bypass expensive loop evaluations.",
            diagram: `
    graph TD
        subgraph "Legacy Architecture (4s - 8s)"
            Client_Old[Client / Mobile] -->|GET /rates| API_Old[Yii2 Monolith Engine]
            API_Old -->|Heavy Nested Margin Loops| Calc[On-The-Fly Computation]
            Calc -->|Multiple SQL Queries| DB_Old[(MySQL Database)]
        end

        subgraph "Optimized Architecture (<800ms)"
            Client_New[Client / Mobile] -->|GET /rates| API_New[Rate Service Engine]
            API_New -->|1. Instant Read| Cache[(Redis Caching Layer)]

            Cache -.->|2. Async Recalculate| Worker[Margin Background Job]
            Worker -.->|3. Write Back| DB_New[(MySQL Database)]
        end
          `,
            impact: [
                "Slashed API response latency from 4–8 seconds to under 800ms (>80% speed improvement).",
                "Eliminated CPU-intensive computation loops on high-throughput international transfer endpoints.",
                "Maintained sub-second response times seamlessly as support for new country corridors expanded.",
            ],
        },
        {
            icon: <Box className="text-cyan-400" size={20} />,
            title: "Monolith Decomposition: Digital Products Go Microservice",
            company: "Flip",
            tag: "Microservices & Greenfield Migration",
            techStack: ["Stack: Golang • PHP (Yii2) Monolith • MySQL • Docker"],
            problem:
                "High-volume Digital Products (mobile top-ups, electricity tokens, data packages) were coupled inside a legacy PHP (Yii2) monolith, causing deployment contention and database locking during high-concurrency peak sales.",
            solution:
                "Partnered with Staff Engineers to initiate and construct a dedicated Golang microservice from scratch. Decoupled Master Catalog and Pricing management out of the monolith into a high-performance Go service.",
            diagram: `
    graph TD
        subgraph "Legacy Monolith"
            Mono[PHP Yii2 Monolith Engine]
            Mono -->|Coupled Domain| Catalog[Digital Products Catalog & Pricing]
            Mono -->|Coupled Domain| Orders[Transactions & Core Payments]
        end

        subgraph "Decoupled Microservice Architecture"
            Mono_New[Legacy Core Platform]
            NewService[Dedicated Go Microservice]

            Mono_New -->|REST API| NewService
            NewService -->|Isolated Storage| NewDB[(Digital Products DB)]
        end
          `,
            impact: [
                "Successfully extracted core Digital Products domain out of legacy monolith debt.",
                "Established clean Go project scaffolding, unit testing standards, and CI/CD pipelines.",
                "Earned promotion to Mid-Level Engineer within 6 months for technical ownership and execution.",
            ],
        },
        {
            icon: <MessageSquare className="text-cyan-400" size={20} />,
            title: "Real-Time Logistics, IoT Geofencing & Messaging Platform",
            company: "PT Multi Guna Gemilang",
            tag: "Full-Stack Development & Real-Time IoT Systems",
            techStack: [
                "Backend: Node.js • Express.js • MongoDB • Socket.io",
                "Frontend & Mobile: Vue.js • Quasar Framework",
                "DevOps: Docker • GitLab CI/CD",
            ],
            problem:
                "Enterprise logistics clients needed real-time shipment location tracking and instant communication. Manual arrival updates led to delayed unloading schedules at ports/warehouses due to lack of advance visibility.",
            solution:
                "Engineered a real-time tracking and messaging platform powered by Node.js and Socket.io. Built an automated IoT geofencing trigger that processes GPS signals attached to trucks/containers, automatically broadcasting arrival alerts when near ports to initiate downstream offloading operations.",
            diagram: `
    graph TD
        subgraph "IoT & Device Layer"
            Tracker[Container / Truck GPS Tracker] -->|Push Coordinates| Gateway[Node.js Ingestion Engine]
        end

        subgraph "Geofencing & Real-Time Engine"
            Gateway -->|Proximity Check| Geofence{Near Port / Warehouse?}
            Geofence -->|Yes: Proximity Triggered| Alert[Automated Arrival Event]
            Alert -->|Broadcast Alert| Socket[Socket.io WebSockets Engine]
        end

        subgraph "Client App Layer (Vue/Quasar)"
            Socket <-->|Bi-Directional Messaging & Map Alerts| Web[Dispatcher Web Portal]
            Socket <-->|Live Driver Updates| Mobile[Quasar Mobile App]
        end
          `,
            impact: [
                "Automated port arrival notifications, streamlining port/warehouse offloading schedules.",
                "Delivered sub-second real-time tracking updates and chat messaging across web and mobile clients.",
                "Eliminated DB polling overhead by using WebSocket event streams and lightweight IoT ingestion.",
            ],
        },
    ];

    // Get all unique tags from cases
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        cases.forEach(caseItem => {
            caseItem.techStack.forEach(tech => tags.add(tech));
            tags.add(caseItem.tag);
        });
        return Array.from(tags).sort();
    }, []);

    // Filter and search cases
    const filteredCases = useMemo(() => {
        return cases
            .filter(caseItem => {
                // Company filter
                const companyMatch = selectedCompany === "All" || caseItem.company === selectedCompany;

                // Tag filter
                const tagMatch = selectedTag === "All" ||
                    caseItem.tag === selectedTag ||
                    caseItem.techStack.some(tech => tech.toLowerCase().includes(selectedTag.toLowerCase()));

                // Search filter
                const searchMatch = !searchQuery ||
                    caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    caseItem.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    caseItem.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    caseItem.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    caseItem.solution.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    caseItem.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

                return companyMatch && tagMatch && searchMatch;
            })
            .sort((a, b) => {
                // Sort by company name, then title
                if (a.company < b.company) return -1;
                if (a.company > b.company) return 1;
                if (a.title < b.title) return -1;
                if (a.title > b.title) return 1;
                return 0;
            });
    }, [selectedCompany, selectedTag, searchQuery, cases]);

    const toggleExpand = (originalIndex: number) => {
        setExpandedIndices((prev) =>
            prev.includes(originalIndex)
                ? prev.filter((i) => i !== originalIndex)
                : [...prev, originalIndex]
        );
    };

    const expandAll = () => setExpandedIndices(filteredCases.map((_, i) => i));
    const collapseAll = () => setExpandedIndices([]);

    return (
        <section className="py-16">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header with Controls */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">
                            Architectural Case Studies
                        </h2>
                        <p className="text-sm text-foreground/50">
                            Deep-dive technical walkthroughs of high-impact engineering
                            solutions from production environments.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        {/* Search */}
                        <div className="relative w-48 md:w-64">
                            <div className="flex items-center gap-2 px-3 py-1">
                                <Search className="h-4 w-4 text-foreground/50" />
                                <input
                                    type="text"
                                    placeholder="Search case studies..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent text-sm text-foreground focus:outline-none focus:ring-0 placeholder-foreground/40"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="p-1 rounded hover:bg-surface-2 text-foreground/50 hover:text-foreground/70 transition-colors"
                                        aria-label="Clear search"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`flex items-center gap-1 px-2 py-1 rounded text-sm font-mono transition-all ${viewMode === 'list'
                                    ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
                                    : "bg-surface-1 text-foreground/60 hover:bg-surface-2"
                                    }`}
                            >
                                <List className="h-4 w-4" />
                                <span className="hidden md:inline">List</span>
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`flex items-center gap-1 px-2 py-1 rounded text-sm font-mono transition-all ${viewMode === 'grid'
                                    ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
                                    : "bg-surface-1 text-foreground/60 hover:bg-surface-2"
                                    }`}
                            >
                                <Layout className="h-4 w-4" />
                                <span className="hidden md:inline">Grid</span>
                            </button>
                        </div>

                        {/* Company Filter */}
                        <div className="relative">
                            <button
                                onClick={() => setSelectedCompany("All")}
                                className={`w-full text-left text-xs font-mono px-4 py-2 border border-surface-2 rounded bg-surface-1 hover:bg-surface-2 transition-colors ${selectedCompany === "All"
                                    ? "bg-brand-primary/20 text-brand-primary"
                                    : ""}
                                `}
                            >
                                <div className="flex items-start gap-2">
                                    <Layout className="h-4 w-4 text-foreground/50" />
                                    <span>{selectedCompany === "All" ? "All Companies" : selectedCompany}</span>
                                    <svg className="h-4 w-4 text-foreground/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </button>
                            <div className="absolute left-0 mt-2 w-56 bg-surface-1 border border-surface-2 rounded-lg shadow-lg z-10 max-h-[200px] overflow-y-auto">
                                {companies.map((company, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedCompany(company)}
                                        className={`w-full text-left text-xs font-mono px-4 py-2 hover:bg-surface-2 transition-colors ${selectedCompany === company
                                            ? "bg-brand-primary/20 text-brand-primary"
                                            : ""}
                                        `}
                                    >
                                        {company}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tag Filter */}
                        <div className="relative">
                            <button
                                onClick={() => setSelectedTag("All")}
                                className={`w-full text-left text-xs font-mono px-4 py-2 border border-surface-2 rounded bg-surface-1 hover:bg-surface-2 transition-colors ${selectedTag === "All"
                                    ? "bg-brand-primary/20 text-brand-primary"
                                    : ""}
                                `}
                            >
                                <div className="flex items-start gap-2">
                                    <Sliders className="h-4 w-4 text-foreground/50" />
                                    <span>{selectedTag === "All" ? "All Tags" : selectedTag}</span>
                                    <svg className="h-4 w-4 text-foreground/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </button>
                            <div className="absolute left-0 mt-2 w-56 bg-surface-1 border border-surface-2 rounded-lg shadow-lg z-10 max-h-[200px] overflow-y-auto">
                                {allTags.map((tag, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedTag(tag)}
                                        className={`w-full text-left text-xs font-mono px-4 py-2 hover:bg-surface-2 transition-colors ${selectedTag === tag
                                            ? "bg-brand-primary/20 text-brand-primary"
                                            : ""}
                                        `}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 text-xs font-mono">
                            <button
                                onClick={expandAll}
                                className="text-brand-primary hover:text-brand-primary/80 transition-colors"
                            >
                                Expand All
                            </button>
                            <span className="text-foreground/40">•</span>
                            <button
                                onClick={collapseAll}
                                className="text-foreground/50 hover:text-foreground/70 transition-colors"
                            >
                                Collapse All
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Summary */}
                <div className="mb-6">
                    <p className="text-sm text-foreground/60">
                        Showing {filteredCases.length} of {cases.length} case studies
                        {selectedCompany !== "All" && ` • ${selectedCompany}`}
                        {selectedTag !== "All" && ` • ${selectedTag}`}
                        {searchQuery && ` • "${searchQuery}"`}
                    </p>
                </div>

                {/* Case Studies Display */}
                {filteredCases.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-foreground/50">No case studies match your filters.</p>
                        <button
                            onClick={() => {
                                setSelectedCompany("All");
                                setSelectedTag("All");
                                setSearchQuery("");
                                setViewMode('list');
                            }}
                            className="mt-4 px-4 py-2 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 rounded-lg transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {viewMode === 'list' ? (
                            <>
                                {filteredCases.map((item, idx) => {
                                    const isExpanded = expandedIndices.includes(idx);

                                    return (
                                        <div
                                            key={idx}
                                            className="group bg-surface-1 border border-surface-2 rounded-lg overflow-hidden hover:border-brand-primary/50 transition-all"
                                        >
                                            {/* Case Card Header (always visible) */}
                                            <div className="p-4 border-b border-surface-2 cursor-pointer"
                                                onClick={() => toggleExpand(idx)}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="flex-shrink-0">
                                                        <div className="p-2 bg-surface-2 rounded-lg">
                                                            {item.icon}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
                                                            {item.title}
                                                        </h3>
                                                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-foreground/50">
                                                            <span className="text-foreground/40 font-medium">
                                                                {item.company}
                                                            </span>
                                                            <span className="mx-1">•</span>
                                                            <span className="bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded text-xs font-mono">
                                                                {item.tag}
                                                            </span>
                                                        </div>
                                                        <p className="mt-1 text-sm text-foreground/40 line-clamp-2">
                                                            {item.problem.substring(0, 100)}{item.problem.length > 100 ? '...' : ''}
                                                        </p>
                                                    </div>
                                                    <div className="flex-shrink-0 text-foreground/40 hover:text-foreground/60 transition-colors">
                                                        {isExpanded ? (
                                                            <ChevronUp className="h-4 w-4" />
                                                        ) : (
                                                            <ChevronDown className="h-4 w-4" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Expandable Content */}
                                            {isExpanded && (
                                                <div className="px-4 pt-4 pb-6 border-t border-surface-2">
                                                    {/* Tech Badges */}
                                                    <div className="flex flex-wrap gap-2 mb-4 pt-2">
                                                        {item.techStack.map((tech, tIdx) => (
                                                            <span
                                                                key={tIdx}
                                                                className="text-xs font-mono bg-surface-2 text-foreground/60 px-2.5 py-1 rounded border border-surface-2/50"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    {/* Problem & Solution */}
                                                    <div className="space-y-4">
                                                        <div>
                                                            <strong className="text-foreground block mb-1">
                                                                Challenge:
                                                            </strong>
                                                            <p className="text-foreground/70 leading-relaxed text-sm">
                                                                {item.problem}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <strong className="text-foreground block mb-1">
                                                                Solution:
                                                            </strong>
                                                            <p className="text-foreground/70 leading-relaxed text-sm">
                                                                {item.solution}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Diagram */}
                                                    <div className="my-6">
                                                        <strong className="text-foreground block mb-2">
                                                            System Architecture Flow:
                                                        </strong>
                                                        <ArchitectureDiagram chart={item.diagram} />
                                                    </div>

                                                    {/* Impact */}
                                                    <div>
                                                        <strong className="text-foreground block mb-2">
                                                            Key Impact & Results:
                                                        </strong>
                                                        <ul className="list-disc list-inside space-y-2 text-foreground/60 text-sm font-mono">
                                                            {item.impact.map((imp, iIdx) => (
                                                                <li key={iIdx}>{imp}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                                {filteredCases.map((item, idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            className="bg-surface-1 border border-surface-2 rounded-lg overflow-hidden hover:border-brand-primary/50 transition-all"
                                        >
                                            {/* Card Content */}
                                            <div className="p-6">
                                                <div className="flex items-start gap-3 mb-4">
                                                    <div className="flex-shrink-0">
                                                        <div className="p-2 bg-surface-2 rounded-lg">
                                                            {item.icon}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-semibold text-foreground mb-2">
                                                            {item.title}
                                                        </h3>
                                                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-foreground/50">
                                                            <span className="text-foreground/40 font-medium">{item.company}</span>
                                                            <span className="mx-1">•</span>
                                                            <span className="bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded text-xs font-mono">
                                                                {item.tag}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-foreground/60 mb-4 line-clamp-3">
                                                            {item.problem}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Tech Stack Preview */}
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {item.techStack.slice(0, 3).map((tech, tIdx) => (
                                                        <span
                                                            key={tIdx}
                                                            className="text-xs font-mono bg-surface-2 text-foreground/60 px-2.5 py-1 rounded border border-surface-2/50"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {item.techStack.length > 3 && (
                                                        <span className="text-xs font-mono text-foreground/50">
                                                            +{item.techStack.length - 3} more
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Impact Highlights */}
                                                <div className="space-y-2">
                                                    {item.impact.slice(0, 2).map((impact, idx) => (
                                                        <div key={idx} className="flex items-start gap-2">
                                                            <span className="flex-shrink-0">
                                                                <span className="text-xs font-mono bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded">
                                                                    •
                                                                </span>
                                                            </span>
                                                            <span className="text-sm text-foreground/60">{impact}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* View Details Button */}
                                                <button
                                                    onClick={() => {
                                                        setExpandedIndices([idx]); // Expand this item
                                                        setViewMode('list'); // Switch to list view to see expanded
                                                    }}
                                                    className="w-full text-left text-sm font-mono px-3 py-2 bg-surface-2 border border-surface-2 rounded hover:bg-surface-3 transition-colors"
                                                >
                                                    View Details < ChevronDown className="h-4 w-4 ml-1" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}