import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock,
  Lock
} from 'lucide-react';

interface BlogViewProps {
  onBack: () => void;
  onNavigateToContact: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onBack, onNavigateToContact }) => {
  return (
    <div className="relative bg-[#ffffff] text-[#0a0a0a] font-sans selection:bg-[#d97706] selection:text-white min-h-screen overflow-x-hidden">
      
      {/* Massive Faded Background Watermark — AMBER ENGINE */}
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
          <span className="text-[10px] font-sans font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200/80 ml-1">
            Technical Architecture
          </span>
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
        
        {/* Article Breadcrumb & Metadata Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button
            type="button"
            onClick={onBack}
            className="inline-flex sm:hidden items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-stone-500 hover:text-black mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <div className="flex flex-wrap items-center gap-3 text-xs font-sans font-semibold tracking-wider text-stone-500 uppercase mb-4">
            <span className="px-3 py-1 rounded-full bg-[#fef3c7] text-[#92400e] border border-[#fde68a] font-bold">
              Systems Architecture &amp; Security
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-stone-600">
              <Clock className="w-3.5 h-3.5 text-[#d97706]" />
              7 Min Read
            </span>
            <span>•</span>
            <span>October 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0c0a09] tracking-tight leading-[1.08] mb-6 font-sans">
            Amber: Production Incident Response Without Data Egress
          </h1>

          <p className="text-base sm:text-xl text-stone-600 leading-relaxed font-normal mb-8 border-b border-stone-200 pb-8">
            An in-VPC SRE engine that correlates incidents, diagnoses root causes, and executes cryptographically verified remediations—without sending production telemetry to a third-party SaaS.
          </p>
        </motion.div>

        {/* Article Body Content */}
        <article className="prose prose-stone max-w-none text-stone-800 text-base sm:text-lg leading-relaxed font-sans space-y-8">
          
          {/* Section: The Problem */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <p className="text-lg sm:text-xl font-normal text-stone-900 leading-relaxed">
              Modern incident management systems were architected for a simpler computing model: ship your application telemetry to an external SaaS vendor, configure alert thresholds, page an engineer, and wait for someone to open a laptop and start running terminal diagnostics.
            </p>
            <p className="text-stone-700 leading-relaxed">
              For engineering teams running sensitive production workloads in regulated sectors or secure VPC environments, this workflow exposes two structural gaps:
            </p>

            <ul className="list-disc pl-6 space-y-3.5 my-4 text-stone-700 leading-relaxed">
              <li>
                <strong className="text-stone-900 font-semibold">External Telemetry Dependencies:</strong> Streaming production error logs, stack traces, and database query parameters across the public internet expands your data exposure footprint and complicates strict data residency obligations.
              </li>
              <li>
                <strong className="text-stone-900 font-semibold">Alert Fragmentation &amp; Manual Remediation:</strong> During a core service failure, monitoring tools emit dozens of disconnected alert notifications across multiple microservices. Engineers spend critical triage minutes correlating signals manually instead of executing solutions.
              </li>
            </ul>

            <p className="text-stone-700 leading-relaxed">
              Amber addresses this architectural gap directly: an autonomous, deterministic incident response engine that runs entirely inside your own network perimeter.
            </p>
          </motion.section>

          {/* Section: The Security Boundary */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 pt-8 border-t border-stone-200/80"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0c0a09] tracking-tight font-sans m-0">
              The Security Boundary: Perimeter Containment
            </h2>

            <p className="text-stone-700 leading-relaxed">
              The foundational architecture of Amber is perimeter isolation: <strong>no raw production telemetry (logs, metrics, traces, or database records) leaves your security boundary</strong>.
            </p>

            {/* ASCII Security Boundary Diagram */}
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
                Slack / Telegram / WhatsApp`}
              </pre>
            </div>

            <p className="text-stone-700 leading-relaxed">
              Amber deploys as a single-tenant container natively inside your AWS VPC, GCP project, Azure VNet, or bare-metal Kubernetes cluster. Because ingestion, correlation, and diagnostics happen locally in memory, your production data never crosses into a multi-tenant SaaS vendor environment.
            </p>
          </motion.section>

          {/* Pillar 1: Layered Privacy & Redaction */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 pt-8 border-t border-stone-200/80"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0c0a09] tracking-tight font-sans m-0">
              1. Layered Data Protection: Beyond Simple Regex
            </h2>

            <p className="text-stone-700 leading-relaxed">
              Relying solely on pattern-matching regex to redact sensitive credentials and PII is dangerous; non-standard token prefixes, nested JSON payloads, and encoded values frequently slip past single-pass regex rules.
            </p>

            <p className="text-stone-700 leading-relaxed">
              Amber implements a <strong>defense-in-depth data containment model</strong>:
            </p>

            <ul className="list-disc pl-6 space-y-3.5 my-4 text-stone-700 leading-relaxed">
              <li>
                <strong className="text-stone-900 font-semibold">Default-Deny Outbound NetworkPolicy:</strong> At the Kubernetes and VPC level, Amber containers operate under strict egress firewall rules. Inbound telemetry is ingested from cluster sources, but arbitrary outbound connections are blocked at the packet level.
              </li>
              <li>
                <strong className="text-stone-900 font-semibold">Structured-Field Masking:</strong> Target headers, cookies, authorization tokens, and authentication parameters are stripped by object key before telemetry is processed.
              </li>
              <li>
                <strong className="text-stone-900 font-semibold">Shannon Entropy Secret Detection:</strong> High-randomness strings (such as API keys, JWT signatures, and private keys) are identified via entropy analysis, catching secrets regardless of variable names.
              </li>
              <li>
                <strong className="text-stone-900 font-semibold">Least-Privilege Database Diagnostics:</strong> Diagnostic connections connect using a dedicated database role with read-only permissions, query timeouts (`statement_timeout = 3000ms`), and explicit allowlists limited to performance metadata views (`pg_stat_activity`, pool statistics)—never scanning application user tables.
              </li>
            </ul>
          </motion.section>

          {/* Data Boundary Specification Table */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pt-6"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#0c0a09] tracking-tight font-sans mb-3">
              Data Boundary Specification: What Leaves Your Environment?
            </h3>
            
            <p className="text-stone-600 text-sm mb-4 leading-relaxed">
              A transparent breakdown of how Amber handles each data class:
            </p>

            <div className="overflow-x-auto rounded-xl border border-stone-200 my-6 shadow-sm">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
                <thead>
                  <tr className="bg-stone-50 text-stone-700 font-bold uppercase tracking-wider text-[11px] border-b border-stone-200">
                    <th className="p-3.5 sm:p-4">Data Category</th>
                    <th className="p-3.5 sm:p-4">Amber Default Behavior</th>
                    <th className="p-3.5 sm:p-4">Technical Mechanism</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-700">
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Raw Application Logs</td>
                    <td className="p-3.5 sm:p-4 font-bold text-emerald-800 bg-emerald-50/40">Never Exported</td>
                    <td className="p-3.5 sm:p-4 text-stone-600">Processed locally in VPC memory; discarded after analysis</td>
                  </tr>
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Distributed Traces &amp; Spans</td>
                    <td className="p-3.5 sm:p-4 font-bold text-emerald-800 bg-emerald-50/40">Never Exported</td>
                    <td className="p-3.5 sm:p-4 text-stone-600">Queried via internal OTel collector endpoints inside the cluster</td>
                  </tr>
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Database Records &amp; Schemas</td>
                    <td className="p-3.5 sm:p-4 font-bold text-emerald-800 bg-emerald-50/40">Never Exported</td>
                    <td className="p-3.5 sm:p-4 text-stone-600">Least-privilege diagnostic identity with 3,000ms query timeout</td>
                  </tr>
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Customer PII &amp; Credentials</td>
                    <td className="p-3.5 sm:p-4 font-bold text-emerald-800 bg-emerald-50/40">Never Exported</td>
                    <td className="p-3.5 sm:p-4 text-stone-600">Layered redaction: structured masking + entropy secret detection</td>
                  </tr>
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Incident Audit Logs &amp; State</td>
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Local Only</td>
                    <td className="p-3.5 sm:p-4 text-stone-600">Stored strictly in customer-owned PostgreSQL within the VPC</td>
                  </tr>
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Notification Payloads</td>
                    <td className="p-3.5 sm:p-4 text-stone-800 font-medium">Sanitized Metadata</td>
                    <td className="p-3.5 sm:p-4 text-stone-600">Outbound webhook containing service name, error title, and HMAC token</td>
                  </tr>
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900">LLM Inference Calls</td>
                    <td className="p-3.5 sm:p-4 font-bold text-stone-900 bg-amber-50/40">Customer-Controlled</td>
                    <td className="p-3.5 sm:p-4 text-stone-600">Air-gapped local model (vLLM/Ollama), AWS Bedrock PrivateLink, or redacted API</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 my-6 text-sm text-stone-700 space-y-2">
              <div className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-[#d97706]" />
                <span>Customer-Controlled Inference Architecture</span>
              </div>
              <p className="leading-relaxed">
                Organizations can operate Amber in three distinct inference modes depending on security posture:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-stone-600 pt-1">
                <li><strong className="text-stone-900">Air-Gapped Local Model (Default):</strong> Run open-weights models (such as Qwen 2.5 or Llama 3) via vLLM or Ollama on VPC compute. Zero bytes leave your infrastructure.</li>
                <li><strong className="text-stone-900">Enterprise Cloud PrivateLink:</strong> Route requests to your internal AWS Bedrock or Azure OpenAI endpoints over private VPC peering without traversing the public internet.</li>
                <li><strong className="text-stone-900">External Provider with Redaction:</strong> When using public model endpoints, Amber&apos;s local pre-flight engine strips connection strings, credentials, authorization headers, and IP addresses before query dispatch.</li>
              </ul>
            </div>
          </motion.section>

          {/* Pillar 2: Alert Correlation Graph */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 pt-8 border-t border-stone-200/80"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0c0a09] tracking-tight font-sans m-0">
              2. Amber Turns Alert Storms Into One Causal Incident
            </h2>

            <p className="text-stone-700 leading-relaxed">
              When a core PostgreSQL database exhausts its connection pool or a Redis cluster drops offline, monitoring systems typically dispatch hundreds of cascading alarms. SREs receive dozens of alerts from API gateways, worker queues, payment processors, and frontend health checks simultaneously.
            </p>

            <blockquote className="border-l-2 border-amber-600 pl-5 my-6 text-stone-900 text-base sm:text-lg font-medium leading-relaxed italic">
              Real SREs know distributed microservices do not experience a single magical &ldquo;root cause&rdquo;—they experience cascading failure modes across dependencies.
            </blockquote>

            <p className="text-stone-700 leading-relaxed">
              Instead of dumping 500 alerts into on-call channels, Amber isolates the <strong>most likely causal chain</strong> backed by verifiable telemetry timestamps:
            </p>

            {/* Causal Chain Timeline Block */}
            <div className="bg-stone-900 text-stone-200 font-mono text-xs sm:text-sm p-5 sm:p-6 rounded-2xl border border-stone-800 my-6 shadow-md leading-relaxed">
              <div className="text-amber-400 font-bold mb-3 flex items-center justify-between">
                <span>MOST LIKELY CAUSAL CHAIN</span>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
                  94% Confidence
                </span>
              </div>
              <div className="space-y-1.5 text-stone-300">
                <div className="flex items-center gap-2">
                  <span className="text-stone-500">1.</span>
                  <span className="text-white font-semibold">Deployment changed</span>
                  <span className="text-stone-400">(v2.14.1 via Git / ArgoCD)</span>
                </div>
                <div className="text-stone-500 pl-4">↓ +37s</div>
                <div className="flex items-center gap-2">
                  <span className="text-stone-500">2.</span>
                  <span className="text-rose-400 font-semibold">Postgres connection pool saturated</span>
                  <span className="text-stone-400">(active pool &gt; 98%)</span>
                </div>
                <div className="text-stone-500 pl-4">↓ +4s</div>
                <div className="flex items-center gap-2">
                  <span className="text-stone-500">3.</span>
                  <span className="text-amber-400 font-semibold">Worker queue retries increased</span>
                  <span className="text-stone-400">(exponential backoff exhausted)</span>
                </div>
                <div className="text-stone-500 pl-4">↓ +2s</div>
                <div className="flex items-center gap-2">
                  <span className="text-stone-500">4.</span>
                  <span className="text-rose-400 font-semibold">Checkout API p99 latency spiked</span>
                  <span className="text-stone-400">(&gt; 8,400ms gateway timeout)</span>
                </div>
                <div className="text-stone-500 pl-4">↓</div>
                <div className="flex items-center gap-2">
                  <span className="text-stone-500">5.</span>
                  <span className="text-white font-semibold">504 Gateway Timeout storm across upstream services</span>
                </div>
              </div>
            </div>

            <p className="text-stone-700 leading-relaxed">
              By reconstructing the temporal dependency tree, Amber identifies the upstream bottleneck, correlates related signals, and suppresses downstream alert noise.
            </p>
          </motion.section>

          {/* Pillar 3: Bounded Execution & Cryptographic Verification */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 pt-8 border-t border-stone-200/80"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0c0a09] tracking-tight font-sans m-0">
              3. Closed-Loop Execution With HMAC-SHA-256 Authentication
            </h2>

            <p className="text-stone-700 leading-relaxed">
              Autonomous remediation is dangerous if implemented as an unconstrained agent executing arbitrary terminal scripts against production infrastructure. Amber enforces a deterministic five-stage execution pipeline:
            </p>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 sm:p-5 my-5 text-center font-mono text-xs sm:text-sm text-stone-800 font-bold overflow-x-auto">
              Detect → Investigate (Read-Only) → Propose → HMAC-SHA-256 Verify → Execute &amp; Probe
            </div>

            <p className="text-stone-700 leading-relaxed">
              Remediation safety is governed by strict cryptographic controls:
            </p>

            <ul className="list-disc pl-6 space-y-3.5 my-4 text-stone-700 leading-relaxed">
              <li>
                <strong className="text-stone-900 font-semibold">Bounded Tool Allowlist:</strong> Amber cannot invent new bash commands or execute arbitrary code. It can only call pre-registered, auditable Python tool modules (e.g. terminating specific hanging database connection PIDs, rolling back a deployment to a known revision).
              </li>
              <li>
                <strong className="text-stone-900 font-semibold">HMAC-SHA-256 Payload Authentication:</strong> Proposing a mutating action generates a signed HMAC-SHA-256 hash bound to the exact execution parameters (`tool_name`, `target_resource`, `parameters`). Any unauthorized modification in transit invalidates the signature, halting execution immediately.
              </li>
              <li>
                <strong className="text-stone-900 font-semibold">Customer-Managed Key Protection:</strong> The HMAC signing secret is stored in customer-managed key stores (Kubernetes Secrets, AWS KMS, HashiCorp Vault, or GCP Secret Manager) and never shared externally.
              </li>
              <li>
                <strong className="text-stone-900 font-semibold">10-Minute Time-To-Live (TTL):</strong> Action tokens carry an automated 10-minute expiration window. If cluster state changes before an engineer approves the action, the token expires to eliminate replay attacks on stale infrastructure state.
              </li>
              <li>
                <strong className="text-stone-900 font-semibold">Automated Health Probes &amp; Rollback:</strong> Post-execution, Amber runs automated health verification checks against target endpoints. If latency or error rates fail to normalize, automated rollback policies are triggered.
              </li>
            </ul>
          </motion.section>

          {/* Architectural Comparison Matrix */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pt-8 border-t border-stone-200/80"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#0c0a09] tracking-tight font-sans mb-3">
              Architectural Comparison: SaaS Telemetry vs. In-VPC Incident Engine
            </h3>
            
            <p className="text-stone-600 text-sm mb-6 leading-relaxed">
              How Amber&apos;s architectural model compares to traditional external monitoring and alerting pipelines:
            </p>

            <div className="overflow-x-auto rounded-xl border border-stone-200 my-6 shadow-sm">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
                <thead>
                  <tr className="bg-stone-50 text-stone-700 font-bold uppercase tracking-wider text-[11px] border-b border-stone-200">
                    <th className="p-3.5 sm:p-4">Architectural Dimension</th>
                    <th className="p-3.5 sm:p-4 text-stone-500">External SaaS Monitoring + Alerting</th>
                    <th className="p-3.5 sm:p-4 text-[#92400e] bg-amber-50/60 font-black">Amber In-VPC Incident Engine</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-700">
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Telemetry Processing Location</td>
                    <td className="p-3.5 sm:p-4 text-stone-500">Shipped outbound to third-party vendor clouds</td>
                    <td className="p-3.5 sm:p-4 font-semibold text-emerald-800 bg-amber-50/30">Processed locally inside customer VPC or cluster</td>
                  </tr>
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Alert Processing &amp; Triage</td>
                    <td className="p-3.5 sm:p-4 text-stone-500">Threshold alerts routed to human on-call pagers</td>
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900 bg-amber-50/30">Alert storm clustered into 1 unified causal graph</td>
                  </tr>
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Remediation Capability</td>
                    <td className="p-3.5 sm:p-4 text-stone-500">Passive alerting; requires manual CLI investigation</td>
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900 bg-amber-50/30">Automated diagnostic queries + verified 1-click execution</td>
                  </tr>
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Safety &amp; Authorization</td>
                    <td className="p-3.5 sm:p-4 text-stone-500">Manual engineer SSH / bastion terminal access</td>
                    <td className="p-3.5 sm:p-4 font-semibold text-emerald-800 bg-amber-50/30">HMAC-SHA-256 payload authentication + 10m TTL</td>
                  </tr>
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Code Auditability</td>
                    <td className="p-3.5 sm:p-4 text-stone-500">Proprietary closed-source agent binaries</td>
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900 bg-amber-50/30">Source-available Python engine inspectable before deployment</td>
                  </tr>
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Team Licensing Model</td>
                    <td className="p-3.5 sm:p-4 text-stone-500">Per-user monthly seats + variable ingestion overages</td>
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900 bg-amber-50/30">Flat infrastructure tiers with unlimited team seats</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Pricing & Infrastructure Economics */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 pt-8 border-t border-stone-200/80"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0c0a09] tracking-tight font-sans m-0">
              Infrastructure Economics: Flat Pricing, Zero Per-Seat Tax
            </h2>

            <p className="text-stone-700 leading-relaxed">
              Traditional monitoring platforms monetize by charging per-seat licenses for every engineer on your team, alongside variable data ingestion fees for logs and metrics. As your engineering team grows from 10 to 50 engineers, incident management costs escalate even when system reliability remains constant.
            </p>

            <p className="text-stone-700 leading-relaxed">
              Because Amber runs on your own compute infrastructure and does not incur costs storing petabytes of telemetry in multi-tenant data centers, our platform overhead is minimal. We reflect that architecture in our business model: flat, predictable infrastructure tiers starting at <strong>$799/month</strong> with <strong>unlimited user seats</strong>.
            </p>

            {/* Clean Editorial Callout CTA */}
            <div className="pt-8 pb-10 border-t border-b border-stone-200/90 my-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-1">
                  Ready to test Amber in your VPC?
                </h3>
                <p className="text-sm text-stone-600 m-0">
                  Deploy Amber into your AWS, GCP, Azure, or bare-metal Kubernetes cluster in under 10 minutes.
                </p>
              </div>
              <button
                type="button"
                onClick={onNavigateToContact}
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#1c1917] hover:bg-black text-white px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Deploy Amber to Your VPC</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.section>

        </article>

      </main>

      {/* Footer — Matching Amber Site */}
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
            <a href="https://github.com/himanshu-xyz-1/Amber" target="_blank" rel="noreferrer" className="hover:text-black transition">GITHUB</a>
            <a href="https://twitter.com/himanshu1xy" target="_blank" rel="noreferrer" className="hover:text-black transition">TWITTER</a>
            <a href="mailto:amber.incident@gmail.com" className="hover:text-black transition">SUPPORT</a>
          </div>
        </div>

        {/* Faded Footer Watermark */}
        <div className="overflow-hidden select-none pt-8 max-w-6xl mx-auto flex justify-between items-center text-xs font-sans text-stone-400">
          <div>© 2026 Amber Technologies Inc. All rights reserved.</div>
          <div className="text-[10px] font-mono tracking-wider uppercase text-stone-400">
            ED25519 · SHA-256 · HITL GOVERNED
          </div>
        </div>
      </footer>

    </div>
  );
};
