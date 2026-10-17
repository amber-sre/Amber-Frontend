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
  HardDrive,
  Zap
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
  actionTitle: string;
  actionDetail: string;
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
    rootCause: '10 idle-in-transaction connections holding client slots on billing-db.',
    actionTitle: 'Drain & Terminate Idle Connection Handles',
    actionDetail: 'Safely terminate idle handles with zero impact on active transactions.',
    resolutionDetail: 'Terminated 4 idle connections. Headroom restored to 86%.',
    metric1: { label: 'Pool Saturation', initial: '98% (Saturated)', resolved: '98% → 14%', note: 'Terminated 4 idle connections. Headroom restored.' },
    metric2: { label: 'P99 Latency', initial: '8,400ms Spike', resolved: '48ms', note: '12 automated health probes confirmed recovery.' },
    metric3: { label: 'Recovery Time', initial: 'Awaiting Action', resolved: '2.4s MTTR', note: 'Zero customer transactions lost or dropped.' }
  },
  {
    id: 'INC-9845',
    name: 'Ingress 504 Timeout Surge',
    category: 'Kubernetes Ingress',
    icon: Globe,
    title: 'Ingress Gateway HTTP 504 Timeout Surge',
    service: 'checkout-ingress',
    topology: 'EKS Cluster 1.29 (us-east-1)',
    rootCause: 'Pod replica starvation under sudden traffic surge; gateway queue saturated.',
    actionTitle: 'Horizontal Pod Burst Scaling (32 Pods)',
    actionDetail: 'Preemptively scale checkout-api across secondary AZs with zero drop.',
    resolutionDetail: 'Scaled to 32 warm replicas. Gateway 504 rate dropped to 0.00%.',
    metric1: { label: 'HTTP 504 Rate', initial: '14.2% Failures', resolved: '14.2% → 0.00%', note: 'Traffic fully absorbed across warm pods.' },
    metric2: { label: 'Pod Replicas', initial: '8 / 8 (Maxed)', resolved: '32 Replicas', note: 'Autoscaling headroom scaled for peak load.' },
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
    rootCause: 'Unbounded session keys without TTL causing evictions on active customer tokens.',
    actionTitle: 'Prune Orphaned Guest Session Keys',
    actionDetail: 'Safely flush expired guest tokens without touching active auth sessions.',
    resolutionDetail: 'Evicted 480k expired keys. Memory usage dropped from 96% to 38%.',
    metric1: { label: 'Memory Usage', initial: '96% (Near OOM)', resolved: '96% → 38%', note: 'Orphaned guest session keys pruned.' },
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
    }, 600);
  };

  const handleReplay = () => {
    setResolvedState(prev => ({ ...prev, [scenario.id]: false }));
    setActiveStepTab(2);
  };

  return (
    <div className="w-full text-left">
      {/* Section Header Row */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10 border-b border-amber-500/30 pb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans font-extrabold tracking-widest text-amber-400 uppercase mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-md shadow-amber-400/50" />
            <span>Interactive Incident Response</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-sans leading-[1.08]">
            Experience Amber In Action.
          </h2>
          <p className="text-amber-100/80 text-sm sm:text-base mt-2 max-w-2xl font-sans">
            See how Amber correlates alert storms, isolates root causes, and requests single-click human sign-off before executing sovereign runbooks.
          </p>
        </div>

        {/* Channel Switcher */}
        <div className="inline-flex items-center p-1.5 rounded-2xl bg-[#2a1705] border-2 border-amber-500/50 shadow-xl">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-sans tracking-wide transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-amber-400 text-black font-black shadow-md shadow-amber-400/40'
                : 'text-amber-200/80 hover:text-white font-semibold'
            }`}
          >
            Overview
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('slack')}
            className={`px-4 py-2 rounded-xl text-xs font-sans tracking-wide transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'slack'
                ? 'bg-white text-black font-black shadow-md'
                : 'text-amber-200/80 hover:text-white font-semibold'
            }`}
          >
            <SlackLogo className="w-3.5 h-3.5" />
            <span>Slack</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('telegram')}
            className={`px-4 py-2 rounded-xl text-xs font-sans tracking-wide transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'telegram'
                ? 'bg-white text-black font-black shadow-md'
                : 'text-amber-200/80 hover:text-white font-semibold'
            }`}
          >
            <TelegramLogo className="w-3.5 h-3.5" />
            <span>Telegram</span>
          </button>
        </div>
      </div>

      {/* ── Scenario Selector (3 Solid Rich Amber Cards) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {SCENARIOS.map((sc, idx) => {
          const Icon = sc.icon;
          const isSelected = selectedScenarioIndex === idx;
          const isScResolved = resolvedState[sc.id] ?? false;

          return (
            <button
              type="button"
              key={sc.id}
              onClick={() => setSelectedScenarioIndex(idx)}
              className={`p-5 rounded-2xl text-left border-2 transition-all duration-300 flex items-center justify-between cursor-pointer group shadow-xl ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 border-amber-300 text-black shadow-amber-500/30 scale-[1.02] ring-2 ring-amber-300/60'
                  : 'bg-[#221303] hover:bg-[#2d1805] border-amber-500/40 text-amber-100 hover:border-amber-400'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? 'bg-black text-amber-400 font-bold shadow-md' : 'bg-[#382006] text-amber-300 border border-amber-500/40'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-mono font-black uppercase ${isSelected ? 'text-black/80' : 'text-amber-300'}`}>
                      {sc.id}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${isScResolved ? 'bg-emerald-600' : 'bg-rose-500 animate-pulse'}`} />
                  </div>
                  <div className={`text-sm font-black tracking-tight ${isSelected ? 'text-black' : 'text-white'}`}>
                    {sc.name}
                  </div>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${isSelected ? 'text-black translate-x-1 font-bold' : 'text-amber-400/60'}`} />
            </button>
          );
        })}
      </div>

      {/* ── Main Genuinely Amber Showcase Canvas ── */}
      <div className="w-full relative select-none">
        {/* Warm Amber Radiant Glow Behind the Card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/30 via-amber-500/20 to-amber-700/30 rounded-[32px] blur-xl opacity-75 pointer-events-none" />

        <div className="relative w-full bg-gradient-to-b from-[#2b1704] via-[#1f1103] to-[#140a02] border-2 border-amber-500/60 rounded-3xl shadow-[0_20px_80px_rgba(245,158,11,0.22)] overflow-hidden">
          
          {/* Top Amber Status Header */}
          <div className="bg-[#381e05] px-6 sm:px-8 py-4.5 border-b-2 border-amber-500/40 flex flex-wrap items-center justify-between gap-4 text-xs font-sans">
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide shadow-md ${
                isResolved
                  ? 'bg-emerald-500 text-black border border-emerald-400'
                  : 'bg-rose-500 text-white border border-rose-400 animate-pulse'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isResolved ? 'bg-black' : 'bg-white'}`} />
                {isResolved ? 'INCIDENT RESOLVED' : 'ACTIVE INCIDENT'}
              </span>
              <span className="text-amber-400 font-bold">·</span>
              <span className="text-white font-extrabold text-sm">{scenario.id}</span>
              <span className="text-amber-400 font-bold">·</span>
              <span className="text-amber-200 font-semibold">{scenario.topology}</span>
            </div>

            <div className="flex items-center gap-4 text-xs text-amber-200">
              <span className="inline-flex items-center gap-1.5 font-bold">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>SHA-256 HMAC Bound</span>
              </span>
              <span className="text-amber-500">·</span>
              <span className="text-emerald-400 font-bold">0 External Egress</span>
            </div>
          </div>

          {/* Interactive Split Body */}
          <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: On-Call Notification Card (Warm Rich Amber Surface) */}
            <div className={`${activeTab === 'all' ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col justify-between`}>
              <div>
                <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-amber-500/30 text-xs text-amber-200 font-sans">
                  <div className="flex items-center gap-2 font-bold">
                    {activeTab === 'telegram' ? (
                      <>
                        <TelegramLogo className="w-4 h-4" />
                        <span className="text-white font-black">@AmberSREBot</span>
                        <span className="text-amber-400">·</span>
                        <span>Telegram Channel</span>
                      </>
                    ) : (
                      <>
                        <SlackLogo className="w-4 h-4" />
                        <span className="text-white font-black">#prod-oncall</span>
                        <span className="text-amber-400">·</span>
                        <span>Slack Alerts</span>
                      </>
                    )}
                  </div>
                  <span className="text-xs text-amber-300 font-mono font-bold">03:43 AM UTC</span>
                </div>

                {/* Solid Rich Amber Alert Card */}
                <div className="bg-[#241303] border-2 border-amber-500/50 rounded-2xl p-6 sm:p-7 space-y-5 shadow-2xl">
                  <div>
                    <div className="text-xs font-black text-rose-400 flex items-center gap-2 mb-2 uppercase tracking-wider">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm" />
                      <span>Severity P1 Outage</span>
                      <span className="text-amber-500">·</span>
                      <span className="text-amber-200">Automated Triage</span>
                    </div>
                    <h4 className="text-white font-black text-2xl tracking-tight leading-snug">
                      {scenario.title}
                    </h4>
                  </div>

                  {/* Clean Metadata Overview Grid */}
                  <div className="grid grid-cols-3 gap-3 bg-[#180d02] p-4 rounded-xl border border-amber-500/40 text-xs font-sans">
                    <div>
                      <div className="text-amber-400 text-[10px] uppercase font-black">Target Service</div>
                      <div className="text-white font-extrabold text-sm mt-0.5">{scenario.service}</div>
                    </div>
                    <div>
                      <div className="text-amber-400 text-[10px] uppercase font-black">Current Status</div>
                      <div className={isResolved ? "text-emerald-400 font-extrabold text-sm mt-0.5" : "text-amber-300 font-extrabold text-sm mt-0.5"}>
                        {isResolved ? "Normal (14%)" : "Saturated (98%)"}
                      </div>
                    </div>
                    <div>
                      <div className="text-amber-400 text-[10px] uppercase font-black">Infrastructure</div>
                      <div className="text-amber-100 mt-0.5 font-bold truncate">{scenario.topology}</div>
                    </div>
                  </div>

                  {/* Diagnosed Root Cause (Clean Card, Zero AI Slop) */}
                  <div className="bg-[#382006] border border-amber-400/50 p-4 rounded-xl text-xs space-y-1.5 shadow-md">
                    <div className="font-black text-amber-300 flex items-center gap-2 text-xs uppercase tracking-wider">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>Diagnosed Root Cause</span>
                    </div>
                    <p className="text-amber-50 leading-relaxed font-sans font-medium text-sm">
                      {scenario.rootCause}
                    </p>
                  </div>

                  {/* Proposed Sovereign Remediation Action (Clean Action Card, NO Terminal CLI) */}
                  <div className="bg-[#1a0e03] border border-amber-500/40 p-4 rounded-xl space-y-1.5">
                    <div className="text-amber-400 text-[11px] font-black uppercase tracking-wider flex items-center justify-between">
                      <span>Allowlisted Sovereign Runbook</span>
                      <span className="text-emerald-400 font-mono font-bold text-[10px]">Guardrail Approved</span>
                    </div>
                    <div className="text-white font-bold text-sm">
                      {scenario.actionTitle}
                    </div>
                    <p className="text-xs text-amber-200/80 font-sans">
                      {scenario.actionDetail}
                    </p>
                  </div>

                  {/* Interactive Approval / Replay Button Group */}
                  <div className="pt-2">
                    <AnimatePresence mode="wait">
                      {!isResolved ? (
                        <motion.div
                          key="unresolved-buttons"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col sm:flex-row items-center gap-3"
                        >
                          <button
                            type="button"
                            onClick={handleApprove}
                            disabled={isRemediating}
                            className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-sans font-black text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-emerald-500/30 active:scale-[0.99]"
                          >
                            {isRemediating ? (
                              <>
                                <Activity className="w-4 h-4 animate-spin text-black" />
                                <span>Applying Sovereign Runbook...</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-black font-bold" />
                                <span>Approve Remediation (1-Click)</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={handleReplay}
                            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#2e1905] hover:bg-[#3d2107] text-amber-200 hover:text-white font-sans text-xs font-bold border border-amber-500/40 cursor-pointer transition-colors"
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
                          className="p-4 rounded-xl bg-[#122e1b] border-2 border-emerald-400/80 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-black flex items-center justify-center font-black shrink-0 shadow-md">
                              <Check className="w-5 h-5 stroke-[3]" />
                            </div>
                            <div>
                              <div className="text-xs font-black text-emerald-300 uppercase tracking-wide">
                                Remediation Verified in {scenario.metric3.resolved}
                              </div>
                              <div className="text-xs text-zinc-200 mt-0.5 font-medium">
                                {scenario.resolutionDetail}
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={handleReplay}
                            className="self-end sm:self-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-sans font-black flex items-center gap-1.5 transition-colors cursor-pointer border border-white/20 shadow-sm"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Replay Incident</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Status Note */}
              <div className="pt-4 flex items-center justify-between text-xs text-amber-200 font-semibold">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>HMAC Authorization Signature: Active (TTL 10m)</span>
                </span>
                <span>Ref: #{scenario.id.toLowerCase()}</span>
              </div>
            </div>

            {/* Right Column: Execution Lifecycle Timeline (Clean Visual Progress, NOT a Terminal) */}
            <div className={`${activeTab === 'all' ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col justify-between`}>
              <div>
                <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-amber-500/30 text-xs text-amber-200 font-sans">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span className="text-white font-black text-sm">Automated Recovery Pipeline</span>
                  </div>
                  <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">In-VPC Autonomous Kernel</span>
                </div>

                {/* 4 Clean Visual Stage Cards */}
                <div className="space-y-3.5">
                  {[
                    {
                      step: 1,
                      stage: 'Signal Ingestion & Deduplication',
                      badge: 'Automated · 42ms',
                      desc: 'Correlated 482 Prometheus & Datadog telemetry alerts into 1 unified incident context.'
                    },
                    {
                      step: 2,
                      stage: 'Deterministic Root Cause Isolation',
                      badge: 'Read-Only Probe',
                      desc: `Non-invasive cluster inspection isolated exact fault: ${scenario.rootCause}`
                    },
                    {
                      step: 3,
                      stage: 'Cryptographic Authorization Gate',
                      badge: 'SHA-256 HMAC Bound',
                      desc: `Prepared sovereign allowlisted runbook with single-click sign-off in Slack or Telegram.`
                    },
                    {
                      step: 4,
                      stage: isResolved ? 'Executed & Health Verified' : 'Awaiting Sovereign Sign-Off',
                      badge: isResolved ? 'Verified in 2.4s' : 'Human Gate',
                      desc: isResolved 
                        ? 'Runbook executed inside VPC perimeter. 12 automated health checks verified nominal latency.'
                        : 'Action safely paused. Single-click human approval required before applying changes.'
                    }
                  ].map((s, idx) => {
                    const isStepActive = activeStepTab === idx;
                    const isStepFinished = idx < 3 || isResolved;

                    return (
                      <div
                        key={idx}
                        onClick={() => setActiveStepTab(idx)}
                        className={`p-4.5 rounded-2xl border-2 transition-all duration-200 cursor-pointer shadow-lg ${
                          isStepActive
                            ? 'bg-[#3d2207] border-amber-400 text-white ring-2 ring-amber-400/30 scale-[1.01]'
                            : 'bg-[#1e1003] hover:bg-[#291605] border-amber-500/35 hover:border-amber-400'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 mt-0.5 shadow-md ${
                            isStepFinished
                              ? 'bg-emerald-500 text-black'
                              : 'bg-amber-400 text-black'
                          }`}>
                            {isStepFinished ? '✓' : s.step}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between text-xs mb-1.5">
                              <span className={`font-black text-sm ${isStepActive ? 'text-amber-300' : 'text-white'}`}>
                                {s.stage}
                              </span>
                              <span className="font-mono text-[11px] font-extrabold px-2 py-0.5 rounded bg-black/40 text-amber-300 border border-amber-500/30">
                                {s.badge}
                              </span>
                            </div>
                            <p className="text-xs text-amber-100/90 leading-relaxed font-sans font-medium">
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
              <div className="pt-4 flex items-center justify-between text-xs text-amber-200 font-semibold">
                <span className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-amber-400" />
                  <span>Single-Tenant In-VPC Deployment</span>
                </span>
                <span>Zero telemetry leaves customer network</span>
              </div>
            </div>

          </div>

          {/* Bottom Telemetry Verification Row (Solid Warm Amber Cards) */}
          <div className="bg-[#341d06] border-t-2 border-amber-500/50 px-6 sm:px-8 py-7">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              <div className="p-5.5 rounded-2xl bg-[#221203] border-2 border-amber-500/40 hover:border-amber-300 hover:bg-[#2b1704] transition-all shadow-xl">
                <div className="text-xs font-sans text-amber-400 uppercase tracking-wider mb-1.5 font-black">
                  {scenario.metric1.label}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white font-sans tracking-tight">
                  {isResolved ? scenario.metric1.resolved : scenario.metric1.initial}
                </div>
                <p className="text-xs text-amber-200/80 mt-1.5 font-medium leading-relaxed">
                  {scenario.metric1.note}
                </p>
              </div>

              <div className="p-5.5 rounded-2xl bg-[#221203] border-2 border-amber-500/40 hover:border-amber-300 hover:bg-[#2b1704] transition-all shadow-xl">
                <div className="text-xs font-sans text-amber-400 uppercase tracking-wider mb-1.5 font-black">
                  {scenario.metric2.label}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white font-sans tracking-tight">
                  {isResolved ? scenario.metric2.resolved : scenario.metric2.initial}
                </div>
                <p className="text-xs text-amber-200/80 mt-1.5 font-medium leading-relaxed">
                  {scenario.metric2.note}
                </p>
              </div>

              <div className="p-5.5 rounded-2xl bg-[#221203] border-2 border-amber-500/40 hover:border-amber-300 hover:bg-[#2b1704] transition-all shadow-xl">
                <div className="text-xs font-sans text-amber-400 uppercase tracking-wider mb-1.5 font-black">
                  {scenario.metric3.label}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-sans tracking-tight">
                  {isResolved ? scenario.metric3.resolved : scenario.metric3.initial}
                </div>
                <p className="text-xs text-amber-200/80 mt-1.5 font-medium leading-relaxed">
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
