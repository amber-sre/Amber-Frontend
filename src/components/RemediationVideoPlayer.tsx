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
  Layers
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

export const RemediationVideoPlayer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveViewMode>('all');
  const [isResolved, setIsResolved] = useState<boolean>(true);
  const [isRemediating, setIsRemediating] = useState<boolean>(false);

  const handleApprove = () => {
    setIsRemediating(true);
    setTimeout(() => {
      setIsRemediating(false);
      setIsResolved(true);
    }, 700);
  };

  const handleReplay = () => {
    setIsResolved(false);
  };

  return (
    <div className="w-full text-left">
      {/* Section Header Row */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10 border-b border-white/10 pb-8">
        <div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-sans">
            Interactive Incident Response.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl font-sans">
            See how Amber correlates alert storms, isolates root causes, and requests human sign-off before running allowlisted runbooks.
          </p>
        </div>

        {/* View Switcher */}
        <div className="inline-flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-sans tracking-wide transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-amber-400 text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white font-medium'
            }`}
          >
            Overview View
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('slack')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-sans tracking-wide transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'slack'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white font-medium'
            }`}
          >
            <SlackLogo className="w-3.5 h-3.5" />
            <span>Slack Dispatch</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('telegram')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-sans tracking-wide transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'telegram'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white font-medium'
            }`}
          >
            <TelegramLogo className="w-3.5 h-3.5" />
            <span>Telegram Bot</span>
          </button>
        </div>
      </div>

      {/* Main Glassmorphic Incident Canvas */}
      <div className="w-full relative select-none">
        <div className="w-full bg-[#0c0c0e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Top Metadata Header */}
          <div className="bg-[#141418] px-5 sm:px-7 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold ${
                isResolved
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isResolved ? 'bg-emerald-400' : 'bg-rose-400 animate-pulse'}`} />
                {isResolved ? 'INCIDENT RESOLVED' : 'ACTIVE INCIDENT'}
              </span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-300 font-medium">INC-9842</span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-400">billing-service / rds-postgres-15</span>
              <span className="text-zinc-600 hidden sm:inline">(us-east-1)</span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-zinc-400">
              <span className="inline-flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-400" />
                <span>SHA-256 HMAC Bound</span>
              </span>
              <span className="text-zinc-600">·</span>
              <span className="text-emerald-400 font-medium">0 External Egress</span>
            </div>
          </div>

          {/* Interactive Split Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: On-Call Incident Notification */}
            <div className={`${activeTab === 'all' ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col justify-between`}>
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    {activeTab === 'telegram' ? (
                      <>
                        <TelegramLogo className="w-3.5 h-3.5" />
                        <span className="text-white font-semibold">@AmberSREBot</span>
                        <span className="text-zinc-500">·</span>
                        <span className="text-zinc-400">Telegram Incident Dispatch</span>
                      </>
                    ) : (
                      <>
                        <SlackLogo className="w-3.5 h-3.5" />
                        <span className="text-white font-semibold">#prod-oncall</span>
                        <span className="text-zinc-500">·</span>
                        <span className="text-zinc-400">Slack Incident Channel</span>
                      </>
                    )}
                  </div>
                  <span className="text-[11px] text-zinc-500 font-mono">03:43 AM UTC</span>
                </div>

                {/* Incident Card */}
                <div className="bg-[#121216] border border-white/10 rounded-xl p-5 space-y-4">
                  <div>
                    <div className="text-xs font-semibold text-rose-400 flex items-center gap-1.5 mb-1">
                      <span>Severity P1</span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-zinc-400">Automated Triage</span>
                    </div>
                    <h4 className="text-white font-bold text-lg tracking-tight">
                      PostgreSQL Connection Pool Saturated (98%)
                    </h4>
                  </div>

                  {/* Metadata Specs Grid */}
                  <div className="grid grid-cols-3 gap-2 bg-black/40 p-3 rounded-lg border border-white/5 text-xs font-sans">
                    <div>
                      <div className="text-zinc-500 text-[10px] uppercase font-bold">Service</div>
                      <div className="text-white font-semibold">billing-db</div>
                    </div>
                    <div>
                      <div className="text-zinc-500 text-[10px] uppercase font-bold">State</div>
                      <div className={isResolved ? "text-emerald-400 font-semibold" : "text-amber-400 font-semibold"}>
                        {isResolved ? "Normal" : "Saturated"}
                      </div>
                    </div>
                    <div>
                      <div className="text-zinc-500 text-[10px] uppercase font-bold">Cluster</div>
                      <div className="text-zinc-300">RDS Postgres 15</div>
                    </div>
                  </div>

                  {/* Diagnosed Root Cause */}
                  <div className="bg-white/[0.03] border border-white/10 p-3.5 rounded-lg text-xs text-zinc-300 space-y-1">
                    <div className="font-semibold text-white">
                      Diagnosed Root Cause:
                    </div>
                    <p className="text-zinc-400 leading-relaxed">
                      10 idle-in-transaction connections holding slots on <span className="text-zinc-200 font-mono">billing-db</span>, blocking inbound checkout queries.
                    </p>
                  </div>

                  {/* Proposed Remediation */}
                  <div className="space-y-1 text-xs">
                    <div className="text-zinc-400 font-medium">
                      Allowlisted Remediation Runbook:
                    </div>
                    <div className="bg-black/60 px-3 py-2 rounded-lg border border-white/10 font-mono text-amber-300 text-xs">
                      drain_idle_connections(service=&apos;billing-db&apos;, max_idle=300s)
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
                            className="w-full sm:flex-1 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20 active:scale-[0.99]"
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
                            className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white font-sans text-xs border border-white/10 cursor-pointer transition-colors"
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
                          className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                              <Check className="w-4 h-4 font-bold" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-emerald-400">
                                Remediation Applied in 2.4s
                              </div>
                              <div className="text-xs text-zinc-300 mt-0.5">
                                4 idle connections terminated. Pool utilization returned to 14%.
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={handleReplay}
                            className="self-end sm:self-auto px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-zinc-200 text-xs font-sans font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
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
              <div className="pt-4 flex items-center justify-between text-xs text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Payload authorization TTL: 10m</span>
                </span>
                <span>Audit Ref: #inc-9842</span>
              </div>
            </div>

            {/* Right Column: Execution Lifecycle & Telemetry Stepper */}
            <div className={`${activeTab === 'all' ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col justify-between`}>
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-white font-semibold">Incident Resolution Lifecycle</span>
                  </div>
                  <span className="text-xs text-zinc-500 font-mono">In-VPC Autonomous Daemon</span>
                </div>

                {/* Structured Event Stepper */}
                <div className="space-y-3">
                  {/* Step 1 */}
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-zinc-400 shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-xs mb-0.5">
                        <span className="font-bold text-white">Alert Deduplication</span>
                        <span className="font-mono text-[10px] text-zinc-500">03:43:01.042</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Correlated 482 Prometheus and Datadog signals into 1 unified incident context.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-zinc-400 shrink-0 mt-0.5">
                      2
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-xs mb-0.5">
                        <span className="font-bold text-white">Read-Only Cluster Diagnosis</span>
                        <span className="font-mono text-[10px] text-zinc-500">03:43:01.198</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Read-only inspection of <span className="font-mono text-zinc-300">pg_stat_activity</span> identified 10 unreleased transaction handles on billing-db.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-zinc-400 shrink-0 mt-0.5">
                      3
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-xs mb-0.5">
                        <span className="font-bold text-white">Cryptographic Authorization</span>
                        <span className="font-mono text-[10px] text-zinc-500">03:43:01.482</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Generated SHA-256 HMAC payload binding with 10-minute validity and sent 1-click prompt to on-call channel.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className={`p-3.5 rounded-xl border transition-all ${
                    isResolved 
                      ? 'bg-emerald-950/20 border-emerald-500/30' 
                      : 'bg-white/[0.03] border-white/10'
                  } flex items-start gap-3`}>
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      isResolved 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                        : 'bg-white/5 text-zinc-400 border border-white/10'
                    }`}>
                      {isResolved ? '✓' : '4'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-xs mb-0.5">
                        <span className={`font-bold ${isResolved ? 'text-emerald-400' : 'text-white'}`}>
                          {isResolved ? 'Executed & Verified' : 'Awaiting Approval'}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-500">
                          {isResolved ? '03:43:02.412' : 'Pending'}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {isResolved 
                          ? 'Runbook executed successfully. 12 health verification probes confirmed API latency restored to 48ms.' 
                          : 'Remediation is paused awaiting sovereign human authorization in Slack or Telegram.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Note */}
              <div className="pt-4 flex items-center justify-between text-xs text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Runtime: In-VPC Container</span>
                </span>
                <span>Zero telemetry leaves perimeter</span>
              </div>
            </div>

          </div>

          {/* Bottom Telemetry Verification Row */}
          <div className="bg-[#0f0f13] border-t border-white/10 px-6 sm:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs font-sans text-zinc-400 uppercase tracking-wider mb-1 font-semibold">
                  Pool Utilization
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
                  {isResolved ? '98% → 14%' : '98% Saturation'}
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  {isResolved 
                    ? 'Terminated 4 idle connections. Headroom restored.' 
                    : '10 idle connections blocking available pool.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs font-sans text-zinc-400 uppercase tracking-wider mb-1 font-semibold">
                  P99 API Latency
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
                  {isResolved ? '48ms' : '8,400ms Spike'}
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  {isResolved 
                    ? '12 health checks confirmed nominal latency.' 
                    : 'Gateway timeouts triggered by database lock contention.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs font-sans text-zinc-400 uppercase tracking-wider mb-1 font-semibold">
                  Resolution Time (MTTR)
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-sans tracking-tight">
                  {isResolved ? '2.4s' : 'Awaiting Approval'}
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  {isResolved 
                    ? 'Zero dropped transactions. Health confirmed.' 
                    : 'Runbook verified with SHA-256 payload token.'}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
