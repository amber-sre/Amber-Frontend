import React from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  CheckCircle2, 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  GitPullRequest, 
  Layers, 
  ArrowRight,
  Code2
} from 'lucide-react';

interface BuiltByViewProps {
  onBack: () => void;
  onNavigateToContact: () => void;
}

export const BuiltByView: React.FC<BuiltByViewProps> = ({ onBack, onNavigateToContact }) => {
  return (
    <div className="relative bg-[#ffffff] text-[#0a0a0a] font-sans selection:bg-[#d97706] selection:text-white min-h-screen">
      
      {/* Top Navigation Bar */}
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
              <span className="text-stone-300">•</span>
              <span className="text-black font-semibold">Founder & Architecture</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onNavigateToContact}
              className="inline-flex items-center gap-2 bg-[#d97706] hover:bg-black text-white text-xs font-sans font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <span>Connect on Zoom</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 sm:px-8 py-16 sm:py-24 space-y-20">
        
        {/* Hero Header */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-6xl font-black text-[#0c0a09] tracking-tight leading-[1.08] font-sans">
            Built by Himanshu Joshi.
          </h1>
          
          <p className="text-lg sm:text-xl text-stone-600 font-normal leading-relaxed max-w-3xl">
            Independent systems and infrastructure engineer. Author of the Amber Autonomous SRE Engine. Contributor to major open-source AI infrastructure including LiteLLM.
          </p>

          {/* Social Proof & Verified Profiles Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <a
              href="https://www.linkedin.com/in/himanshu-joshi-617064432/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0a66c2]/10 hover:bg-[#0a66c2] text-[#0a66c2] hover:text-white border border-[#0a66c2]/20 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm group"
            >
              <Linkedin className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              <span>LinkedIn Profile</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <a
              href="https://x.com/himanshu1xy"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm group"
            >
              <Twitter className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              <span>@himanshu1xy</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <a
              href="https://github.com/himanshu-xyz-1"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-200 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer group"
            >
              <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>GitHub (himanshu-xyz-1)</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <a
              href="mailto:team@ambersre.xyz"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-200 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-stone-600" />
              <span>team@ambersre.xyz</span>
            </a>
          </div>
        </div>

        {/* Why I Built Amber */}
        <section className="p-8 sm:p-10 rounded-3xl bg-stone-50 border border-stone-200/80 space-y-6">
          <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-amber-800">
            <Terminal className="w-4 h-4 text-[#d97706]" />
            <span>The Origin Story</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0c0a09] tracking-tight font-sans">
            Why I built Amber: Modern SRE tooling is fundamentally broken.
          </h2>
          <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
            <p>
              Traditional monitoring platforms like Datadog and PagerDuty charge extortionate per-host fees while doing the bare minimum: waking up on-call engineers at 3:00 AM with opaque, noisy alarms. Worse, they demand that companies stream gigabytes of sensitive proprietary logs and traces out of their private cloud into third-party servers.
            </p>
            <p>
              I built <strong>Amber</strong> on three strict engineering principles:
            </p>
            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#d97706] shrink-0 mt-0.5" />
                <span><strong>Zero Telemetry Egress:</strong> The entire SRE engine, log analysis, and diagnostic loop run inside your private AWS VPC, GCP project, or Kubernetes cluster. Zero bytes of your application logs or secrets ever leave your perimeter.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#d97706] shrink-0 mt-0.5" />
                <span><strong>Local Air-Gapped Intelligence:</strong> Powered by private local LLMs via Ollama (Qwen 2.5 & DeepSeek R1). Zero external OpenAI API dependencies for core incident evaluation.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#d97706] shrink-0 mt-0.5" />
                <span><strong>Deterministic Guardrails &amp; HITL Approvals:</strong> No hallucinated bash commands. Proposed remediations are cryptographically signed with SHA-256 tokens and delivered via Telegram and Slack with a 1-click [Approve / Reject] button.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Proof of Work */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-stone-500">
            <Code2 className="w-4 h-4 text-[#d97706]" />
            <span>Track Record &amp; Codebase Integrity</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0c0a09] tracking-tight font-sans">
            Verified Proof of Work
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* PoW 1: LiteLLM */}
            <div className="p-6 rounded-2xl border border-stone-200 bg-white hover:border-[#d97706]/50 transition-all flex flex-col justify-between shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                    Open Source
                  </span>
                  <GitPullRequest className="w-4 h-4 text-[#d97706]" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">LiteLLM Contribution</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Contributed proxy streaming and resilient request handling to LiteLLM (PR #43334), an AI infrastructure used by thousands of engineering organizations worldwide.
                </p>
              </div>
              <a
                href="https://github.com/BerriAI/litellm/pull/43334"
                target="_blank"
                rel="noreferrer"
                className="mt-4 pt-3 border-t border-stone-100 text-xs font-bold text-[#d97706] hover:text-black inline-flex items-center gap-1.5 transition-colors"
              >
                <span>View GitHub PR #43334</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* PoW 2: Amber Engine */}
            <div className="p-6 rounded-2xl border border-stone-200 bg-white hover:border-[#d97706]/50 transition-all flex flex-col justify-between shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Core Product
                  </span>
                  <Cpu className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">Amber SRE Engine</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Engineered 84+ automated unit and integration tests across FastAPI, LangGraph state machines, multi-channel Telegram/Slack approval bridges, and Ed25519 cryptographic licensing.
                </p>
              </div>
              <a
                href="https://github.com/amber-sre/Amber-Backend"
                target="_blank"
                rel="noreferrer"
                className="mt-4 pt-3 border-t border-stone-100 text-xs font-bold text-[#d97706] hover:text-black inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Audit Backend Repo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* PoW 3: Distributed Systems */}
            <div className="p-6 rounded-2xl border border-stone-200 bg-white hover:border-[#d97706]/50 transition-all flex flex-col justify-between shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-800">
                    Systems
                  </span>
                  <Layers className="w-4 h-4 text-stone-600" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">Distributed Raft Store</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Implemented distributed Raft consensus algorithm from scratch in Python with leader election, log replication, snapshotting, and fault tolerance under network partitions.
                </p>
              </div>
              <a
                href="https://github.com/himanshu-xyz-1/python-raft-kv-store"
                target="_blank"
                rel="noreferrer"
                className="mt-4 pt-3 border-t border-stone-100 text-xs font-bold text-[#d97706] hover:text-black inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Inspect Raft Codebase</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* The Founder Commitment */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#0c0a09] text-white space-y-6">
          <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-amber-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Direct Engineering SLA</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-sans">
            The Solo Founder Advantage: No Sales Reps. No Ticket Queues.
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            When you deploy Amber, you don't talk to tier-1 outsourced support or sales executives reading qualification scripts. 
            <strong> You work directly with me.</strong>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm text-stone-300">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-amber-400 font-bold">15-Min Walkthrough on Zoom</div>
              <div>Hop on a quick Zoom call to review cluster prerequisites and verify your in-VPC container deployment.</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-amber-400 font-bold">Continuous Engine Updates</div>
              <div>Direct access to new engine releases, early telemetry adapters, and fast-tracked GitHub issue resolution.</div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={onNavigateToContact}
              className="py-3 px-6 rounded-xl bg-[#d97706] hover:bg-white hover:text-black text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md inline-flex items-center justify-center gap-2"
            >
              <span>Schedule 15-Min Zoom Onboarding</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="mailto:team@ambersre.xyz"
              className="py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 inline-flex items-center justify-center gap-2 border border-white/10"
            >
              <span>Email: team@ambersre.xyz</span>
            </a>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-8 text-center text-xs text-stone-500 font-sans">
        © 2026 Amber SRE • Engineered by Himanshu Joshi • In-VPC Autonomous Reliability
      </footer>

    </div>
  );
};
