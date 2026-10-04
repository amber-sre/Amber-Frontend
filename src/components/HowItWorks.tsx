import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Terminal, 
  Lock
} from 'lucide-react';

interface StepDetail {
  id: string;
  badge: string;
  title: string;
  oneLiner: string;
  icon: React.ElementType;
  color: string;
  description: string;
  outcome: string;
  guarantee: string;
  snippet: {
    title: string;
    lines: Array<{ label?: string; text: string; highlight?: boolean; error?: boolean; success?: boolean }>;
  };
}

const STEPS: StepDetail[] = [
  {
    id: 'ingest',
    badge: '01 / INGEST',
    title: 'Detect Alert Storms',
    oneLiner: 'Catches webhooks in <5ms and deduplicates alert storms into one incident.',
    icon: Bell,
    color: '#facc15',
    description: 'When microservices fail, Prometheus, Datadog, or PagerDuty typically fire hundreds of cascading alerts. Amber receives webhooks in real time, computes deterministic alert fingerprints, and groups noise into a single correlated incident.',
    outcome: 'Alert storm suppression at line-rate: cascaded alerts are unified into a single correlated incident with zero alert fatigue.',
    guarantee: 'Deduplicated sliding window. Zero dropped webhooks via Redis buffer.',
    snippet: {
      title: 'Incoming Webhook Ingestion & Fingerprinting',
      lines: [
        { text: '→ POST /api/v1/webhooks/prometheus HTTP/1.1', highlight: true },
        { text: '  Alert: PostgresConnectionPoolSaturation (98%)' },
        { text: '  Service: payment-db-prod | Namespace: core' },
        { text: '  Fingerprint: 7f83b1657ff1fc53b92dc18148a1d65d' },
        { text: '✔ Correlated 34 cascaded alerts into Incident #INC-4102', success: true }
      ]
    }
  },
  {
    id: 'diagnose',
    badge: '02 / DIAGNOSE',
    title: 'Safe Real-Cluster Diagnosis',
    oneLiner: 'Checks real pod logs and DB metrics with zero hallucination.',
    icon: Search,
    color: '#60a5fa',
    description: 'Amber uses strictly read-only diagnostics to fetch live container logs, check Postgres connection states, and assess memory usage. Diagnostic arguments are validated against real Kubernetes cluster resources — the model cannot invent fake processes or phantom pods.',
    outcome: 'Zero-hallucination telemetry inspection: read-only cluster probes isolate the exact broken microservice and offending git commit in seconds.',
    guarantee: 'Whitelisted tool arguments. Real cluster grounding with fail-safe fallback.',
    snippet: {
      title: 'Deterministic Read-Only Diagnostics',
      lines: [
        { text: '→ Querying pg_stat_activity on target DB cluster...', highlight: true },
        { text: '  Found 14 idle-in-transaction connections from payment-worker' },
        { text: '  Longest lock wait: 412.8s on table "payment_ledger"' },
        { text: '  Hanging backend PIDs: [412, 415, 418]' },
        { text: '✔ Root cause diagnosed: Connection pool starvation via orphaned transactions', success: true }
      ]
    }
  },
  {
    id: 'approve',
    badge: '03 / APPROVE',
    title: 'Sovereign Human Approval',
    oneLiner: 'Proposes targeted fix with 10-minute cryptographic SHA-256 tokens.',
    icon: ShieldCheck,
    color: '#fb923c',
    description: 'Amber dispatches an interactive notification to your Slack, Telegram, or WhatsApp with the diagnosed root cause and recommended remediation. All high-risk mutations require explicit human approval; actions expire automatically after 10 minutes.',
    outcome: 'Sovereign human-in-the-loop authorization: high-risk mutations require explicit cryptographic sign-off via Slack Connect before touch.',
    guarantee: 'Human-in-the-Loop Sovereign Gate. Cryptographic argument tamper-proofing.',
    snippet: {
      title: 'Slack / Telegram HITL Approval Dispatch',
      lines: [
        { text: '🚨 [P0 CRITICAL] payment-db-prod connection pool at 98%', error: true },
        { text: '  Root Cause: 3 hung backend transactions blocking pool' },
        { text: '  Proposed Tool: kill_db_connections(pids=[412, 415, 418])' },
        { text: '  Payload SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b...' },
        { text: '⏳ Awaiting SRE Approval [Approve Button | Reject Button] (TTL: 10m)', highlight: true }
      ]
    }
  },
  {
    id: 'recover',
    badge: '04 / RECOVER',
    title: 'Recovery & Post-Mortem',
    oneLiner: 'Executes verified fix, confirms health convergence, and writes audit report.',
    icon: CheckCircle2,
    color: '#34d399',
    description: 'Upon valid approval, Amber executes the targeted fix through compiled allowlisted drivers. It polls Kubernetes readiness probes and connection metrics to verify the cluster has stabilized, then generates an audit-ready Markdown post-mortem.',
    outcome: 'Verified health convergence: automated remediation confirms cluster recovery within 45s, prevents loops, and publishes audit post-mortems.',
    guarantee: 'Auto-rollback loop prevention. Tamper-evident, audit-ready cryptographic trail.',
    snippet: {
      title: 'Remediation Execution & Health Convergence',
      lines: [
        { text: '→ Approver verified: Lead SRE (sre-lead@internal.infra via API Key)' },
        { text: '  Executing kill_db_connections on target database...' },
        { text: '  Terminated backend PIDs [412, 415, 418] successfully', success: true },
        { text: '  Active connections dropped: 98/100 → 12/100 (Health OK)', success: true },
        { text: '✔ Incident resolved in 8.4s. Post-mortem published to /incidents/4102/report', highlight: true }
      ]
    }
  }
];

