import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Download, 
  Send, 
  Bot, 
  Globe, 
  RefreshCw, 
  Layers,
  ShieldCheck,
  GitPullRequest
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
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 700);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNotification(label);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  return (
    <section id="executive-audits" className="px-8 md:px-16 py-32 bg-[#050505] text-white border-b border-white/10 relative overflow-hidden scroll-mt-20">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex justify-between items-center text-xs font-sans font-medium tracking-wider text-zinc-400 uppercase border-b border-white/10 pb-5 mb-16">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-white font-semibold">Automated Engineering Reports</span>
          </div>
          <div className="hidden sm:block text-zinc-400 text-xs">
            Host Timezone Auto-Detected · Zero Telemetry Egress
          </div>
          <div className="text-zinc-300 font-medium">
            Weekly &amp; Monthly Deliveries
          </div>
        </div>

        {/* Section Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              Automated Reliability Audits &amp; <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#facc15] via-[#fbbf24] to-[#d97706]">
                Executive Digests.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
              Translate incident telemetry into clear engineering ROI. Track system SLOs, automated remediations, and permanent code fixes without spending hours drafting manual post-mortems.
            </p>
          </div>
        </div>

        {/* 4 Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <SpotlightCard className="bg-[#0b0b0d] border border-white/10 p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Weekly &amp; Monthly Cadence</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Automated digests dispatched every Monday at 9:00 AM local time, plus an end-of-month executive stability review.
              </p>
            </div>
            <div className="text-xs text-zinc-500 pt-3 mt-4 border-t border-white/5 flex items-center justify-between">
              <span>Cadence</span>
              <span className="text-zinc-300 font-medium">Scheduled</span>
            </div>
          </SpotlightCard>

          <SpotlightCard className="bg-[#0b0b0d] border border-white/10 p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Host Timezone Detection</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Detects host timezone directly. Reports arrive right at the start of your engineering team&apos;s working week without manual cron setup.
              </p>
            </div>
            <div className="text-xs text-zinc-500 pt-3 mt-4 border-t border-white/5 flex items-center justify-between">
              <span>Timing</span>
              <span className="text-emerald-400 font-medium">Auto-Synced</span>
            </div>
          </SpotlightCard>

          <SpotlightCard className="bg-[#0b0b0d] border border-white/10 p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <GitPullRequest className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Permanent Code Fixes</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Correlates recurring telemetry hotspots and drafts actionable GitHub pull requests to eliminate architectural debt at the root.
              </p>
            </div>
            <div className="text-xs text-zinc-500 pt-3 mt-4 border-t border-white/5 flex items-center justify-between">
              <span>Outcome</span>
              <span className="text-blue-400 font-medium">Automated PRs</span>
            </div>
          </SpotlightCard>

          <SpotlightCard className="bg-[#0b0b0d] border border-white/10 p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <Send className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Direct Channel Delivery</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Delivered straight to Slack, Telegram, or email with cryptographically verified PDF attachments ready for compliance reviews.
              </p>
            </div>
            <div className="text-xs text-zinc-500 pt-3 mt-4 border-t border-white/5 flex items-center justify-between">
              <span>Format</span>
              <span className="text-purple-400 font-medium">Slack · Telegram · PDF</span>
            </div>
          </SpotlightCard>

        </div>

        {/* Interactive Report View Showcase */}
        <div className="bg-[#0c0c0e] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Top Bar with Tabs and Meta Controls */}
          <div className="bg-[#141418] border-b border-white/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            
            {/* View Selector Tabs */}
            <div className="flex items-center gap-1.5 bg-[#08080a] p-1 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('weekly')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                  activeTab === 'weekly'
                    ? 'bg-amber-400 text-black shadow-sm font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Weekly Digest</span>
                <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">Mon 09:00</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('monthly')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                  activeTab === 'monthly'
                    ? 'bg-amber-400 text-black shadow-sm font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Monthly Review</span>
                <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">1st / Mo</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('delivery')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                  activeTab === 'delivery'
                    ? 'bg-amber-400 text-black shadow-sm font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Channel Previews</span>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>In-VPC Single Tenant</span>
              </span>

              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/15 px-3.5 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer"
              >
                {isDownloading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                    <span>Generating PDF...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Report Exported</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Export Audit PDF</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Interactive Report Content Canvas */}
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: Weekly SRE Digest */}
              {activeTab === 'weekly' && (
                <motion.div
                  key="weekly"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Overview Card */}
                  <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-sans text-amber-400 uppercase tracking-wider mb-1 font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Weekly Reliability Digest · Week 41</span>
                        <span className="text-zinc-600">|</span>
                        <span className="text-zinc-400">Monday 09:00 AM Local</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        Production Fleet Reliability Summary
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1">
                        Fleet: <span className="text-zinc-200">prod-aws-us-east-1 (48 nodes)</span> · 
                        Coverage: <span className="text-zinc-200">Oct 10 – Oct 17</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs text-zinc-400 uppercase font-medium">Median MTTR</div>
                        <div className="text-2xl font-black text-emerald-400 font-sans">8.4s</div>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                      <div className="text-right">
                        <div className="text-xs text-zinc-400 uppercase font-medium">Resolved Autonomously</div>
                        <div className="text-2xl font-black text-white font-sans">14 / 14</div>
                      </div>
                    </div>
                  </div>

                  {/* Incident Resolution Breakdown */}
                  <div className="border border-white/10 rounded-xl bg-[#0f0f12] overflow-hidden">
                    <div className="p-4 bg-white/[0.02] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/25">P1</span>
                          <span>PostgreSQL Connection Pool Contention (#INC-5021)</span>
                        </div>
                        <div className="text-xs text-zinc-400 mt-0.5">
                          Service: <span className="text-zinc-300">checkout-api (18 Pods)</span> · Trigger: Connection pool saturation
                        </div>
                      </div>

                      <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Resolved in 8.4s
                      </span>
                    </div>

                    {/* Dual Action Resolution */}
                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                      
                      {/* Left: Immediate Action */}
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                        <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                          <span>1. Immediate Self-Healing</span>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          Amber identified 10 idle transaction handles on the primary database and terminated the idle connections with on-call approval.
                        </p>
                        <div className="text-xs text-zinc-400 space-y-1 pt-1 font-mono">
                          <div className="text-emerald-400">✓ Pool active slots returned from 99% to 22%</div>
                          <div>✓ HTTP 504 gateway timeouts resolved to 0.00%</div>
                        </div>
                      </div>

                      {/* Right: Permanent PR */}
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                          <span>2. Permanent Code Fix</span>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          Root cause telemetry traced unclosed database handles in commit <span className="font-mono text-zinc-200">7f83b16</span> and opened an automated PR.
                        </p>
                        <div className="text-xs text-zinc-400 space-y-1 pt-1 font-mono">
                          <div className="text-blue-300">✦ Created PR #482 (checkout-service)</div>
                          <div>+ Added defer db.Release() in transaction pipeline</div>
                        </div>
                      </div>

                    </div>

                    {/* Preventative Recommendation */}
                    <div className="m-5 mt-0 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1.5">
                      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Preventative Architecture Recommendation
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        Merge PR #482 before the upcoming marketing traffic event. The fix permanently closes orphaned connection handles in the transaction pool.
                      </p>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* TAB 2: Monthly Review */}
              {activeTab === 'monthly' && (
                <motion.div
                  key="monthly"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-sans text-amber-400 uppercase tracking-wider mb-1 font-semibold">
                        Monthly Infrastructure Review
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        30-Day Fleet Stability &amp; Reliability Attainment
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1">
                        Scope: 42 Microservices · Compliance Standard: SOC-2 Type II Compatible Format
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-zinc-400 uppercase font-medium">SLO Attainment</div>
                      <div className="text-2xl font-black text-emerald-400 font-sans">99.994%</div>
                    </div>
                  </div>

                  {/* 3 Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                      <div className="text-xs text-zinc-400 uppercase mb-1 font-semibold">Downtime Prevented</div>
                      <div className="text-3xl font-black text-emerald-400 mb-1 font-sans">11.4 Hours</div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Automated rollbacks and connection drains resolved issues before cascading service failures occurred.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                      <div className="text-xs text-zinc-400 uppercase mb-1 font-semibold">Hotspots Resolved</div>
                      <div className="text-3xl font-black text-amber-400 mb-1 font-sans">28 PRs</div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        28 memory leaks and unindexed queries permanently resolved via developer pull requests.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                      <div className="text-xs text-zinc-400 uppercase mb-1 font-semibold">Post-Mortem Overhead</div>
                      <div className="text-3xl font-black text-blue-400 mb-1 font-sans">0 Hours</div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Reports exported directly with cryptographically verified SHA-256 approval chains and immutable logs.
                      </p>
                    </div>
                  </div>

                  {/* Executive Narrative */}
                  <div className="p-5 rounded-xl bg-[#0f0f12] border border-white/10 space-y-2">
                    <div className="text-xs font-bold text-white uppercase tracking-wider">
                      Fleet Executive Summary
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Over the past 30 days, 4,812 alerts across Kubernetes and database layers were correlated into 23 distinct incidents. 19 were resolved autonomously within static guardrails, and 4 with single-click on-call Slack approval. Zero manual emergency escalations were required.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: Channel Delivery */}
              {activeTab === 'delivery' && (
                <motion.div
                  key="delivery"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
                >
                  {/* Slack Preview */}
                  <div className="p-6 rounded-xl bg-[#0f0f13] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-zinc-400">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">#prod-reliability</span>
                        <span className="text-zinc-600">·</span>
                        <span>Slack Channel</span>
                      </div>
                      <span className="text-emerald-400 text-[11px] font-medium">Delivered 09:00 AM</span>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border-l-4 border-l-amber-400 border border-white/10 space-y-2 text-xs">
                      <div className="font-bold text-white">
                        Weekly Reliability Digest (Week 41)
                      </div>
                      <p className="text-zinc-300 text-xs leading-relaxed">
                        Weekly summary for <strong>prod-aws-us-east-1</strong>: 0 uncontained outages. 3 incidents mitigated with average MTTR of 8.4 seconds.
                      </p>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={handleDownload}
                          className="px-3.5 py-1.5 rounded-lg bg-[#d97706] hover:bg-[#b45309] text-white font-sans text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" /> Download Audit PDF (4.2 MB)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Telegram Preview */}
                  <div className="p-6 rounded-xl bg-[#0f0f13] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-zinc-400">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">@AmberSREBot</span>
                        <span className="text-zinc-600">·</span>
                        <span>Telegram Dispatch</span>
                      </div>
                      <span className="text-blue-400 text-[11px] font-medium">Delivered 09:00 AM</span>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <Bot className="w-4 h-4 text-blue-400" />
                          <span>Amber Executive Digest</span>
                        </span>
                        <span className="text-zinc-500 font-mono text-[11px]">9:00 AM</span>
                      </div>
                      <div className="text-zinc-300 text-xs space-y-1">
                        <div><strong>Cluster:</strong> prod-aws-us-east-1</div>
                        <div><strong>SLA Attainment:</strong> 99.994%</div>
                        <div><strong>Action:</strong> PR #482 ready for review before peak window.</div>
                      </div>
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => handleCopy('https://ambersre.xyz/audits/W41.pdf', 'Link Copied')}
                          className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-white font-sans text-xs font-semibold text-center border border-white/10 transition-colors cursor-pointer"
                        >
                          Copy Audit PDF Link
                        </button>
                        {copiedNotification && (
                          <div className="text-xs text-emerald-400 text-center mt-2">
                            {copiedNotification}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Footer Bar */}
          <div className="bg-[#111114] border-t border-white/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cryptographically signed with Ed25519 · Zero telemetry leaves customer VPC</span>
            </div>
            <div className="flex items-center gap-4 text-zinc-400">
              <span>Slack Webhook + Telegram Bot API</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-200 font-medium">BSL 1.1 Source-Available</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
