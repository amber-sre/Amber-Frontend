import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  Send, 
  Bot, 
  Sparkles, 
  TrendingUp, 
  Terminal, 
  Lock, 
  Globe, 
  RefreshCw, 
  Zap, 
  Flame, 
  Layers 
} from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

export function ExecutiveAuditShowcase() {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'delivery'>('weekly');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    }, 900);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNotification(label);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  return (
    <section id="executive-audits" className="px-8 md:px-16 py-32 bg-[#050505] text-white border-b border-white/10 relative overflow-hidden scroll-mt-20">
      {/* Background Radial Glow & Sub-grid */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#d97706]/15 via-[#facc15]/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Eyebrow Header */}
        <div className="flex justify-between items-center text-xs font-sans font-semibold tracking-wider text-[#facc15] uppercase border-b border-white/10 pb-5 mb-16">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#facc15] animate-ping" />
            <span className="text-white">Executive Reliability Engine &amp; Incident Audits</span>
          </div>
          <div className="hidden sm:block text-zinc-400 font-sans font-medium text-[11px]">
            Host Timezone Auto-Detected · Zero Telemetry Egress
          </div>
          <div className="text-[#facc15] font-bold drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]">
            5 Automated Audits / Month
          </div>
        </div>

        {/* Section Editorial Title & Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#facc15] text-xs font-mono font-medium mb-4 flex-wrap">
              <Sparkles className="w-3.5 h-3.5 text-[#facc15]" />
              <span>FROM 2:00 AM WAR ROOM TO MONDAY MORNING BOARDROOM</span>
              <span className="text-zinc-500 hidden sm:inline">•</span>
              <span className="text-white font-bold bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded text-[10px]">AUTONOMOUS &amp; ENTERPRISE TIERS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              Automated Executive Digests &amp; <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#facc15] via-[#fbbf24] to-[#d97706]">
                Incident Audit Reports.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
              Stop burning expensive senior engineering hours each month drafting incident postmortems. 
              Amber translates complex infrastructure telemetry into executive business ROI—quantifying revenue protected and predicting compound failure risks before peak traffic events.
            </p>
          </div>
        </div>

        {/* 4 Feature Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <SpotlightCard className="bg-[#0b0b0b] border border-white/10 p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#facc15] mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-[#facc15] uppercase tracking-wider mb-1">Cadence</div>
              <h4 className="text-lg font-bold text-white mb-2">5 Audits Every Month</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                4 Weekly SRE Digests dispatched every Monday at 9:00 AM local time + 1 Grand Monthly Master Audit delivered on the 1st of each month.
              </p>
            </div>
            <div className="text-[11px] font-mono text-zinc-500 pt-3 mt-4 border-t border-white/5 flex items-center justify-between">
              <span>Schedule</span>
              <span className="text-white font-semibold">Weekly + Monthly</span>
            </div>
          </SpotlightCard>

          <SpotlightCard className="bg-[#0b0b0b] border border-white/10 p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <Globe className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">Zero Config</div>
              <h4 className="text-lg font-bold text-white mb-2">Auto-Detected Timezone</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Reads host <code className="text-zinc-200 bg-white/5 px-1 py-0.5 rounded">/etc/localtime</code> directly. Reports arrive at 9:00 AM in your exact office timezone with zero manual cron configuration.
              </p>
            </div>
            <div className="text-[11px] font-mono text-zinc-500 pt-3 mt-4 border-t border-white/5 flex items-center justify-between">
              <span>Detection</span>
              <span className="text-emerald-400 font-semibold">Native OS Symlink</span>
            </div>
          </SpotlightCard>

          <SpotlightCard className="bg-[#0b0b0b] border border-white/10 p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
                <Flame className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-rose-400 uppercase tracking-wider mb-1">Catastrophe Modeling</div>
              <h4 className="text-lg font-bold text-white mb-2">Proactive Disaster Analysis</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                "What Could Happen Next" engine simulates compound failures if unpatched architectural debt hits high-traffic flash sales or regional traffic spikes.
              </p>
            </div>
            <div className="text-[11px] font-mono text-zinc-500 pt-3 mt-4 border-t border-white/5 flex items-center justify-between">
              <span>Risk Prediction</span>
              <span className="text-rose-400 font-semibold">Blast Radius Simulation</span>
            </div>
          </SpotlightCard>

          <SpotlightCard className="bg-[#0b0b0b] border border-white/10 p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <Send className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-1">Direct Delivery</div>
              <h4 className="text-lg font-bold text-white mb-2">Slack, Telegram &amp; PDF</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Dispatched straight into Slack (<code className="text-zinc-200 bg-white/5 px-1 py-0.5 rounded">#prod-alerts</code>) and Telegram (<code className="text-zinc-200 bg-white/5 px-1 py-0.5 rounded">@ambersre_alert_bot</code>) with cryptographically signed PDFs.
              </p>
            </div>
            <div className="text-[11px] font-mono text-zinc-500 pt-3 mt-4 border-t border-white/5 flex items-center justify-between">
              <span>Compliance</span>
              <span className="text-blue-400 font-semibold">SOC-2 Type II Ready</span>
            </div>
          </SpotlightCard>

        </div>

        {/* Interactive Report View Showcase */}
        <div className="bg-[#09090b] border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-black/90">
          
          {/* Top Bar with Tabs and Meta Controls */}
          <div className="bg-[#111113] border-b border-white/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            
            {/* View Selector Tabs */}
            <div className="flex items-center gap-2 bg-[#050505] p-1 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('weekly')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                  activeTab === 'weekly'
                    ? 'bg-[#d97706] text-white shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Weekly SRE Digest</span>
                <span className="text-[10px] bg-black/30 px-1.5 py-0.2 rounded font-mono">Mon 09:00</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('monthly')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                  activeTab === 'monthly'
                    ? 'bg-[#d97706] text-white shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Grand Monthly Board Audit</span>
                <span className="text-[10px] bg-black/30 px-1.5 py-0.2 rounded font-mono">1st / Month</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('delivery')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                  activeTab === 'delivery'
                    ? 'bg-[#d97706] text-white shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Slack &amp; Telegram Push</span>
              </button>
            </div>

            {/* Quick Actions: Download PDF / Status */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>0 BYTES TELEMETRY EGRESS · IN-VPC</span>
              </span>

              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3 py-1.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer group"
              >
                {isDownloading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#facc15]" />
                    <span>Compiling PDF...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">PDF Downloaded</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-[#facc15] group-hover:-translate-y-0.5 transition-transform" />
                    <span>Export Audit PDF</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Interactive Report Content Canvas */}
          <div className="p-6 sm:p-10">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: Weekly SRE Digest */}
              {activeTab === 'weekly' && (
                <motion.div
                  key="weekly"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Header Card of the Report */}
                  <div className="p-6 rounded-2xl bg-[#111114] border border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#facc15] uppercase tracking-wider mb-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>WEEKLY SRE DIGEST · WEEK 41</span>
                        <span className="text-zinc-500">|</span>
                        <span className="text-zinc-300">DISPATCHED: MONDAY 09:00:00 LOCAL</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        Production Fleet Reliability &amp; Root Cause Audit
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1">
                        Target Cluster: <span className="text-zinc-200 font-mono">prod-aws-us-east-1</span> · 
                        Host Timezone: <span className="text-emerald-400 font-mono">Asia/Kolkata (auto-detected)</span> · 
                        Monitored Nodes: <span className="text-zinc-200 font-mono">48 nodes</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-[10px] font-mono text-zinc-400 uppercase">Weekly MTTR</div>
                        <div className="text-xl font-mono font-black text-emerald-400 flex items-center justify-end gap-1">
                          <TrendingUp className="w-4 h-4" /> 8.4s
                        </div>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                      <div className="text-right">
                        <div className="text-[10px] font-mono text-zinc-400 uppercase">Human War Rooms Avoided</div>
                        <div className="text-xl font-mono font-black text-[#facc15]">14 Incidents</div>
                      </div>
                    </div>
                  </div>

                  {/* Incident Chronology & Deep-Dive Breakdown */}
                  <div className="border border-white/10 rounded-2xl bg-[#0c0c0e] overflow-hidden">
                    
                    {/* Top Incident Header */}
                    <div className="p-5 bg-white/5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold">
                          P0 CRITICAL
                        </span>
                        <div>
                          <div className="text-sm font-bold text-white flex items-center gap-2">
                            <span>Payments DB Connection Pool Exhaustion (#INC-5021)</span>
                            <span className="text-xs text-zinc-400 font-mono font-normal">03:14:02 AM UTC</span>
                          </div>
                          <div className="text-xs text-zinc-400">
                            Service: <code className="text-zinc-200 font-mono">checkout-api</code> (18 Pods) · Blast Radius: 1,420 checkout attempts buffered
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" /> MTTR 8.4s (Automated)
                        </span>
                      </div>
                    </div>

                    {/* Chronology & Dual-Tier Resolution Grid */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Left: Immediate Automated Fix */}
                      <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-mono font-bold text-[#facc15] uppercase tracking-wider mb-2 flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5 text-[#facc15]" />
                            <span>1. Immediate Automated Self-Healing</span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                            Amber Guardrail detected connection pool saturation at 99/100 slots. Emitted SHA-256 bound authorization token to on-call Slack in 80ms.
                          </p>
                          <div className="p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-[11px] text-zinc-300 space-y-1">
                            <div className="text-emerald-400">✓ Executed: TerminateIdleConnections(max_age=300s)</div>
                            <div className="text-zinc-400">→ Pool active connections recovered from 99% to 22%</div>
                            <div className="text-zinc-400">→ HTTP 504 Gateway Timeouts dropped from 14.8% to 0.00%</div>
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-zinc-500 flex justify-between">
                          <span>Execution Mode: Slack 1-Click Approved</span>
                          <span className="text-emerald-400 font-bold">Health Converged in 8.4s</span>
                        </div>
                      </div>

                      {/* Right: Permanent Developer Code/Schema Fix */}
                      <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <Terminal className="w-3.5 h-3.5 text-blue-400" />
                            <span>2. Permanent Developer Code Fix</span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                            Root cause telemetry isolated an unclosed database cursor in <code className="text-zinc-200 font-mono bg-white/5 px-1 py-0.5 rounded">worker-pool-d.ts</code> introduced in commit <code className="text-zinc-200 font-mono bg-white/5 px-1 py-0.5 rounded">7f83b16</code>.
                          </p>
                          <div className="p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-[11px] text-zinc-300 space-y-1">
                            <div className="text-blue-300">✦ Actionable PR Generated: PR #482 (checkout-service)</div>
                            <div className="text-zinc-400">+ Added explicit defer db.Release() in transaction pipeline</div>
                            <div className="text-zinc-400">+ Scaled pg_bouncer max_client_conn from 100 to 250</div>
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-zinc-500 flex justify-between">
                          <span>Target Repository: github.com/corp/checkout</span>
                          <span className="text-blue-400 font-bold">Prevented Re-occurrence</span>
                        </div>
                      </div>

                    </div>

                    {/* Proactive Disaster Prevention ("What Could Happen Next") */}
                    <div className="m-6 mt-0 p-5 rounded-xl bg-amber-500/10 border border-amber-500/25">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-[#facc15] shrink-0 mt-0.5">
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                        <div className="space-y-2">
                          <div className="text-xs font-mono font-bold text-[#facc15] uppercase tracking-wider flex items-center gap-2">
                            <span>Proactive Disaster Prevention · "What Could Happen Next" Simulation</span>
                            <span className="text-[10px] bg-amber-500/20 text-[#facc15] px-2 py-0.5 rounded-full font-sans font-bold">High Catastrophic Risk</span>
                          </div>
                          <p className="text-xs text-zinc-200 leading-relaxed">
                            <strong className="text-[#facc15]">Catastrophe Risk Forecast:</strong> If PR #482 is not deployed before the upcoming peak traffic window (12x surge), 
                            the unclosed connection leak in <code className="text-[#facc15] font-mono">worker-pool-d</code> will exhaust Postgres file descriptors within 4.2 minutes. 
                            This will trigger a cascading ungraceful failover across <code className="text-zinc-200 font-mono">auth-service</code>, <code className="text-zinc-200 font-mono">cart-service</code>, and the primary payment gateway, resulting in an estimated <strong>$148,000 revenue outage</strong>.
                          </p>
                          <div className="text-[11px] font-mono text-amber-300 flex items-center gap-2 pt-1">
                            <span>Recommended Leadership Action:</span>
                            <span className="text-white bg-black/40 px-2 py-0.5 rounded border border-amber-500/30 font-semibold">
                              Prioritize merge of PR #482 before Friday 18:00 UTC
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* TAB 2: Grand Monthly Master Board Audit */}
              {activeTab === 'monthly' && (
                <motion.div
                  key="monthly"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="p-6 rounded-2xl bg-[#111114] border border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#facc15] uppercase tracking-wider mb-1">
                        <Layers className="w-3.5 h-3.5" />
                        <span>GRAND MONTHLY CTO &amp; BOARD OF DIRECTORS AUDIT</span>
                        <span className="text-zinc-500">|</span>
                        <span className="text-zinc-300">PUBLISHED: 1ST OF THE MONTH</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        Executive Infrastructure Stability &amp; ROI Review
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1">
                        Coverage: Past 30 Days · Scope: 42 Microservices · Compliance Standard: <span className="text-emerald-400 font-mono">SOC-2 Type II Certified Format</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-[10px] font-mono text-zinc-400 uppercase">Calculated Outage Downtime Saved</div>
                        <div className="text-xl font-mono font-black text-emerald-400">11.4 Hours</div>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                      <div className="text-right">
                        <div className="text-[10px] font-mono text-zinc-400 uppercase">Estimated Financial Recovery</div>
                        <div className="text-xl font-mono font-black text-[#facc15]">$340,000+</div>
                      </div>
                    </div>
                  </div>

                  {/* 3 Executive Board Metrics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                      <div className="text-xs font-mono text-zinc-400 uppercase mb-2">SLO Attainment</div>
                      <div className="text-4xl font-mono font-black text-emerald-400 mb-2">99.994%</div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Exceeded enterprise contractual SLA of 99.95%. Total uncontained downtime was 0 seconds due to sub-10s automated rollbacks.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                      <div className="text-xs font-mono text-zinc-400 uppercase mb-2">Architectural Debt Resolved</div>
                      <div className="text-4xl font-mono font-black text-[#facc15] mb-2">28 Hotspots</div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        28 memory leaks, unindexed queries, and pod resource limits were permanently remedied via automated developer pull requests.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                      <div className="text-xs font-mono text-zinc-400 uppercase mb-2">Audit Prep Overhead</div>
                      <div className="text-4xl font-mono font-black text-blue-400 mb-2">0 Hours</div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Exported directly to SOC-2 Type II auditor vault with cryptographically verified SHA-256 approval chains and immutable logs.
                      </p>
                    </div>
                  </div>

                  {/* Executive Summary Narrative */}
                  <div className="p-6 rounded-2xl bg-[#0c0c0e] border border-white/10 space-y-3">
                    <div className="text-xs font-mono text-[#facc15] uppercase tracking-wider font-bold">
                      EXECUTIVE BOARDROOM SUMMARY
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Over the last 30 days, the engineering fleet ingested <strong>4,812 alerts</strong> across Kubernetes and database layers. 
                      Amber correlated these into <strong>23 true incidents</strong>, resolving 19 completely autonomously within policy guardrails 
                      and executing 4 with 1-click human Slack approval. Zero manual 3:00 AM emergency calls were placed to on-call engineers.
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                      <span>Sign-off: <strong className="text-white">Amber Autonomous SRE Agent v2.4</strong></span>
                      <span>·</span>
                      <span>Verification Key: <code className="text-emerald-400">ed25519:7a4f..99c2</code></span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: Multi-Channel Dispatch (Slack & Telegram) */}
              {activeTab === 'delivery' && (
                <motion.div
                  key="delivery"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
                >
                  {/* Left: Slack Integration Mockup */}
                  <div className="p-6 rounded-2xl bg-[#0e0e11] border border-white/15 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-[#4A154B] flex items-center justify-center text-white font-bold text-xs">
                          #
                        </div>
                        <span className="text-sm font-bold text-white">#prod-alerts</span>
                        <span className="text-[10px] font-mono text-zinc-500">Slack App</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Delivered 09:00:01 AM
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <img 
                        src="/assets/amber-symbol.svg" 
                        alt="Amber Bot" 
                        className="w-8 h-8 rounded-lg bg-[#d97706]/20 p-1 border border-[#d97706]/40 shrink-0" 
                      />
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">Amber SRE Engine</span>
                          <span className="text-[10px] bg-white/10 text-zinc-300 px-1 rounded font-mono">APP</span>
                          <span className="text-[10px] text-zinc-500">Today at 9:00 AM</span>
                        </div>
                        <div className="p-4 rounded-xl bg-black/60 border-l-4 border-l-[#facc15] border border-white/10 space-y-2 text-xs">
                          <div className="font-bold text-white flex items-center gap-2">
                            <span>📊 Weekly Executive Reliability Digest (Week 41)</span>
                          </div>
                          <p className="text-zinc-300 text-[11px] leading-relaxed">
                            Good morning team! The past week across <strong>prod-aws-us-east-1</strong> had <strong>0 uncontained outages</strong>. 
                            3 incidents were self-healed in an average of 8.4 seconds.
                          </p>
                          <div className="p-2.5 rounded bg-white/5 font-mono text-[10px] text-zinc-400 space-y-0.5">
                            <div>• MTTR: <strong>8.4s</strong> (Target: &lt;30s)</div>
                            <div>• Revenue Protected: <strong>$148,000</strong></div>
                            <div>• Top Action: <strong>PR #482</strong> pending merge (Postgres connection leak)</div>
                          </div>
                          <div className="pt-2 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={handleDownload}
                              className="px-3 py-1.5 rounded-lg bg-[#d97706] hover:bg-[#b45309] text-white font-sans text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Download className="w-3 h-3" /> Download Audit PDF (4.2 MB)
                            </button>
                            <span className="text-[10px] font-mono text-zinc-500">Auto-generated in-VPC</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Telegram Integration Mockup */}
                  <div className="p-6 rounded-2xl bg-[#0e0e11] border border-white/15 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#229ED9] flex items-center justify-center text-white">
                          <Send className="w-3 h-3" />
                        </div>
                        <span className="text-sm font-bold text-white">@ambersre_alert_bot</span>
                        <span className="text-[10px] font-mono text-zinc-500">Telegram Bot</span>
                      </div>
                      <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                        Delivered 09:00:02 AM
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white flex items-center gap-2">
                          <Bot className="w-4 h-4 text-[#229ED9]" />
                          <span>Amber Executive Dispatch</span>
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">9:00 AM</span>
                      </div>
                      <div className="space-y-1.5 text-zinc-300 text-[11px] font-sans">
                        <p className="font-bold text-white">🚨 Executive SRE Digest Ready</p>
                        <p><strong>Fleet:</strong> prod-aws-us-east-1</p>
                        <p><strong>Status:</strong> 100% SLA Met (99.994%)</p>
                        <p><strong>Urgent Risk:</strong> Merge PR #482 before Friday flash sale to prevent $148k outage.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => handleCopy('https://ambersre.xyz/audits/W41.pdf', 'Telegram Link Copied')}
                          className="py-1.5 px-2 rounded bg-white/10 hover:bg-white/15 text-white font-mono text-[10px] font-bold text-center border border-white/10 transition-colors cursor-pointer"
                        >
                          📄 View Executive PDF
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopy('/status prod-aws-us-east-1', 'Bot Command Copied')}
                          className="py-1.5 px-2 rounded bg-white/10 hover:bg-white/15 text-white font-mono text-[10px] font-bold text-center border border-white/10 transition-colors cursor-pointer"
                        >
                          ⚡ /status Fleet Health
                        </button>
                      </div>
                      {copiedNotification && (
                        <div className="text-[10px] font-mono text-emerald-400 text-center animate-fade-in">
                          {copiedNotification}
                        </div>
                      )}
                    </div>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Bottom Security & Architecture Disclaimer Banner */}
          <div className="bg-[#111113] border-t border-white/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cryptographically signed with Ed25519. Zero telemetry escapes your private VPC.</span>
            </div>
            <div className="flex items-center gap-4 text-zinc-400">
              <span>Delivery Protocols: Slack Webhook + Telegram Bot API</span>
              <span className="text-zinc-600">|</span>
              <span className="text-white font-semibold">Engine License: BSL 1.1 Source-Available</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
