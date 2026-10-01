import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Clock, 
  Lock,
  RotateCcw
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

const WhatsAppLogo: React.FC<{ className?: string }> = ({ className = "w-4 h-4 shrink-0" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z" fill="#25D366"/>
    <path d="M17.51 14.38C17.21 14.23 15.75 13.51 15.48 13.41C15.21 13.31 15.01 13.26 14.81 13.56C14.61 13.86 14.04 14.53 13.87 14.73C13.7 14.93 13.52 14.95 13.23 14.8C12.93 14.65 11.97 14.34 10.84 13.33C9.96 12.54 9.36 11.57 9.19 11.27C9.02 10.97 9.17 10.81 9.32 10.66C9.45 10.53 9.62 10.32 9.77 10.14C9.92 9.97 9.97 9.84 10.07 9.64C10.17 9.45 10.12 9.27 10.04 9.12C9.97 8.97 9.37 7.51 9.13 6.91C8.88 6.33 8.64 6.41 8.46 6.4C8.29 6.39 8.09 6.39 7.89 6.39C7.69 6.39 7.37 6.46 7.1 6.76C6.83 7.06 6.06 7.78 6.06 9.24C6.06 10.7 7.13 12.11 7.27 12.31C7.42 12.51 9.37 15.51 12.35 16.8C13.06 17.11 13.61 17.29 14.04 17.43C14.75 17.65 15.4 17.62 15.91 17.55C16.48 17.46 17.67 16.83 17.92 16.13C18.17 15.44 18.17 14.84 18.09 14.72C18.02 14.6 17.81 14.53 17.51 14.38Z" fill="white"/>
  </svg>
);

const TelegramLogo: React.FC<{ className?: string }> = ({ className = "w-4 h-4 shrink-0" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#2AABEE"/>
    <path d="M17.89 7.22L15.92 16.5C15.77 17.16 15.38 17.32 14.83 17.01L11.83 14.8L10.38 16.19C10.22 16.35 10.09 16.48 9.78 16.48L9.99 13.43L15.55 8.41C15.79 8.2 15.5 8.08 15.18 8.29L8.31 12.62L5.35 11.69C4.71 11.49 4.69 11.05 5.48 10.74L17.05 6.28C17.59 6.08 18.06 6.41 17.89 7.22Z" fill="white"/>
  </svg>
);

type ChannelType = 'slack' | 'whatsapp' | 'telegram';

export const RemediationVideoPlayer: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<ChannelType>('slack');
  const [isResolved, setIsResolved] = useState<boolean>(true);
  const [isRemediating, setIsRemediating] = useState<boolean>(false);

  const CHANNELS: { id: ChannelType; name: string; handle: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'slack', name: 'Slack', handle: '#sre-critical', icon: SlackLogo },
    { id: 'whatsapp', name: 'WhatsApp', handle: '+91 96254 04565', icon: WhatsAppLogo },
    { id: 'telegram', name: 'Telegram', handle: '@AmberSREBot', icon: TelegramLogo },
  ];

  const handleApprove = () => {
    setIsRemediating(true);
    setTimeout(() => {
      setIsRemediating(false);
      setIsResolved(true);
    }, 1200);
  };

  const handleReplay = () => {
    setIsResolved(false);
  };

  const activeChannelObj = CHANNELS.find((c) => c.id === selectedChannel) || CHANNELS[0];

  return (
    <div className="w-full text-left">
      {/* ── Section Header Row: Left Heading & Right Clean White Pill Tabs ── */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10 border-b border-white/10 pb-8">
        <div>
          <div className="text-xs font-sans tracking-wider text-[#facc15] uppercase font-bold mb-2.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Autonomous Remediation Demo</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-sans">
            Experience Amber In Action.
          </h2>
        </div>

        {/* Right: 3 tabs - Slack | WhatsApp | Telegram (Clean White Pill Style) */}
        <div className="inline-flex items-center p-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xl shadow-2xl">
          {CHANNELS.map((ch) => {
            const isSelected = selectedChannel === ch.id;
            const Icon = ch.icon;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => setSelectedChannel(ch.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black font-bold shadow-md shadow-white/20 scale-[1.02]'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5 font-semibold'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{ch.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Big White Brutalist Incident Card (Zero Hacker Terminal / Zero Green Glow) ── */}
      <div className="w-full bg-white text-black border border-stone-200 rounded-3xl p-8 sm:p-12 md:p-14 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85)] relative overflow-hidden select-none">
        
        <AnimatePresence mode="wait">
          {isResolved ? (
            // ── Phase 1: Remediated Brutalist Incident Card (Default State) ──
            <motion.div
              key="remediated-card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Top Bar: Status Badge + Engine Name + 2.4s MTTR */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold font-sans tracking-wider uppercase">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>✓ REMEDIATED</span>
                  </div>
                  <span className="text-stone-300 font-sans">|</span>
                  <span className="font-sans font-bold text-stone-900 text-sm sm:text-base tracking-tight">
                    Amber Incident Engine
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-sans text-stone-500 font-medium hidden sm:inline">
                    Incident #AMB-8492
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 text-stone-900 border border-stone-200 font-sans text-xs font-bold uppercase tracking-wider">
                    <span>2.4s MTTR</span>
                  </div>
                </div>
              </div>

              {/* Headline */}
              <div className="mt-8 mb-6">
                <div className="text-xs font-sans font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  Deterministic Autonomous Resolution
                </div>
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-black tracking-tight font-sans leading-tight">
                  INCIDENT AUTO-RESOLVED · 2.4s MTTR
                </h3>
                <p className="text-stone-600 text-sm sm:text-base font-sans mt-2">
                  Postgres Connection Pool Saturation on <code className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded font-mono text-xs border border-stone-200">payment-db-prod</code> cluster.
                </p>
              </div>

              {/* Engineer Confirmation Quote Card */}
              <div className="bg-stone-50 border-l-4 border-black p-6 sm:p-8 rounded-r-2xl border-y border-r border-stone-200 my-8 shadow-sm">
                <div className="text-xs font-sans font-bold uppercase tracking-wider text-stone-500 mb-2.5 flex items-center gap-2">
                  <span>Human-In-The-Loop Audit Log</span>
                  <span className="text-stone-300">·</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Cryptographically Verified
                  </span>
                </div>

                <blockquote className="text-lg sm:text-2xl md:text-3xl font-bold text-stone-900 font-sans leading-snug tracking-tight">
                  “Engineer confirmed via {selectedChannel.toUpperCase()}. 4 idle connections terminated.”
                </blockquote>

                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-sans text-stone-600">
                  <div>
                    <strong>Action:</strong> <code className="bg-white border border-stone-200 px-1.5 py-0.5 rounded text-stone-800 font-mono text-xs">kill_db_connections(pids=[412, 415, 419, 428])</code>
                  </div>
                  <div>
                    <strong>Signer:</strong> Lead SRE ({activeChannelObj.handle})
                  </div>
                  <div>
                    <strong>Latency:</strong> 180ms round-trip
                  </div>
                </div>
              </div>

              {/* 3 Wide, Spacious Metric Blocks (Not small cramped cards) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                {/* Metric 1: Pool Utilization */}
                <div className="bg-[#fafafa] border border-stone-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-black/30 transition-all shadow-sm">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold font-sans uppercase tracking-wider text-stone-500">
                        Pool Utilization
                      </span>
                      <span className="text-[10px] font-bold font-sans px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Restored
                      </span>
                    </div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight font-sans my-2">
                      98% → 14%
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed mt-2">
                      Terminated 4 idle-in-transaction connections. Active connection pool restored to normal operating headroom.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-stone-200 text-xs font-sans font-semibold text-stone-500 flex items-center justify-between">
                    <span>Cluster Headroom</span>
                    <span className="text-emerald-700 font-bold">+84% Available</span>
                  </div>
                </div>

                {/* Metric 2: P99 Latency */}
                <div className="bg-[#fafafa] border border-stone-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-black/30 transition-all shadow-sm">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold font-sans uppercase tracking-wider text-stone-500">
                        P99 HTTP Latency
                      </span>
                      <span className="text-[10px] font-bold font-sans px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Verified
                      </span>
                    </div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight font-sans my-2">
                      48ms
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed mt-2">
                      Recovered from 8,400ms gateway timeout spikes. Health verification probes confirmed query latency stabilized.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-stone-200 text-xs font-sans font-semibold text-stone-500 flex items-center justify-between">
                    <span>SLA Compliance</span>
                    <span className="text-emerald-700 font-bold">&lt; 100ms Target Verified</span>
                  </div>
                </div>

                {/* Metric 3: Dropped Requests & Rollback */}
                <div className="bg-[#fafafa] border border-stone-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-black/30 transition-all shadow-sm">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold font-sans uppercase tracking-wider text-stone-500">
                        Dropped Requests
                      </span>
                      <span className="text-[10px] font-bold font-sans px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Zero Loss
                      </span>
                    </div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight font-sans my-2">
                      0.00%
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed mt-2">
                      Zero dropped transactions. Automated rollback guardrails safely disarmed after 12 successful health verification probes.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-stone-200 text-xs font-sans font-semibold text-stone-500 flex items-center justify-between">
                    <span>Rollback Safeguard</span>
                    <span className="text-stone-800 font-bold">Disarmed (Healthy)</span>
                  </div>
                </div>
              </div>

              {/* Divider & Multi-Channel Sync Status Bar */}
              <div className="border-t border-stone-200 pt-6 mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold font-sans">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>✓ Synced to Slack, WhatsApp, Telegram</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-sans font-medium text-stone-600">
                    <span className="inline-flex items-center gap-1.5"><SlackLogo className="w-3.5 h-3.5" /> Slack ✓</span>
                    <span className="inline-flex items-center gap-1.5"><WhatsAppLogo className="w-3.5 h-3.5" /> WhatsApp ✓</span>
                    <span className="inline-flex items-center gap-1.5"><TelegramLogo className="w-3.5 h-3.5" /> Telegram ✓</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-sans text-stone-500">
                  <span className="inline-flex items-center gap-1 bg-stone-100 border border-stone-200 px-2.5 py-1 rounded text-[11px] font-mono text-stone-700">
                    <Lock className="w-3 h-3 text-stone-600" />
                    SHA-256: 7f83b165...
                  </span>
                  <span className="hidden sm:inline text-stone-300">·</span>
                  <span>10m TTL Guardrail</span>
                  <button
                    type="button"
                    onClick={handleReplay}
                    className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900 hover:bg-black text-white font-sans font-bold text-xs transition-colors cursor-pointer shadow-sm hover:shadow"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Test 1-Click Flow</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            // ── Phase 2: Pending 1-Click Approval Brutalist Card (When Testing Flow) ──
            <motion.div
              key="pending-card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Top Bar: Action Required + Amber Incident Engine + P0 Critical */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold font-sans tracking-wider uppercase">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                    <span>ACTION REQUIRED</span>
                  </div>
                  <span className="text-stone-300 font-sans">|</span>
                  <span className="font-sans font-bold text-stone-900 text-sm sm:text-base tracking-tight">
                    Amber Incident Engine
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 font-sans text-xs font-bold uppercase tracking-wider">
                    P0 CRITICAL
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 text-stone-900 border border-stone-200 font-sans text-xs font-bold uppercase tracking-wider">
                    <Clock className="w-3 h-3 text-stone-600" />
                    TTL: 09:48
                  </span>
                </div>
              </div>

              {/* Headline & Incident summary */}
              <div className="mt-8 mb-6">
                <div className="text-xs font-sans font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  Alert Storm Ingestion & Root Cause Analysis
                </div>
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-black tracking-tight font-sans leading-tight">
                  Database Connection Pool Exhausted (98%)
                </h3>
                <p className="text-stone-600 text-sm sm:text-base font-sans mt-2">
                  Amber clustered 482 alert signals and diagnosed root cause: 4 idle-in-transaction queries blocking <code className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded font-mono text-xs border border-stone-200">payment-db-prod</code>.
                </p>
              </div>

              {/* Proposed Safe Remediation Command Box */}
              <div className="bg-stone-50 border-l-4 border-amber-500 p-6 sm:p-8 rounded-r-2xl border-y border-r border-stone-200 my-8 shadow-sm">
                <div className="text-xs font-sans font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-stone-900 font-bold">
                    <Zap className="w-4 h-4 text-amber-600" /> Proposed Remediation Command
                  </span>
                  <span className="font-mono text-xs text-stone-500">Target: AWS RDS Postgres 15</span>
                </div>
                <div className="bg-white border border-stone-200 rounded-xl p-4 font-mono text-sm font-bold text-stone-900 my-3">
                  kill_db_connections(pids=[412, 415, 419, 428])
                </div>
                <div className="flex flex-wrap items-center justify-between text-xs font-sans text-stone-600 pt-2">
                  <span>Cryptographic Token: <code className="font-mono text-stone-800">SHA-256: 7f83b165...</code></span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Single-Tenant VPC Guardrail Confirmed
                  </span>
                </div>
              </div>

              {/* 1-Click Approval Action Bar */}
              <div className="pt-2 flex flex-col sm:flex-row gap-4 items-center">
                <button
                  type="button"
                  onClick={handleApprove}
                  disabled={isRemediating}
                  className="w-full sm:flex-1 py-4 px-8 rounded-2xl bg-black hover:bg-stone-900 text-white font-sans font-bold text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
                >
                  {isRemediating ? (
                    <>
                      <Activity className="w-5 h-5 animate-spin text-white" />
                      <span>Executing in VPC & Verifying Health...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-white" />
                      <span>1-Click Approve via {selectedChannel.toUpperCase()}</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsResolved(true)}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl border border-stone-200 text-stone-600 hover:text-black hover:bg-stone-100 font-sans font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Skip to Remediated View
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
