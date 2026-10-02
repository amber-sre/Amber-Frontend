import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Share2, 
  Clock 
} from 'lucide-react';

interface BlogViewProps {
  onBack: () => void;
  onNavigateToContact: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onBack, onNavigateToContact }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="relative bg-[#ffffff] text-[#0a0a0a] font-sans selection:bg-[#d97706] selection:text-white min-h-screen overflow-x-hidden">
      
      {/* Massive Faded Background Watermark — AMBER ENGINE */}
      <div 
        aria-hidden="true" 
        className="fixed inset-0 flex flex-col justify-between items-center pointer-events-none select-none z-0 overflow-hidden opacity-[0.035]"
      >
        <div className="text-[17vw] font-black tracking-[-0.08em] leading-none uppercase text-black mt-24">
          AMBER
        </div>
        <div className="text-[15vw] font-black tracking-[-0.08em] leading-none uppercase text-black mb-12">
          ENGINE
        </div>
      </div>

      {/* Blog Top Navigation */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 md:px-16 py-6 z-50 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div 
          onClick={onBack}
          className="flex items-center gap-2.5 font-bold text-sm tracking-normal text-[#0a0a0a] cursor-pointer group"
        >
          <img 
            src="/assets/amber-symbol.svg" 
            alt="Amber Symbol" 
            className="w-7 h-9 object-contain drop-shadow-[0_2px_8px_rgba(217,119,6,0.3)] group-hover:scale-105 transition-transform duration-200" 
          />
          <span className="tracking-tight text-lg font-black text-[#0a0a0a]">AMBER</span>
          <span className="text-[10px] font-sans font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200/80 ml-1">
            Research & Manifesto
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={onBack}
            className="hidden sm:inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-stone-600 hover:text-black transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Overview</span>
          </button>

          <button
            type="button"
            onClick={onNavigateToContact}
            className="flex items-center gap-2 bg-[#d97706] hover:bg-black text-white px-5 py-2.5 rounded-full font-sans font-bold text-xs tracking-wider uppercase shadow-md shadow-[#d97706]/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer group"
          >
            <span>Deploy to VPC</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Main Blog Container */}
      <main className="relative z-10 pt-36 pb-24 px-6 sm:px-8 max-w-4xl mx-auto">
        
        {/* Article Breadcrumb & Metadata Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button
            type="button"
            onClick={onBack}
            className="inline-flex sm:hidden items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-stone-500 hover:text-black mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <div className="flex flex-wrap items-center gap-3 text-xs font-sans font-semibold tracking-wider text-stone-500 uppercase mb-4">
            <span className="px-3 py-1 rounded-full bg-[#fef3c7] text-[#92400e] border border-[#fde68a] font-bold">
              Systems Architecture
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-stone-600">
              <Clock className="w-3.5 h-3.5 text-[#d97706]" />
              5 Min Read
            </span>
            <span>•</span>
            <span>October 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0c0a09] tracking-tight leading-[1.08] mb-6 font-sans">
            Deterministic Cloud Autonomy: Moving Beyond the &ldquo;SRE Tax&rdquo;
          </h1>

          <p className="text-base sm:text-xl text-stone-600 leading-relaxed font-normal mb-8 border-b border-stone-200 pb-8">
            Why shipping raw telemetry to third-party clouds is a toxic compliance liability—and how deterministic in-VPC automation eliminates both the seat tax and 3:00 AM alert fatigue.
          </p>

          {/* Author Byline & Social Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-5 rounded-2xl bg-stone-100/80 border border-stone-200/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#d97706] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                AM
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900 font-sans">Amber Engineering Core</div>
                <div className="text-[11px] text-stone-500 font-sans">Published by Amber Systems Research Team</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-200/80 text-stone-700 text-xs font-sans font-semibold border border-stone-200 transition-all cursor-pointer shadow-sm active:scale-95"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-stone-500" />
                    <span>Share Article</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Article Body Content */}
        <article className="prose prose-stone max-w-none text-stone-800 text-base sm:text-lg leading-relaxed font-sans space-y-8">
          
          {/* Section: The Problem */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <p className="text-lg sm:text-xl font-normal text-stone-900 leading-relaxed">
              Modern infrastructure monitoring is fundamentally broken. Tech teams are forced into a toxic trade-off: either pay an escalating, unpredictable <strong>&ldquo;per-node&rdquo; or &ldquo;per-seat&rdquo; tax</strong> to legacy monitoring giants, or compromise strict data governance by exfiltrating highly sensitive production telemetry, error logs, and stack traces to a third-party cloud.
            </p>
            <p className="text-stone-700 leading-relaxed">
              For highly regulated industries like <strong>FinTech, HealthTech, and cyber-security startups in the US, UK, and Europe</strong>, this data exfiltration isn’t just expensive—it’s a massive liability under <strong>GDPR and HIPAA</strong>.
            </p>
            
            <blockquote className="border-l-2 border-stone-900 pl-5 my-8 text-stone-900 text-lg sm:text-xl font-medium leading-relaxed italic">
              &ldquo;We built Amber to introduce a third way: Complete, deterministic cloud autonomy.&rdquo;
            </blockquote>
          </motion.section>

          {/* Pillar 1 */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 pt-8 border-t border-stone-200/80"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0c0a09] tracking-tight font-sans m-0">
              1. Zero Data Egress. 100% Perimeter Security.
            </h2>

            <p className="text-stone-700 leading-relaxed">
              Amber does not ask you to ship a single byte of log data outside your network. It deploys natively inside your own <strong>private VPC or bare-metal Kubernetes clusters</strong>.
            </p>

            <ul className="list-disc pl-6 space-y-3.5 my-5 text-stone-700 leading-relaxed font-normal">
              <li>
                <strong className="text-stone-900 font-semibold">Local High-Throughput Ingestion:</strong> All telemetry processing (handling <strong>510+ EPS</strong> throughput seamlessly) happens purely locally inside your cluster.
              </li>
              <li>
                <strong className="text-stone-900 font-semibold">Sovereign Security Perimeter:</strong> Your production customer data, stack traces, and database schemas remain strictly within your sovereign security perimeter.
              </li>
              <li>
                <strong className="text-stone-900 font-semibold">Eliminate Hidden Egress Fees:</strong> You completely eliminate cloud network egress charges ($0.09/GB on AWS) that inflate typical Datadog bills by 30–40%.
              </li>
              <li>
                <strong className="text-stone-900 font-semibold">100% Source-Available Transparency:</strong> Amber is fully source-available. Your security and platform engineering teams can inspect, audit, and verify every single line of Python and remediation logic before deploying to production—zero black boxes or closed-source agents.
              </li>
            </ul>
          </motion.section>

          {/* Pillar 2 */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 pt-8 border-t border-stone-200/80"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0c0a09] tracking-tight font-sans m-0">
              2. From Storms to Telemetry: Under 80ms Alert Deduplication
            </h2>

            <p className="text-stone-700 leading-relaxed">
              Legacy platforms dump hundreds of noisy, disconnected alerts into your channels during a core service failure, inducing instant cognitive fatigue. Amber operates via a <strong>localized deterministic graph approach</strong>.
            </p>

            <ul className="list-disc pl-6 space-y-3.5 my-5 text-stone-700 leading-relaxed font-normal">
              <li>
                <strong className="text-stone-900 font-semibold">Sub-80ms Alert Storm Clustering:</strong> It clusters chaotic alert storms of 500+ alerts across microservices into one single, unified incident in under 80ms (p99).
              </li>
              <li>
                <strong className="text-stone-900 font-semibold">Under 3-Second Root-Cause Diagnosis:</strong> Instead of digging through multi-service logs, your team gets a clear root-cause diagnosis with code line proof in under 3 seconds.
              </li>
            </ul>
          </motion.section>

          {/* Pillar 3 */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 pt-8 border-t border-stone-200/80"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0c0a09] tracking-tight font-sans m-0">
              3. Cryptographically Signed, Mobile Remediations
            </h2>

            <p className="text-stone-700 leading-relaxed">
              Autonomous AI shouldn't blindly run raw database commands or unverified scripts in production. That is why Amber enforces strict <strong>Human-in-the-Loop (HITL) Cryptographic Safety</strong>.
            </p>

            <p className="text-stone-700 leading-relaxed">
              When a service breaks, Amber surfaces verified remediation steps matched from your internal playbooks or past post-mortems. It shoots a precise, 3-option action prompt (<strong>Approve</strong>, <strong>See Details</strong>, <strong>Reject</strong>) directly to your team’s <strong>Slack, Telegram, or WhatsApp</strong> via secure device-pairing.
            </p>

            <ul className="list-disc pl-6 space-y-3.5 my-5 text-stone-700 leading-relaxed font-normal">
              <li>
                <strong className="text-stone-900 font-semibold">SHA-256 Cryptographic Payload Binding:</strong> Every mutating tool execution requires a signed payload hash. If a prompt or argument changes in transit, the signature breaks and halts immediately.
              </li>
              <li>
                <strong className="text-stone-900 font-semibold">Strict 10-Minute TTL Expiration:</strong> Action tokens carry a strict 10-minute Time-To-Live (TTL) expiration window to prevent replay attacks or stale state executions.
              </li>
              <li>
                <strong className="text-stone-900 font-semibold">8.4s Average Recovery Time:</strong> Execution happens safely within your cluster in an average of 8.4 seconds recovery time, without an engineer ever having to open a laptop at 3:00 AM.
              </li>
            </ul>
          </motion.section>

          {/* Architectural Comparison Matrix */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pt-8 border-t border-stone-200/80"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#0c0a09] tracking-tight font-sans mb-3">
              The Architecture Shift: Legacy SaaS vs. Amber Deterministic Autonomy
            </h3>
            
            <p className="text-stone-600 text-sm mb-6 leading-relaxed">
              A breakdown of the structural differences between traditional SaaS monitoring and Amber&apos;s in-VPC autonomous engine:
            </p>

            <div className="overflow-x-auto rounded-xl border border-stone-200 my-6">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
                <thead>
                  <tr className="bg-stone-50 text-stone-700 font-bold uppercase tracking-wider text-[11px] border-b border-stone-200">
                    <th className="p-3.5 sm:p-4">Capability</th>
                    <th className="p-3.5 sm:p-4 text-stone-500">Legacy SRE (Datadog / PagerDuty)</th>
                    <th className="p-3.5 sm:p-4 text-[#92400e] bg-amber-50/60 font-black">Amber In-VPC Engine</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-700">
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Data Sovereignty</td>
                    <td className="p-3.5 sm:p-4 text-stone-500">Raw logs & traces exported to US SaaS</td>
                    <td className="p-3.5 sm:p-4 font-semibold text-emerald-800 bg-amber-50/30">100% In-VPC (Zero Data Egress)</td>
                  </tr>
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Pricing Model</td>
                    <td className="p-3.5 sm:p-4 text-stone-500">$30–$40/user seat + log overages</td>
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900 bg-amber-50/30">Flat Predictable Tiers (Unlimited Seats)</td>
                  </tr>
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Code Auditability</td>
                    <td className="p-3.5 sm:p-4 text-stone-500">Closed-source binary agents</td>
                    <td className="p-3.5 sm:p-4 font-semibold text-emerald-800 bg-amber-50/30">100% Source-Available Python & LangGraph</td>
                  </tr>
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900">Incident Remediation</td>
                    <td className="p-3.5 sm:p-4 text-stone-500">Passive dashboards & manual runbook clicking</td>
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900 bg-amber-50/30">Autonomous Verification + SHA-256 HITL</td>
                  </tr>
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900">On-Call Notification</td>
                    <td className="p-3.5 sm:p-4 text-stone-500">Phone sirens & noisy laptop dashboards</td>
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900 bg-amber-50/30">1-Click Slack, Telegram & WhatsApp Bot</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* The New Math of Reliability */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 pt-8 border-t border-stone-200/80"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0c0a09] tracking-tight font-sans m-0">
              The New Math of Reliability
            </h2>

            <p className="text-stone-700 leading-relaxed">
              We believe infrastructure health shouldn&apos;t penalize scaling. By removing third-party API dependencies (like Twilio gateways) and running purely inside your perimeter, Amber operates with <strong>virtually zero external overhead</strong>.
            </p>

            <p className="text-stone-700 leading-relaxed">
              We pass those structural savings directly to you with <strong>unlimited user seats</strong> and flat, predictable infrastructure tiers starting at <strong>$799/month</strong>.
            </p>

            <p className="text-lg sm:text-xl font-bold text-stone-900 my-6">
              Stop funding the legacy SRE tax. Keep your data. Freeze your incident chaos.
            </p>

            {/* Clean Editorial Callout CTA */}
            <div className="pt-8 pb-10 border-t border-b border-stone-200/90 my-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-1">
                  Ready to eliminate your SRE seat tax?
                </h3>
                <p className="text-sm text-stone-600 m-0">
                  Deploy Amber into your AWS, GCP, Azure, or bare-metal Kubernetes cluster in under 10 minutes.
                </p>
              </div>
              <button
                type="button"
                onClick={onNavigateToContact}
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#1c1917] hover:bg-black text-white px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Deploy Amber to Your VPC</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.section>

        </article>

      </main>

      {/* Footer — Matching Amber Site */}
      <footer className="px-8 md:px-16 pt-20 pb-12 bg-[#ffffff] text-[#0a0a0a] border-t border-black/10 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2.5 mb-2 cursor-pointer" onClick={onBack}>
              <img src="/assets/amber-symbol.svg" alt="Amber" className="w-5 h-7 object-contain" />
              <span className="font-bold text-black tracking-tight text-lg">Amber</span>
            </div>
            <div className="text-xs text-stone-600">Deterministic Cloud Autonomy · Remote — Built for SRE teams worldwide</div>
          </div>

          <div className="flex flex-wrap gap-6 text-xs font-sans font-semibold text-black/60">
            <button type="button" onClick={onBack} className="hover:text-black transition">PLATFORM OVERVIEW</button>
            <a href="https://github.com/himanshu-xyz-1/Amber" target="_blank" rel="noreferrer" className="hover:text-black transition">GITHUB</a>
            <a href="https://twitter.com/himanshu1xy" target="_blank" rel="noreferrer" className="hover:text-black transition">TWITTER</a>
            <a href="mailto:amber.incident@gmail.com" className="hover:text-black transition">SUPPORT</a>
          </div>
        </div>

        {/* Faded Footer Watermark */}
        <div className="overflow-hidden select-none pt-8 max-w-6xl mx-auto flex justify-between items-center text-xs font-sans text-stone-400">
          <div>© 2026 Amber Technologies Inc. All rights reserved.</div>
          <div className="text-[10px] font-mono tracking-wider uppercase text-stone-400">
            ED25519 · SHA-256 · HITL GOVERNED
          </div>
        </div>
      </footer>

    </div>
  );
};
