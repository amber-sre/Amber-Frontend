import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  HelpCircle, 
  ShieldCheck, 
  Lock, 
  Cpu, 
  RotateCcw, 
  Server, 
  CheckCircle2, 
  ArrowRight,
  Code2,
  Coins,
  ExternalLink
} from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  badge: string;
  icon: React.ElementType;
  summary: string;
  answer: string[];
  keyTakeaway: string;
  actionLink?: {
    label: string;
    url: string;
    external?: boolean;
  };
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'hitl',
    badge: 'HUMAN CONTROL',
    icon: ShieldCheck,
    question: 'Does Amber ever execute changes in production without our permission?',
    summary: 'No. State-mutating actions strictly require human approval via Slack or the web console.',
    answer: [
      'By default, all high-risk infrastructure actions (such as rolling back deployments, restarting pods, or killing hung database connections) are intercepted by our Guardrail Engine.',
      'Amber generates a cryptographically signed approval card delivered instantly to your team Slack channel or Web Console. The card includes the exact proposed command, dry-run output, and a 10-minute expiry token.',
      'If an engineer does not explicitly approve the action, Amber takes no state-mutating action and escalates to your normal on-call paging flow.'
    ],
    keyTakeaway: 'Zero unapproved changes. Full engineer sovereignty guaranteed.'
  },
  {
    id: 'opensource',
    badge: 'SOURCE-AVAILABLE & AUDITABLE',
    icon: Code2,
    question: 'Is Amber open source? Can our platform & security teams audit the codebase?',
    summary: 'The backend engine is source-available under BSL 1.1 with a free Community Edition. The Amber Console is proprietary.',
    answer: [
      'The core Amber SRE engine is source-available on GitHub under the Business Source License 1.1 (BSL 1.1). The Community Edition is 100% free forever for up to 15 nodes and 5 services with zero license key required.',
      'Your security, platform, and compliance teams can audit every single line of backend code to verify how secrets are scrubbed in memory, confirm that LLMs are physically blocked from raw shell execution, and validate that customer telemetry never leaves your VPC.',
      'Commercial use beyond Community thresholds (or automated state-mutating remediation) requires an active commercial license. The Amber Web Console / Frontend is proprietary (All Rights Reserved).'
    ],
    actionLink: {
      label: 'Audit the backend engine on GitHub',
      url: 'https://github.com/himanshu-xyz-1/Amber',
      external: true
    },
    keyTakeaway: 'Source-available engine auditable on GitHub. Free Community Edition up to 15 nodes & 5 services.'
  },
  {
    id: 'charges',
    badge: 'TRANSPARENT PRICING',
    icon: Coins,
    question: 'Does Amber have any hidden seat fees, per-user charges, or surprise billing?',
    summary: 'Zero per-seat fees. Unlimited team members with transparent flat-tier pricing.',
    answer: [
      'No. Many enterprise monitoring and observability vendors charge a punishing "seat tax" ($150–$300/user/month), forcing companies to restrict dashboard access. Amber includes unlimited user seats across all subscription tiers—invite your entire engineering organization at no extra cost.',
      'We do not impose hidden surge fees or packet overages during high-severity outages. Each tier includes a predictable allocation of monitored microservices and Kubernetes/cloud nodes.',
      'Node and service allocations are calculated against actively monitored services in a rolling 30-day window, ensuring temporary test clusters or resolved historical incidents never inflate your billing.'
    ],
    keyTakeaway: 'Predictable flat-rate pricing with unlimited team seats and zero hidden penalties.'
  },
  {
    id: 'airgap',
    badge: 'AIR-GAPPED & PRIVACY',
    icon: Lock,
    question: 'Can Amber run completely offline in our air-gapped VPC?',
    summary: 'Yes. Amber deploys as a standalone container stack with zero external network dependencies.',
    answer: [
      'Amber is engineered from day one to support air-gapped enterprise environments. It can run entirely within your private AWS VPC, GCP project, Azure subscription, or bare-metal Kubernetes cluster.',
      'When AIR_GAPPED=true is enabled, all external cloud LLM gateways are physically severed in code. Amber connects exclusively to your internal Ollama, vLLM, or private cluster models.',
      'Customer telemetry, stack traces, and database schemas never traverse the public internet and are never used to train public models.'
    ],
    keyTakeaway: 'Runs 100% on-premises with local LLMs and zero phone-home telemetry.'
  },
  {
    id: 'hallucinations',
    badge: 'SAFETY SHIELD',
    icon: Cpu,
    question: 'What prevents AI models from hallucinating or inventing commands?',
    summary: 'LLMs never receive raw terminal shell access. All actions are statically typed and validated.',
    answer: [
      'Unlike general AI assistants that emit arbitrary bash scripts, Amber uses a strict dual-plane architecture where the LLM only selects from an immutable, compile-time allowlist of tools.',
      'Every tool argument (e.g. namespace, pod name, SQL query PID) is validated against actual live cluster telemetry before execution. If an argument does not exist in your cluster, the action is rejected immediately.',
      'If model confidence falls below 85% or if conflicting diagnoses emerge, Amber halts automated proposal and requests human triage.'
    ],
    keyTakeaway: 'Static tool allowlist + live telemetry schema checks prevent hallucinations.'
  },
  {
    id: 'models',
    badge: 'MODEL AGNOSTIC',
    icon: Server,
    question: 'Which AI models can we use with Amber? Are we locked into a single provider?',
    summary: 'Zero vendor lock-in. Amber supports any OpenAI-compatible local model or major cloud API.',
    answer: [
      'Amber is completely model-agnostic. You can switch models instantly via configuration without modifying any application code.',
      'For self-hosted deployments: Ollama, vLLM, TGI, SGLang, DeepSeek-R1 (671B / distillations), Qwen 2.5 / Qwen 3, Llama 3.3 (70B), and custom internal fine-tunes.',
      'For hybrid or cloud deployments: Anthropic Claude 3.7 Sonnet, OpenAI GPT-4o, and Google Gemini 2.5 Flash via secure API key headers.'
    ],
    keyTakeaway: 'Plug in any open-source or commercial model with zero code changes.'
  },
  {
    id: 'rollbacks',
    badge: 'CONVERGENCE & RECOVERY',
    icon: RotateCcw,
    question: 'What happens if a proposed fix fails or worsens the incident?',
    summary: 'Mandatory automated health checks trigger instant rollbacks and trip circuit breakers.',
    answer: [
      'Every remediation is immediately followed by an automated verification probe that queries HTTP status endpoints and Prometheus error rates for 45 seconds.',
      'If error rates do not normalize, Amber automatically triggers an instant rollback to the previous known good state.',
      'To prevent cascade outages, Amber enforces a strict anti-loop policy: if a service was already rolled back within the last 30 minutes, repeated automated rollbacks are blocked and escalated directly to senior human SREs.'
    ],
    keyTakeaway: 'Health-verified convergence with automatic rollbacks and anti-loop circuit breakers.'
  },
  {
    id: 'licensing',
    badge: 'CAPACITY & LICENSING',
    icon: CheckCircle2,
    question: 'How is Amber licensed, and how do node and service limits work?',
    summary: 'Free Community tier forever; flat commercial tiers with offline cryptographic validation.',
    answer: [
      'Amber offers a Free Forever Community Edition (up to 5 production microservices and 15 nodes, zero license key required). For automated mutating remediation and scale, commercial licenses are tiered based on monitored active microservices (35 for Autonomous, enterprise scale for Response) and cluster nodes (100 or 500+).',
      'Limits are evaluated against actively monitored services in a rolling 30-day window, ensuring historical resolved incidents never lock your license.',
      'Commercial license keys are cryptographically signed using Ed25519 and verified offline by the engine—your deployment does not depend on an external licensing server to stay online.'
    ],
    keyTakeaway: 'Free Community tier forever; flat commercial tiers with offline Ed25519 validation.'
  }
];