export const HowItWorks: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = STEPS[activeStepIndex];

  return (
    <section id="how-it-works" className="px-8 md:px-16 py-32 bg-[#ffffff] text-[#0a0a0a] border-b border-black/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans font-bold tracking-widest text-[#d97706] uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-[#d97706] animate-pulse" />
              <span>The Incident Remediation Loop</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.0]">
              From Alert to Recovery in 4 Steps.
            </h2>
          </div>
          <p className="text-sm md:text-base text-black/60 max-w-md font-sans leading-relaxed">
            No black-box magic or ungrounded claims. Here is the exact, deterministic loop Amber runs during every production outage.
          </p>
        </div>

        {/* 4 Interactive Step Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStepIndex === idx;
            return (
              <button
                type="button"
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between h-[160px] cursor-pointer group relative overflow-hidden ${
                  isActive
                    ? 'bg-[#0a0a0a] text-white border-black shadow-xl shadow-black/10 scale-[1.02]'
                    : 'bg-[#fafafa] hover:bg-black/5 text-black/80 border-black/10 hover:border-black/20'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[11px] font-mono tracking-wider font-bold ${isActive ? 'text-[#facc15]' : 'text-black/40'}`}>
                    {step.badge}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isActive ? 'bg-white/10 text-white' : 'bg-black/5 text-black/70 group-hover:bg-black/10'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <div className={`text-base font-bold tracking-tight mb-1 ${isActive ? 'text-white' : 'text-black'}`}>
                    {step.title}
                  </div>
                  <div className={`text-xs line-clamp-2 leading-relaxed ${isActive ? 'text-zinc-300' : 'text-black/60'}`}>
                    {step.oneLiner}
                  </div>
                </div>

                {isActive && (
                  <motion.div 
                    layoutId="activeTabGlow"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#facc15]"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Deep-Dive Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left Column: Plain English Explanation */}
            <div className="lg:col-span-6 bg-[#fafafa] border border-black/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-sm">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-black/70 text-xs font-mono font-semibold mb-6">
                  <span>STEP {activeStepIndex + 1} OF 4</span>
                  <span>•</span>
                  <span>{activeStep.title.toUpperCase()}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-black mb-4">
                  {activeStep.title}
                </h3>

                <p className="text-black/75 text-sm sm:text-base leading-relaxed font-sans mb-6">
                  {activeStep.description}
                </p>

                {/* Operational Impact Callout Box */}
                <div className="p-5 rounded-2xl bg-stone-100/90 border border-stone-200 text-stone-900 mb-6">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#b45309] mb-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#d97706]" />
                    <span>Operational Impact</span>
                  </div>
                  <div className="text-sm font-medium text-stone-900 leading-relaxed font-sans">
                    {activeStep.outcome}
                  </div>
                </div>
              </div>

              {/* Safety & Determinism Guarantee Badge */}
              <div className="pt-6 border-t border-black/10 flex items-start gap-3 text-xs text-black/60 font-sans">
                <Lock className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-black">Safety Guarantee: </span>
                  {activeStep.guarantee}
                </div>
              </div>
            </div>

            {/* Right Column: Live Terminal / Telemetry Console */}
            <div className="lg:col-span-6 bg-[#0c0c0c] text-white rounded-3xl p-7 sm:p-9 border border-white/10 flex flex-col justify-between shadow-2xl relative overflow-hidden font-mono">
              {/* Window Bar */}
              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#ef4444]/80" />
                      <span className="w-3 h-3 rounded-full bg-[#facc15]/80" />
                      <span className="w-3 h-3 rounded-full bg-[#22c55e]/80" />
                    </div>
                    <span className="text-zinc-500 ml-2">amber-runtime :: {activeStep.id}.log</span>
                  </div>
                  <span className="text-[11px] text-[#facc15] bg-[#facc15]/10 px-2 py-0.5 rounded border border-[#facc15]/20 font-sans font-bold">
                    VERIFIED LOOP
                  </span>
                </div>

                <div className="text-xs font-semibold text-zinc-400 mb-3 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#facc15]" />
                  <span>{activeStep.snippet.title}</span>
                </div>

                {/* Log Lines */}
                <div className="space-y-2 text-xs leading-relaxed py-2">
                  {activeStep.snippet.lines.map((line, lIdx) => (
                    <div 
                      key={lIdx}
                      className={`font-mono ${
                        line.highlight ? 'text-[#facc15] font-bold' :
                        line.error ? 'text-rose-400 font-semibold' :
                        line.success ? 'text-emerald-400 font-bold' :
                        'text-zinc-300'
                      }`}
                    >
                      {line.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Interactive Prompt */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500">
                <span>Deterministic SRE Engine v2.0</span>
                <button
                  type="button"
                  onClick={() => setActiveStepIndex((activeStepIndex + 1) % STEPS.length)}
                  className="text-white hover:text-[#facc15] transition-colors flex items-center gap-1 font-sans font-bold cursor-pointer"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
