import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  FileText, 
  Users, 
  Copyright, 
  CheckCircle2, 
  Copy, 
  Check, 
  FileCheck
} from 'lucide-react';

export type LegalDocType = 'terms' | 'privacy' | 'dpa' | 'subprocessors' | 'security' | 'copyright';

interface LegalViewProps {
  initialDoc?: LegalDocType;
  onBack: () => void;
  onNavigateToContact: () => void;
}

interface NavItem {
  id: LegalDocType;
  label: string;
  badge: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'privacy', label: 'Privacy Policy', badge: 'GDPR / CCPA', icon: Lock },
  { id: 'terms', label: 'Terms of Service', badge: 'Commercial MSA', icon: FileText },
  { id: 'dpa', label: 'Data Processing Agreement', badge: 'DPA / SCCs', icon: FileCheck },
  { id: 'subprocessors', label: 'Subprocessor Directory', badge: 'Live List', icon: Users },
  { id: 'security', label: 'Security Architecture', badge: 'SOC 2 Aligned', icon: ShieldCheck },
  { id: 'copyright', label: 'Copyright & IP Notice', badge: 'Legal Notice', icon: Copyright },
];

export const LegalView: React.FC<LegalViewProps> = ({ 
  initialDoc = 'privacy', 
  onBack, 
  onNavigateToContact 
}) => {
  const [activeDoc, setActiveDoc] = useState<LegalDocType>(initialDoc);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setActiveDoc(initialDoc);
  }, [initialDoc]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (window.location.pathname !== `/${activeDoc}`) {
      window.history.replaceState(null, '', `/${activeDoc}`);
    }
  }, [activeDoc]);

  const copyDocLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${activeDoc}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
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
              <span className="text-black font-semibold">Legal, Privacy & Compliance</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={copyDocLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/10 hover:border-black/30 text-xs font-sans font-semibold text-stone-700 hover:text-black transition cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied' : 'Share Link'}</span>
            </button>
            <button
              type="button"
              onClick={onNavigateToContact}
              className="px-4 py-1.5 rounded-lg bg-black hover:bg-[#d97706] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Contact Legal
            </button>
          </div>
        </div>
      </header>

      {/* Main 2-Column Documentation Layout */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Sidebar Navigation */}
        <aside className="lg:col-span-3">
          <div className="sticky top-24 space-y-6">
            <div className="p-4 bg-stone-50 border border-stone-200/80 rounded-2xl">
              <div className="text-[11px] font-sans uppercase tracking-widest text-[#d97706] font-bold mb-1">
                Governance Portal
              </div>
              <h2 className="text-sm font-bold text-[#0c0a09]">Enterprise Compliance</h2>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Legally binding policies, data handling specifications, and security frameworks.
              </p>
            </div>

            <nav className="space-y-1 font-sans">
              {NAV_ITEMS.map((item) => {
                const isActive = activeDoc === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveDoc(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-black text-white shadow-sm'
                        : 'text-stone-700 hover:bg-stone-100 hover:text-black'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#facc15]' : 'text-stone-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-stone-100 text-stone-600'
                    }`}>
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-6 border-t border-stone-200 text-xs font-sans text-stone-500 space-y-2">
              <div>Version: <strong>2026.2.0</strong></div>
              <div>Effective: <strong>Oct 1, 2026</strong></div>
              <div>Entity: <strong>Amber Technologies Inc.</strong></div>
              <div className="pt-2">
                <a 
                  href="mailto:legal@ambersre.xyz" 
                  className="text-[#d97706] hover:underline flex items-center gap-1 font-bold"
                >
                  <span>legal@ambersre.xyz</span>
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="lg:col-span-9 bg-white border border-stone-200/90 rounded-3xl p-8 sm:p-12 shadow-sm font-sans">
          
          {/* ========================================================================= */}
          {/* 1. PRIVACY POLICY */}
          {/* ========================================================================= */}
          {activeDoc === 'privacy' && (
            <article className="space-y-8 max-w-4xl text-stone-800 leading-relaxed text-sm">
              <header className="border-b border-stone-200 pb-8">
                <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight mb-3">
                  Amber Privacy Policy
                </h1>
                <p className="text-stone-600 text-base leading-relaxed">
                  This Privacy Policy specifies how Amber Technologies Inc. ("Amber", "we", "us") collects, processes, protects, and handles personal data and customer production telemetry.
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-stone-500">
                  <span>Last Updated: October 1, 2026</span>
                  <span>•</span>
                  <span>Jurisdictions: US, EU, UK, and Global</span>
                  <span>•</span>
                  <span>Applies to: Cloud Gateways & VPC Agents</span>
                </div>
              </header>

              {/* Section 1: Information We Collect */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black flex items-center gap-2">
                  <span>1. Information We Collect</span>
                </h2>
                <p>
                  We collect information directly from you when you register an account, configure integrations, request technical support, or interact with our web consoles:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-stone-700">
                  <li><strong>Account & Contact Information:</strong> Name, professional work email address, company or organization name, role or title.</li>
                  <li><strong>Billing & Invoicing Information:</strong> Billing contacts, billing addresses, VAT/tax IDs, and payment card tokens processed via certified PCI-DSS Level 1 compliant processors. Amber never stores raw credit card numbers.</li>
                  <li><strong>Device & Network Information:</strong> IP addresses, browser user-agents, operating system details, time zones, and referral paths captured in HTTP access logs.</li>
                  <li><strong>Product Usage Telemetry:</strong> Logins, console page interactions, webhook volume statistics, audit logs of remediation approvals, and performance indicators.</li>
                  <li><strong>Support & Correspondence:</strong> Communications submitted via our contact forms, email, Slack Connect, or Telegram developer bridges.</li>
                </ul>
              </section>

              {/* Section 2: Customer Production Data */}
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-black flex items-center gap-2">
                  <span>2. Customer Production Data & Ingestion Boundaries</span>
                </h2>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 leading-relaxed font-sans">
                  <strong>Architectural Separation:</strong> Amber operates on an explicit boundary between <em>Customer Telemetry</em> (which is processed ephemerally within runtime memory) and <em>Outbound Operational Metadata</em> (which is retained for incident audit trails).
                </div>
                <div className="border border-stone-200 rounded-xl overflow-hidden text-xs font-mono">
                  <div className="grid grid-cols-1 sm:grid-cols-2 bg-stone-100 p-3 font-bold border-b border-stone-200">
                    <div>Customer Telemetry (Processed)</div>
                    <div>Outbound Operational Metadata (Retained)</div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 p-3 gap-3">
                    <ul className="space-y-1 text-stone-700 list-disc list-inside">
                      <li>Prometheus metrics & Datadog alerts</li>
                      <li>Pod logs & container error stack traces</li>
                      <li>Service dependency topologies</li>
                      <li>Database connection pool metrics</li>
                      <li>Kubernetes events (OOMKilled, CrashLoop)</li>
                    </ul>
                    <ul className="space-y-1 text-stone-700 list-disc list-inside">
                      <li>Deterministic alert fingerprints (SHA-256)</li>
                      <li>Incident severity classifications (P0–P4)</li>
                      <li>Cryptographic approval tokens & approver IDs</li>
                      <li>Remediation duration & health status metrics</li>
                      <li>Post-mortem markdown summaries</li>
                    </ul>
                  </div>
                </div>
                <p>
                  <strong>In-Memory Secret Scrubbing:</strong> Prior to any serialization or model analysis, Amber runs incoming text through a deterministic regular-expression redaction pipeline. API keys, database connection strings, authorization bearer tokens, passwords, private certificates, credit cards, and social security numbers are permanently replaced with sanitized tokens (e.g., <code className="bg-stone-100 px-1 py-0.5 rounded font-mono">[REDACTED_API_KEY]</code>).
                </p>
              </section>

              {/* Section 3: AI Processing */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black">3. AI Model Processing & Zero-Training Guarantee</h2>
                <p>
                  Amber utilizes Large Language Models for automated incident triage, root cause hypothesis generation, and runbook matching. We enforce strict contractual and architectural protections:
                </p>
                <div className="space-y-2 pl-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Zero Model Training:</strong> Customer telemetry, error logs, incident records, and internal runbooks are <strong>never</strong> used to train, retrain, calibrate, or fine-tune public or proprietary foundation models (OpenAI, Anthropic, Google, or others).
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Ephemeral Inference:</strong> Data transmitted to authorized model providers is processed ephemerally with zero data retention for model improvements.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Self-Hosted & Air-Gapped Mode:</strong> Organizations with strict regulatory constraints may run Amber with <code className="bg-stone-100 px-1 py-0.5 rounded font-mono">AIR_GAPPED=true</code>. In this mode, all cloud AI gateways are physically severed in code, routing 100% of inference to local GPU clusters (Ollama, vLLM, DeepSeek, or Llama).
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4: Security Architecture */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black">4. Security Controls & Standards</h2>
                <p>
                  Amber is engineered with defense-in-depth security principles. We state our controls factually without unverified compliance claims:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-stone-700">
                  <li><strong>Encryption in Transit:</strong> All communication between customer clusters, agent gateways, and consoles is encrypted using TLS 1.3 with modern cipher suites.</li>
                  <li><strong>Encryption at Rest:</strong> Customer configurations, audit logs, and persistent data are encrypted using industry-standard AES-256 encryption.</li>
                  <li><strong>Access Controls & RBAC:</strong> Role-Based Access Control restricts functionality according to assigned permissions (<code className="bg-stone-100 px-1 py-0.5 rounded font-mono">VIEWER</code>, <code className="bg-stone-100 px-1 py-0.5 rounded font-mono">SRE</code>, <code className="bg-stone-100 px-1 py-0.5 rounded font-mono">ADMIN</code>).</li>
                  <li><strong>Cryptographic Boundaries:</strong> All state-mutating remediation actions require a signed HMAC-SHA256 token with a strict 10-minute time-to-live (TTL).</li>
                  <li><strong>SOC 2 Alignment:</strong> Amber is designed with SOC 2-aligned security controls, including automated logging, secret rotation, and strict change-management procedures.</li>
                </ul>
              </section>

              {/* Section 5: Data Retention */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black">5. Data Retention & Deletion Lifecycle</h2>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-stone-700">
                  <li><strong>Active Accounts:</strong> Historical incident metadata, timelines, and audit logs are retained for 30 days by default (or up to 365 days for Enterprise tier subscribers).</li>
                  <li><strong>Resolved Incidents:</strong> Ephemeral diagnostic buffers and raw stack trace caches are purged within 24 hours of incident resolution.</li>
                  <li><strong>Customer Deletion Requests:</strong> Customers may initiate a deletion of specific incident records or integration credentials at any time via the API.</li>
                  <li><strong>Account Termination:</strong> Upon termination of service, all customer production data is purged from primary datastores within 30 days and from encrypted rolling backup snapshots within 90 days.</li>
                </ul>
              </section>

              {/* Section 6: Third-Party Services */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black">6. Third-Party Service Providers</h2>
                <p>
                  We engage trusted third-party subprocessors for hosting, caching, transactional delivery, and optional AI model execution. A complete and synchronized inventory is maintained in our public <button type="button" onClick={() => setActiveDoc('subprocessors')} className="text-[#d97706] font-bold underline cursor-pointer">Subprocessor Directory</button>.
                </p>
              </section>

              {/* Section 7: Customer Rights */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black">7. Global Customer Rights (GDPR, UK GDPR, CCPA/CPRA)</h2>
                <p>
                  Depending on your jurisdiction, you possess specific statutory rights regarding personal data:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-stone-700">
                  <li><strong>Right to Access & Portability:</strong> You may request a copy of the personal data we hold about you in a structured, machine-readable format.</li>
                  <li><strong>Right to Rectification:</strong> You may request correction of inaccurate or incomplete personal records.</li>
                  <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> You may request the deletion of your personal account information, subject to legal compliance obligations.</li>
                  <li><strong>Right to Object or Restrict Processing:</strong> You may object to the processing of your data or request restriction under applicable privacy statutes.</li>
                </ul>
                <p className="pt-2">
                  To exercise any of these rights, contact our Data Protection Officer at <a href="mailto:privacy@ambersre.xyz" className="text-[#d97706] font-bold underline">privacy@ambersre.xyz</a>.
                </p>
              </section>
            </article>
          )}

          {/* ========================================================================= */}
          {/* 2. TERMS OF SERVICE */}
          {/* ========================================================================= */}
          {activeDoc === 'terms' && (
            <article className="space-y-8 max-w-4xl text-stone-800 leading-relaxed text-sm">
              <header className="border-b border-stone-200 pb-8">
                <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight mb-3">
                  Amber Terms of Service
                </h1>
                <p className="text-stone-600 text-base leading-relaxed">
                  These Terms of Service govern the subscription, deployment, and operational execution of the Amber SRE Engine and related software services provided by Amber Technologies Inc.
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-stone-500">
                  <span>Version: 2.1.0</span>
                  <span>•</span>
                  <span>Effective Date: October 1, 2026</span>
                  <span>•</span>
                  <span>Commercial & Enterprise Tier Agreement</span>
                </div>
              </header>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black">1. Provision of Service & Deployment Modes</h2>
                <p>
                  Amber provides autonomous incident triage, root-cause diagnosis, and verified remediation capabilities. The software may be deployed in two modes:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-stone-700">
                  <li><strong>Cloud-Connected Mode:</strong> The Amber VPC agent runs inside your cluster and communicates with Amber's multi-tenant or single-tenant cloud management plane.</li>
                  <li><strong>Air-Gapped / Sovereign VPC Mode:</strong> Amber is deployed entirely as self-contained containers inside the Customer's private cloud network with zero outbound internet dependencies.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black">2. Dual-Plane Safety Architecture & Sovereign Human Approval</h2>
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
                  <div className="font-bold text-black">Core Safety Covenant:</div>
                  <p className="text-stone-700 text-xs leading-relaxed">
                    Probabilistic AI models <strong>propose</strong> actions. Deterministic code allowlists and authenticated human engineers <strong>authorize and decide</strong>. Amber explicitly prohibits open-ended terminal shell execution.
                  </p>
                </div>
                <p>
                  All state-mutating actions (e.g. deployment rollbacks, pod restarts, worker scaling) are intercepted by the Guardrail Validator. Mutating actions require explicit confirmation via a cryptographically bound SHA-256 HMAC approval token with a 10-minute expiration window.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black">3. CTO Emergency Kill-Switch & Hard IAM Revocation</h2>
                <p>
                  Customer maintains sovereign control over their infrastructure at all times:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-stone-700">
                  <li><strong>Global API Kill-Switch:</strong> Calling <code className="bg-stone-100 px-1 py-0.5 rounded font-mono">POST /api/v1/settings/kill-switch</code> immediately downgrades all Amber workers to read-only observation mode across all threads in &le; 250 milliseconds.</li>
                  <li><strong>IAM Revocation:</strong> Because Amber operates using standard cloud IAM roles or Kubernetes ServiceAccounts, Customer SREs may revoke Amber's credentials in their cloud console at any second, instantly terminating access without Amber's intervention.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black">4. Subscription Tiers & Operational Capacity</h2>
                <p>
                  Amber licenses enforce explicit capacity parameters based on monitored active microservices and cluster nodes. Limits are calculated against actively monitored services in a rolling 30-day window, ensuring historical resolved incidents never lock your license.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black">5. Warranties & Limitation of Liability</h2>
                <p>
                  Amber warrants that its software operates substantially in accordance with official technical documentation. Because production outages often stem from proprietary application logic, underlying hardware failures, or third-party cloud outages, Amber is an incident mitigation platform, not an insurer against software bugs. Except for gross negligence or intentional misconduct, Amber's total liability is limited to fees paid during the preceding twelve (12) months.
                </p>
              </section>
            </article>
          )}

          {/* ========================================================================= */}
          {/* 3. DATA PROCESSING AGREEMENT (DPA) */}
          {/* ========================================================================= */}
          {activeDoc === 'dpa' && (
            <article className="space-y-8 max-w-4xl text-stone-800 leading-relaxed text-sm">
              <header className="border-b border-stone-200 pb-8">
                <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight mb-3">
                  Data Processing Agreement (DPA)
                </h1>
                <p className="text-stone-600 text-base leading-relaxed">
                  This Data Processing Agreement ("DPA") supplements the Amber Master Terms of Service when Customer Telemetry or Personal Data is processed on behalf of Customer organizations subject to GDPR, UK GDPR, or CCPA.
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-stone-500">
                  <span>Standard Contractual Clauses (SCCs) Included</span>
                  <span>•</span>
                  <span>Processor-to-Controller Terms</span>
                </div>
              </header>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black">1. Roles and Scope of Processing</h2>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-stone-700">
                  <li><strong>Customer is the Data Controller:</strong> Customer determines the categories of data transmitted via webhooks, log forwarders, and monitoring agents.</li>
                  <li><strong>Amber is the Data Processor:</strong> Amber processes customer telemetry solely pursuant to Customer's documented instructions, the MSA, and this DPA.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black">2. Security Incident Notification (48-Hour SLA)</h2>
                <p>
                  In the event of a confirmed Security Incident involving unauthorized access, disclosure, or alteration of Customer Personal Data or production telemetry:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-stone-700">
                  <li>Amber shall notify Customer in writing without undue delay and in any event within <strong>forty-eight (48) hours</strong> of confirmation.</li>
                  <li>Amber shall provide detailed forensic telemetry regarding the nature of the breach, affected resources, and mitigation steps taken.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black">3. Subprocessor Governance & Advance Notice</h2>
                <p>
                  Amber maintains an active directory of third-party subprocessors. Amber covenants to:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-stone-700">
                  <li>Impose data protection obligations upon each subprocessor no less restrictive than those set forth in this DPA.</li>
                  <li>Provide at least thirty (30) days advance notice to Customer before onboarding any new subprocessor with access to customer telemetry.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black">4. Audit Rights & Compliance Attestation</h2>
                <p>
                  Amber shall make available to Customer upon reasonable written request all information necessary to demonstrate compliance with this DPA. Customer may conduct an annual review or submit standard enterprise security questionnaires (CAIQ / SIG).
                </p>
              </section>

              <div className="p-6 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-black">Need a countersigned copy for your compliance team?</div>
                  <div className="text-xs text-stone-500 mt-0.5">We execute standard DPAs and SCC addendums with all enterprise customers.</div>
                </div>
                <a
                  href="mailto:legal@ambersre.xyz?subject=Counter-signed%20DPA%20Request"
                  className="px-4 py-2 bg-black hover:bg-[#d97706] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition"
                >
                  Request Countersigned DPA
                </a>
              </div>
            </article>
          )}

          {/* ========================================================================= */}
          {/* 4. SUBPROCESSORS */}
          {/* ========================================================================= */}
          {activeDoc === 'subprocessors' && (
            <article className="space-y-8 max-w-4xl text-stone-800 leading-relaxed text-sm">
              <header className="border-b border-stone-200 pb-8">
                <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight mb-3">
                  Amber Subprocessor Directory
                </h1>
                <p className="text-stone-600 text-base leading-relaxed">
                  To provide our autonomous SRE platform, Amber engages trusted third-party service providers. All subprocessors are vetted under strict security and data protection standards.
                </p>
              </header>

              <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-stone-100 font-mono text-stone-700 uppercase border-b border-stone-200">
                    <tr>
                      <th className="p-4">Subprocessor</th>
                      <th className="p-4">Entity & Location</th>
                      <th className="p-4">Purpose / Activity</th>
                      <th className="p-4">Data Transferred</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 font-normal text-stone-800">
                    <tr>
                      <td className="p-4 font-bold text-black">Amazon Web Services (AWS)</td>
                      <td className="p-4 font-mono text-stone-500">United States / EU (Configurable)</td>
                      <td className="p-4">Cloud compute infrastructure, VPC clusters, encrypted storage</td>
                      <td className="p-4">Application telemetry, encrypted database records</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-black">Google Cloud Platform (GCP)</td>
                      <td className="p-4 font-mono text-stone-500">United States / Global</td>
                      <td className="p-4">Managed Kubernetes clusters, monitoring telemetry gateways</td>
                      <td className="p-4">Encrypted operational snapshots, audit logs</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-black">Cloudflare, Inc.</td>
                      <td className="p-4 font-mono text-stone-500">United States / Global Edge</td>
                      <td className="p-4">Edge DNS, DDoS mitigation, contact intake edge workers</td>
                      <td className="p-4">IP address, request headers, contact submissions</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-black">Anthropic, PBC</td>
                      <td className="p-4 font-mono text-stone-500">United States</td>
                      <td className="p-4">Claude LLM inference (disabled if air-gapped)</td>
                      <td className="p-4">Sanitized incident logs & triage context (Zero training)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-black">OpenAI, LLC</td>
                      <td className="p-4 font-mono text-stone-500">United States</td>
                      <td className="p-4">GPT-4o LLM inference (disabled if air-gapped)</td>
                      <td className="p-4">Sanitized incident logs & triage context (Zero training)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-black">Resend / Postmark</td>
                      <td className="p-4 font-mono text-stone-500">United States</td>
                      <td className="p-4">Transactional alert notifications & incident reports</td>
                      <td className="p-4">Recipient engineer email, incident summaries</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          )}

          {/* ========================================================================= */}
          {/* 5. SECURITY ARCHITECTURE */}
          {/* ========================================================================= */}
          {activeDoc === 'security' && (
            <article className="space-y-8 max-w-4xl text-stone-800 leading-relaxed text-sm">
              <header className="border-b border-stone-200 pb-8">
                <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight mb-3">
                  Security Architecture & Threat Controls
                </h1>
                <p className="text-stone-600 text-base leading-relaxed">
                  How Amber isolates execution planes, cryptographically binds remediation actions, redacts secrets in memory, and guarantees zero unvetted cluster access.
                </p>
              </header>

              <section className="space-y-4">
                <h2 className="text-xl font-bold text-black">1. The Dual-Plane Execution Boundary</h2>
                <p>
                  Most AI tools connect models directly to production terminals. Amber rejects this pattern. We isolate the system into two distinct planes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 bg-stone-50 border border-stone-200 rounded-xl">
                    <div className="font-mono text-xs text-[#d97706] font-bold uppercase mb-1">Plane 1: Reasoning Plane</div>
                    <div className="font-bold text-black text-sm mb-2">Probabilistic Hypothesis</div>
                    <p className="text-xs text-stone-600">
                      Evaluates metrics, stack traces, and runbooks. Proposes candidate diagnoses and selects from an immutable catalog of static tools. Has zero direct network access to production pods.
                    </p>
                  </div>
                  <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-xl">
                    <div className="font-mono text-xs text-[#d97706] font-bold uppercase mb-1">Plane 2: Execution Plane</div>
                    <div className="font-bold text-black text-sm mb-2">Deterministic Guardrail Engine</div>
                    <p className="text-xs text-amber-950">
                      Validates tool parameters against live cluster telemetry. Enforces static risk classifications. Demands cryptographic HMAC tokens for mutating calls. Executes scoped remediation.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black">2. HMAC-SHA256 Token Binding Protocol</h2>
                <p>
                  When a remediation action requires approval (such as a deployment rollback or pod restart):
                </p>
                <div className="p-4 bg-stone-900 text-stone-200 rounded-xl font-mono text-xs space-y-1">
                  <div>1. Token = HMAC_SHA256(SecretKey, ActionName + ArgsHash + ExpiryTimestamp)</div>
                  <div>2. Delivery: Instant interactive card dispatched to team Slack Connect channel.</div>
                  <div>3. Verification: Guardrail engine validates signature + checks TTL &le; 10 minutes.</div>
                  <div>4. Single-Use: Token is immediately consumed in Redis to prevent replay attacks.</div>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black">3. Anti-Loop Circuit Breakers & Auto-Rollback</h2>
                <p>
                  Automated fixes must not cause secondary outages. Amber enforces:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-stone-700">
                  <li><strong>45-Second Convergence Check:</strong> Probes HTTP 200 OK and error rates immediately following remediation.</li>
                  <li><strong>Instant Auto-Rollback:</strong> If health metrics do not recover, Amber automatically reverts the state mutation.</li>
                  <li><strong>Anti-Loop Policy:</strong> If a service was rolled back in the preceding 30 minutes, repeated automated rollbacks are physically blocked and escalated to human on-call.</li>
                </ul>
              </section>
            </article>
          )}

          {/* ========================================================================= */}
          {/* 6. COPYRIGHT & INTELLECTUAL PROPERTY */}
          {/* ========================================================================= */}
          {activeDoc === 'copyright' && (
            <article className="space-y-8 max-w-4xl text-stone-800 leading-relaxed text-sm">
              <header className="border-b border-stone-200 pb-8">
                <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight mb-3">
                  Copyright & Intellectual Property Notice
                </h1>
                <p className="text-stone-600 text-base leading-relaxed">
                  Formal legal attribution of software rights, trademark policies, customer data sovereignty, and open-source attributions.
                </p>
                <div className="mt-4 text-xs font-mono text-stone-500">
                  <span>© 2026 Amber SRE Technologies Inc. All rights reserved.</span>
                </div>
              </header>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black">1. Ownership of Amber Intellectual Property</h2>
                <p>
                  The Amber SRE Engine, including all proprietary source code, autonomous LangGraph orchestration graphs, triage decision trees, heuristic scoring models, user interfaces, branding, visual designs, and technical documentation, are the exclusive intellectual property of <strong>Amber Technologies Inc.</strong>
                </p>
                <p>
                  All rights not expressly granted to subscribers under their active commercial order form or license key are reserved by Amber Technologies Inc.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black">2. Sovereign Customer Data Ownership</h2>
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 text-xs text-emerald-950 font-sans">
                  <div className="font-bold text-black text-sm">Clear Customer Ownership Boundary:</div>
                  <p>
                    Customers retain 100% unilateral ownership of their customer production data, telemetry, application source code, error logs, Kubernetes manifests, and internal runbooks. Amber claims zero ownership or copyright over any customer data processed by the platform.
                  </p>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black">3. Trademarks & Brand Identifiers</h2>
                <p>
                  "Amber", "Amber SRE", and the Amber amber-crystal emblem are trademarks and service marks of Amber Technologies Inc. You may not use these marks in connection with any third-party product or service in any manner likely to cause confusion among customers.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black">4. Open Source Software Attribution</h2>
                <p>
                  Amber incorporates or interfaces with select open-source libraries, including:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-stone-700 font-mono text-xs">
                  <li>FastAPI, Pydantic, Starlette (MIT License)</li>
                  <li>PostgreSQL and TimescaleDB (PostgreSQL & Apache 2.0 Licenses)</li>
                  <li>Redis Client & In-Memory Store (BSD 3-Clause)</li>
                  <li>Kubernetes Official Client Libraries (Apache 2.0 License)</li>
                </ul>
                <p className="text-xs text-stone-500 pt-1">
                  Copyrights in open-source components remain with their respective copyright holders.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black">5. Use Restrictions</h2>
                <p>
                  Except as explicitly authorized in writing by Amber Technologies Inc., you shall not:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-stone-700">
                  <li>Decompile, reverse engineer, disassemble, or derive source code from Amber binaries or compiled images.</li>
                  <li>Scrape, copy, or redistribute Amber documentation, visual UI assets, or benchmark artifacts.</li>
                  <li>Present Amber's proprietary materials, logos, or remediation logic as your own.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-black">6. Copyright Infringement & DMCA Notices</h2>
                <p>
                  If you believe that any material on Amber services infringes upon your copyright, please dispatch a formal notice to our designated Copyright Agent:
                </p>
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl font-mono text-xs space-y-1">
                  <div><strong>Designated Agent:</strong> Amber Legal Operations</div>
                  <div><strong>Email:</strong> legal@ambersre.xyz / privacy@ambersre.xyz</div>
                  <div><strong>Entity:</strong> Amber Technologies Inc.</div>
                </div>
              </section>
            </article>
          )}

        </main>
      </div>

      {/* Clean Footer Bar */}
      <footer className="border-t border-stone-200 mt-20 py-8 bg-stone-50 text-xs font-sans text-stone-500 text-center font-medium">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 Amber SRE. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveDoc('privacy')} className="hover:text-black transition cursor-pointer">Privacy</button>
            <span>·</span>
            <button onClick={() => setActiveDoc('terms')} className="hover:text-black transition cursor-pointer">Terms</button>
            <span>·</span>
            <button onClick={() => setActiveDoc('security')} className="hover:text-black transition cursor-pointer">Security</button>
            <span>·</span>
            <button onClick={() => setActiveDoc('dpa')} className="hover:text-black transition cursor-pointer">DPA</button>
            <span>·</span>
            <button onClick={() => setActiveDoc('subprocessors')} className="hover:text-black transition cursor-pointer">Subprocessors</button>
            <span>·</span>
            <button onClick={() => setActiveDoc('copyright')} className="hover:text-black transition cursor-pointer">Copyright</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
