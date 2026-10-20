import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Terminal, 
  Copy, 
  Check, 
  CheckCircle2, 
  ExternalLink, 
  Cpu, 
  HardDrive, 
  Send, 
  MessageSquare, 
  Server, 
  Layers, 
  GitFork, 
  ArrowRight
} from 'lucide-react';

interface CommunityViewProps {
  onBack: () => void;
  onNavigateToContact: () => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ onBack, onNavigateToContact }) => {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedWebhook, setCopiedWebhook] = useState(false);

  const installCommand = 'curl -fsSL https://ambersre.xyz/community.sh | bash';
  const webhookExample = 'POST http://<your-server-ip>:8000/api/v1/alerts/webhook';

  const copyInstallCommand = () => {
    navigator.clipboard.writeText(installCommand);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const copyWebhookExample = () => {
    navigator.clipboard.writeText(webhookExample);
    setCopiedWebhook(true);
    setTimeout(() => setCopiedWebhook(false), 2000);
  };

  return (
    <div className="relative bg-[#ffffff] text-[#0a0a0a] font-sans selection:bg-[#d97706] selection:text-white min-h-screen">
      
      {/* Top Enterprise Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-black/70 hover:text-black p-2 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Amber Platform</span>
            </button>
            <span className="hidden sm:inline text-stone-300">|</span>
            <div className="hidden sm:flex items-center gap-2 text-xs font-sans text-stone-500 font-medium">
              <span>Amber SRE</span>
              <span>/</span>
              <span className="text-black font-semibold">Community Edition Quickstart</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/amber-sre/Amber-Backend"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/10 hover:border-black/30 text-xs font-sans font-semibold text-stone-700 hover:text-black transition cursor-pointer"
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
            <button
              type="button"
              onClick={onNavigateToContact}
              className="px-4 py-1.5 rounded-lg bg-black hover:bg-[#d97706] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Need Enterprise Scale?
            </button>
          </div>
        </div>
      </header>

      {/* Main Documentation Body */}
      <main className="max-w-5xl mx-auto px-6 sm:px-8 py-12">
        
        {/* Hero Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-5xl font-black text-[#0c0a09] tracking-tight leading-tight mb-4">
            Deploy Amber Community Edition in Under 60 Seconds.
          </h1>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            Autonomous incident investigation, alert storm deduplication, and deterministic root-cause proof running 100% locally in your own VPC or workstation. Free forever for up to 3 nodes & 5 services with zero license key required.
          </p>
        </div>

        {/* Master 1-Line Install Box */}
        <div className="mb-14 bg-[#0c0a09] rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-stone-800">
          <div className="flex items-center justify-between mb-3 text-xs font-sans font-medium text-stone-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#d97706]" />
              <span className="font-bold text-stone-300">Run in your Linux, EC2, or Kubernetes worker node terminal:</span>
            </div>
            <span className="text-[11px] text-stone-500 hidden sm:inline">Linux · macOS · x86_64 / arm64</span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
            <code className="font-mono text-xs sm:text-sm text-[#facc15] select-all break-all sm:break-normal">
              {installCommand}
            </code>
            <button
              type="button"
              onClick={copyInstallCommand}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer shadow-sm"
            >
              {copiedCmd ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCmd ? 'Command Copied!' : 'Copy Command'}</span>
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-sans text-stone-400 pt-3 border-t border-white/10 font-medium">
            <span className="flex items-center gap-1.5 text-stone-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero License Key Required</span>
            </span>
            <span className="flex items-center gap-1.5 text-stone-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Free Forever (3 nodes · 5 services · 1,000 Alerts/mo)</span>
            </span>
            <span className="flex items-center gap-1.5 text-stone-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero telemetry leaves your VPC</span>
            </span>
            <span className="flex items-center gap-1.5 text-stone-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sovereign Auto-Healing & 24/7 Sentinel</span>
            </span>
          </div>
        </div>

        {/* Prerequisites Checklist */}
        <section className="mb-14 bg-stone-50 border border-stone-200/80 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#0c0a09] mb-4 flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-[#d97706]" />
            <span>System Requirements</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
            <div className="bg-white p-4 rounded-xl border border-stone-200">
              <div className="font-bold text-[#0c0a09] mb-1 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-stone-500" />
                <span>CPU & Memory</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Minimum 4 Cores & 8 GB RAM.<br />
                <strong className="text-stone-800">16 GB RAM</strong> recommended for local Ollama reasoning models.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-stone-200">
              <div className="font-bold text-[#0c0a09] mb-1 flex items-center gap-1.5">
                <Server className="w-4 h-4 text-stone-500" />
                <span>Operating System</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Ubuntu 20.04+, Debian 11+, RHEL/CentOS 8+, or macOS.<br />
                Docker & Docker Compose installed.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-stone-200">
              <div className="font-bold text-[#0c0a09] mb-1 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-stone-500" />
                <span>Sentinel In-VPC Probing</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Zero external webhooks required. Sentinel natively monitors local K8s nodes, Docker containers, DB pools, and HTTP endpoints 24/7.
              </p>
            </div>
          </div>
        </section>

        {/* Step-by-Step Interactive Wizard Guide */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-[#0c0a09] mb-6">
            Interactive Setup Wizard Walkthrough
          </h2>

          <div className="space-y-6">
            
            {/* Step 1 */}
            <div className="flex gap-4 p-6 bg-white border border-stone-200 rounded-2xl shadow-sm">
              <div className="w-8 h-8 rounded-full bg-stone-900 text-white font-sans text-sm font-bold flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0c0a09] mb-1">
                  Animated CLI Boot & Dependency Verification
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed mb-3">
                  Run <code className="font-mono text-stone-800 bg-stone-100 px-1.5 py-0.5 rounded">amber community setup</code> (or the one-line curl installer). Amber boots with an ASCII terminal splash, automatically verifies and installs prerequisites (Docker, Python 3.10+, Git, Ollama) with live progress indicators, registers your team credentials, and activates the Free Lifetime Community Tier.
                </p>
                <div className="bg-stone-900 text-stone-300 font-mono text-xs p-3 rounded-lg">
                  <span className="text-emerald-400">✔ COMMUNITY EDITION ACTIVATED (Free Forever)</span><br />
                  <span className="text-stone-400">  • License: Zero Key Required ($0 Free Forever)</span><br />
                  <span className="text-stone-400">  • Quota: Up to 3 nodes · 5 services · 1,000 Alerts/month</span><br />
                  <span className="text-stone-400">  • Execution: Sovereign Auto-Healing &amp; In-VPC Sentinel (100% In-VPC)</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 p-6 bg-white border border-stone-200 rounded-2xl shadow-sm">
              <div className="w-8 h-8 rounded-full bg-stone-900 text-white font-sans text-sm font-bold flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0c0a09] mb-1">
                  Interactive AI Model Selector &amp; GitHub Star Hook
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed mb-3">
                  Use arrow keys to select your local reasoning engine (<code className="text-stone-800 font-bold">qwen2.5-coder:7b</code>, <code className="text-stone-800 font-bold">deepseek-r1:8b</code>, or <code className="text-stone-800 font-bold">llama3.2:3b</code>). Amber pulls the model with a live progress bar while inviting engineers to star the backend on GitHub.
                </p>
                <p className="text-xs text-stone-500">
                  Prefer Cloud AI? You can also skip local Ollama and bring your own OpenAI, Anthropic, or Gemini API key with zero inference markup.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4 p-6 bg-white border border-stone-200 rounded-2xl shadow-sm">
              <div className="w-8 h-8 rounded-full bg-stone-900 text-white font-sans text-sm font-bold flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0c0a09] mb-1">
                  24/7 Sovereign Sentinel &amp; On-Call Pairing
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed mb-3">
                  Sentinel initiates continuous in-VPC health surveillance and pairs with your preferred on-call channels right from the terminal:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <div className="font-bold text-[#0c0a09] flex items-center gap-1.5 mb-1">
                      <Send className="w-3.5 h-3.5 text-[#0284c7]" />
                      <span>Telegram On-Call Push</span>
                    </div>
                    <p className="text-stone-600">
                      Open Telegram → Search <strong>@ambersre_alert_bot</strong> → Send <code>/start</code>. Paste your Receiver ID for an instant cryptographic handshake verification!
                    </p>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <div className="font-bold text-[#0c0a09] flex items-center gap-1.5 mb-1">
                      <MessageSquare className="w-3.5 h-3.5 text-[#4a154b]" />
                      <span>Slack Webhook Broadcast</span>
                    </div>
                    <p className="text-stone-600">
                      Paste your Incoming Webhook URL (e.g. <code>#prod-alerts</code>). Amber sends a verification alert card to validate connectivity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4 p-6 bg-white border border-stone-200 rounded-2xl shadow-sm">
              <div className="w-8 h-8 rounded-full bg-stone-900 text-white font-sans text-sm font-bold flex items-center justify-center shrink-0">
                4
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0c0a09] mb-1">
                  Sovereign In-VPC Monitoring &amp; 3-Node Enforcement
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed mb-3">
                  Zero external webhooks required. Sentinel auto-discovers your local Kubernetes cluster or Docker hosts and auto-heals up to 3 managed nodes. If your VPC contains more than 3 nodes, Amber securely manages the first 3 nodes and surfaces a seamless upgrade prompt to keep your cluster compliant.
                </p>
                <div className="flex items-center justify-between gap-3 bg-stone-100 border border-stone-300 p-3 rounded-lg font-mono text-xs text-stone-800">
                  <span className="text-stone-700">Optional Webhook Ingress (Legacy Prometheus/Datadog):</span>
                  <code>{webhookExample}</code>
                  <button
                    type="button"
                    onClick={copyWebhookExample}
                    className="text-stone-600 hover:text-black font-sans font-bold cursor-pointer shrink-0"
                  >
                    {copiedWebhook ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Community vs Enterprise Table */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-[#0c0a09] mb-6">
            Community Edition vs. Commercial Plans
          </h2>
          <div className="overflow-x-auto border border-stone-200 rounded-2xl">
            <table className="w-full text-left text-xs sm:text-sm font-sans">
              <thead className="bg-stone-50 border-b border-stone-200 font-sans text-xs uppercase tracking-wider text-stone-600 font-bold">
                <tr>
                  <th className="py-4 px-5">Capability</th>
                  <th className="py-4 px-5 text-[#d97706] font-bold">Community (Free)</th>
                  <th className="py-4 px-5 text-stone-900 font-bold">Growth ($2,499/mo)</th>
                  <th className="py-4 px-5 text-stone-900 font-bold">Autonomous ($5,999/mo)</th>
                  <th className="py-4 px-5 text-stone-900 font-bold">Sovereign ($11,999/mo)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                <tr>
                  <td className="py-3.5 px-5 font-medium text-stone-800">Node Limit</td>
                  <td className="py-3.5 px-5 text-emerald-700 font-bold">Up to 3 nodes</td>
                  <td className="py-3.5 px-5 text-stone-900 font-semibold">Up to 50 nodes</td>
                  <td className="py-3.5 px-5 text-stone-900 font-semibold">Up to 250 nodes</td>
                  <td className="py-3.5 px-5 text-stone-900 font-semibold">Unlimited Enterprise Fleet</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-medium text-stone-800">Production Services</td>
                  <td className="py-3.5 px-5 text-emerald-700 font-bold">Up to 5 services</td>
                  <td className="py-3.5 px-5 text-stone-900 font-semibold">Up to 25 services</td>
                  <td className="py-3.5 px-5 text-stone-900 font-semibold">Unlimited Services</td>
                  <td className="py-3.5 px-5 text-stone-900 font-semibold">Unlimited Multi-VPC</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-medium text-stone-800">Monthly Alerts</td>
                  <td className="py-3.5 px-5 text-stone-700 font-semibold">1,000 alerts / mo</td>
                  <td className="py-3.5 px-5 text-stone-900 font-semibold">Unlimited Ingestion</td>
                  <td className="py-3.5 px-5 text-stone-900 font-semibold">Unlimited Ingestion</td>
                  <td className="py-3.5 px-5 text-stone-900 font-semibold">Unlimited Ingestion</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-medium text-stone-800">AI Compute Model</td>
                  <td className="py-3.5 px-5 text-stone-600">Local Ollama / BYO Key</td>
                  <td className="py-3.5 px-5 text-stone-900 font-semibold">Local Ollama or Cloud AI</td>
                  <td className="py-3.5 px-5 text-stone-900 font-semibold">Local Ollama or Cloud AI</td>
                  <td className="py-3.5 px-5 text-stone-900 font-semibold">Air-Gapped Local LLM or Cloud</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-medium text-stone-800">Sentinel 24/7 Heartbeat</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ Included (Zero-Webhook)</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ Included</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ Included</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ Included</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-medium text-stone-800">Alert Storm Deduplication (&lt; 80ms)</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ Included</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ Included</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ Included</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ Included</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-medium text-stone-800">Deterministic Root-Cause Proof</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ Included</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ Included</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ Included</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ Included</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-medium text-stone-800">Memory Leak & Deadlock Tracing</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ Included</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ Included</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ Included</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ Included</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-medium text-stone-800">Pre-Built SRE Runbooks</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">50+ Pre-Built</td>
                  <td className="py-3.5 px-5 text-stone-900 font-semibold">50+ Pre-Built</td>
                  <td className="py-3.5 px-5 text-stone-900 font-semibold">50+ Pre-Built + Auto-PRs</td>
                  <td className="py-3.5 px-5 text-stone-900 font-semibold">✔ Custom Driver Engineering</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-medium text-stone-800">Automated Remediation &amp; Rollback</td>
                  <td className="py-3.5 px-5 text-stone-500 font-medium">Read-Only Triage &amp; Proof</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ 150 Auto-Actions / mo</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ 500 Auto-Actions / mo</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ Unlimited Auto-Actions</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-medium text-stone-800">Executive CTO Audits</td>
                  <td className="py-3.5 px-5 text-stone-400">—</td>
                  <td className="py-3.5 px-5 text-stone-400">—</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ Weekly Ed25519 Signed PDFs</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ Custom Compliance &amp; Audit Packs</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-medium text-stone-800">Smart Log Pruning (~95% Saved)</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ Included (amber log-pruner)</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ 60%+ Cloud Cut</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ 90% High-Throughput Cut</td>
                  <td className="py-3.5 px-5 text-emerald-600 font-bold">✔ Air-Gapped Retention Engine</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-medium text-stone-800">Support SLA</td>
                  <td className="py-3.5 px-5 text-stone-600">GitHub Community</td>
                  <td className="py-3.5 px-5 text-stone-900 font-semibold">Email &amp; Slack Support</td>
                  <td className="py-3.5 px-5 text-stone-900 font-semibold">4-hr SLA &amp; Direct SRE Channel</td>
                  <td className="py-3.5 px-5 text-stone-900 font-semibold">Sub-10s MTTR SLA &amp; 15-min Hotline</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-[#0c0a09]">Managing larger infrastructure or need verified auto-fixes?</h3>
            <p className="text-stone-600 text-sm mt-1">
              Explore our commercial plans with up to 150+ nodes, white-glove runbooks, and enterprise SLAs.
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateToContact}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black hover:bg-[#d97706] text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer shadow-sm"
          >
            <span>Talk to Engineering Team</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </main>

    </div>
  );
};
