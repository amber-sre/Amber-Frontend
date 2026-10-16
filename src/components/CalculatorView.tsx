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
  MessageSquare,
  Users,
  FileText,
  Download,
  Check,
  Copy,
  Terminal
} from 'lucide-react';

interface CalculatorViewProps {
  onBack: () => void;
  onNavigateToContact: (quoteNote?: string) => void;
}

// High-efficiency instant synchronous evaluation kernel matching Growth, Autonomous, Response, and Hyperscale tiers
const _evalQuote = (n: number, s: number, f: number, cycle: 'monthly' | 'annual') => {
  let baseMonthly: number;
  let tierName: string;

  if (n <= 25 && s <= 15 && f <= 50) {
    // Growth / Startup Tier bridging the 4 to 25 node gap ($499 - $899/mo)
    tierName = 'Growth Startup Tier';
    const nodeExcess = Math.max(0, n - 4);
    const servExcess = Math.max(0, s - 5);
    const fixExcess = Math.max(0, f - 25);
    baseMonthly = Math.round(599 + (nodeExcess * 18) + (servExcess * 12) + (fixExcess * 4));
  } else if (n <= 100 && s <= 35 && f <= 100) {
    // Exact match for Autonomous Plan ($2,499 / $2,299)
    tierName = 'Autonomous Enterprise';
    baseMonthly = 2499;
  } else if (n <= 500 && s <= 150 && f <= 500) {
    // Interpolate smoothly between Autonomous ($2,499) and Response ($4,499)
    tierName = 'Response War-Room Tier';
    const nodeExcess = Math.max(0, n - 100);
    const servExcess = Math.max(0, s - 35);
    const fixExcess = Math.max(0, f - 100);
    const addOn = (nodeExcess * 3) + (servExcess * 4) + (fixExcess * 0.85);
    baseMonthly = Math.round(2499 + addOn);
  } else {
    // Enterprise scale starting from Response base ($4,499)
    tierName = 'Custom Hyperscale Tier';
    const nodeExcess = Math.max(0, n - 500);
    const servExcess = Math.max(0, s - 150);
    const fixExcess = Math.max(0, f - 500);
    const addOn = (nodeExcess * 2.5) + (servExcess * 5) + (fixExcess * 0.6);
    baseMonthly = Math.round(4499 + addOn);
  }

  // Annual discount:
  // Growth tier: ~17% ($100/mo) discount
  // Autonomous ($2,499 -> $2,299) saves $200/mo ($2,400/yr)
  // Response ($4,499 -> $4,299) saves $200/mo ($2,400/yr)
  // Enterprise plans scale with 8% discount (minimum $200/mo savings)
  const discount = baseMonthly <= 1200
    ? Math.round(baseMonthly * 0.17)
    : baseMonthly <= 4499 
      ? 200 
      : Math.round(200 + ((baseMonthly - 4499) * 0.08));

  const finalMonthly = cycle === 'annual' ? (baseMonthly - discount) : baseMonthly;
  const savings = discount * 12;

  return { monthly: finalMonthly, base: baseMonthly, savings, tierName };
};

