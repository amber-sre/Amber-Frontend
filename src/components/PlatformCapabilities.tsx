import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Cpu, 
  BookOpen, 
  ShieldCheck, 
  KeyRound, 
  RotateCcw, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  Terminal,
  Activity,
  ChevronRight
} from 'lucide-react';

interface Capability {
  id: string;
  number: string;
  badge: string;
  title: string;
  tagline: string;
  icon: React.ElementType;
  color: string;
  problem: string;
  mechanism: string;
  result: string;
  technicalProof: {
    label: string;
    detail: string;
    codeSnippet?: string;
  };
}

const CAPABILITIES: Capability[] = [
  {
    id: 'triage',
    number: '01',
    badge: 'INGESTION & CORRELATION',
    title: 'Autonomous Incident Triage',
    tagline: 'Turn raw alerts into clean, actionable incidents in milliseconds.',
    icon: Zap,
    color: '#facc15',
    problem: 'When a microservice fails, monitoring stacks (Prometheus, Datadog, CloudWatch) fire hundreds of cascaded alerts into Slack and PagerDuty, blinding on-call engineers under noise.',
    mechanism: 'Amber ingests incoming webhooks in <5ms, normalizes divergent alert schemas, calculates deterministic alert fingerprints (SHA-256), and correlates cascaded symptoms into a single unified incident graph.',
    result: 'Mean Time to Acknowledge (MTTA) collapses from 15 minutes to < 80 milliseconds. Eliminates 95% of alert noise.',
    technicalProof: {
      label: 'Deterministic Alert Deduplication',
      detail: 'Sliding window correlation over Redis streams with sub-5ms fingerprint clustering.',
      codeSnippet: `FINGERPRINT = sha256(service="payments" + env="prod" + classification="DBConnectionExhaustion")\nSTATUS: Correlated 42 alerts -> Incident #INC-5021 [P0-CRITICAL]`
    }
  },
  {
    id: 'investigation',
    number: '02',
    badge: 'MULTIMODAL TELEMETRY',
    title: 'AI-Powered Investigation',
    tagline: 'Investigate production failures without waiting for an engineer to open a laptop.',
    icon: Cpu,
    color: '#60a5fa',
    problem: 'Engineers spend 80% of an outage manually correlating disparate Grafana charts, pod logs, git diffs, and database locks to figure out what changed and what broke.',
    mechanism: 'Amber executes parallel read-only diagnostic probes across live logs, container metrics, Kubernetes events (OOMKilled, CrashLoopBackOff), and recent git commits to establish the exact failure root cause.',
    result: 'Identifies the failing dependency, offending commit, or saturated database pool in under 3 seconds.',
    technicalProof: {
      label: 'Deterministic Telemetry Adapter',
      detail: 'Read-only cluster inspection with bounded 500-line log windows and in-memory secret scrubbing.',
      codeSnippet: `DIAGNOSIS: Postgres pool saturation (99/100 connections).\nROOT_CAUSE: Commit 7f83b16 leaked unclosed sessions in worker-pool-d.\nCONFIDENCE: 98.4% (Verified via pg_stat_activity & git log)`
    }
  },
  {
    id: 'runbooks',
    number: '03',
    badge: 'OPERATIONAL PLAYBOOKS',
    title: 'Runbook Automation',
    tagline: 'Turn your existing internal documentation into executable remediation.',
    icon: BookOpen,
    color: '#a78bfa',
    problem: 'Company wiki playbooks and Notion runbooks are static, outdated, and require error-prone manual command execution during high-stress 3:00 AM outages.',
    mechanism: 'Amber uses hybrid RAG search across your company Notion, GitHub, and wiki playbooks to surface the exact historical procedure, validating parameters, preconditions, and postconditions prior to execution.',
    result: 'Transforms static documentation into verified, executable software features with zero human error.',
    technicalProof: {
      label: 'Strict Pydantic Schema Validation',
      detail: 'Every playbook argument is statically validated against actual live cluster resources before invocation.',
      codeSnippet: `PLAYBOOK: "Clear Idle Postgres Connections (SOP-042)"\nPRECONDITION: idle_connections > 50 AND active_queries < 10\nVALIDATION: PASSED -> Proposing TerminateIdleConnections(max_age=300s)`
    }
  },
  {
    id: 'remediation',
    number: '04',
    badge: 'VERIFIED ACTIONS',
    title: 'Verified Incident Remediation',
    tagline: 'Fix production issues with deterministic execution boundaries—not AI magic.',
    icon: ShieldCheck,
    color: '#34d399',
    problem: 'Allowing an unrestricted AI model to execute arbitrary shell scripts or raw SQL commands in production is reckless and unacceptable for enterprise infrastructure.',
    mechanism: 'Amber strictly prohibits open-ended terminal shell access. All actions are selected from an immutable compile-time allowlist (restart pods, rollback deployments, scale replicas, kill hung queries).',
    result: 'Deterministic, bounded operational execution that safely resolves production outages in seconds.',
    technicalProof: {
      label: 'Compiled Tool Allowlist',
      detail: 'Static risk registry declared in source code. LLMs cannot invent, escalate, or bypass tool parameters.',
      codeSnippet: `ACTION: RollbackDeployment(service="checkout-api", revision=142)\nRISK_TIER: HIGH\nISOLATION: Separated reasoning plane from execution plane`
    }
  },
  {
    id: 'control',
    number: '05',
    badge: 'CRYPTOGRAPHIC BARRIER',
    title: 'Cryptographic Action Control',
    tagline: 'Every sensitive production action passes through an explicit authorization boundary.',
    icon: KeyRound,
    color: '#fbbf24',
    problem: 'Autonomous systems often operate as un-audited black boxes, violating enterprise security policies and compliance requirements.',
    mechanism: 'State-mutating actions generate a 10-minute HMAC-SHA256 signed approval token bound to the exact tool name and argument hash. Dispatches an interactive card to Slack or Web Console requiring authenticated engineer approval.',
    result: 'Zero unapproved changes. Tamper-evident cryptographic audit logs designed for SOC 2 & ISO 27001 readiness.',
    technicalProof: {
      label: 'HMAC-SHA256 Token Binding',
      detail: 'Token = HMAC_SHA256(SecretKey, ActionName + Hash(Args) + ExpiryTimestamp). Single-use token consumed in Redis.',
      codeSnippet: `AUTH_TOKEN: e4d909c290d0fb1ca068ffaddf22cbd0\nPAYLOAD_BINDING: sha256(RollbackDeployment:checkout-api:rev142)\nTTL: 600s | APPROVER: @sarah.lead (SRE Lead)`
    }
  },
  {
    id: 'recovery',
    number: '06',
    badge: 'HEALTH CONVERGENCE',
    title: 'Incident Verification & Recovery',
    tagline: 'Never stop after executing the fix. Prove that the system actually recovered.',
    icon: RotateCcw,
    color: '#38bdf8',
    problem: 'Remediation attempts often fail silently, mask underlying issues, or trigger infinite rollback loops that worsen the outage.',
    mechanism: 'After applying a fix, Amber runs an active 45-second verification probe measuring HTTP 200 OK rates, p99 latency, and Prometheus alerts. If health metrics do not recover, Amber executes an instant rollback and trips an anti-loop circuit breaker.',
    result: 'Guarantees provable system recovery. Prevents cascading outages and loop oscillations.',
    technicalProof: {
      label: 'Anti-Loop Circuit Breaker',
      detail: 'Automated 45s convergence probe + 30-minute anti-loop lock blocks repeated automated rollbacks.',
      codeSnippet: `HEALTH_PROBE: GET /healthz -> 200 OK (Latency: 12ms)\nERROR_RATE: Decreased from 18.4% -> 0.01%\nSTATUS: Incident #INC-5021 Resolved in 8.4s`
    }
  },
  {
    id: 'postmortems',
    number: '07',
    badge: 'SYSTEMIC LEARNING',
    title: 'Automated Postmortems & Intelligence',
    tagline: 'Turn resolved incidents into permanent institutional reliability.',
    icon: FileText,
    color: '#f43f5e',
    problem: 'Engineers rarely have time to write thorough postmortems, causing teams to repeatedly suffer from the same preventable architectural bottlenecks.',
    mechanism: 'Upon incident resolution, Amber compiles an audit-grade postmortem detailing the complete second-by-second timeline, root cause evidence, actions executed, and MTTR. Longitudinal intelligence identifies fragile services and noisy alerts.',
    result: 'Instant documentation exported to Notion, Jira, and Slack. Continuously improves your incident response posture.',
    technicalProof: {
      label: 'Automated Post-Incident Synthesis',
      detail: 'Generates structured JSON and Markdown postmortems with full telemetry artifacts attached.',
      codeSnippet: `POST_MORTEM: /docs/postmortems/2026-10-04-inc-5021.md\nTIMELINE: 03:14:02 Alert -> 03:14:04 Triage -> 03:14:07 Approver OK -> 03:14:10 Health Converged\nEXPORT: Synced to Jira #REL-891`
    }
  }
];

