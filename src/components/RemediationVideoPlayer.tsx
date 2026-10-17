import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  CheckCircle2, 
  ShieldCheck, 
  Activity, 
  Lock, 
  RotateCcw,
  Server,
  Layers,
  ChevronRight,
  Database,
  Globe,
  HardDrive
} from 'lucide-react';

// Official Brand SVGs
const SlackLogo: React.FC<{ className?: string }> = ({ className = "w-4 h-4 shrink-0" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
    <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
    <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
    <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/>
  </svg>
);

const TelegramLogo: React.FC<{ className?: string }> = ({ className = "w-4 h-4 shrink-0" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#2AABEE"/>
    <path d="M17.89 7.22L15.92 16.5C15.77 17.16 15.38 17.32 14.83 17.01L11.83 14.8L10.38 16.19C10.22 16.35 10.09 16.48 9.78 16.48L9.99 13.43L15.55 8.41C15.79 8.2 15.5 8.08 15.18 8.29L8.31 12.62L5.35 11.69C4.71 11.49 4.69 11.05 5.48 10.74L17.05 6.28C17.59 6.08 18.06 6.41 17.89 7.22Z" fill="white"/>
  </svg>
);

type ActiveViewMode = 'all' | 'slack' | 'telegram';

interface IncidentScenario {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  title: string;
  service: string;
  topology: string;
  rootCause: string;
  runbook: string;
  resolutionDetail: string;
  metric1: { label: string; initial: string; resolved: string; note: string };
  metric2: { label: string; initial: string; resolved: string; note: string };
  metric3: { label: string; initial: string; resolved: string; note: string };
}

const SCENARIOS: IncidentScenario[] = [
  {
    id: 'INC-9842',
    name: 'PostgreSQL Pool Saturation',
    category: 'Database Lock',
    icon: Database,
    title: 'PostgreSQL Connection Pool Saturated (98%)',
    service: 'billing-db',
    topology: 'RDS Postgres 15 (us-east-1)',
    rootCause: '10 idle-in-transaction connections holding slots on billing-db, blocking inbound queries.',
    runbook: "drain_idle_connections(service='billing-db', max_idle=300s)",
    resolutionDetail: '4 idle connections terminated. Pool utilization returned to 14%.',
    metric1: { label: 'Pool Utilization', initial: '98% Saturation', resolved: '98% → 14%', note: 'Terminated 4 idle connections. Headroom restored.' },
    metric2: { label: 'P99 Latency', initial: '8,400ms Spike', resolved: '48ms', note: '12 health checks confirmed nominal latency.' },
    metric3: { label: 'Recovery Time', initial: 'Awaiting Action', resolved: '2.4s MTTR', note: 'Zero dropped transactions. Health confirmed.' }
  },
  {
    id: 'INC-9845',
    name: 'Ingress 504 Timeout Surge',
    category: 'Kubernetes Ingress',
    icon: Globe,
    title: 'Ingress Gateway HTTP 504 Timeout Spike',
    service: 'checkout-ingress',
    topology: 'EKS Cluster 1.29 (us-east-1)',
    rootCause: 'Pod replica starvation under sudden surge; worker saturation causing 504 timeouts.',
    runbook: "scale_deployment_and_drain(deployment='checkout-api', replicas=32)",
    resolutionDetail: 'Scaled checkout-api to 32 replicas. Ingress 504 rate dropped to 0.00%.',
    metric1: { label: 'HTTP 504 Error Rate', initial: '14.2% Failures', resolved: '14.2% → 0.00%', note: 'Traffic successfully absorbed across 32 warm pods.' },
    metric2: { label: 'Pod Replicas', initial: '8 / 8 (Maxed)', resolved: '32 Replicas', note: 'HPA headroom scaled to absorb peak load.' },
    metric3: { label: 'Recovery Time', initial: 'Awaiting Action', resolved: '3.8s MTTR', note: 'Zero gateway dropped sessions.' }
  },
  {
    id: 'INC-9848',
    name: 'Redis Cache Memory Eviction',
    category: 'In-Memory Cache',
    icon: HardDrive,
    title: 'Redis Cluster Memory Eviction Storm',
    service: 'session-cache-redis',
    topology: 'ElastiCache 7.2 (us-east-1)',
    rootCause: 'Unbounded session keys without TTL causing maxmemory evictions on active user tokens.',
    runbook: "flush_expired_session_keys(cluster='redis-cache', prefix='sess:tmp:*')",
    resolutionDetail: 'Evicted 480k orphaned keys. Memory usage dropped from 96% to 38%.',
    metric1: { label: 'Memory Allocation', initial: '96% (Near OOM)', resolved: '96% → 38%', note: 'Orphaned temporary session keys pruned.' },
    metric2: { label: 'Cache Hit Ratio', initial: '41% (Degraded)', resolved: '99.4%', note: 'Eviction storm halted and cache warmed.' },
    metric3: { label: 'Recovery Time', initial: 'Awaiting Action', resolved: '1.9s MTTR', note: 'Memory pressure safely contained.' }
  }
];

export const RemediationVideoPlayer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveViewMode>('all');
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [resolvedState, setResolvedState] = useState<{ [key: string]: boolean }>({
    'INC-9842': true,
    'INC-9845': false,
    'INC-9848': true
  });
  const [isRemediating, setIsRemediating] = useState<boolean>(false);
  const [activeStepTab, setActiveStepTab] = useState<number>(3);

  const scenario = SCENARIOS[selectedScenarioIndex];
  const isResolved = resolvedState[scenario.id] ?? false;

  const handleApprove = () => {
    setIsRemediating(true);
    setTimeout(() => {
      setIsRemediating(false);
      setResolvedState(prev => ({ ...prev, [scenario.id]: true }));
      setActiveStepTab(3);
    }, 700);
  };

  const handleReplay = () => {
    setResolvedState(prev => ({ ...prev, [scenario.id]: false }));
    setActiveStepTab(2);
  };

  return (
    <div className="w-full text-left">
      {/* Section Header Row */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10 border-b border-amber-500/20 pb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans font-bold tracking-widest text-[#d97706] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#d97706] animate-pulse" />
            <span>Interactive Incident Response</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-sans leading-[1.08]">
            Experience Amber In Action.
          </h2>
          <p className="text-amber-100/70 text-sm sm:text-base mt-2 max-w-2xl font-sans">
            See how Amber correlates alert storms, isolates root causes, and requests sovereign human sign-off before executing allowlisted runbooks.
          </p>
        </div>

        {/* Channel Switcher */}
        <div className="inline-flex items-center p-1 rounded-xl bg-[#160f08] border border-amber-500/40 shadow-lg">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-sans tracking-wide transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#d97706] text-white font-bold shadow-md shadow-amber-500/20'
                : 'text-amber-200/70 hover:text-white font-medium'
            }`}
          >
            Overview
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('slack')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-sans tracking-wide transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'slack'
                ? 'bg-white text-black font-bold shadow-md'
                : 'text-amber-200/70 hover:text-white font-medium'
            }`}
          >
            <SlackLogo className="w-3.5 h-3.5" />
            <span>Slack</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('telegram')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-sans tracking-wide transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'telegram'
                ? 'bg-white text-black font-bold shadow-md'
                : 'text-amber-200/70 hover:text-white font-medium'
            }`}
          >
            <TelegramLogo className="w-3.5 h-3.5" />
            <span>Telegram</span>
          </button>
        </div>
      </div>

      {/* ── Interactive Scenario Selector (3 Real-World Incidents) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {SCENARIOS.map((sc, idx) => {
          const Icon = sc.icon;
          const isSelected = selectedScenarioIndex === idx;
          const isScResolved = resolvedState[sc.id] ?? false;

          return (
            <button
              type="button"
              key={sc.id}
              onClick={() => setSelectedScenarioIndex(idx)}
              className={`p-4 rounded-2xl text-left border transition-all duration-300 flex items-center justify-between cursor-pointer group ${
                isSelected
                  ? 'bg-[#22160a] border-amber-400 text-white shadow-md shadow-black/40 scale-[1.01] ring-1 ring-amber-400/30'
                  : 'bg-[#140e07] hover:bg-[#1b1209] border-amber-500/30 text-amber-100/80 hover:border-amber-500/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? 'bg-amber-400 text-black shadow-md font-bold' : 'bg-[#0d0905] text-amber-300 border border-amber-500/30'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-amber-300 uppercase">
                      {sc.id}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full ${isScResolved ? 'bg-emerald-400' : 'bg-rose-400 animate-pulse'}`} />
                  </div>
                  <div className="text-xs font-bold text-white tracking-tight">
                    {sc.name}
                  </div>
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-amber-400 translate-x-0.5' : 'text-amber-500/40'}`} />
            </button>
          );
        })}
      </div>

      {/* ── Main Solid Deep Amber Canvas ── */}
      <div className="w-full relative select-none">
        <div className="w-full bg-[#120d06] border border-amber-500/40 rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.7)] overflow-hidden">
          
          {/* Top Metadata Header */}
          <div className="bg-[#181108] px-6 sm:px-8 py-4 border-b border-amber-500/30 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                isResolved
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isResolved ? 'bg-emerald-400' : 'bg-rose-400 animate-pulse'}`} />
                {isResolved ? 'INCIDENT RESOLVED' : 'ACTIVE INCIDENT'}
              </span>
              <span className="text-amber-500/50">·</span>
              <span className="text-white font-bold">{scenario.id}</span>
              <span className="text-amber-500/50">·</span>
              <span className="text-amber-200 font-medium">{scenario.topology}</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-amber-200/80">
              <span className="inline-flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>SHA-256 HMAC Bound</span>
              </span>
              <span className="text-amber-500/50">·</span>
              <span className="text-emerald-400 font-semibold">0 External Egress</span>
            </div>
          </div>

          {/* Interactive Split Body */}
          <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: On-Call Incident Notification */}
            <div className={`${activeTab === 'all' ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col justify-between`}>
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-500/25 text-xs text-amber-200/70 font-sans">
                  <div className="flex items-center gap-2">
                    {activeTab === 'telegram' ? (
                      <>
                        <TelegramLogo className="w-3.5 h-3.5" />
                        <span className="text-white font-bold">@AmberSREBot</span>
                        <span className="text-amber-500/50">·</span>
                        <span>Telegram Dispatch</span>
                      </>
                    ) : (
                      <>
                        <SlackLogo className="w-3.5 h-3.5" />
                        <span className="text-white font-bold">#prod-oncall</span>
                        <span className="text-amber-500/50">·</span>
                        <span>Slack Incident Channel</span>
                      </>
                    )}
                  </div>
                  <span className="text-[11px] text-amber-300 font-mono">03:43 AM UTC</span>
                </div>

                {/* Solid Espresso Amber Incident Card */}
                <div className="bg-[#1a1209] border border-amber-500/40 rounded-2xl p-6 space-y-4 shadow-lg">
                  <div>
                    <div className="text-xs font-semibold text-rose-400 flex items-center gap-1.5 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      <span>Severity P1</span>
                      <span className="text-amber-500/40">·</span>
                      <span className="text-amber-200/80">Automated Triage</span>
                    </div>
                    <h4 className="text-white font-black text-xl tracking-tight leading-snug">
                      {scenario.title}
                    </h4>
                  </div>

                  {/* Metadata Specs Grid */}
                  <div className="grid grid-cols-3 gap-2 bg-[#0d0905] p-3.5 rounded-xl border border-amber-500/30 text-xs font-sans">
                    <div>
                      <div className="text-amber-300/80 text-[10px] uppercase font-bold">Service</div>
                      <div className="text-white font-bold mt-0.5">{scenario.service}</div>
                    </div>
                    <div>
                      <div className="text-amber-300/80 text-[10px] uppercase font-bold">Status</div>
                      <div className={isResolved ? "text-emerald-400 font-bold mt-0.5" : "text-amber-300 font-bold mt-0.5"}>
                        {isResolved ? "Normal" : "Saturated"}
                      </div>
                    </div>
                    <div>
                      <div className="text-amber-300/80 text-[10px] uppercase font-bold">Cluster</div>
                      <div className="text-amber-100 mt-0.5 font-medium truncate">{scenario.topology}</div>
                    </div>
                  </div>

                  {/* Diagnosed Root Cause */}
                  <div className="bg-[#22160b] border border-amber-500/35 p-4 rounded-xl text-xs text-amber-100 space-y-1">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <span>Diagnosed Root Cause:</span>
                    </div>
                    <p className="text-amber-100/90 leading-relaxed font-sans">
                      {scenario.rootCause}
                    </p>
                  </div>

                  {/* Proposed Remediation Runbook */}
                  <div className="space-y-1.5 text-xs">
                    <div className="text-amber-200/80 font-semibold">
                      Allowlisted Remediation Runbook:
                    </div>
                    <div className="bg-[#0a0703] px-3.5 py-2.5 rounded-xl border border-amber-500/35 font-mono text-amber-300 text-xs overflow-x-auto">
                      {scenario.runbook}
                    </div>
                  </div>

                  {/* Interactive Button Group */}
                  <div className="pt-2">
                    <AnimatePresence mode="wait">
                      {!isResolved ? (
                        <motion.div
                          key="unresolved-buttons"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col sm:flex-row items-center gap-2.5"
                        >
                          <button
                            type="button"
                            onClick={handleApprove}
                            disabled={isRemediating}
                            className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/30 active:scale-[0.99]"
                          >
                            {isRemediating ? (
                              <>
                                <Activity className="w-3.5 h-3.5 animate-spin" />
                                <span>Applying Runbook...</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                <span>Approve Remediation</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={handleReplay}
                            className="w-full sm:w-auto px-4 py-3 rounded-xl bg-[#160f08] hover:bg-[#20150b] text-amber-200/80 hover:text-white font-sans text-xs border border-amber-500/30 cursor-pointer transition-colors"
                          >
                            Dismiss
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="resolved-card"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="p-4 rounded-xl bg-[#0e1811] border border-emerald-500/50 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                              <Check className="w-4 h-4 font-bold" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-emerald-400">
                                Remediation Applied in {scenario.metric3.resolved}
                              </div>
                              <div className="text-xs text-zinc-300 mt-0.5">
                                {scenario.resolutionDetail}
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={handleReplay}
                            className="self-end sm:self-auto px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-200 text-xs font-sans font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/15"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Replay Incident</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Status Note */}
              <div className="pt-4 flex items-center justify-between text-xs text-amber-200/60">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Payload authorization TTL: 10m</span>
                </span>
                <span>Audit Ref: #{scenario.id.toLowerCase()}</span>
              </div>
            </div>

            {/* Right Column: Interactive Lifecycle Stepper */}
            <div className={`${activeTab === 'all' ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col justify-between`}>
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-500/25 text-xs text-amber-200/70 font-sans">
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-white font-bold">Execution Lifecycle</span>
                  </div>
                  <span className="text-xs text-amber-300 font-mono">In-VPC Autonomous Kernel</span>
                </div>

                {/* 4 Clickable Step Cards */}
                <div className="space-y-3">
                  {[
                    {
                      step: 1,
                      title: 'Alert Deduplication',
                      time: '03:43:01.042',
                      desc: 'Correlated 482 Prometheus & Datadog signals into 1 unified incident context.'
                    },
                    {
                      step: 2,
                      title: 'Read-Only Cluster Diagnosis',
                      time: '03:43:01.198',
                      desc: `Read-only telemetry probe isolated root cause: ${scenario.rootCause}`
                    },
                    {
                      step: 3,
                      title: 'Cryptographic Authorization',
                      time: '03:43:01.482',
                      desc: `Generated SHA-256 HMAC payload binding for ${scenario.runbook} (TTL: 10m).`
                    },
                    {
                      step: 4,
                      title: isResolved ? 'Executed & Verified' : 'Awaiting Human Authorization',
                      time: isResolved ? '03:43:02.412' : 'Pending Gate',
                      desc: isResolved 
                        ? `Runbook completed successfully. 12 health verification probes confirmed metrics converged.`
                        : 'Action paused awaiting single-click human sign-off in Slack or Telegram.'
                    }
                  ].map((s, idx) => {
                    const isStepActive = activeStepTab === idx;
                    const isStepFinished = idx < 3 || isResolved;

                    return (
                      <div
                        key={idx}
                        onClick={() => setActiveStepTab(idx)}
                        className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                          isStepActive
                            ? 'bg-[#22160a] border-amber-400 text-white shadow-md ring-1 ring-amber-400/30'
                            : 'bg-[#160f08] hover:bg-[#1c130a] border-amber-500/25 hover:border-amber-500/40'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                            isStepFinished
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          }`}>
                            {isStepFinished ? '✓' : s.step}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className={`font-bold ${isStepActive ? 'text-amber-200' : 'text-white'}`}>
                                {s.title}
                              </span>
                              <span className="font-mono text-[10px] text-amber-300/70">
                                {s.time}
                              </span>
                            </div>
                            <p className="text-xs text-amber-100/80 leading-relaxed font-sans">
                              {s.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Note */}
              <div className="pt-4 flex items-center justify-between text-xs text-amber-200/60">
                <span className="flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-amber-400" />
                  <span>In-VPC Single Tenant</span>
                </span>
                <span>Zero telemetry leaves perimeter</span>
              </div>
            </div>

          </div>

          {/* Bottom Telemetry Verification Row (Solid Espresso Amber Matte) */}
          <div className="bg-[#150f08] border-t border-amber-500/30 px-6 sm:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              <div className="p-5 rounded-2xl bg-[#1c140a] border border-amber-500/30 hover:border-amber-400/60 hover:bg-[#22160c] transition-all shadow-md">
                <div className="text-xs font-sans text-amber-300 uppercase tracking-wider mb-1 font-bold">
                  {scenario.metric1.label}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
                  {isResolved ? scenario.metric1.resolved : scenario.metric1.initial}
                </div>
                <p className="text-xs text-amber-100/70 mt-1">
                  {scenario.metric1.note}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#1c140a] border border-amber-500/30 hover:border-amber-400/60 hover:bg-[#22160c] transition-all shadow-md">
                <div className="text-xs font-sans text-amber-300 uppercase tracking-wider mb-1 font-bold">
                  {scenario.metric2.label}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
                  {isResolved ? scenario.metric2.resolved : scenario.metric2.initial}
                </div>
                <p className="text-xs text-amber-100/70 mt-1">
                  {scenario.metric2.note}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#1c140a] border border-amber-500/30 hover:border-amber-400/60 hover:bg-[#22160c] transition-all shadow-md">
                <div className="text-xs font-sans text-amber-300 uppercase tracking-wider mb-1 font-bold">
                  {scenario.metric3.label}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-sans tracking-tight">
                  {isResolved ? scenario.metric3.resolved : scenario.metric3.initial}
                </div>
                <p className="text-xs text-amber-100/70 mt-1">
                  {scenario.metric3.note}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
