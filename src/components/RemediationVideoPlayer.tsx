import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Lock, 
  RotateCcw,
  Sparkles,
  Terminal
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

type ActiveViewMode = 'dual' | 'slack' | 'telegram' | 'terminal';

export const RemediationVideoPlayer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveViewMode>('dual');
  const [isResolved, setIsResolved] = useState<boolean>(true);
  const [isRemediating, setIsRemediating] = useState<boolean>(false);

  const handleApprove = () => {
    setIsRemediating(true);
    setTimeout(() => {
      setIsRemediating(false);
      setIsResolved(true);
    }, 900);
  };

  const handleReplay = () => {
    setIsResolved(false);
  };

  return (
    <div className="w-full text-left">
      {/* ── Section Header Row: Title & Modern Workspace Selector ── */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10 border-b border-white/10 pb-8">
        <div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-sans">
            Experience Amber In Action.
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-2xl font-sans">
            Deterministic Human-in-the-Loop incident response across Slack, Telegram, and In-VPC runtime kernels.
          </p>
        </div>

        {/* Workspace View Switcher (Clean Segmented Control) */}
        <div className="inline-flex items-center p-1 rounded-xl bg-stone-900/90 border border-stone-800 shadow-2xl backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setActiveTab('dual')}
            className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              activeTab === 'dual'
                ? 'bg-amber-400 text-black font-bold shadow-md shadow-amber-400/20'
                : 'text-stone-400 hover:text-white hover:bg-white/5 font-medium'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>War Room (Dual)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('slack')}
            className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              activeTab === 'slack'
                ? 'bg-white text-black font-bold shadow-md shadow-white/20'
                : 'text-stone-400 hover:text-white hover:bg-white/5 font-medium'
            }`}
          >
            <SlackLogo className="w-3.5 h-3.5" />
            <span>Slack Gateway</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('telegram')}
            className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              activeTab === 'telegram'
                ? 'bg-white text-black font-bold shadow-md shadow-white/20'
                : 'text-stone-400 hover:text-white hover:bg-white/5 font-medium'
            }`}
          >
            <TelegramLogo className="w-3.5 h-3.5" />
            <span>Telegram Bot</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('terminal')}
            className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              activeTab === 'terminal'
                ? 'bg-white text-black font-bold shadow-md shadow-white/20'
                : 'text-stone-400 hover:text-white hover:bg-white/5 font-medium'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>In-VPC Kernel</span>
          </button>
        </div>
      </div>

      {/* ── Main Showcase: Modern Glassmorphic SRE Command Console ── */}
      <div className="w-full relative select-none">
        {/* Subtle Ambient Glows */}
        <div className="absolute -top-10 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Master Studio Window Frame */}
        <div className="w-full bg-[#0a0e17] border border-white/10 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_50px_rgba(217,119,6,0.08)] overflow-hidden">
          
          {/* Top Console Titlebar */}
          <div className="bg-[#0f141f] px-4 sm:px-6 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
              </div>
              <span className="text-white/20">|</span>
              <div className="flex items-center gap-2 font-mono text-xs text-stone-300">
                <span className="text-amber-400 font-bold">amber-sre-engine</span>
                <span className="text-stone-500">•</span>
                <span className="text-stone-400">aws-us-east-1</span>
                <span className="text-stone-500">•</span>
                <span className="text-rose-400 font-bold">INC-9842 (billing-db)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px]">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>STREAM ONLINE</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 text-stone-400 border border-white/10">
                <Lock className="w-3 h-3 text-amber-400" />
                <span>SHA-256 HMAC VERIFIED</span>
              </div>
            </div>
          </div>

          {/* Interactive Dual-Pane Workplace Body */}
          <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-gradient-to-b from-[#0a0e17] via-[#080b12] to-[#06080d]">
            
            {/* ════════════════════════════════════════════════════════════
                PANE 1: INCIDENT ALERT GATEWAY (Left Column)
               ════════════════════════════════════════════════════════════ */}
            {(activeTab === 'dual' || activeTab === 'slack' || activeTab === 'telegram') && (
              <div className={`${activeTab === 'dual' ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col justify-between`}>
                
                {/* Gateway Window Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 font-mono text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    {activeTab === 'telegram' ? (
                      <>
                        <TelegramLogo className="w-3.5 h-3.5" />
                        <span className="text-white font-bold">@AmberSREBot</span>
                        <span className="text-stone-500">·</span>
                        <span className="text-stone-400">Telegram Gateway</span>
                      </>
                    ) : (
                      <>
                        <SlackLogo className="w-3.5 h-3.5" />
                        <span className="text-white font-bold">#all-himanshu</span>
                        <span className="text-stone-500">·</span>
                        <span className="text-stone-400">Slack Incident Bridge</span>
                      </>
                    )}
                  </div>
                  <span className="text-[10px] text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                    HITL PENDING APPROVAL
                  </span>
                </div>

                {/* The Incident Card */}
                <div className="bg-[#121620] border border-stone-800 rounded-xl p-4 sm:p-5 shadow-inner space-y-4">
                  
                  {/* Headline */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-rose-400 font-mono font-bold text-xs flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                        <span>[P0 - CATASTROPHIC OUTAGE]</span>
                      </div>
                      <h4 className="text-white font-sans font-bold text-base sm:text-lg mt-0.5 tracking-tight">
                        PostgreSQL Connection Pool Exhausted (98%)
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-stone-500 shrink-0">
                      3:43 AM · UTC
                    </span>
                  </div>

                  {/* Incident Specs */}
                  <div className="grid grid-cols-3 gap-2 bg-black/40 p-3 rounded-lg border border-white/5 font-mono text-xs">
                    <div>
                      <div className="text-stone-500 text-[10px] uppercase">Service</div>
                      <div className="text-rose-400 font-bold">billing-db</div>
                    </div>
                    <div>
                      <div className="text-stone-500 text-[10px] uppercase">State</div>
                      <div className="text-amber-400 font-bold">SATURATED</div>
                    </div>
                    <div>
                      <div className="text-stone-500 text-[10px] uppercase">Topology</div>
                      <div className="text-stone-300">RDS Postgres 15</div>
                    </div>
                  </div>

                  {/* AI Root Cause Diagnosis */}
                  <div className="bg-amber-950/20 border-l-2 border-amber-400 p-3 rounded-r-lg text-xs font-sans text-stone-200">
                    <div className="font-bold text-amber-300 mb-0.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Deterministic Root Cause Diagnosis:</span>
                    </div>
                    10 hanging <code className="text-amber-200 bg-black/40 px-1 py-0.5 rounded font-mono text-[11px]">idle-in-transaction</code> worker queries holding connection slots on <code className="text-stone-300 font-mono">payment-db-prod</code>.
                  </div>

                  {/* Proposed Mutating Action */}
                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="text-stone-400 text-[11px] flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Proposed Mutating Action (Allowlisted Runbook):</span>
                    </div>
                    <div className="bg-black/60 p-2.5 rounded-lg border border-white/10 text-amber-300 text-xs overflow-x-auto">
                      <code>kill_db_connections(target=&apos;billing-db&apos;, pids=[101, 102, 104, 108])</code>
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
                            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/30 active:scale-98"
                          >
                            {isRemediating ? (
                              <>
                                <Activity className="w-4 h-4 animate-spin" />
                                <span>Executing Cryptographic Runbook...</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-white" />
                                <span>1-Click Approve Remediation</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={handleReplay}
                            className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 font-mono text-xs border border-white/10 cursor-pointer"
                          >
                            Reject
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="resolved-badge"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                              <Check className="w-4 h-4 font-bold" />
                            </div>
                            <div>
                              <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-2">
                                <span>AUTONOMOUS EXECUTION VERIFIED</span>
                                <span className="text-stone-500">•</span>
                                <span className="text-white">2.4s MTTR</span>
                              </div>
                              <div className="text-xs text-stone-300 font-sans mt-0.5">
                                4 idle connections terminated. Pool dropped from 98% → 14%.
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={handleReplay}
                            className="self-end sm:self-auto px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Replay Alert</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>

                {/* Cryptographic Footprint Bar */}
                <div className="pt-3 flex items-center justify-between font-mono text-[11px] text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-amber-400" />
                    <span>HMAC-SHA256:</span>
                    <span className="text-stone-400">8f4a21...d9e2</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">100% In-VPC Boundary</span>
                  </div>
                </div>

              </div>
            )}


            {/* ════════════════════════════════════════════════════════════
                PANE 2: LIVE KERNEL EXECUTION TERMINAL (Right Column)
               ════════════════════════════════════════════════════════════ */}
            {(activeTab === 'dual' || activeTab === 'terminal') && (
              <div className={`${activeTab === 'dual' ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col justify-between`}>
                
                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 font-mono text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-white font-bold">amber-kernel-daemon</span>
                    <span className="text-stone-500">·</span>
                    <span className="text-stone-400">Local VPC Runtime</span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400">
                    OLLAMA LOCAL (0 EGRESS)
                  </span>
                </div>

                {/* Real Terminal Log Output */}
                <div className="bg-[#05070a] border border-stone-800 rounded-xl p-4 sm:p-5 font-mono text-[11px] sm:text-xs text-stone-300 space-y-2 h-[340px] overflow-y-auto shadow-inner">
                  
                  <div className="text-stone-500 pb-1 border-b border-white/5">
                    # Amber Autonomous SRE Kernel v2.4.0 (In-VPC Cluster Sovereign)
                  </div>

                  <div>
                    <span className="text-stone-500">03:43:01.042</span>{' '}
                    <span className="text-sky-400 font-bold">[INGEST]</span>{' '}
                    <span>Correlated 482 alert signals into 1 root incident (INC-9842)</span>
                  </div>

                  <div>
                    <span className="text-stone-500">03:43:01.198</span>{' '}
                    <span className="text-amber-400 font-bold">[DIAGNOSE]</span>{' '}
                    <span>billing-db (RDS Postgres 15, us-east-1) capacity saturated</span>
                  </div>

                  <div>
                    <span className="text-stone-500">03:43:01.350</span>{' '}
                    <span className="text-rose-400 font-bold">[ANOMALY]</span>{' '}
                    <span>Detected 10 idle-in-transaction queries blocking connection pool (98%)</span>
                  </div>

                  <div>
                    <span className="text-stone-500">03:43:01.482</span>{' '}
                    <span className="text-purple-400 font-bold">[CRYPTO]</span>{' '}
                    <span>Generated SHA-256 HMAC payload binding: 8f4a21...d9e2 (TTL: 10m)</span>
                  </div>

                  <div>
                    <span className="text-stone-500">03:43:01.620</span>{' '}
                    <span className="text-amber-300 font-bold">[HITL]</span>{' '}
                    <span>Dispatched interactive approval card to Slack &amp; Telegram</span>
                  </div>

                  {isResolved ? (
                    <>
                      <div className="text-emerald-400 font-bold pt-1">
                        <span className="text-stone-500">03:43:02.012</span>{' '}
                        <span>[APPROVED] Cryptographic signature verified by on-call engineer</span>
                      </div>
                      <div>
                        <span className="text-stone-500">03:43:02.140</span>{' '}
                        <span className="text-sky-300 font-bold">[RUNBOOK]</span>{' '}
                        <span>Invoking allowlisted action: kill_db_connections(pids=[101, 102])</span>
                      </div>
                      <div>
                        <span className="text-stone-500">03:43:02.290</span>{' '}
                        <span className="text-emerald-300 font-bold">[EXECUTE]</span>{' '}
                        <span>Terminated 4 blocking worker queries. Pool utilization dropped to 14%.</span>
                      </div>
                      <div>
                        <span className="text-stone-500">03:43:02.410</span>{' '}
                        <span className="text-emerald-400 font-bold">[VERIFY]</span>{' '}
                        <span>12/12 automated health probes PASSED. P99 HTTP latency: 48ms.</span>
                      </div>
                      <div className="text-white font-bold bg-emerald-950/30 p-2 rounded border border-emerald-500/20">
                        <span className="text-stone-500">03:43:02.412</span>{' '}
                        <span className="text-emerald-400">[RESOLVED]</span>{' '}
                        <span>Incident resolved autonomously in 2.4s MTTR. Audit log cryptographically sealed.</span>
                      </div>
                    </>
                  ) : (
                    <div className="pt-2 text-amber-400 animate-pulse flex items-center gap-2">
                      <span className="text-stone-500">03:43:01.710</span>{' '}
                      <span>[AWAITING] Standing by for 1-Click Human-in-the-Loop authorization...</span>
                      <span className="inline-block w-2 h-3.5 bg-amber-400 animate-bounce" />
                    </div>
                  )}

                </div>

                {/* Terminal Bottom Status */}
                <div className="pt-3 flex items-center justify-between font-mono text-[11px] text-stone-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-stone-400">Zero raw telemetry leaves perimeter</span>
                  </div>
                  <span className="text-stone-400">Audit trail: /var/log/amber/audit.log</span>
                </div>

              </div>
            )}

          </div>

          {/* ════════════════════════════════════════════════════════════
              BOTTOM REAL-TIME TELEMETRY & AUDIT HUD
             ════════════════════════════════════════════════════════════ */}
          <div className="border-t border-white/10 p-6 sm:p-8 bg-[#070a10]">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-sans font-bold text-white text-sm sm:text-base tracking-tight">
                  Live Single-Tenant Telemetry Verification
                </span>
                <span className="text-stone-600 hidden sm:inline">|</span>
                <span className="text-xs font-mono text-stone-400 hidden sm:inline">
                  AWS RDS Postgres 15 (us-east-1)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleReplay}
                  className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-mono font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-md hover:scale-102 active:scale-98"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Incident Flow</span>
                </button>
              </div>
            </div>

            {/* 3 Real Telemetry Metrics (Clean modern cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
              
              {/* Metric 1 */}
              <div className="p-5 rounded-xl bg-black/40 border border-white/5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider">
                    Pool Utilization
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    isResolved 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                      : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                  }`}>
                    {isResolved ? 'RESTORED' : 'SATURATED'}
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono my-1 tracking-tight">
                  {isResolved ? '98% → 14%' : '98% (Exhausted)'}
                </div>
                <p className="text-xs text-stone-400 leading-relaxed mt-1">
                  {isResolved 
                    ? 'Terminated 4 idle queries. Active pool restored to normal operating headroom.'
                    : '482 alert signals correlated. 10 idle connections blocking pool capacity.'}
                </p>
              </div>

              {/* Metric 2 */}
              <div className="p-5 rounded-xl bg-black/40 border border-white/5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider">
                    P99 HTTP Latency
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    isResolved 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  }`}>
                    {isResolved ? 'VERIFIED' : 'DEGRADED'}
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono my-1 tracking-tight">
                  {isResolved ? '48ms' : '8,400ms Spike'}
                </div>
                <p className="text-xs text-stone-400 leading-relaxed mt-1">
                  {isResolved 
                    ? 'Recovered from gateway timeout spikes. 12 health verification probes confirmed.'
                    : 'Upstream services experiencing gateway timeouts due to exhausted pool.'}
                </p>
              </div>

              {/* Metric 3 */}
              <div className="p-5 rounded-xl bg-black/40 border border-white/5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider">
                    Recovery Time (MTTR)
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {isResolved ? 'SUB-3S VERIFIED' : 'AWAITING APPROVAL'}
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono my-1 tracking-tight">
                  {isResolved ? '2.4s MTTR' : '1-Click Pending'}
                </div>
                <p className="text-xs text-stone-400 leading-relaxed mt-1">
                  {isResolved 
                    ? 'Zero dropped transactions. Rollback safeguards safely disarmed.'
                    : 'Action bound with SHA-256 HMAC payload hash and 10-minute TTL window.'}
                </p>
              </div>

            </div>

            {/* Bottom Channel Sync Proof Bar */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans text-stone-400">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5 font-mono">
                  <Check className="w-3.5 h-3.5" /> Synced in real-time:
                </span>
                <span className="inline-flex items-center gap-1 text-stone-300 font-mono"><SlackLogo className="w-3.5 h-3.5" /> #all-himanshu</span>
                <span className="text-stone-600">•</span>
                <span className="inline-flex items-center gap-1 text-stone-300 font-mono"><TelegramLogo className="w-3.5 h-3.5" /> @AmberSREBot</span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Data Exfiltration • In-VPC Cluster Sovereign</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