export function PlatformCapabilities() {
  const [activeId, setActiveId] = useState<string>('triage');
  const activeCap = CAPABILITIES.find(c => c.id === activeId) || CAPABILITIES[0];

  return (
    <section id="platform" className="px-8 md:px-16 py-32 bg-[#fafaf9] border-b border-black/5 relative overflow-hidden">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex justify-between items-center text-xs font-mono font-medium tracking-wider text-black/50 uppercase border-b border-black/10 pb-4 mb-16">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d97706] animate-pulse" />
            <span className="font-semibold text-black/80">Amber Platform Architecture</span>
          </div>
          <div>Capabilities & Execution Boundary</div>
          <div className="hidden sm:block">Deterministic SRE Autonomy</div>
        </div>

        {/* Title & Introduction */}
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fef3c7] border border-[#fde68a] text-[#b45309] font-mono text-[11px] font-bold uppercase tracking-wider mb-4">
            <span>Enterprise Platform</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-[#0c0a09] tracking-tight leading-[1.05] mb-6">
            Autonomous incident remediation built for production engineering teams.
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed max-w-2xl">
            Not generic "AI sludge". Amber isolates probabilistic reasoning from production clusters, enforcing deterministic cryptographic control across the entire incident lifecycle.
          </p>
        </div>

        {/* Central Visual: The 6-Stage Incident Lifecycle Banner */}
        <div className="mb-20 p-6 sm:p-8 bg-[#09090b] text-white rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#facc15] font-bold mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#facc15]" />
            <span>The Deterministic Incident Lifecycle</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 sm:gap-4 relative z-10">
            {[
              { step: '01', title: 'DETECT', desc: 'Alert deduplication <5ms', color: '#facc15' },
              { step: '02', title: 'INVESTIGATE', desc: 'Parallel telemetry probe', color: '#60a5fa' },
              { step: '03', title: 'DECIDE', desc: 'RAG playbook match', color: '#a78bfa' },
              { step: '04', title: 'AUTHORIZE', desc: 'HMAC-SHA256 boundary', color: '#fbbf24' },
              { step: '05', title: 'REMEDIATE', desc: 'Scoped tool execution', color: '#34d399' },
              { step: '06', title: 'VERIFY', desc: 'Health convergence check', color: '#38bdf8' },
            ].map((s, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/10 transition-colors group"
              >
                <div>
                  <div className="text-[10px] font-mono font-bold text-zinc-400 group-hover:text-white transition-colors">
                    STAGE {s.step}
                  </div>
                  <div className="text-sm font-black tracking-tight text-white mt-1">
                    {s.title}
                  </div>
                </div>
                <div className="text-[11px] text-zinc-400 mt-3 font-mono leading-tight">
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Deep-Dive: 7 Substantial Capability Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Pillar */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-black/40 mb-3 px-2">
              Platform Capabilities
            </div>
            {CAPABILITIES.map((cap) => {
              const isSelected = activeId === cap.id;
              const Icon = cap.icon;

              return (
                <button
                  key={cap.id}
                  type="button"
                  onClick={() => setActiveId(cap.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer select-none ${
                    isSelected
                      ? 'bg-white border-black text-black shadow-lg shadow-black/5 ring-1 ring-black/5'
                      : 'bg-white/50 hover:bg-white border-stone-200/80 text-stone-600 hover:text-black'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected ? 'bg-black text-white' : 'bg-stone-100 text-stone-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold">
                        {cap.number} — {cap.badge}
                      </div>
                      <div className="text-sm font-bold text-[#0c0a09]">
                        {cap.title}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-black translate-x-1' : 'text-stone-300'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Deep-Dive Card: Problem → Mechanism → Result → Technical Proof */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCap.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 shadow-sm"
              >
                {/* Header Badge */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
                      CAPABILITY {activeCap.number}
                    </span>
                    <span className="text-xs font-mono text-stone-500 uppercase tracking-wider">
                      {activeCap.badge}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-emerald-600 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Deterministic Policy</span>
                  </div>
                </div>

                {/* Capability Title & Tagline */}
                <div className="mt-6 mb-8">
                  <h3 className="text-2xl sm:text-4xl font-black text-[#0c0a09] tracking-tight mb-2">
                    {activeCap.title}
                  </h3>
                  <p className="text-base sm:text-lg text-[#d97706] font-medium">
                    {activeCap.tagline}
                  </p>
                </div>

                {/* 3-Column Breakdown: Problem → Mechanism → Result */}
                <div className="space-y-6">
                  
                  {/* Problem */}
                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80">
                    <div className="text-xs font-mono uppercase tracking-wider text-rose-600 font-bold mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>The Production Problem</span>
                    </div>
                    <p className="text-sm text-stone-700 leading-relaxed">
                      {activeCap.problem}
                    </p>
                  </div>

                  {/* Mechanism */}
                  <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                    <div className="text-xs font-mono uppercase tracking-wider text-amber-800 font-bold mb-1 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#d97706]" />
                      <span>Amber's Engineering Mechanism</span>
                    </div>
                    <p className="text-sm text-amber-950 leading-relaxed font-sans">
                      {activeCap.mechanism}
                    </p>
                  </div>

                  {/* Result */}
                  <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
                    <div className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>The Business & Operational Result</span>
                    </div>
                    <p className="text-sm text-emerald-950 leading-relaxed font-sans font-medium">
                      {activeCap.result}
                    </p>
                  </div>
                </div>

                {/* Technical Proof Code Box */}
                <div className="mt-8 pt-8 border-t border-stone-200">
                  <div className="text-xs font-mono text-stone-500 uppercase tracking-wider font-semibold mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-stone-400" />
                      <span>Technical Proof: {activeCap.technicalProof.label}</span>
                    </div>
                    <span className="text-[10px] text-stone-400">Deterministic Guardrail</span>
                  </div>
                  <div className="p-4 bg-[#09090b] text-white rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-white/10">
                    <pre className="text-emerald-400 whitespace-pre-wrap">{activeCap.technicalProof.codeSnippet}</pre>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
