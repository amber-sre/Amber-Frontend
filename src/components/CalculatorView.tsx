import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  X,
  CheckCircle2,
  Lock,
  Send,
  Loader2,
  Server,
  Layers,
  Cpu,
  Mail,
  Phone,
  User,
  MessageSquare
} from 'lucide-react';

interface CalculatorViewProps {
  onBack: () => void;
  onNavigateToContact: (quoteNote?: string) => void;
}

// High-efficiency instant synchronous evaluation kernel matching Autonomous and Response tiers
const _evalQuote = (n: number, s: number, f: number, cycle: 'monthly' | 'annual') => {
  let baseMonthly: number;

  if (n <= 100 && s <= 35 && f <= 100) {
    // Exact match for Autonomous Plan
    baseMonthly = 2499;
  } else if (n <= 500 && s <= 150 && f <= 500) {
    // Interpolate smoothly between Autonomous ($2,499) and Response ($4,499)
    // Capacity delta: 400 nodes ($3/ea = $1,200), 115 services ($4/ea = $460), 400 fixes ($0.85/ea = $340) -> Total +$2,000 = exactly $4,499
    const nodeExcess = Math.max(0, n - 100);
    const servExcess = Math.max(0, s - 35);
    const fixExcess = Math.max(0, f - 100);
    const addOn = (nodeExcess * 3) + (servExcess * 4) + (fixExcess * 0.85);
    baseMonthly = Math.round(2499 + addOn);
  } else {
    // Enterprise scale starting from Response base ($4,499)
    const nodeExcess = Math.max(0, n - 500);
    const servExcess = Math.max(0, s - 150);
    const fixExcess = Math.max(0, f - 500);
    const addOn = (nodeExcess * 2.5) + (servExcess * 5) + (fixExcess * 0.6);
    baseMonthly = Math.round(4499 + addOn);
  }

  // Annual discount:
  // Autonomous ($2,499 -> $2,299) saves $200/mo ($2,400/yr)
  // Response ($4,499 -> $4,299) saves $200/mo ($2,400/yr)
  // Enterprise plans scale with 8% discount (minimum $200/mo savings)
  const discount = baseMonthly <= 4499 
    ? 200 
    : Math.round(200 + ((baseMonthly - 4499) * 0.08));

  const finalMonthly = cycle === 'annual' ? (baseMonthly - discount) : baseMonthly;
  const savings = discount * 12;

  return { monthly: finalMonthly, base: baseMonthly, savings };
};