interface FaqSectionProps {
  onNavigateToContact?: () => void;
}

export function FaqSection({ onNavigateToContact }: FaqSectionProps = {}) {
  const [openId, setOpenId] = useState<string | null>('hitl');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="px-8 md:px-16 py-32 bg-[#fafaf9] border-b border-black/5 relative overflow-hidden">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center text-xs font-mono font-medium tracking-wider text-black/50 uppercase border-b border-black/10 pb-4 mb-16">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#d97706]" />
            <span className="font-semibold text-black/80">Frequently Answered Questions</span>
          </div>
          <div>Enterprise SRE Audit Ready</div>
          <div className="hidden sm:block">Deterministic Policy</div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fef3c7] border border-[#fde68a] text-[#b45309] font-mono text-[11px] font-bold uppercase tracking-wider mb-4">
            <span>Engineering Clarity</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0c0a09] tracking-tight leading-tight mb-4">
            Everything your CTO, SRE Lead, & Security Auditor need to know.
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            Direct technical answers to real architecture, security, and production questions. Zero marketing fluff.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'bg-white border-[#d97706]/40 shadow-xl shadow-amber-500/5' 
                    : 'bg-white/80 hover:bg-white border-stone-200/90 shadow-sm'
                }`}
              >
                {/* Question Trigger */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left p-6 sm:p-7 flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-[#fef3c7] text-[#d97706]' : 'bg-stone-100 text-stone-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#d97706] bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#0c0a09] leading-snug">
                        {item.question}
                      </h3>
                      {!isOpen && (
                        <p className="text-stone-500 text-xs sm:text-sm mt-1 line-clamp-1 font-normal">
                          {item.summary}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen 
                      ? 'rotate-180 bg-[#d97706] text-white border-[#d97706]' 
                      : 'bg-stone-50 text-stone-400 border-stone-200'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Expanded Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 sm:px-7 pb-6 pt-2 border-t border-stone-100 sm:ml-14">
                        <div className="space-y-3 text-stone-700 text-sm sm:text-base leading-relaxed">
                          {item.answer.map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                          ))}
                        </div>

                        {/* Optional Action / Audit Link */}
                        {item.actionLink && (
                          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center">
                            <a
                              href={item.actionLink.url}
                              target={item.actionLink.external ? "_blank" : undefined}
                              rel={item.actionLink.external ? "noreferrer" : undefined}
                              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#d97706] hover:text-black transition-colors"
                            >
                              <span>{item.actionLink.label}</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}

                        {/* Key Takeaway Callout */}
                        <div className="mt-5 p-3.5 bg-amber-50/70 border border-amber-200/70 rounded-xl flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0" />
                          <span className="text-xs font-mono font-medium text-amber-950">
                            <strong>Key Guarantee:</strong> {item.keyTakeaway}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 p-8 bg-white border border-stone-200/90 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-[#0c0a09]">Have custom compliance or infrastructure requirements?</h4>
            <p className="text-stone-600 text-sm mt-1">
              We provide tailored VPC deployment manifests, custom telemetry adapters, and white-glove runbook authoring.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (onNavigateToContact) {
                onNavigateToContact();
              } else {
                const el = document.getElementById('connect');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0c0a09] hover:bg-[#d97706] text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-sm cursor-pointer"
          >
            <span>Talk to Engineering</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
