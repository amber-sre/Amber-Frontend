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

interface AuditIncident {
  id: string;
  title: string;
  service: string;
  trigger: string;
  mttr: string;
  immediateAction: string;
  immediatePoints: string[];
  prTitle: string;
  prDetail: string;
  recommendation: string;
}

const AUDIT_INCIDENTS: AuditIncident[] = [
  {
    id: 'INC-5021',
    title: 'PostgreSQL Connection Pool Contention',
    service: 'checkout-api (18 Pods)',
    trigger: 'Connection pool saturation (98%)',
    mttr: '8.4s',
    immediateAction: 'Terminated 10 idle transaction handles on primary database cluster via allowlisted runbook.',
    immediatePoints: [
      'Pool active slots restored from 99% to 22%',
      'HTTP 504 gateway timeouts dropped to 0.00%'
    ],
    prTitle: 'PR #482 (checkout-service)',
    prDetail: 'Added explicit defer db.Release() in transaction pipeline and tuned pg_bouncer limits.',
    recommendation: 'Merge PR #482 before the upcoming marketing traffic window. The fix permanently closes orphaned connection handles.'
  },
  {
    id: 'INC-5018',
    title: 'Ingress API Gateway 504 Spikes',
    service: 'checkout-ingress (32 Pods)',
    trigger: 'Sudden inbound traffic surge',
    mttr: '6.2s',
    immediateAction: 'Triggered preemptive horizontal pod scaling to 32 replicas across secondary availability zones.',
    immediatePoints: [
      'Scaled ingress worker capacity from 8 to 32 pods',
      'P99 request latency normalized to 52ms'
    ],
    prTitle: 'PR #485 (infra-terraform)',
    prDetail: 'Adjusted HorizontalPodAutoscaler CPU target from 85% to 65% for burst tolerance.',
    recommendation: 'Apply Terraform changes to staging cluster to validate new autoscaling step-down window.'
  },
  {
    id: 'INC-5009',
    title: 'Redis Session Cache Memory Pressure',
    service: 'session-cache (Cluster 7.2)',
    trigger: 'Memory utilization exceeded 95%',
    mttr: '4.1s',
    immediateAction: 'Flushed expired session key namespace with zero eviction impact on active customer tokens.',
    immediatePoints: [
      'Pruned 480k expired token keys safely',
      'Memory utilization reduced from 96% to 38%'
    ],
    prTitle: 'PR #479 (auth-service)',
    prDetail: 'Added strict TTL enforcement on temporary guest cart session tokens.',
    recommendation: 'PR #479 is merged and verified on staging. Scheduled for production release in the next deployment cycle.'
  }
];

