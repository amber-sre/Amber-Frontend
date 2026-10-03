import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Lock, 
  Copyright, 
  CheckCircle2, 
  ArrowUpRight
} from 'lucide-react';

export type LegalTab = 'terms' | 'privacy' | 'copyright';

interface LegalModalProps {
  isOpen: boolean;
  activeTab: LegalTab;
  onTabChange: (tab: LegalTab) => void;
  onClose: () => void;
}

export function LegalModal({ isOpen, activeTab, onTabChange, onClose }: LegalModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl h-[88vh] bg-[#ffffff] text-[#0a0a0a] rounded-3xl shadow-2xl border border-black/10 flex flex-col overflow-hidden z-10 font-sans"
        >
          {/* Header Bar */}
          <div className="px-6 sm:px-8 py-5 border-b border-black/10 flex items-center justify-between bg-stone-50/80 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#d97706] text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-black tracking-tight">
                  Amber Legal, Privacy & Compliance Hub
                </h3>
                <div className="text-[11px] font-mono text-black/50">
                  Governing Entity: Amber Technologies Inc. · Effective Date: October 2026
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/70 hover:text-black transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 sm:px-8 pt-3 border-b border-black/5 flex gap-2 sm:gap-4 shrink-0 bg-white overflow-x-auto">
            <button
              type="button"
              onClick={() => onTabChange('terms')}
              className={`pb-3 px-3 text-xs sm:text-sm font-bold tracking-tight border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'terms'
                  ? 'border-[#d97706] text-[#d97706]'
                  : 'border-transparent text-black/60 hover:text-black'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Terms of Service (MSA)</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange('privacy')}
              className={`pb-3 px-3 text-xs sm:text-sm font-bold tracking-tight border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'privacy'
                  ? 'border-[#d97706] text-[#d97706]'
                  : 'border-transparent text-black/60 hover:text-black'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Privacy & Telemetry Policy</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange('copyright')}
              className={`pb-3 px-3 text-xs sm:text-sm font-bold tracking-tight border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'copyright'
                  ? 'border-[#d97706] text-[#d97706]'
                  : 'border-transparent text-black/60 hover:text-black'
              }`}
            >
              <Copyright className="w-4 h-4" />
              <span>Copyright & Compliance</span>
            </button>
          </div>

          {/* Content Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-8 space-y-8 text-sm leading-relaxed text-black/80 font-normal">
            {activeTab === 'terms' && (
              <div className="space-y-6 max-w-4xl">
                <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-2xl flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#d97706] shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-950 leading-relaxed font-sans">
                    <strong>Core SRE Guarantee:</strong> Amber strictly does not allow generative AI models to execute unvetted, arbitrary bash scripts or mutating database operations in customer production environments. All mutating actions strictly require cryptographic human-in-the-loop approval or deterministic compile-time allowlists.
                  </div>
                </div>

                <section>
                  <h4 className="text-lg font-bold text-black mb-2">1. Agreement Overview & Scope of Service</h4>
                  <p>
                    This Master Terms of Service ("Agreement") governs the licensing, deployment, and operational execution of <strong>Amber</strong> ("Service", "Software", or "Engine"), developed and operated by <strong>Amber Technologies Inc.</strong> ("Amber", "Company", "We"). 
                  </p>
                  <p className="mt-2">
                    By provisioning an Amber instance, deploying the Amber VPC agent, executing a Software Order Form, or submitting webhook alerts to Amber API gateways, the customer organization ("Customer", "Subscriber", "You") agrees to these terms in full.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-bold text-black mb-2">2. Subscription Tiers & Enforced Operational Boundaries</h4>
                  <p>
                    Amber enforces explicit resource allocations based on the active subscription tier to prevent runaway infrastructure workloads and maintain sub-second response times:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                    <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
                      <div className="font-bold text-xs uppercase text-[#d97706] mb-1">Level 1: Observe</div>
                      <div className="text-base font-extrabold text-black mb-2">$799 / mo</div>
                      <ul className="text-xs space-y-1 text-black/70 list-disc list-inside">
                        <li>Up to 15 microservices</li>
                        <li>Up to 50 cluster nodes</li>
                        <li>Alert storm deduplication</li>
                        <li>Read-only IAM diagnostics</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl">
                      <div className="font-bold text-xs uppercase text-[#d97706] mb-1">Level 2: Autonomous</div>
                      <div className="text-base font-extrabold text-black mb-2">$1,799 / mo</div>
                      <ul className="text-xs space-y-1 text-black/70 list-disc list-inside">
                        <li>Up to 35 microservices</li>
                        <li>Up to 200 cluster nodes</li>
                        <li>100 verified remediations / mo</li>
                        <li>Human-in-the-loop approvals</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
                      <div className="font-bold text-xs uppercase text-[#d97706] mb-1">Level 3: Response</div>
                      <div className="text-base font-extrabold text-black mb-2">$2,799 / mo</div>
                      <ul className="text-xs space-y-1 text-black/70 list-disc list-inside">
                        <li>Custom / unlimited services</li>
                        <li>Dedicated single-tenant VPC</li>
                        <li>500 verified remediations / mo</li>
                        <li>15-min incident escalation</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="text-lg font-bold text-black mb-2">3. Zero-Hallucination Guardrail & Dual-Plane Architecture</h4>
                  <p>
                    Amber explicitly isolates AI probabilistic reasoning from physical cluster execution. Every tool invocation adheres to the following rules:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-2 pl-2">
                    <li><strong>Static Risk Registry:</strong> Risk categories (<code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-xs">LOW</code> vs <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-xs">HIGH</code>) are defined immutably in source code. LLMs cannot downgrade or bypass these categories.</li>
                    <li><strong>Cryptographic HITL Approvals:</strong> Any state-mutating action generates a single-use SHA-256 HMAC approval token valid for exactly 10 minutes. Execution is blocked until an authenticated SRE or engineer approves it in Slack or the web UI.</li>
                    <li><strong>Mandatory Health Convergence:</strong> Following any remediation, Amber runs active health checks for 45 seconds. If error rates fail to converge to zero, Amber automatically triggers a rollback to the previous known stable state.</li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-lg font-bold text-black mb-2">4. Emergency Kill-Switch & Customer Sovereignty</h4>
                  <p>
                    Customer engineering leadership maintains unilateral, immediate control over all remediation workflows:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-2 pl-2">
                    <li><strong>Global API Kill-Switch:</strong> Calling <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-xs">POST /api/v1/settings/kill-switch</code> instantaneously downgrades all Amber workers to read-only observation mode in ≤ 250 milliseconds.</li>
                    <li><strong>Instant IAM Revocation:</strong> Customers connect Amber via standard Kubernetes ServiceAccounts or Cloud IAM roles. Customers may revoke these IAM roles at any time in their AWS/GCP/Azure console to immediately terminate cluster access.</li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-lg font-bold text-black mb-2">5. Service Level Agreement & Operational Warranties</h4>
                  <p>
                    Amber warrants 99.9% uptime for cloud-hosted API gateways. For self-hosted and air-gapped VPC clusters, uptime is determined by customer infrastructure availability. Amber is designed to assist on-call engineers and reduce mean time to resolution (MTTR); ultimate operational ownership of customer applications remains with customer engineering teams.
                  </p>
                </section>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6 max-w-4xl">
                <div className="p-4 bg-emerald-50 border border-emerald-200/80 rounded-2xl flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-950 leading-relaxed font-sans">
                    <strong>Zero-Knowledge Telemetry Thesis:</strong> Customer application data, database records, and proprietary logs are <strong>never</strong> used to train, evaluate, or fine-tune public or third-party AI models.
                  </div>
                </div>

                <section>
                  <h4 className="text-lg font-bold text-black mb-2">1. Ingestion Boundary & Secret Redaction</h4>
                  <p>
                    Amber processes only operational telemetry required to diagnose infrastructure health. All payload scrubbing occurs in-memory at the ingestion edge before serialization or storage:
                  </p>
                  <div className="mt-3 border border-stone-200 rounded-xl overflow-hidden font-mono text-xs">
                    <div className="grid grid-cols-2 bg-stone-100 p-3 font-bold border-b border-stone-200">
                      <div>Processed & Retained</div>
                      <div>Permanently Dropped / Redacted</div>
                    </div>
                    <div className="grid grid-cols-2 p-3 gap-2">
                      <ul className="space-y-1 text-stone-700">
                        <li>• Alert metadata & firing rules</li>
                        <li>• Service names & cluster node metrics</li>
                        <li>• Sanitized error exception types</li>
                        <li>• Audit trail timestamps & approver IDs</li>
                      </ul>
                      <ul className="space-y-1 text-stone-700">
                        <li>• Raw database row values & records</li>
                        <li>• API keys, tokens & credentials</li>
                        <li>• Customer PII (credit cards, SSNs, emails)</li>
                        <li>• Private TLS certificates & private keys</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="text-lg font-bold text-black mb-2">2. Air-Gapped Operation & Zero Cloud Telemetry</h4>
                  <p>
                    When configured in air-gapped mode (<code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-xs">AIR_GAPPED=true</code>), Amber makes zero outbound network calls. All LLM inference is directed to local GPU nodes (Ollama, vLLM, or Kubernetes pods).
                  </p>
                  <p className="mt-2">
                    In hybrid or cloud-assisted mode, model calls use direct secure TLS tunnels with strict <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-xs">x-goog-api-key</code> or Bearer headers. Telemetry is not retained by LLM providers for model training under enterprise agreements.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-bold text-black mb-2">3. Data Retention & Cryptographic Audit Logs</h4>
                  <p>
                    Incident records and diagnostic snapshots are retained for 30 days by default (configurable up to 365 days for enterprise compliance). All incident audit records include cryptographically verifiable SHA-256 tokens detailing who approved what action, when, and the exact cluster health response.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-bold text-black mb-2">4. Regulatory Compliance Alignment</h4>
                  <p>
                    Amber's architecture is aligned with SOC 2 Type II, ISO/IEC 27001, HIPAA Security Rules, and GDPR Article 25 (Data Protection by Design and by Default).
                  </p>
                </section>
              </div>
            )}

            {activeTab === 'copyright' && (
              <div className="space-y-6 max-w-4xl">
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex items-start gap-3">
                  <Copyright className="w-5 h-5 text-black shrink-0 mt-0.5" />
                  <div className="text-xs text-black/80 leading-relaxed font-sans">
                    <strong>© 2026 Amber Technologies Inc. All rights reserved.</strong> The Amber logo, Amber SRE, and associated trademarks are proprietary assets of Amber Technologies Inc.
                  </div>
                </div>

                <section>
                  <h4 className="text-lg font-bold text-black mb-2">1. Proprietary Software & Licensing Notice</h4>
                  <p>
                    The Amber SRE Engine, including its autonomous triage graph, deterministic guardrail validator, Slack Connect bridge, and cluster remediation drivers, contains proprietary software licensed under the Amber Commercial Software License.
                  </p>
                  <p className="mt-2">
                    Unauthorized reverse engineering, disassembly, decompilation, or unauthorized commercial redistribution of compiled Amber binaries and container images is strictly prohibited.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-bold text-black mb-2">2. Open Source Component Attribution</h4>
                  <p>
                    Amber incorporates and interfaces with open-source software libraries, including FastAPI, SQLAlchemy, Redis, PostgreSQL, Pydantic, and official Kubernetes client libraries. Each third-party open-source component remains subject to its respective MIT, Apache 2.0, or BSD license terms.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-bold text-black mb-2">3. Trademarks & Brand Guidelines</h4>
                  <p>
                    "Amber", "Amber SRE", and the Amber logo are trademarks of Amber Technologies Inc. Kubernetes is a registered trademark of The Linux Foundation. Datadog, Prometheus, PagerDuty, AWS, and GCP are trademarks of their respective owners and are referenced solely for technical interoperability descriptions.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-bold text-black mb-2">4. Legal & Compliance Inquiries</h4>
                  <p>
                    For enterprise licensing agreements, Master Service Agreements (MSAs), security questionnaires, or DMCA inquiries, please contact our legal counsel directly:
                  </p>
                  <div className="mt-3 p-4 bg-stone-50 border border-stone-200 rounded-xl font-mono text-xs">
                    <div><strong>Legal Operations:</strong> legal@ambersre.xyz / amber.incident@gmail.com</div>
                    <div><strong>Security Officer:</strong> security@ambersre.xyz</div>
                    <div><strong>Registered Entity:</strong> Amber Technologies Inc. (Global Remote Operations)</div>
                  </div>
                </section>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-6 sm:px-8 py-4 border-t border-black/10 bg-stone-50/90 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs font-mono text-black/60">
            <div>
              <span>Documentation version 1.2.0 · Verified Enterprise Compliance</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/docs/terms-of-service.md"
                target="_blank"
                rel="noreferrer"
                className="text-[#d97706] hover:underline flex items-center gap-1 font-bold"
              >
                <span>Raw Terms Markdown</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-stone-300">|</span>
              <a
                href="/docs/privacy-policy.md"
                target="_blank"
                rel="noreferrer"
                className="text-[#d97706] hover:underline flex items-center gap-1 font-bold"
              >
                <span>Raw Privacy Markdown</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-full bg-black text-white font-bold hover:bg-stone-800 transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
