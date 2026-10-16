import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock,
  Lock,
  Calendar,
  Sparkles,
  Terminal,
  Flame,
  Layers,
  Zap
} from 'lucide-react';

interface BlogViewProps {
  onBack: () => void;
  onNavigateToContact: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onBack, onNavigateToContact }) => {
  const [selectedArticle, setSelectedArticle] = useState<'digests' | 'data-egress'>('digests');

  return (
    <div className="relative bg-[#ffffff] text-[#0a0a0a] font-sans selection:bg-[#d97706] selection:text-white min-h-screen overflow-x-hidden">
      
      {/* Background Watermark — AMBER ENGINE */}
      <div 
        aria-hidden="true" 
        className="fixed inset-0 flex flex-col justify-between items-center pointer-events-none select-none z-0 overflow-hidden opacity-[0.035]"
      >
        <div className="text-[17vw] font-black tracking-[-0.08em] leading-none uppercase text-black mt-24">
          AMBER
        </div>
        <div className="text-[15vw] font-black tracking-[-0.08em] leading-none uppercase text-black mb-12">
          ENGINE
        </div>
      </div>

      {/* Blog Top Navigation */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 md:px-16 py-6 z-50 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div 
          onClick={onBack}
          className="flex items-center gap-2.5 font-bold text-sm tracking-normal text-[#0a0a0a] cursor-pointer group"
        >
          <img 
            src="/assets/amber-symbol.svg" 
            alt="Amber Symbol" 
            className="w-7 h-9 object-contain drop-shadow-[0_2px_8px_rgba(217,119,6,0.3)] group-hover:scale-105 transition-transform duration-200" 
          />
          <span className="tracking-tight text-lg font-black text-[#0a0a0a]">AMBER</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={onBack}
            className="hidden sm:inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-stone-600 hover:text-black transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Overview</span>
          </button>

          <button
            type="button"
            onClick={onNavigateToContact}
            className="flex items-center gap-2 bg-[#d97706] hover:bg-black text-white px-5 py-2.5 rounded-full font-sans font-bold text-xs tracking-wider uppercase shadow-md shadow-[#d97706]/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer group"
          >
            <span>Deploy to VPC</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Main Blog Container */}
      <main className="relative z-10 pt-36 pb-24 px-6 sm:px-8 max-w-4xl mx-auto">
        
        {/* Editorial Journal Eyebrow */}
        <div className="mb-8 flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
            <span className="w-2 h-2 rounded-full bg-[#d97706]" />
            <span>Amber Engineering Journal</span>
          </div>
          <span className="text-xs font-mono text-stone-400">Production Reliability Research</span>
        </div>

        {/* Article Selector Switcher Tabs */}
        <div className="mb-12 p-1.5 rounded-2xl bg-stone-100 border border-stone-200/90 grid grid-cols-1 sm:grid-cols-2 gap-2">
          
          <button
            type="button"
            onClick={() => setSelectedArticle('digests')}
            className={`p-4 rounded-xl text-left transition-all cursor-pointer ${
              selectedArticle === 'digests'
                ? 'bg-white shadow-md border border-stone-300/80 text-stone-900'
                : 'hover:bg-white/60 text-stone-600 border border-transparent'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#b45309] bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md uppercase">
                <Sparkles className="w-3 h-3 text-[#d97706]" /> Featured · New
              </span>
              <span className="text-xs font-mono text-stone-400">6 Min Read</span>
            </div>
            <div className="text-sm font-bold tracking-tight text-stone-900">
              Automating Executive SRE Digests
            </div>
            <div className="text-xs text-stone-500 mt-0.5 line-clamp-1">
              5 monthly boardroom audits, host timezone detection, and disaster modeling.
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedArticle('data-egress')}
            className={`p-4 rounded-xl text-left transition-all cursor-pointer ${
              selectedArticle === 'data-egress'
                ? 'bg-white shadow-md border border-stone-300/80 text-stone-900'
                : 'hover:bg-white/60 text-stone-600 border border-transparent'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-stone-600 bg-stone-200/70 border border-stone-300 px-2 py-0.5 rounded-md uppercase">
                <Lock className="w-3 h-3 text-stone-600" /> Architecture
              </span>
              <span className="text-xs font-mono text-stone-400">7 Min Read</span>
            </div>
            <div className="text-sm font-bold tracking-tight text-stone-900">
              Incident Response Without Data Egress
            </div>
            <div className="text-xs text-stone-500 mt-0.5 line-clamp-1">
              Deterministic causal diagnosis and HMAC-SHA256 authorization inside VPC.
            </div>
          </button>

        </div>

        <AnimatePresence mode="wait">

          {/* ARTICLE 1: Automated Executive SRE Digests */}
          {selectedArticle === 'digests' && (
            <motion.div
              key="digests"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="mb-10">
                <div className="flex flex-wrap items-center gap-3 text-xs font-sans font-semibold tracking-wider text-stone-500 uppercase mb-4">
                  <span className="flex items-center gap-1.5 text-stone-600">
                    <Clock className="w-3.5 h-3.5 text-[#d97706]" />
                    6 Min Read
                  </span>
                  <span>•</span>
                  <span>October 2026</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-mono font-bold">In-VPC Automation</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0c0a09] tracking-tight leading-[1.08] mb-6 font-sans">
                  From 2 AM Outages to Monday 9:00 AM Boardrooms: Automating Executive Incident Audits
                </h1>

                <p className="text-base sm:text-xl text-stone-600 leading-relaxed font-normal mb-8 border-b border-stone-200 pb-8">
                  How Amber compiles 5 monthly reliability audits, detects host timezones via native OS symlinks, separates automated self-healing from permanent developer fixes, and models future catastrophic failures.
                </p>
              </div>

              {/* Body */}
              <article className="prose prose-stone max-w-none text-stone-800 text-base sm:text-lg leading-relaxed font-sans space-y-10">
                
                {/* Section 1 */}
                <section className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0c0a09] tracking-tight font-sans m-0">
                    The Incident Reporting Problem
                  </h2>
                  <p className="text-stone-700 leading-relaxed">
                    Engineering teams resolve production outages at 3:00 AM under pressure. The database pool gets drained, the offending container is rolled back, and service health recovers. 
                    The operational failure happens afterward: compiling the postmortem.
                  </p>
                  <p className="text-stone-700 leading-relaxed">
                    Senior on-call engineers spend four to six hours piecing together raw Datadog screenshots, Grafana latency curves, Slack threads, and ArgoCD commit logs into a Google Doc. 
                    CTOs and VPs of Engineering receive incomplete summaries that fail to quantify blast radius or financial impact. Meanwhile, compliance teams spend weeks assembling audit evidence for SOC-2 Type II evaluations.
                  </p>
                  <p className="text-stone-700 leading-relaxed">
                    Amber replaces this manual documentation cycle with a deterministic audit generation engine running inside your VPC.
                  </p>
                </section>

                {/* Section 2 */}
                <section className="space-y-4 pt-8 border-t border-stone-200/80">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0c0a09] tracking-tight font-sans m-0">
                    The 5-Audit Monthly Cadence
                  </h2>
                  <p className="text-stone-700 leading-relaxed">
                    Amber runs a scheduled audit pipeline structured around five specific monthly deliverables:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#b45309] mb-2 uppercase">
                        <Calendar className="w-4 h-4 text-[#d97706]" />
                        <span>4 Weekly SRE Digests</span>
                      </div>
                      <div className="text-sm font-bold text-stone-900 mb-1">
                        Dispatched Every Monday at 09:00 AM
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Summarizes all production anomalies from the preceding seven days. Includes mean time to acknowledge (MTTA), automated recovery speeds, microservice blast radii, and pending code remediation PRs.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#b45309] mb-2 uppercase">
                        <Layers className="w-4 h-4 text-[#d97706]" />
                        <span>1 Grand Monthly Master Audit</span>
                      </div>
                      <div className="text-sm font-bold text-stone-900 mb-1">
                        Published on the 1st of Each Month
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Compiles contractual SLA attainment figures, downtime avoided through autonomous self-healing, architectural debt patterns, and signed audit logs ready for external SOC-2 auditors.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 3: Timezone Auto-Detection */}
                <section className="space-y-4 pt-8 border-t border-stone-200/80">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0c0a09] tracking-tight font-sans m-0">
                    Zero-Config Timezone Detection
                  </h2>
                  <p className="text-stone-700 leading-relaxed">
                    A weekly digest scheduled for Monday at 9:00 AM UTC lands at 2:30 PM in India and 2:00 AM in San Francisco. Hardcoding timezones in static environment variables breaks down when running multi-region clusters or distributed engineering hubs.
                  </p>
                  <p className="text-stone-700 leading-relaxed">
                    Amber resolves the host machine's timezone directly from the operating system without manual user input. On container boot, Amber resolves the canonical target of the <code className="text-stone-900 bg-stone-100 px-1.5 py-0.5 rounded font-mono text-sm">/etc/localtime</code> symlink:
                  </p>

                  <div className="p-5 rounded-2xl bg-stone-900 text-stone-100 font-mono text-xs sm:text-sm border border-stone-800 shadow-md">
                    <div className="text-stone-400 font-bold mb-3 flex items-center justify-between">
                      <span>TIMEZONE RESOLUTION LOGIC</span>
                      <span className="text-emerald-400 font-mono text-xs">Zero Env Config</span>
                    </div>
                    <pre className="text-amber-300 whitespace-pre-wrap overflow-x-auto leading-relaxed">
{`def get_system_timezone() -> str:
    # 1. Inspect Linux host symlink
    if os.path.islink("/etc/localtime"):
        target = os.readlink("/etc/localtime")
        # e.g., /usr/share/zoneinfo/Asia/Kolkata -> Asia/Kolkata
        parts = target.split("zoneinfo/")
        if len(parts) > 1:
            return parts[1]

    # 2. Fallback to /etc/timezone contents
    if os.path.exists("/etc/timezone"):
        with open("/etc/timezone", "r") as f:
            return f.read().strip()

    # 3. Fallback to system tzset / UTC
    return time.tzname[0] or "UTC"`}
                    </pre>
                  </div>

                  <p className="text-stone-700 leading-relaxed">
                    By binding scheduler cron jobs to the host machine's evaluated timezone, digests arrive at 09:00 AM in the local operating environment where the cluster runs.
                  </p>
                </section>

                {/* Section 4: Dual-Tier Incident Chronology */}
                <section className="space-y-4 pt-8 border-t border-stone-200/80">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0c0a09] tracking-tight font-sans m-0">
                    Dual-Tier Resolution: Immediate Fix vs Permanent Fix
                  </h2>
                  <p className="text-stone-700 leading-relaxed">
                    Incident management systems treat remediation as a single binary event: an incident is either open or closed. In production engineering, an incident requires two distinct remediations:
                  </p>

                  <div className="space-y-4 my-6">
                    <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200 text-stone-800">
                      <div className="flex items-center gap-2 font-bold text-amber-950 text-sm mb-1">
                        <Zap className="w-4 h-4 text-[#d97706]" />
                        <span>Tier 1: Immediate Automated Self-Healing (Seconds)</span>
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed">
                        Restores service availability immediately under compile-time guardrails. Examples include restarting crashed worker pods, killing hung PostgreSQL connection queries exceeding 300 seconds, or rolling back an unhealthy Kubernetes deployment revision. Amber executes this in under 10 seconds.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-blue-50/70 border border-blue-200 text-stone-800">
                      <div className="flex items-center gap-2 font-bold text-blue-950 text-sm mb-1">
                        <Terminal className="w-4 h-4 text-blue-600" />
                        <span>Tier 2: Permanent Developer Code Fix (Days)</span>
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed">
                        Eliminates the underlying root cause in source control. Amber matches log stack traces to git commit diffs, generating a structured pull request detailing the missing database index, unclosed cursor, or misconfigured timeout parameter.
                      </p>
                    </div>
                  </div>

                  <p className="text-stone-700 leading-relaxed">
                    The weekly executive digest tracks both tiers side-by-side, giving leadership a clear view of which services recovered and which pull requests remain unmerged in GitHub or GitLab.
                  </p>
                </section>

                {/* Section 5: Disaster Modeling */}
                <section className="space-y-4 pt-8 border-t border-stone-200/80">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0c0a09] tracking-tight font-sans m-0">
                    Proactive Disaster Modeling: "What Could Happen Next"
                  </h2>
                  <p className="text-stone-700 leading-relaxed">
                    Postmortems traditionally look backward. Amber includes a predictive risk engine that models the consequences of unpatched issues under future load.
                  </p>
                  <p className="text-stone-700 leading-relaxed">
                    During a transient connection saturation on <code className="text-stone-900 bg-stone-100 px-1.5 py-0.5 rounded font-mono text-sm">checkout-api</code>, the immediate automated fix drains idle connections. However, Amber's risk model analyzes the rate of connection leaks against upcoming traffic projections:
                  </p>

                  <div className="p-5 rounded-2xl bg-stone-900 text-stone-200 font-mono text-xs sm:text-sm border border-stone-800 shadow-md">
                    <div className="text-rose-400 font-bold mb-2 flex items-center gap-2">
                      <Flame className="w-4 h-4 text-rose-400" />
                      <span>AMBER RISK SIMULATION OUTPUT</span>
                    </div>
                    <div className="text-stone-300 space-y-1.5 leading-relaxed">
                      <div>SERVICE: checkout-api (18 pods)</div>
                      <div>ACTIVE_LEAK_RATE: 2.4 unclosed sessions / minute</div>
                      <div className="text-amber-300">SURGE_SIMULATION: 10x traffic spike (Flash Sale Scenario)</div>
                      <div className="text-rose-400">PROJECTED_FAILURE: Postgres connection ceiling breached in 4.2 minutes</div>
                      <div className="text-stone-400">CASCADE_TARGETS: auth-service, inventory-service, payments-gateway</div>
                      <div className="text-emerald-400">RECOMMENDED_ACTION: Merge PR #482 before Friday 18:00 UTC</div>
                    </div>
                  </div>

                  <p className="text-stone-700 leading-relaxed">
                    By translating unmerged PRs into projected outage figures and revenue loss estimates, engineering leads can prioritize technical debt before it becomes an emergency.
                  </p>
                </section>

                {/* Section 6: Delivery & Compliance */}
                <section className="space-y-4 pt-8 border-t border-stone-200/80">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0c0a09] tracking-tight font-sans m-0">
                    Air-Gapped Delivery: Slack, Telegram &amp; SOC-2 Ready PDFs
                  </h2>
                  <p className="text-stone-700 leading-relaxed">
                    Compiling executive reports must not compromise network boundaries. Amber compiles the entire audit document locally in memory:
                  </p>

                  <ul className="list-disc pl-6 space-y-2.5 text-stone-700 leading-relaxed">
                    <li>
                      <strong>Multi-Channel Alerts:</strong> Summaries dispatch directly to private Slack channels (<code className="text-stone-900 bg-stone-100 px-1 py-0.5 rounded font-mono text-xs">#prod-alerts</code>) and Telegram bots (<code className="text-stone-900 bg-stone-100 px-1 py-0.5 rounded font-mono text-xs">@ambersre_alert_bot</code>) with downloadable PDF attachments.
                    </li>
                    <li>
                      <strong>Cryptographic Signatures:</strong> Every report is sealed with an Ed25519 signature and SHA-256 telemetry binding, providing tamper-evident evidence for SOC-2 Type II audit vaults.
                    </li>
                    <li>
                      <strong>Zero Egress:</strong> The compilation process makes zero outbound calls to cloud LLMs or third-party storage buckets. Customer metrics remain entirely within the sovereign VPC perimeter.
                    </li>
                  </ul>

                  <div className="pt-8 pb-4 my-8 p-6 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <h4 className="text-base font-bold text-stone-900 m-0">
                        Inspect the Amber SRE Engine on GitHub
                      </h4>
                      <p className="text-xs text-stone-600 m-0 mt-1">
                        Source-available under BSL 1.1 with a free Community Edition for self-hosted teams.
                      </p>
                    </div>
                    <a
                      href="https://github.com/amber-sre/Amber-Backend"
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 inline-flex items-center gap-2 bg-[#1c1917] hover:bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      <span>View Backend Source</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </section>

              </article>
            </motion.div>
          )}

          {/* ARTICLE 2: In-VPC Incident Response Without Data Egress */}
          {selectedArticle === 'data-egress' && (
            <motion.div
              key="data-egress"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 text-xs font-sans font-semibold tracking-wider text-stone-500 uppercase mb-4">
                  <span className="flex items-center gap-1.5 text-stone-600">
                    <Clock className="w-3.5 h-3.5 text-[#d97706]" />
                    7 Min Read
                  </span>
                  <span>•</span>
                  <span>October 2026</span>
                  <span>•</span>
                  <span className="text-stone-700 font-mono font-bold">Architecture Whitepaper</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0c0a09] tracking-tight leading-[1.08] mb-6 font-sans">
                  Amber: Production Incident Response Without Data Egress
                </h1>

                <p className="text-base sm:text-xl text-stone-600 leading-relaxed font-normal mb-8 border-b border-stone-200 pb-8">
                  An in-VPC SRE engine that correlates incidents, diagnoses root causes, and executes cryptographically verified remediations without streaming production telemetry to third-party SaaS vendors.
                </p>
              </div>

              <article className="prose prose-stone max-w-none text-stone-800 text-base sm:text-lg leading-relaxed font-sans space-y-8">
                
                <section className="space-y-4">
                  <p className="text-lg sm:text-xl font-normal text-stone-900 leading-relaxed">
                    Modern incident management tools assume an unconstrained data transfer model: stream your telemetry to an external SaaS vendor, configure alert thresholds, page an engineer, and wait for manual terminal diagnosis.
                  </p>
                  <p className="text-stone-700 leading-relaxed">
                    For teams operating in regulated sectors, streaming raw error logs, traces, and database query parameters outside the network perimeter introduces compliance overhead and exposes credentials. 
                    Amber keeps the entire investigation and remediation loop inside your infrastructure.
                  </p>
                </section>

                <section className="space-y-4 pt-8 border-t border-stone-200/80">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0c0a09] tracking-tight font-sans m-0">
                    Perimeter Containment Architecture
                  </h2>
                  <p className="text-stone-700 leading-relaxed">
                    No raw application logs, database rows, or container metrics leave your security boundary:
                  </p>

                  <div className="bg-stone-900 text-stone-200 font-mono text-xs sm:text-sm p-5 sm:p-6 rounded-2xl border border-stone-800 my-6 shadow-md overflow-x-auto leading-relaxed">
                    <div className="text-stone-400 font-bold mb-2">Customer Sovereign VPC / Private Cluster</div>
                    <pre className="m-0 text-amber-300 font-mono">
{`                    CUSTOMER PRIVATE VPC
┌────────────────────────────────────────────────────────┐
│                                                        │
│  Logs ─────┐                                           │
│  Metrics ──┤                                           │
│  Traces ───┤                                           │
│  K8s ──────┤──→ Amber Engine ──→ Causal Diagnosis      │
│  Git ──────┤             │                             │
│  DB ───────┘             ↓                             │
│                    Remediation                         │
│                         │                              │
│                  HMAC Verification                     │
│                         │                              │
│                    Health Probe                        │
│                         │                              │
│                    Rollback                            │
│                                                        │
└────────────────────────────────────────────────────────┘
                         │
                         │ Sanitized incident metadata only
                         ▼
                Slack / Telegram`}
                    </pre>
                  </div>

                  <p className="text-stone-700 leading-relaxed">
                    Amber runs as a single-tenant container inside your AWS VPC, GCP project, Azure VNet, or bare-metal Kubernetes cluster. Ingestion, correlation, and diagnostics occur in local memory.
                  </p>
                </section>

                {/* Table */}
                <section className="pt-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0c0a09] tracking-tight font-sans mb-3">
                    Data Boundary Specification
                  </h3>
                  
                  <div className="overflow-x-auto rounded-xl border border-stone-200 my-6 shadow-sm">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
                      <thead>
                        <tr className="bg-stone-50 text-stone-700 font-bold uppercase tracking-wider text-[11px] border-b border-stone-200">
                          <th className="p-3.5 sm:p-4">Data Category</th>
                          <th className="p-3.5 sm:p-4">Default Behavior</th>
                          <th className="p-3.5 sm:p-4">Technical Mechanism</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200 text-stone-700">
                        <tr className="hover:bg-stone-50/50">
                          <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Application Logs</td>
                          <td className="p-3.5 sm:p-4 font-bold text-emerald-800 bg-emerald-50/40">Never Exported</td>
                          <td className="p-3.5 sm:p-4 text-stone-600">Processed in local memory; discarded after analysis</td>
                        </tr>
                        <tr className="hover:bg-stone-50/50">
                          <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Distributed Traces</td>
                          <td className="p-3.5 sm:p-4 font-bold text-emerald-800 bg-emerald-50/40">Never Exported</td>
                          <td className="p-3.5 sm:p-4 text-stone-600">Queried via internal OTel collectors inside cluster</td>
                        </tr>
                        <tr className="hover:bg-stone-50/50">
                          <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Database Schemas</td>
                          <td className="p-3.5 sm:p-4 font-bold text-emerald-800 bg-emerald-50/40">Never Exported</td>
                          <td className="p-3.5 sm:p-4 text-stone-600">Read-only role with 3,000ms query statement timeout</td>
                        </tr>
                        <tr className="hover:bg-stone-50/50">
                          <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Audit Logs</td>
                          <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Local Only</td>
                          <td className="p-3.5 sm:p-4 text-stone-600">Stored in customer VPC database (SQLite / PostgreSQL)</td>
                        </tr>
                        <tr className="hover:bg-stone-50/50">
                          <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Notifications</td>
                          <td className="p-3.5 sm:p-4 text-stone-800 font-medium">Sanitized Metadata</td>
                          <td className="p-3.5 sm:p-4 text-stone-600">Outbound webhook with service name, title, and token</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="space-y-4 pt-8 border-t border-stone-200/80">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0c0a09] tracking-tight font-sans m-0">
                    Deterministic Action Execution
                  </h2>
                  <p className="text-stone-700 leading-relaxed">
                    Amber enforces execution boundaries through compile-time tool allowlists and HMAC-SHA-256 tokens:
                  </p>
                  <ul className="list-disc pl-6 space-y-2.5 text-stone-700 leading-relaxed">
                    <li><strong>Tool Allowlist:</strong> Amber cannot run arbitrary shell scripts. Actions are restricted to pre-compiled modules (killing idle connections, restarting pods, rolling back revisions).</li>
                    <li><strong>Cryptographic Binding:</strong> Proposed actions generate an HMAC-SHA256 signature bound to the exact parameters. Any argument change invalidates the token.</li>
                    <li><strong>10-Minute Expiry:</strong> Tokens carry an automated 10-minute TTL to prevent stale state executions.</li>
                    <li><strong>Automated Health Probes:</strong> Post-action probes verify error rates and HTTP latencies before marking an incident resolved.</li>
                  </ul>

                  <div className="pt-8 pb-10 border-t border-b border-stone-200/90 my-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-1">
                        Deploy Amber to your VPC
                      </h3>
                      <p className="text-sm text-stone-600 m-0">
                        Set up Amber on AWS, GCP, Azure, or bare-metal Kubernetes in under 10 minutes.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onNavigateToContact}
                      className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#1c1917] hover:bg-black text-white px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>Deploy to VPC</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </section>

              </article>
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Footer */}
      <footer className="px-8 md:px-16 pt-20 pb-12 bg-[#ffffff] text-[#0a0a0a] border-t border-black/10 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2.5 mb-2 cursor-pointer" onClick={onBack}>
              <img src="/assets/amber-symbol.svg" alt="Amber" className="w-5 h-7 object-contain" />
              <span className="font-bold text-black tracking-tight text-lg">Amber</span>
            </div>
            <div className="text-xs text-stone-600">Deterministic Cloud Autonomy · Remote — Built for SRE teams worldwide</div>
          </div>

          <div className="flex flex-wrap gap-6 text-xs font-sans font-semibold text-black/60">
            <button type="button" onClick={onBack} className="hover:text-black transition">PLATFORM OVERVIEW</button>
            <a href="https://github.com/amber-sre/Amber-Backend" target="_blank" rel="noreferrer" className="hover:text-black transition">GITHUB</a>
            <a href="https://twitter.com/himanshu1xy" target="_blank" rel="noreferrer" className="hover:text-black transition">TWITTER</a>
            <a href="mailto:team@ambersre.xyz" className="hover:text-black transition">SUPPORT</a>
          </div>
        </div>

        <div className="overflow-hidden select-none pt-8 max-w-6xl mx-auto flex justify-between items-center text-xs font-sans text-stone-400">
          <div>© 2026 Amber Technologies Inc. All rights reserved.</div>
          <div className="text-[10px] font-sans font-semibold tracking-wider uppercase text-stone-400">
            ED25519 · SHA-256 · HITL GOVERNED
          </div>
        </div>
      </footer>

    </div>
  );
};
