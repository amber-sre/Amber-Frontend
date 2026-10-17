import { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Download, 
  Send, 
  Globe, 
  FileText,
  ShieldCheck,
  GitPullRequest,
  Check,
  Clock
} from 'lucide-react';

export function ExecutiveAuditShowcase() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      // Create and trigger an authentic downloadable executive report
      const reportContent = `%PDF-1.4
%
1 0 obj
<< /Title (Amber Executive Reliability Audit - Week 41)
   /Author (Amber SRE Autonomous Engine)
   /Creator (Amber In-VPC Reporting Kernel)
   /Producer (Amber Sovereign Kernel)
   /CreationDate (D:20261017090000Z) >>
endobj
2 0 obj
<< /Type /Catalog /Pages 3 0 R >>
endobj
3 0 obj
<< /Type /Pages /Kids [4 0 R] /Count 1 >>
endobj
4 0 obj
<< /Type /Page /Parent 3 0 R /MediaBox [0 0 612 792]
   /Contents 5 0 R
   /Resources << /Font << /F1 6 0 R /F2 7 0 R >> >> >>
endobj
6 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
7 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 750 >>
stream
BT
/F1 20 Tf
50 720 Td
(AMBER EXECUTIVE RELIABILITY DIGEST - WEEK 41) Tj
/F2 10 Tf
0 -20 Td
(Generated: Monday 09:00 AM Local | Host: prod-aws-us-east-1 | Scope: 48 Services) Tj
0 -30 Td
/F1 12 Tf
(EXECUTIVE SUMMARY & SLO ATTAINMENT) Tj
/F2 10 Tf
0 -18 Td
(- Fleet SLO Attainment: 99.994% | Zero Uncontained Customer Outages) Tj
0 -14 Td
(- Median Automated MTTR: 8.4 Seconds across 14 Correlated Incidents) Tj
0 -14 Td
(- Autonomously Resolved: 14 / 14 Incidents (0 Manual Emergency Escalations)) Tj
0 -14 Td
(- Permanent Code Pull Requests: 28 Bug Fixes & Schema Optimizations Drafted) Tj
0 -30 Td
/F1 12 Tf
(RESOLVED INCIDENT BREAKDOWN) Tj
/F2 10 Tf
0 -18 Td
(1. INC-5021 [P1] PostgreSQL Pool Saturated -> Terminated 4 idle handles in 8.4s -> PR #482 Drafted) Tj
0 -14 Td
(2. INC-5018 [P1] Ingress 504 Timeout Surge -> Scaled HPA to 32 warm pods in 6.2s -> PR #485 Tuned) Tj
0 -14 Td
(3. INC-5009 [P2] Redis Session Cache Memory Eviction -> Pruned 480k guest keys in 4.1s -> PR #479 Merged) Tj
0 -30 Td
/F1 11 Tf
(COMPLIANCE & INTEGRITY) Tj
/F2 9 Tf
0 -16 Td
(Cryptographically signed with Ed25519 & SHA-256 HMAC payload binding.) Tj
0 -12 Td
(Zero telemetry egress. Verified SOC-2 Type II audit-ready artifact.) Tj
ET
endstream
endobj
xref
0 8
0000000000 65535 f 
0000000015 00000 n 
0000000212 00000 n 
0000000262 00000 n 
0000000325 00000 n 
0000000620 00000 n 
0000000472 00000 n 
0000000546 00000 n 
trailer
<< /Size 8 /Root 2 0 R /Info 1 0 R >>
startxref
1420
%%EOF`;

      const blob = new Blob([reportContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Amber_Executive_Reliability_Audit_W41.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 600);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://ambersre.xyz/audits/weekly-sample.pdf');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section 
      id="executive-audits" 
      className="px-8 md:px-16 py-32 bg-[#ffffff] text-[#0a0a0a] border-b border-black/10 relative scroll-mt-20 font-sans"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Eyebrow Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-16 border-b border-black/10 gap-4">
          <div className="flex items-center gap-2 text-xs font-sans font-bold tracking-widest text-[#d97706] uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d97706] animate-pulse" />
            <span>Automated Engineering Audits &amp; Executive Reporting</span>
          </div>
          <div className="text-xs text-black/60 font-medium">
            Host Timezone Auto-Detected · Zero Telemetry Egress · SOC-2 Ready
          </div>
        </div>

        {/* Section Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-20">
          <div className="lg:col-span-8">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] text-[#0a0a0a] leading-[1.04]">
              Reliability Audits &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d97706] via-[#b45309] to-[#92400e]">
                Executive PDF Digests.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-black/70 text-base sm:text-lg font-normal leading-relaxed">
              Translate machine alerts into boardroom clarity. Amber automatically compiles incident timelines, autonomous remediations, and permanent pull requests into tamper-proof PDF digests delivered every Monday morning.
            </p>
          </div>
        </div>

        {/* 4 Clean Editorial Feature Cards (White Background) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          
          <div className="p-7 rounded-2xl bg-[#fafafa] border border-black/10 hover:border-[#d97706]/50 transition-all duration-200 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#d97706] flex items-center justify-center mb-5">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#0a0a0a] mb-2">Weekly &amp; Monthly Cadence</h3>
              <p className="text-sm text-black/65 leading-relaxed">
                Automated digests dispatched every Monday at 9:00 AM local time, plus an end-of-month executive stability review.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-black/10 flex items-center justify-between text-xs text-black/50">
              <span>Cadence</span>
              <span className="font-bold text-[#b45309]">Scheduled On Autopilot</span>
            </div>
          </div>

          <div className="p-7 rounded-2xl bg-[#fafafa] border border-black/10 hover:border-emerald-500/50 transition-all duration-200 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center mb-5">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#0a0a0a] mb-2">Host Timezone Detection</h3>
              <p className="text-sm text-black/65 leading-relaxed">
                Directly reads host timezone from your cluster. Reports arrive right at the start of your engineering week without manual cron setup.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-black/10 flex items-center justify-between text-xs text-black/50">
              <span>Timing</span>
              <span className="font-bold text-emerald-700">Auto-Detected</span>
            </div>
          </div>

          <div className="p-7 rounded-2xl bg-[#fafafa] border border-black/10 hover:border-blue-500/50 transition-all duration-200 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 flex items-center justify-center mb-5">
                <GitPullRequest className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#0a0a0a] mb-2">Permanent Code Fixes</h3>
              <p className="text-sm text-black/65 leading-relaxed">
                Correlates recurring alert hotspots and drafts production-ready GitHub pull requests to eliminate architectural debt permanently.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-black/10 flex items-center justify-between text-xs text-black/50">
              <span>Outcome</span>
              <span className="font-bold text-blue-700">Automated PRs</span>
            </div>
          </div>

          <div className="p-7 rounded-2xl bg-[#fafafa] border border-black/10 hover:border-purple-500/50 transition-all duration-200 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 flex items-center justify-center mb-5">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#0a0a0a] mb-2">Multi-Channel Delivery</h3>
              <p className="text-sm text-black/65 leading-relaxed">
                Delivered straight to Slack, Telegram, or email with cryptographically verified PDF attachments ready for compliance reviews.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-black/10 flex items-center justify-between text-xs text-black/50">
              <span>Format</span>
              <span className="font-bold text-purple-700">Slack · Telegram · PDF</span>
            </div>
          </div>

        </div>

        {/* ── Highlighted PDF Feature Showcase (Clean Two-Column White Box) ── */}
        <div className="bg-[#fafafa] border border-black/10 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: The PDF Feature Explanation */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#b45309] text-xs font-bold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" />
                <span>The PDF Audit Feature</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-[#0a0a0a] tracking-tight leading-tight">
                Audit-Grade Reliability Reports Delivered On Autopilot.
              </h3>

              <p className="text-black/75 text-base leading-relaxed">
                On-call engineers waste 20+ hours every month manually assembling post-mortem decks and compliance reports. Amber automatically summarizes all cluster incidents, mean time to recovery (MTTR), and preventions into an immutable, executive PDF.
              </p>

              <div className="space-y-3.5 pt-2">
                {[
                  'Second-by-second incident chronology from alert ingestion to verified recovery',
                  'Proof of SLO attainment (99.994%) and prevented downtime for executive review',
                  'Direct links to permanent developer pull requests pay down tech debt',
                  'Cryptographically signed with Ed25519 & SHA-256 HMAC (SOC-2 Type II compatible)'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-black/80 font-medium">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="px-6 py-3.5 rounded-full bg-[#d97706] hover:bg-black text-white font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-200 cursor-pointer shadow-md shadow-[#d97706]/20 hover:shadow-lg active:scale-98"
                >
                  {isDownloading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Generating Report...</span>
                    </>
                  ) : downloadSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Downloaded Audit PDF</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download Sample Audit PDF</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-5 py-3.5 rounded-full bg-white hover:bg-black/5 text-black/80 font-sans text-xs font-bold border border-black/15 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>{copiedLink ? '✓ Link Copied to Clipboard' : 'Copy Sample Link'}</span>
                </button>
              </div>
            </div>

            {/* Right: Crisp Printed Document Preview Mockup */}
            <div className="lg:col-span-6">
              <div className="bg-white border border-stone-200 shadow-xl rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
                
                {/* Document Top Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-200 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-[#d97706] tracking-wider text-sm">AMBER</span>
                    <span className="text-stone-300">|</span>
                    <span className="text-stone-500 font-bold uppercase tracking-wider text-[11px]">Reliability Digest</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-500 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>Week 41 · Mon 09:00 AM</span>
                  </div>
                </div>

                {/* Report Document Title */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Executive Infrastructure Digest
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                    Production Fleet Reliability Summary
                  </h4>
                  <p className="text-xs text-stone-500 mt-1">
                    Fleet: <strong className="text-stone-800">prod-aws-us-east-1 (48 Nodes)</strong> · Scope: <strong className="text-stone-800">Oct 10 – Oct 17</strong>
                  </p>
                </div>

                {/* 4 Stat Highlights Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-xl border border-stone-200 text-center">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-stone-400">SLO Attainment</div>
                    <div className="text-xl font-black text-emerald-600 mt-0.5">99.994%</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-stone-400">Median MTTR</div>
                    <div className="text-xl font-black text-stone-900 mt-0.5">8.4s</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-stone-400">Resolved</div>
                    <div className="text-xl font-black text-stone-900 mt-0.5">14 / 14</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-stone-400">Code PRs</div>
                    <div className="text-xl font-black text-blue-600 mt-0.5">28 PRs</div>
                  </div>
                </div>

                {/* Incident Rows Breakdown */}
                <div className="space-y-2.5">
                  <div className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                    Resolved Outages &amp; Permanent Fixes:
                  </div>

                  <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-stone-900">INC-5021: PostgreSQL Pool Contention</div>
                      <div className="text-stone-500 text-[11px] mt-0.5">4 idle connections drained · Permanent PR #482 drafted</div>
                    </div>
                    <span className="font-mono text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded">8.4s MTTR</span>
                  </div>

                  <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-stone-900">INC-5018: Ingress API Gateway 504 Timeout Surge</div>
                      <div className="text-stone-500 text-[11px] mt-0.5">Preemptive scaling to 32 pods · PR #485 HPA tuned</div>
                    </div>
                    <span className="font-mono text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded">6.2s MTTR</span>
                  </div>

                  <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-stone-900">INC-5009: Redis Session Cache Memory Pressure</div>
                      <div className="text-stone-500 text-[11px] mt-0.5">Flushed 480k expired guest keys · PR #479 merged</div>
                    </div>
                    <span className="font-mono text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded">4.1s MTTR</span>
                  </div>
                </div>

                {/* Cryptographic Signature Footer */}
                <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                  <span className="flex items-center gap-1.5 text-stone-600 font-sans font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Ed25519 Signed · In-VPC Single Tenant</span>
                  </span>
                  <span>SOC-2 Type II Compatible</span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