export const CalculatorView: React.FC<CalculatorViewProps> = ({
  onBack,
  onNavigateToContact,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [nodes, setNodes] = useState<number>(100);
  const [services, setServices] = useState<number>(35);
  const [mutatingFixes, setMutatingFixes] = useState<number>(100);

  // 0ms Real-Time Instant Calculation (60 FPS smooth dragging)
  const { monthly: monthlyPrice, savings: annualSavings } = useMemo(() => {
    return _evalQuote(nodes, services, mutatingFixes, billingCycle);
  }, [nodes, services, mutatingFixes, billingCycle]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalForm, setModalForm] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleOpenQuoteModal = () => {
    setSubmitError(null);
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const detailedMessage = [
      `📌 [CUSTOM QUOTATION SPECIFICATION]`,
      `• Monitored Nodes: ${nodes.toLocaleString()} Nodes`,
      `• Microservice Quota: ${services.toLocaleString()} Microservices`,
      `• Autonomous Remediations: ${mutatingFixes.toLocaleString()} Verified Actions / month`,
      `• Billing Cycle: ${billingCycle === 'annual' ? 'Annual Commitment (Save $' + annualSavings.toLocaleString() + '/yr)' : 'Monthly'}`,
      `• Quoted Rate: $${monthlyPrice.toLocaleString()}/month`,
      `• Incident Escalation: Priority Multi-Channel Dispatch (Slack / Telegram / Teams)`,
      `• Topology: In-VPC Single-Tenant Cluster (Zero Cloud Egress)`,
      modalForm.notes ? `\nClient Infrastructure Notes:\n${modalForm.notes}` : ''
    ].filter(Boolean).join('\n');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: modalForm.name,
          email: modalForm.email,
          phone: modalForm.phone,
          selectedPlan: `Custom Plan ($${monthlyPrice.toLocaleString()}/mo - ${nodes} Nodes, ${services} Services)`,
          selectedInfra: 'Custom Architecture',
          clusterScale: `${nodes.toLocaleString()} Nodes / ${services.toLocaleString()} Services`,
          message: detailedMessage,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to dispatch quotation. Please email team@ambersre.xyz');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Quotation dispatch error:', err);
      setSubmitError(err.message || 'Unable to submit quotation. Please try again or reach team@ambersre.xyz directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#0c0a09] font-sans selection:bg-[#d97706] selection:text-white pb-24">
      
      {/* Top Professional Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-6 sm:px-12 py-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-semibold text-stone-600 hover:text-black transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Platform</span>
        </button>

        <div 
          className="flex items-center gap-2.5 cursor-pointer group" 
          onClick={onBack}
        >
          <img 
            src="/assets/amber-symbol.svg" 
            alt="Amber Symbol" 
            className="w-7 h-9 object-contain drop-shadow-[0_2px_8px_rgba(217,119,6,0.3)] group-hover:scale-105 transition-transform duration-200" 
          />
          <span className="font-sans font-black text-lg text-[#0c0a09] tracking-tight">AMBER</span>
          <span className="text-stone-300">|</span>
          <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200/80">
            CALCULATOR
          </span>
        </div>

        <button
          type="button"
          onClick={() => onNavigateToContact()}
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-sans font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
        >
          <span>Schedule Call</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 sm:px-10 pt-10 sm:pt-14">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-sans font-black text-[#0c0a09] tracking-tight leading-tight">
            Transparent Pricing. <br />
            <span className="text-[#d97706]">Modeled for Your Exact Scale.</span>
          </h1>

          <p className="mt-3.5 text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
            Zero per-seat taxes. Zero unpredictable LLM token surprises. Type your exact infrastructure dimensions or drag the sliders to model custom deployment economics in real-time.
          </p>
        </div>

        {/* 2-Column Split: Inputs vs Dynamic Quote Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Clean White Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Control 1: Monitored Nodes */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm hover:border-amber-400/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#d97706] block mb-1">
                    01 // Compute Infrastructure
                  </span>
                  <h3 className="text-base font-sans font-bold text-stone-900 tracking-tight">Monitored Cloud &amp; K8s Nodes</h3>
                  <p className="text-xs font-sans text-stone-500 mt-0.5">Total VM instances, EC2 hosts, and Kubernetes worker nodes</p>
                </div>
                
                {/* Clean Numeric Input with professional font */}
                <div className="flex items-center self-start sm:self-auto bg-stone-50 hover:bg-stone-100/80 focus-within:bg-white border border-stone-300 focus-within:border-stone-900 rounded-xl px-3.5 py-1.5 transition-all shadow-inner">
                  <input
                    type="number"
                    min={10}
                    max={100000}
                    value={nodes === 0 ? '' : nodes}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                      setNodes(isNaN(val) ? 0 : Math.max(0, val));
                    }}
                    className="w-20 sm:w-24 text-right font-sans font-bold text-stone-900 bg-transparent outline-none text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="120"
                  />
                  <span className="text-xs font-sans font-semibold text-stone-500 ml-1.5 select-none">Nodes</span>
                </div>
              </div>

              {/* Slider with stable fixed range: min=10, max=5000, step=10 */}
              <input
                type="range"
                min={10}
                max={5000}
                step={10}
                value={Math.min(Math.max(10, nodes), 5000)}
                onChange={(e) => setNodes(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#d97706]"
              />

              <div className="flex justify-between text-xs font-sans font-medium text-stone-400 mt-2">
                <span>10 Nodes</span>
                <span>{nodes > 5000 ? `${nodes.toLocaleString()} (Custom)` : '2,500 Nodes'}</span>
                <span>5,000 Nodes</span>
              </div>

              {/* Quick Presets in clean modern typography */}
              <div className="flex flex-wrap items-center gap-2 mt-3.5 pt-3.5 border-t border-stone-100">
                <span className="text-xs font-sans font-semibold text-stone-400 mr-0.5 select-none">Presets:</span>
                {[50, 100, 250, 500, 1000, 2500, 5000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setNodes(preset)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                      nodes === preset
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    {preset.toLocaleString()} Nodes
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Active Microservices */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm hover:border-amber-400/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#d97706] block mb-1">
                    02 // Service Topology
                  </span>
                  <h3 className="text-base font-sans font-bold text-stone-900 tracking-tight">Active Production Microservices</h3>
                  <p className="text-xs font-sans text-stone-500 mt-0.5">Distinct services with dedicated telemetry &amp; runbook mapping</p>
                </div>
                
                {/* Clean Numeric Input */}
                <div className="flex items-center self-start sm:self-auto bg-stone-50 hover:bg-stone-100/80 focus-within:bg-white border border-stone-300 focus-within:border-stone-900 rounded-xl px-3.5 py-1.5 transition-all shadow-inner">
                  <input
                    type="number"
                    min={5}
                    max={10000}
                    value={services === 0 ? '' : services}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                      setServices(isNaN(val) ? 0 : Math.max(0, val));
                    }}
                    className="w-20 sm:w-24 text-right font-sans font-bold text-stone-900 bg-transparent outline-none text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="35"
                  />
                  <span className="text-xs font-sans font-semibold text-stone-500 ml-1.5 select-none">Services</span>
                </div>
              </div>

              {/* Slider with stable fixed range: min=5, max=500, step=5 */}
              <input
                type="range"
                min={5}
                max={500}
                step={5}
                value={Math.min(Math.max(5, services), 500)}
                onChange={(e) => setServices(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#d97706]"
              />

              <div className="flex justify-between text-xs font-sans font-medium text-stone-400 mt-2">
                <span>5 Services</span>
                <span>{services > 500 ? `${services.toLocaleString()} (Custom)` : '250 Services'}</span>
                <span>500 Services</span>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-2 mt-3.5 pt-3.5 border-t border-stone-100">
                <span className="text-xs font-sans font-semibold text-stone-400 mr-0.5 select-none">Presets:</span>
                {[15, 35, 75, 150, 200, 300, 500].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setServices(preset)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                      services === preset
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    {preset} Services
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Mutating Remediations */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm hover:border-amber-400/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#d97706] block mb-1">
                    03 // Autonomous Remediations
                  </span>
                  <h3 className="text-base font-sans font-bold text-stone-900 tracking-tight">Monthly Mutating Actions</h3>
                  <p className="text-xs font-sans text-stone-500 mt-0.5">Autonomous pod restarts, connection drains, state heals &amp; rollbacks</p>
                </div>
                
                {/* Clean Numeric Input */}
                <div className="flex items-center self-start sm:self-auto bg-stone-50 hover:bg-stone-100/80 focus-within:bg-white border border-stone-300 focus-within:border-stone-900 rounded-xl px-3.5 py-1.5 transition-all shadow-inner">
                  <input
                    type="number"
                    min={50}
                    max={100000}
                    value={mutatingFixes === 0 ? '' : mutatingFixes}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                      setMutatingFixes(isNaN(val) ? 0 : Math.max(0, val));
                    }}
                    className="w-20 sm:w-24 text-right font-sans font-bold text-stone-900 bg-transparent outline-none text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="100"
                  />
                  <span className="text-xs font-sans font-semibold text-stone-500 ml-1.5 select-none">Fixes / mo</span>
                </div>
              </div>

              {/* Slider with stable fixed range: min=50, max=5000, step=50 */}
              <input
                type="range"
                min={50}
                max={5000}
                step={50}
                value={Math.min(Math.max(50, mutatingFixes), 5000)}
                onChange={(e) => setMutatingFixes(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#d97706]"
              />

              <div className="flex justify-between text-xs font-sans font-medium text-stone-400 mt-2">
                <span>50 Fixes</span>
                <span>{mutatingFixes > 5000 ? `${mutatingFixes.toLocaleString()} (Custom)` : '2,500 Fixes'}</span>
                <span>5,000 Fixes</span>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-2 mt-3.5 pt-3.5 border-t border-stone-100">
                <span className="text-xs font-sans font-semibold text-stone-400 mr-0.5 select-none">Presets:</span>
                {[100, 250, 500, 1000, 2500, 5000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setMutatingFixes(preset)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                      mutatingFixes === preset
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    {preset.toLocaleString()} Fixes
                  </button>
                ))}
              </div>
            </div>

            {/* Privacy Guarantee Note */}
            <div className="p-4 rounded-xl bg-stone-100/80 border border-stone-200 flex items-start gap-2.5 text-xs text-stone-600">
              <span className="font-sans text-xs font-bold px-2 py-0.5 rounded bg-stone-200 text-stone-800 uppercase tracking-wider shrink-0 mt-0.5">
                IN-VPC AIR-GAPPED
              </span>
              <div className="font-sans">
                <strong className="text-stone-900">Zero Telemetry Egress:</strong> Amber operates as a single-tenant software appliance on customer infrastructure with offline Ed25519 signature verification.
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Quote Card (5 Cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white border-2 border-stone-900 rounded-3xl p-7 shadow-xl relative overflow-hidden">
              
              {/* Badge & Cycle Toggle */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#d97706]">
                  Computed Dynamic Quote
                </span>
                
                {/* Billing Cycle Pill */}
                <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-xs font-sans">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('annual')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                      billingCycle === 'annual' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                    }`}
                  >
                    Annual (-18%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                      billingCycle === 'monthly' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              <h2 className="text-2xl font-sans font-black text-stone-900 tracking-tight">
                Custom Enterprise Tier
              </h2>
              <p className="text-stone-500 font-sans text-xs mt-1">
                Dedicated single-tenant SRE engine with offline signed license key.
              </p>

              {/* Price Block - 0ms Real-time Instant Updates */}
              <div className="py-6 my-6 border-y border-stone-200/80 transition-all duration-150">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-sans font-black text-stone-950 tracking-tight">
                    ${monthlyPrice.toLocaleString()}
                  </span>
                  <span className="text-stone-500 font-sans text-xs font-bold uppercase tracking-wider">
                    / month
                  </span>
                </div>
                <div className="text-xs font-sans font-bold text-[#b45309] mt-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {billingCycle === 'annual' 
                      ? `$${(monthlyPrice * 12).toLocaleString()} billed annually • Save $${annualSavings.toLocaleString()}/yr`
                      : 'Billed monthly • Cancel anytime'}
                  </span>
                </div>
              </div>

              {/* Quota Breakdown Table */}
              <div className="space-y-2.5 text-xs font-sans text-stone-700 mb-6">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Monitored Nodes:</span>
                  <span className="font-bold text-stone-900">{nodes.toLocaleString()} Cloud / K8s Nodes</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Microservice Quota:</span>
                  <span className="font-bold text-stone-900">{services.toLocaleString()} Active Services</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Autonomous Actions:</span>
                  <span className="font-bold text-[#d97706]">{mutatingFixes.toLocaleString()} Verified Fixes / mo</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Incident Escalation:</span>
                  <span className="font-bold text-stone-900">
                    Priority Slack / Teams / Webhook
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Deployment Topology:</span>
                  <span className="font-bold text-stone-900">In-VPC Single-Tenant Cluster</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-stone-500">Telemetry Egress:</span>
                  <span className="font-bold text-emerald-700">0 Bytes (Zero Cloud Egress)</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleOpenQuoteModal}
                className="w-full py-3.5 px-5 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white font-sans font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#d97706]/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Lock In Quote &amp; Deploy</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-4 text-center text-xs font-sans text-stone-400">
                Quotes are guaranteed for 30 days upon submission.
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Feature Confidence Grid */}
        <div className="mt-16 pt-12 border-t border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:border-amber-400/50 transition-colors">
            <span className="text-xs font-sans font-bold text-[#d97706] uppercase tracking-wider block mb-2">
              01 // Cryptographic Safety
            </span>
            <h4 className="text-sm font-sans font-bold text-stone-900 mb-1.5">Deterministic Safe Execution</h4>
            <p className="text-xs font-sans text-stone-600 leading-relaxed font-normal">
              Every remediation action requires cryptographic SHA-256 parameter binding and strict static allowlist verification.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:border-amber-400/50 transition-colors">
            <span className="text-xs font-sans font-bold text-[#d97706] uppercase tracking-wider block mb-2">
              02 // Local Runtime
            </span>
            <h4 className="text-sm font-sans font-bold text-stone-900 mb-1.5">Zero Training on Telemetry</h4>
            <p className="text-xs font-sans text-stone-600 leading-relaxed font-normal">
              Run offline via local Ollama compute. Customer error traces and configurations never train public AI models.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:border-amber-400/50 transition-colors">
            <span className="text-xs font-sans font-bold text-[#d97706] uppercase tracking-wider block mb-2">
              03 // Onboarding Calibration
            </span>
            <h4 className="text-sm font-sans font-bold text-stone-900 mb-1.5">Custom Runbook Engineering</h4>
            <p className="text-xs font-sans text-stone-600 leading-relaxed font-normal">
              Our engineering team works with your SREs to author and validate custom runbooks for your proprietary services.
            </p>
          </div>
        </div>

      </main>

      {/* Pinned Quotation Modal Popup */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleCloseQuoteModal}
              className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button Top Right */}
              <button
                type="button"
                onClick={handleCloseQuoteModal}
                className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              {isSubmitted ? (
                /* Success State inside Modal */
                <div className="p-8 sm:p-14 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <span className="text-xs font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 inline-block mb-3">
                    Quote Locked &amp; Dispatched
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mb-2">
                    Quotation Successfully Forwarded
                  </h3>

                  <p className="text-stone-600 text-sm max-w-lg mx-auto mb-6 leading-relaxed">
                    Thank you{modalForm.name ? `, ${modalForm.name}` : ''}. We have recorded your exact configuration of <strong>{nodes.toLocaleString()} Nodes</strong>, <strong>{services.toLocaleString()} Services</strong>, and <strong>{mutatingFixes.toLocaleString()} Fixes/mo</strong> at <strong>${monthlyPrice.toLocaleString()}/month</strong>.
                  </p>

                  <div className="max-w-md mx-auto bg-stone-50 border border-stone-200 rounded-2xl p-5 text-left text-xs text-stone-700 space-y-2 mb-8">
                    <div className="font-bold text-stone-900 uppercase text-[11px] tracking-wider">
                      Direct Dispatch Status
                    </div>
                    <div>
                      • Sent to: <span className="font-semibold text-stone-900">{modalForm.email}</span>
                    </div>
                    {modalForm.phone && (
                      <div>
                        • Contact phone: <span className="font-semibold text-stone-900">{modalForm.phone}</span>
                      </div>
                    )}
                    <div>
                      • Turnaround: Our engineering team will review your telemetry topology and respond within 24 hours.
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCloseQuoteModal}
                    className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                /* 2-Column Split: Pinned Note (Left) + White Intake Form (Right) */
                <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-stone-200">
                  
                  {/* Left Column: Pinned Paper Note Spec (5 cols) */}
                  <div className="md:col-span-5 bg-[#faf8f5] p-6 sm:p-8 flex flex-col justify-between relative">
                    <div>
                      {/* Section Tag */}
                      <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#d97706] mb-3">
                        Quotation Breakdown
                      </div>

                      {/* Realistic Pinned White Paper Sheet */}
                      <div className="relative bg-white rounded-xl p-5 pt-8 border border-stone-200/90 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.12)]">
                        {/* Red Pushpin Graphic centered at top edge */}
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                          <svg className="w-7 h-9 drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)]" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="16" cy="11" rx="8" ry="8" fill="#DC2626" />
                            <ellipse cx="16" cy="10" rx="6" ry="6" fill="#EF4444" />
                            <ellipse cx="14" cy="8" rx="2.5" ry="1.5" fill="#FCA5A5" />
                            <path d="M12 14C12 14 13 22 10 24L22 24C19 22 20 14 20 14" fill="#B91C1C" />
                            <line x1="16" y1="24" x2="16" y2="38" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
                          </svg>
                        </div>

                        {/* Note Header */}
                        <div className="border-b border-dashed border-stone-200 pb-3 mb-4 text-center">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block mb-0.5">
                            AMBER SPEC SHEET #QT-{nodes}-{services}
                          </span>
                          <h4 className="text-base font-bold text-stone-900 tracking-tight">
                            Custom SRE Deployment
                          </h4>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-amber-50 text-[#b45309] font-bold text-[10px] border border-amber-200 uppercase tracking-wider">
                            {billingCycle === 'annual' ? 'Annual Commitment' : 'Monthly Flexible'}
                          </span>
                        </div>

                        {/* Note Parameters */}
                        <div className="space-y-2.5 text-xs font-sans text-stone-700">
                          <div className="flex items-center justify-between py-1 border-b border-stone-100">
                            <span className="flex items-center gap-1.5 text-stone-500">
                              <Server className="w-3.5 h-3.5 text-stone-400" /> Nodes:
                            </span>
                            <span className="font-bold text-stone-900">{nodes.toLocaleString()} Nodes</span>
                          </div>

                          <div className="flex items-center justify-between py-1 border-b border-stone-100">
                            <span className="flex items-center gap-1.5 text-stone-500">
                              <Layers className="w-3.5 h-3.5 text-stone-400" /> Services:
                            </span>
                            <span className="font-bold text-stone-900">{services.toLocaleString()} Services</span>
                          </div>

                          <div className="flex items-center justify-between py-1 border-b border-stone-100">
                            <span className="flex items-center gap-1.5 text-stone-500">
                              <Cpu className="w-3.5 h-3.5 text-[#d97706]" /> Auto-Fixes:
                            </span>
                            <span className="font-bold text-[#d97706]">{mutatingFixes.toLocaleString()} / mo</span>
                          </div>

                          <div className="flex items-center justify-between py-1 border-b border-stone-100">
                            <span className="text-stone-500">Escalation:</span>
                            <span className="font-semibold text-stone-900 text-[11px]">Priority SRE Bridge</span>
                          </div>
                        </div>

                        {/* Note Price Stamp */}
                        <div className="mt-5 pt-4 border-t border-dashed border-stone-300 bg-stone-50/70 -mx-5 -mb-5 p-4 rounded-b-xl">
                          <div className="text-[10px] font-sans font-semibold text-stone-500 uppercase tracking-wider">
                            Locked Quoted Rate
                          </div>
                          <div className="flex items-baseline gap-1.5 mt-0.5">
                            <span className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
                              ${monthlyPrice.toLocaleString()}
                            </span>
                            <span className="text-xs font-sans font-bold text-stone-500 uppercase">
                              / mo
                            </span>
                          </div>
                          {billingCycle === 'annual' && (
                            <div className="text-[11px] font-sans font-bold text-[#b45309] mt-0.5">
                              Save ${annualSavings.toLocaleString()}/yr vs monthly
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* VPC Security Guarantee Note at bottom of left column */}
                    <div className="mt-6 flex items-start gap-2 text-[11px] text-stone-500 font-sans leading-relaxed">
                      <Lock className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                      <span>Single-tenant In-VPC deployment. 0 Bytes of telemetry or error traces egress your private perimeter.</span>
                    </div>
                  </div>

                  {/* Right Column: Clean White Intake Form (7 cols) */}
                  <div className="md:col-span-7 bg-white p-6 sm:p-8">
                    <div className="mb-5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-stone-500">
                          Direct Quote Intake
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                        Receive Full Quotation
                      </h3>
                      <p className="text-stone-500 text-xs sm:text-sm mt-1">
                        Fill in your work details below to receive this quotation breakdown and review deployment timelines with our team.
                      </p>
                    </div>

                    <form onSubmit={handleModalSubmit} className="space-y-4">
                      {/* Name */}
                      <div>
                        <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Full Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            required
                            value={modalForm.name}
                            onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                            placeholder="Jane Smith"
                            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 hover:bg-stone-100/70 focus:bg-white border border-stone-200 focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 rounded-xl text-stone-900 placeholder-stone-400 text-xs sm:text-sm outline-none transition-all font-sans"
                          />
                        </div>
                      </div>

                      {/* Work Email & Phone Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                            Work Email *
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                              <Mail className="w-4 h-4" />
                            </div>
                            <input
                              type="email"
                              required
                              value={modalForm.email}
                              onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })}
                              placeholder="jane@company.com"
                              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 hover:bg-stone-100/70 focus:bg-white border border-stone-200 focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 rounded-xl text-stone-900 placeholder-stone-400 text-xs sm:text-sm outline-none transition-all font-sans"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                            Phone
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                              <Phone className="w-4 h-4" />
                            </div>
                            <input
                              type="tel"
                              value={modalForm.phone}
                              onChange={(e) => setModalForm({ ...modalForm, phone: e.target.value })}
                              placeholder="+1 (555) 000-0000"
                              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 hover:bg-stone-100/70 focus:bg-white border border-stone-200 focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 rounded-xl text-stone-900 placeholder-stone-400 text-xs sm:text-sm outline-none transition-all font-sans"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Infrastructure Notes */}
                      <div>
                        <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Infrastructure Stack / Special Notes
                        </label>
                        <div className="relative">
                          <div className="absolute top-3 left-3.5 pointer-events-none text-stone-400">
                            <MessageSquare className="w-4 h-4" />
                          </div>
                          <textarea
                            rows={3}
                            value={modalForm.notes}
                            onChange={(e) => setModalForm({ ...modalForm, notes: e.target.value })}
                            placeholder="E.g., AWS EKS multi-region, Kubernetes 1.29, Kafka + Postgres clusters..."
                            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 hover:bg-stone-100/70 focus:bg-white border border-stone-200 focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 rounded-xl text-stone-900 placeholder-stone-400 text-xs sm:text-sm outline-none transition-all font-sans resize-none"
                          />
                        </div>
                      </div>

                      {/* Error notice if submission failed */}
                      {submitError && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-sans">
                          {submitError}
                        </div>
                      )}

                      {/* Submit CTA */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white font-sans font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#d97706]/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Dispatching Quote...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Forward Quote &amp; Request Callback</span>
                          </>
                        )}
                      </button>

                      <p className="text-center text-[11px] font-sans text-stone-400">
                        Zero spam. We reply directly via email or phone within 24 hours.
                      </p>
                    </form>
                  </div>

                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