export const CalculatorView: React.FC<CalculatorViewProps> = ({
  onBack,
  onNavigateToContact,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [nodes, setNodes] = useState<number>(100);
  const [services, setServices] = useState<number>(35);
  const [mutatingFixes, setMutatingFixes] = useState<number>(100);
  const [teamSize, setTeamSize] = useState<number>(20);

  // 0ms Real-Time Instant Calculation (60 FPS smooth dragging)
  const { monthly: monthlyPrice, savings: annualSavings, tierName } = useMemo(() => {
    return _evalQuote(nodes, services, mutatingFixes, billingCycle);
  }, [nodes, services, mutatingFixes, billingCycle]);

  // Legacy Competitor Benchmark Calculation (Datadog + PagerDuty / Opsgenie)
  // Datadog: $23 infra host + $31 APM + $15 log ingest = $69/node
  // PagerDuty / Opsgenie: $45/engineer seat
  // APM custom metrics & service mesh tracing: $35/service
  const legacyCost = useMemo(() => {
    const nodeCost = nodes * 69;
    const seatCost = teamSize * 45;
    const serviceCost = services * 35;
    return Math.round(nodeCost + seatCost + serviceCost);
  }, [nodes, teamSize, services]);

  const savingsVsLegacy = useMemo(() => {
    return Math.max(0, legacyCost - monthlyPrice);
  }, [legacyCost, monthlyPrice]);

  const savingsPercent = useMemo(() => {
    if (legacyCost <= 0) return 0;
    return Math.round((savingsVsLegacy / legacyCost) * 100);
  }, [savingsVsLegacy, legacyCost]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalIntent, setModalIntent] = useState<'instant_key' | 'formal_quote'>('formal_quote');
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [modalForm, setModalForm] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleOpenQuoteModal = (intent?: 'instant_key' | 'formal_quote') => {
    setSubmitError(null);
    setIsSubmitted(false);
    setCopiedKey(false);
    if (intent) {
      setModalIntent(intent);
    } else {
      setModalIntent(nodes <= 25 ? 'instant_key' : 'formal_quote');
    }
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
      `• Requested Flow: ${modalIntent === 'instant_key' ? '⚡ Instant Self-Serve Evaluation Key' : '📄 Formal B2B Procurement Quote (PDF)'}`,
      `• Architecture Tier: ${tierName}`,
      `• Monitored Nodes: ${nodes.toLocaleString()} Nodes`,
      `• Microservice Quota: ${services.toLocaleString()} Microservices`,
      `• Autonomous Remediations: ${mutatingFixes.toLocaleString()} Verified Actions / month`,
      `• Engineering Team: ${teamSize.toLocaleString()} Seats ($0/user - Unlimited Included)`,
      `• Est. Legacy SaaS Cost (Datadog + PagerDuty): ~$${legacyCost.toLocaleString()}/mo (Amber saves ~${savingsPercent}%)`,
      `• Billing Cycle: ${billingCycle === 'annual' ? 'Annual Commitment (Save $' + annualSavings.toLocaleString() + '/yr)' : 'Monthly'}`,
      `• Quoted Rate: $${monthlyPrice.toLocaleString()}/month`,
      `• Incident Escalation: ${nodes <= 25 ? 'Slack / Telegram HITL Cards' : 'Priority Multi-Channel Dispatch (Slack / Telegram / Teams)'}`,
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
          selectedPlan: `${tierName} ($${monthlyPrice.toLocaleString()}/mo - ${nodes} Nodes, ${services} Services)`,
          selectedInfra: 'Custom Architecture',
          clusterScale: `${nodes.toLocaleString()} Nodes / ${services.toLocaleString()} Services (${teamSize} Engineers)`,
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
                  <p className="text-xs font-sans text-stone-500 mt-0.5">Total VM instances, EC2 hosts, and Kubernetes worker nodes (Growth tier starts at 4 nodes)</p>
                </div>
                
                {/* Clean Numeric Input with professional font */}
                <div className="flex items-center self-start sm:self-auto bg-stone-50 hover:bg-stone-100/80 focus-within:bg-white border border-stone-300 focus-within:border-stone-900 rounded-xl px-3.5 py-1.5 transition-all shadow-inner">
                  <input
                    type="number"
                    min={4}
                    max={100000}
                    value={nodes === 0 ? '' : nodes}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                      setNodes(isNaN(val) ? 0 : Math.max(0, val));
                    }}
                    className="w-20 sm:w-24 text-right font-sans font-bold text-stone-900 bg-transparent outline-none text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="100"
                  />
                  <span className="text-xs font-sans font-semibold text-stone-500 ml-1.5 select-none">Nodes</span>
                </div>
              </div>

              {/* Slider with range: min=4, max=5000, step=1 */}
              <input
                type="range"
                min={4}
                max={5000}
                step={1}
                value={Math.min(Math.max(4, nodes), 5000)}
                onChange={(e) => setNodes(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#d97706]"
              />

              <div className="flex justify-between text-xs font-sans font-medium text-stone-400 mt-2">
                <span>4 Nodes (Growth)</span>
                <span>{nodes > 5000 ? `${nodes.toLocaleString()} (Custom)` : '2,500 Nodes'}</span>
                <span>5,000 Nodes</span>
              </div>

              {/* Quick Presets in clean modern typography */}
              <div className="flex flex-wrap items-center gap-2 mt-3.5 pt-3.5 border-t border-stone-100">
                <span className="text-xs font-sans font-semibold text-stone-400 mr-0.5 select-none">Presets:</span>
                {[10, 25, 50, 100, 250, 500, 1000, 2500, 5000].map((preset) => (
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
                    min={10}
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

              {/* Slider with range: min=10, max=5000, step=10 */}
              <input
                type="range"
                min={10}
                max={5000}
                step={10}
                value={Math.min(Math.max(10, mutatingFixes), 5000)}
                onChange={(e) => setMutatingFixes(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#d97706]"
              />

              <div className="flex justify-between text-xs font-sans font-medium text-stone-400 mt-2">
                <span>10 Fixes</span>
                <span>{mutatingFixes > 5000 ? `${mutatingFixes.toLocaleString()} (Custom)` : '2,500 Fixes'}</span>
                <span>5,000 Fixes</span>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-2 mt-3.5 pt-3.5 border-t border-stone-100">
                <span className="text-xs font-sans font-semibold text-stone-400 mr-0.5 select-none">Presets:</span>
                {[25, 50, 100, 250, 500, 1000, 2500, 5000].map((preset) => (
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

            {/* Control 4: Engineering Team Size (Competitor Benchmark) */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm hover:border-amber-400/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#d97706] block mb-1">
                    04 // Engineering Team Scale
                  </span>
                  <h3 className="text-base font-sans font-bold text-stone-900 tracking-tight">Active Engineers &amp; SREs</h3>
                  <p className="text-xs font-sans text-stone-500 mt-0.5">Amber charges $0 per seat. We benchmark this to calculate your legacy SaaS savings.</p>
                </div>
                
                {/* Clean Numeric Input */}
                <div className="flex items-center self-start sm:self-auto bg-stone-50 hover:bg-stone-100/80 focus-within:bg-white border border-stone-300 focus-within:border-stone-900 rounded-xl px-3.5 py-1.5 transition-all shadow-inner">
                  <input
                    type="number"
                    min={2}
                    max={2500}
                    value={teamSize === 0 ? '' : teamSize}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                      setTeamSize(isNaN(val) ? 0 : Math.max(0, val));
                    }}
                    className="w-20 sm:w-24 text-right font-sans font-bold text-stone-900 bg-transparent outline-none text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="20"
                  />
                  <span className="text-xs font-sans font-semibold text-stone-500 ml-1.5 select-none">Engineers</span>
                </div>
              </div>

              {/* Slider with range: min=2, max=250, step=1 */}
              <input
                type="range"
                min={2}
                max={250}
                step={1}
                value={Math.min(Math.max(2, teamSize), 250)}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#d97706]"
              />

              <div className="flex justify-between text-xs font-sans font-medium text-stone-400 mt-2">
                <span>2 Engineers</span>
                <span>{teamSize > 250 ? `${teamSize.toLocaleString()} (Custom)` : '125 Engineers'}</span>
                <span>250 Engineers</span>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-2 mt-3.5 pt-3.5 border-t border-stone-100">
                <span className="text-xs font-sans font-semibold text-stone-400 mr-0.5 select-none">Presets:</span>
                {[5, 10, 20, 50, 100, 250].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTeamSize(preset)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                      teamSize === preset
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    {preset} Seats
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
                {tierName}
              </h2>
              <p className="text-stone-500 font-sans text-xs mt-1">
                {nodes <= 25 
                  ? 'Self-serve single-tenant SRE engine for seed & growth teams with offline Ed25519 token.'
                  : 'Dedicated single-tenant SRE engine with offline signed license key.'}
              </p>

              {/* Price Block - 0ms Real-time Instant Updates */}
              <div className="py-5 my-5 border-y border-stone-200/80 transition-all duration-150">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-sans font-black text-stone-950 tracking-tight">
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

                {/* Legacy Competitor Benchmark Comparison Box */}
                <div className="mt-4 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-stone-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-sans font-semibold text-stone-600">
                      Est. Legacy SaaS Stack:
                    </span>
                    <span className="font-sans font-bold text-stone-400 line-through text-sm">
                      ~${legacyCost.toLocaleString()}/mo
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-1.5">
                    <span className="font-sans font-bold text-emerald-700 flex items-center gap-1.5">
                      <span>You save ~${savingsVsLegacy.toLocaleString()}/mo</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded-md font-black">
                        -{savingsPercent}%
                      </span>
                    </span>
                    <span className="text-[11px] font-sans font-medium text-stone-500">
                      Datadog + PagerDuty
                    </span>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-stone-700 font-sans">
                    <span>Team Seats Included:</span>
                    <span className="font-bold text-stone-900">
                      Unlimited ({teamSize} SREs @ $0/seat)
                    </span>
                  </div>
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
                  <span className="text-stone-500">Team Seats:</span>
                  <span className="font-bold text-stone-900">Unlimited ({teamSize} Seats @ $0/seat)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Incident Escalation:</span>
                  <span className="font-bold text-stone-900">
                    {nodes <= 25 ? 'Slack / Telegram HITL Cards' : 'Priority Multi-Channel Dispatch'}
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
                onClick={() => handleOpenQuoteModal(nodes <= 25 ? 'instant_key' : 'formal_quote')}
                className="w-full py-3.5 px-5 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white font-sans font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#d97706]/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>
                  {nodes <= 25 ? 'Lock In Quote & Get Instant Key' : 'Lock In Quote & Deploy'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Clarified Dual-Path Subtext */}
              <div className="mt-3.5 space-y-1.5 text-center text-xs font-sans">
                <div className="text-[11px] font-semibold text-stone-700 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
                  <span>
                    {nodes <= 25
                      ? 'Instant self-serve license key • Credit card or invoice'
                      : 'Fast-track onboarding • Instant Ed25519 evaluation sandbox'}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400">
                  <span>Guaranteed 30-day quote lock</span>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => handleOpenQuoteModal('formal_quote')}
                    className="text-stone-600 hover:text-stone-900 font-medium underline cursor-pointer"
                  >
                    Download formal PDF quote
                  </button>
                </div>
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
                <div className="p-8 sm:p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-5 shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <span className="text-xs font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 inline-block mb-3">
                    {modalIntent === 'instant_key' ? '⚡ Evaluation Key Ready' : '📄 Quotation Locked &amp; Dispatched'}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mb-2">
                    {modalIntent === 'instant_key' 
                      ? 'Your Amber License Token is Ready' 
                      : 'Quotation Successfully Forwarded'}
                  </h3>

                  <p className="text-stone-600 text-sm max-w-lg mx-auto mb-6 leading-relaxed">
                    Thank you{modalForm.name ? `, ${modalForm.name}` : ''}. We recorded your configuration of <strong>{nodes.toLocaleString()} Nodes</strong>, <strong>{services.toLocaleString()} Services</strong>, and <strong>{teamSize} Engineers</strong> at <strong>${monthlyPrice.toLocaleString()}/month</strong>.
                  </p>

                  {modalIntent === 'instant_key' ? (
                    /* Instant Key Box */
                    <div className="max-w-lg mx-auto bg-stone-900 text-white rounded-2xl p-5 text-left mb-6 shadow-inner font-mono text-xs">
                      <div className="flex items-center justify-between text-stone-400 pb-2 mb-3 border-b border-stone-800 text-[11px]">
                        <span className="flex items-center gap-1.5 font-bold text-amber-400">
                          <Terminal className="w-3.5 h-3.5" />
                          <span>OFFLINE ED25519 SANDBOX TOKEN</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText('AMBER-EVAL-ED25519-798B-3C2A-4D9E');
                            setCopiedKey(true);
                            setTimeout(() => setCopiedKey(false), 2000);
                          }}
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-[10px] font-sans font-bold uppercase tracking-wider cursor-pointer transition-colors"
                        >
                          {copiedKey ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey ? 'Copied!' : 'Copy Key'}</span>
                        </button>
                      </div>

                      <div className="p-3 bg-black/60 rounded-xl text-amber-300 font-bold select-all break-all border border-stone-800">
                        AMBER-EVAL-ED25519-798B-3C2A-4D9E
                      </div>

                      <div className="mt-3 text-[11px] text-stone-400 font-sans leading-relaxed">
                        Start your In-VPC cluster with zero telemetry egress:
                        <code className="block mt-1.5 p-2 bg-stone-950 text-stone-300 rounded-lg text-[10px] overflow-x-auto">
                          export AMBER_LICENSE_KEY="AMBER-EVAL-ED25519-798B-3C2A-4D9E"<br />
                          docker compose -f deploy/docker-compose.yml up -d
                        </code>
                      </div>
                    </div>
                  ) : (
                    /* Formal Quote Dispatch Summary */
                    <div className="max-w-md mx-auto bg-stone-50 border border-stone-200 rounded-2xl p-5 text-left text-xs text-stone-700 space-y-2 mb-6">
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
                        • Turnaround: Formal PDF quotation, enterprise MSA, and vendor W-9 will arrive within 24 hours.
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Print / Save PDF Spec</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseQuoteModal}
                      className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
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
                            {tierName}
                          </h4>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-amber-50 text-[#b45309] font-bold text-[10px] border border-amber-200 uppercase tracking-wider">
                            {billingCycle === 'annual' ? 'Annual Commitment' : 'Monthly Flexible'}
                          </span>
                        </div>

                        {/* Note Parameters */}
                        <div className="space-y-2 text-xs font-sans text-stone-700">
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
                            <span className="flex items-center gap-1.5 text-stone-500">
                              <Users className="w-3.5 h-3.5 text-stone-400" /> Seats:
                            </span>
                            <span className="font-bold text-stone-900">Unlimited ({teamSize} SREs)</span>
                          </div>

                          <div className="flex items-center justify-between py-1 border-b border-stone-100">
                            <span className="text-stone-500">Legacy Cost:</span>
                            <span className="font-semibold text-emerald-700">Save ~${savingsVsLegacy.toLocaleString()}/mo</span>
                          </div>

                          <div className="flex items-center justify-between py-1 border-b border-stone-100">
                            <span className="text-stone-500">Escalation:</span>
                            <span className="font-semibold text-stone-900 text-[11px]">
                              {nodes <= 25 ? 'Slack / Telegram HITL' : 'Priority SRE Bridge'}
                            </span>
                          </div>
                        </div>

                        {/* Note Price Stamp */}
                        <div className="mt-4 pt-3.5 border-t border-dashed border-stone-300 bg-stone-50/70 -mx-5 -mb-5 p-4 rounded-b-xl">
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
                    {/* Dual-Intent Pill Selector */}
                    <div className="grid grid-cols-2 gap-2 mb-5 p-1 bg-stone-100 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setModalIntent('instant_key')}
                        className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          modalIntent === 'instant_key'
                            ? 'bg-white text-stone-900 shadow-sm border border-stone-200/80'
                            : 'text-stone-500 hover:text-stone-900'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
                        <span>Instant License Key</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setModalIntent('formal_quote')}
                        className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          modalIntent === 'formal_quote'
                            ? 'bg-white text-stone-900 shadow-sm border border-stone-200/80'
                            : 'text-stone-500 hover:text-stone-900'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5 text-stone-500" />
                        <span>Formal CFO Quote (PDF)</span>
                      </button>
                    </div>

                    <div className="mb-5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-stone-500">
                          {modalIntent === 'instant_key' ? 'Instant Provisioning' : 'Procurement Review'}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                        {modalIntent === 'instant_key' 
                          ? 'Issue Instant Evaluation Key' 
                          : 'Receive Formal Quotation Pack'}
                      </h3>
                      <p className="text-stone-500 text-xs sm:text-sm mt-1">
                        {modalIntent === 'instant_key'
                          ? 'Provide your work email to receive your signed evaluation key and 1-command Docker string.'
                          : 'Lock in your 30-day guaranteed pricing specification with enterprise MSA and SOC 2 security packet.'}
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
                            <span>Processing Request...</span>
                          </>
                        ) : modalIntent === 'instant_key' ? (
                          <>
                            <Sparkles className="w-4 h-4" />
                            <span>Issue Evaluation Key &amp; Deploy</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Lock In Quote &amp; Request Callback</span>
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