export function ExecutiveAuditShowcase() {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'delivery'>('weekly');
  const [selectedIncidentIndex, setSelectedIncidentIndex] = useState<number>(0);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const selectedIncident = AUDIT_INCIDENTS[selectedIncidentIndex];

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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex justify-between items-center text-xs font-sans font-medium tracking-wider text-amber-200/70 uppercase border-b border-amber-500/20 pb-5 mb-16">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-white font-semibold">Automated Engineering Reports</span>
          </div>
          <div className="hidden sm:block text-amber-200/60 text-xs">
            Host Timezone Auto-Detected · Zero Telemetry Egress
          </div>
          <div className="text-amber-300 font-medium">
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
            <p className="text-amber-100/70 text-sm sm:text-base leading-relaxed font-sans">
              Translate incident telemetry into clear engineering ROI. Track system SLOs, automated remediations, and permanent code fixes without spending hours drafting manual post-mortems.
            </p>
          </div>
        </div>

        {/* 4 Value Pillars (True Rich Amber Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <SpotlightCard className="bg-[#241404] border-2 border-amber-500/40 hover:border-amber-300 hover:bg-[#2e1905] p-6 flex flex-col justify-between shadow-xl transition-all duration-300">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#3a2007] border border-amber-400/50 flex items-center justify-center text-amber-400 mb-4 shadow-md">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Weekly &amp; Monthly Cadence</h4>
              <p className="text-xs text-amber-100/80 leading-relaxed font-sans">
                Automated digests dispatched every Monday at 9:00 AM local time, plus an end-of-month executive stability review.
              </p>
            </div>
            <div className="text-xs text-amber-200/70 pt-3 mt-4 border-t border-amber-500/30 flex items-center justify-between font-bold">
              <span>Cadence</span>
              <span className="text-amber-300 font-extrabold">Scheduled</span>
            </div>
          </SpotlightCard>

          <SpotlightCard className="bg-[#241404] border-2 border-amber-500/40 hover:border-amber-300 hover:bg-[#2e1905] p-6 flex flex-col justify-between shadow-xl transition-all duration-300">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#0e2417] border border-emerald-400/50 flex items-center justify-center text-emerald-400 mb-4 shadow-md">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Host Timezone Detection</h4>
              <p className="text-xs text-amber-100/80 leading-relaxed font-sans">
                Detects host timezone directly. Reports arrive right at the start of your engineering team&apos;s working week without manual cron setup.
              </p>
            </div>
            <div className="text-xs text-amber-200/70 pt-3 mt-4 border-t border-amber-500/30 flex items-center justify-between font-bold">
              <span>Timing</span>
              <span className="text-emerald-400 font-extrabold">Auto-Synced</span>
            </div>
          </SpotlightCard>

          <SpotlightCard className="bg-[#241404] border-2 border-amber-500/40 hover:border-amber-300 hover:bg-[#2e1905] p-6 flex flex-col justify-between shadow-xl transition-all duration-300">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#102035] border border-blue-400/50 flex items-center justify-center text-blue-400 mb-4 shadow-md">
                <GitPullRequest className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Permanent Code Fixes</h4>
              <p className="text-xs text-amber-100/80 leading-relaxed font-sans">
                Correlates recurring telemetry hotspots and drafts actionable GitHub pull requests to eliminate architectural debt at the root.
              </p>
            </div>
            <div className="text-xs text-amber-200/70 pt-3 mt-4 border-t border-amber-500/30 flex items-center justify-between font-bold">
              <span>Outcome</span>
              <span className="text-blue-400 font-extrabold">Automated PRs</span>
            </div>
          </SpotlightCard>

          <SpotlightCard className="bg-[#241404] border-2 border-amber-500/40 hover:border-amber-300 hover:bg-[#2e1905] p-6 flex flex-col justify-between shadow-xl transition-all duration-300">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#281538] border border-purple-400/50 flex items-center justify-center text-purple-400 mb-4 shadow-md">
                <Send className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Direct Channel Delivery</h4>
              <p className="text-xs text-amber-100/80 leading-relaxed font-sans">
                Delivered straight to Slack, Telegram, or email with cryptographically verified PDF attachments ready for compliance reviews.
              </p>
            </div>
            <div className="text-xs text-amber-200/70 pt-3 mt-4 border-t border-amber-500/30 flex items-center justify-between font-bold">
              <span>Format</span>
              <span className="text-purple-400 font-extrabold">Slack · Telegram · PDF</span>
            </div>
          </SpotlightCard>

        </div>

        {/* ── Interactive Report Showcase (True Warm Amber Canvas) ── */}
        <div className="bg-gradient-to-b from-[#2b1704] via-[#1f1103] to-[#140a02] border-2 border-amber-500/60 rounded-3xl shadow-[0_20px_80px_rgba(245,158,11,0.22)] overflow-hidden">
          
          {/* Top Bar with Tabs and Meta Controls */}
          <div className="bg-[#381e05] border-b-2 border-amber-500/40 px-6 sm:px-8 py-4.5 flex flex-wrap items-center justify-between gap-4">
            
            {/* View Selector Tabs */}
            <div className="flex items-center gap-1.5 bg-[#180d02] p-1.5 rounded-xl border border-amber-500/40">
              <button
                type="button"
                onClick={() => setActiveTab('weekly')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                  activeTab === 'weekly'
                    ? 'bg-[#d97706] text-white shadow-md font-bold'
                    : 'text-amber-200/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Weekly Digest</span>
                <span className="text-[10px] text-amber-200/60 font-mono hidden sm:inline">Mon 09:00</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('monthly')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                  activeTab === 'monthly'
                    ? 'bg-[#d97706] text-white shadow-md font-bold'
                    : 'text-amber-200/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Monthly Review</span>
                <span className="text-[10px] text-amber-200/60 font-mono hidden sm:inline">1st / Mo</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('delivery')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                  activeTab === 'delivery'
                    ? 'bg-[#d97706] text-white shadow-md font-bold'
                    : 'text-amber-200/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Channel Previews</span>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-amber-200/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>In-VPC Single Tenant</span>
              </span>

              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center gap-2 bg-[#22160b] hover:bg-[#2b1c0e] text-white border border-amber-500/40 px-3.5 py-1.5 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer shadow-sm"
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
          <div className="p-6 sm:p-8 lg:p-10">
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
                  {/* Overview Card (Solid Espresso Amber Surface) */}
                  <div className="p-6 rounded-2xl bg-[#1a1209] border border-amber-500/40 flex flex-wrap items-center justify-between gap-4 shadow-lg">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-sans text-amber-400 uppercase tracking-wider mb-1 font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Weekly Reliability Digest · Week 41</span>
                        <span className="text-amber-500/40">|</span>
                        <span className="text-amber-200/80 font-normal">Monday 09:00 AM Local</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        Production Fleet Reliability Summary
                      </h3>
                      <p className="text-xs text-amber-100/70 mt-1">
                        Fleet: <span className="text-amber-200 font-semibold">prod-aws-us-east-1 (48 nodes)</span> · 
                        Coverage: <span className="text-amber-200 font-semibold">Oct 10 – Oct 17</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs text-amber-300 uppercase font-bold">Median MTTR</div>
                        <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-sans">8.4s</div>
                      </div>
                      <div className="w-px h-8 bg-amber-500/30" />
                      <div className="text-right">
                        <div className="text-xs text-amber-300 uppercase font-bold">Resolved Autonomously</div>
                        <div className="text-2xl sm:text-3xl font-black text-white font-sans">14 / 14</div>
                      </div>
                    </div>
                  </div>

                  {/* ── Interactive Incident Selector (Click to Inspect) ── */}
                  <div>
                    <div className="text-xs font-sans font-bold uppercase tracking-wider text-amber-300/80 mb-3 px-1">
                      Select Incident to Inspect Resolution &amp; PR:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {AUDIT_INCIDENTS.map((inc, iIdx) => {
                        const isIncSelected = selectedIncidentIndex === iIdx;

                        return (
                          <button
                            type="button"
                            key={inc.id}
                            onClick={() => setSelectedIncidentIndex(iIdx)}
                            className={`p-3.5 rounded-xl text-left border transition-all duration-200 cursor-pointer ${
                              isIncSelected
                                ? 'bg-[#24170c] border-amber-400 text-white shadow-md scale-[1.01] ring-1 ring-amber-400/30'
                                : 'bg-[#150f08] hover:bg-[#1c140a] border-amber-500/30 text-amber-200/80 hover:border-amber-500/50'
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="font-mono font-bold text-amber-300">{inc.id}</span>
                              <span className="text-[10px] text-emerald-400 font-semibold">{inc.mttr}</span>
                            </div>
                            <div className="text-xs font-bold text-white tracking-tight truncate">
                              {inc.title}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Incident Resolution Breakdown Detail Card */}
                  <div className="border border-amber-500/40 rounded-2xl bg-[#181108] overflow-hidden shadow-lg">
                    <div className="p-5 bg-[#1f150b] border-b border-amber-500/30 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono">P1</span>
                          <span>{selectedIncident.title} ({selectedIncident.id})</span>
                        </div>
                        <div className="text-xs text-amber-200/80 mt-1">
                          Service: <span className="text-white font-medium">{selectedIncident.service}</span> · Trigger: {selectedIncident.trigger}
                        </div>
                      </div>

                      <span className="text-xs text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/40 font-bold flex items-center gap-1.5 shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Resolved in {selectedIncident.mttr}
                      </span>
                    </div>

                    {/* Dual Action Resolution */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Left: Immediate Action */}
                      <div className="p-4 rounded-xl bg-[#0e0a05] border border-amber-500/30 space-y-2">
                        <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                          1. Immediate Automated Self-Healing
                        </div>
                        <p className="text-xs text-amber-100/90 leading-relaxed font-sans">
                          {selectedIncident.immediateAction}
                        </p>
                        <div className="text-xs text-amber-200/80 space-y-1 pt-1 font-mono">
                          {selectedIncident.immediatePoints.map((pt, pIdx) => (
                            <div key={pIdx} className="text-emerald-400">✓ {pt}</div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Permanent PR */}
                      <div className="p-4 rounded-xl bg-[#0e0a05] border border-amber-500/30 space-y-2">
                        <div className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                          2. Permanent Root Cause Fix
                        </div>
                        <p className="text-xs text-amber-100/90 leading-relaxed font-sans">
                          {selectedIncident.prDetail}
                        </p>
                        <div className="text-xs text-blue-300 space-y-1 pt-1 font-mono">
                          <div>✦ {selectedIncident.prTitle}</div>
                        </div>
                      </div>

                    </div>

                    {/* Preventative Recommendation */}
                    <div className="m-6 mt-0 p-4 rounded-xl bg-[#22160b] border border-amber-500/40 space-y-1.5">
                      <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        Preventative Architecture Recommendation
                      </div>
                      <p className="text-xs text-amber-100/90 leading-relaxed font-sans">
                        {selectedIncident.recommendation}
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
                  <div className="p-6 rounded-2xl bg-[#1a1209] border border-amber-500/40 flex flex-wrap items-center justify-between gap-4 shadow-lg">
                    <div>
                      <div className="text-xs font-sans text-amber-400 uppercase tracking-wider mb-1 font-bold">
                        Monthly Infrastructure Review
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        30-Day Fleet Stability &amp; Reliability Attainment
                      </h3>
                      <p className="text-xs text-amber-100/70 mt-1">
                        Scope: 42 Microservices · Compliance Standard: SOC-2 Type II Compatible Format
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-amber-300 uppercase font-bold">SLO Attainment</div>
                      <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-sans">99.994%</div>
                    </div>
                  </div>

                  {/* 3 Metrics Cards (Solid Espresso Amber Matte) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="p-5 rounded-2xl bg-[#181108] border border-amber-500/30 hover:border-amber-400/60 hover:bg-[#1f150b] transition-all shadow-md">
                      <div className="text-xs text-amber-300 uppercase mb-1 font-bold">Downtime Prevented</div>
                      <div className="text-3xl font-black text-emerald-400 mb-1 font-sans">11.4 Hours</div>
                      <p className="text-xs text-amber-100/70 leading-relaxed font-sans">
                        Automated rollbacks and connection drains resolved issues before cascading service failures occurred.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#181108] border border-amber-500/30 hover:border-amber-400/60 hover:bg-[#1f150b] transition-all shadow-md">
                      <div className="text-xs text-amber-300 uppercase mb-1 font-bold">Hotspots Resolved</div>
                      <div className="text-3xl font-black text-amber-300 mb-1 font-sans">28 PRs</div>
                      <p className="text-xs text-amber-100/70 leading-relaxed font-sans">
                        28 memory leaks and unindexed queries permanently resolved via developer pull requests.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#181108] border border-amber-500/30 hover:border-amber-400/60 hover:bg-[#1f150b] transition-all shadow-md">
                      <div className="text-xs text-amber-300 uppercase mb-1 font-bold">Post-Mortem Overhead</div>
                      <div className="text-3xl font-black text-blue-400 mb-1 font-sans">0 Hours</div>
                      <p className="text-xs text-amber-100/70 leading-relaxed font-sans">
                        Reports exported directly with cryptographically verified SHA-256 approval chains and immutable logs.
                      </p>
                    </div>
                  </div>

                  {/* Executive Narrative */}
                  <div className="p-6 rounded-2xl bg-[#181108] border border-amber-500/35 space-y-2">
                    <div className="text-xs font-bold text-white uppercase tracking-wider">
                      Fleet Executive Summary
                    </div>
                    <p className="text-xs text-amber-100/90 leading-relaxed font-sans">
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
                  <div className="p-6 rounded-2xl bg-[#181108] border border-amber-500/35 space-y-4 shadow-lg">
                    <div className="flex items-center justify-between pb-3 border-b border-amber-500/25 text-xs text-amber-200/70 font-sans">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">#prod-reliability</span>
                        <span className="text-amber-500/40">·</span>
                        <span>Slack Channel</span>
                      </div>
                      <span className="text-emerald-400 text-[11px] font-bold">Delivered 09:00 AM</span>
                    </div>

                    <div className="p-5 rounded-xl bg-[#0e0a05] border-l-4 border-l-amber-400 border border-amber-500/30 space-y-2 text-xs">
                      <div className="font-bold text-white">
                        Weekly Reliability Digest (Week 41)
                      </div>
                      <p className="text-amber-100/90 text-xs leading-relaxed font-sans">
                        Weekly summary for <strong>prod-aws-us-east-1</strong>: 0 uncontained outages. 3 incidents mitigated with average MTTR of 8.4 seconds.
                      </p>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={handleDownload}
                          className="px-4 py-2 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white font-sans text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-amber-500/20"
                        >
                          <Download className="w-3.5 h-3.5" /> Download Audit PDF (4.2 MB)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Telegram Preview */}
                  <div className="p-6 rounded-2xl bg-[#181108] border border-amber-500/35 space-y-4 shadow-lg">
                    <div className="flex items-center justify-between pb-3 border-b border-amber-500/25 text-xs text-amber-200/70 font-sans">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">@AmberSREBot</span>
                        <span className="text-amber-500/40">·</span>
                        <span>Telegram Dispatch</span>
                      </div>
                      <span className="text-blue-400 text-[11px] font-bold">Delivered 09:00 AM</span>
                    </div>

                    <div className="p-5 rounded-xl bg-[#0e0a05] border border-amber-500/30 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <Bot className="w-4 h-4 text-blue-400" />
                          <span>Amber Executive Digest</span>
                        </span>
                        <span className="text-amber-300 font-mono text-[11px]">9:00 AM</span>
                      </div>
                      <div className="text-amber-100/90 text-xs space-y-1 font-sans">
                        <div><strong>Cluster:</strong> prod-aws-us-east-1</div>
                        <div><strong>SLA Attainment:</strong> 99.994%</div>
                        <div><strong>Action:</strong> PR #482 ready for review before peak window.</div>
                      </div>
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => handleCopy('https://ambersre.xyz/audits/W41.pdf', 'Link Copied')}
                          className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-sans text-xs font-bold text-center border border-white/15 transition-colors cursor-pointer"
                        >
                          Copy Audit PDF Link
                        </button>
                        {copiedNotification && (
                          <div className="text-xs text-emerald-400 text-center mt-2 font-bold">
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
          <div className="bg-[#181108] border-t border-amber-500/30 px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-amber-200/70">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cryptographically signed with Ed25519 · Zero telemetry leaves customer VPC</span>
            </div>
            <div className="flex items-center gap-4 text-amber-200/70">
              <span>Slack Webhook + Telegram Bot API</span>
              <span className="text-amber-500/40">|</span>
              <span className="text-white font-semibold">BSL 1.1 Source-Available</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
