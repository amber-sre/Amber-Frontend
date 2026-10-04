import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Server, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Lock, 
  HelpCircle
} from 'lucide-react';

interface CalculatorViewProps {
  onBack: () => void;
  onNavigateToContact: (quoteNote?: string) => void;
}

export const CalculatorView: React.FC<CalculatorViewProps> = ({
  onBack,
  onNavigateToContact,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [nodes, setNodes] = useState<number>(120);
  const [services, setServices] = useState<number>(30);
  const [mutatingFixes, setMutatingFixes] = useState<number>(100);
  const [dedicatedSla, setDedicatedSla] = useState<boolean>(false);

  const [monthlyPrice, setMonthlyPrice] = useState<number>(2242);
  const [annualSavings, setAnnualSavings] = useState<number>(5904);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const debounceTimerRef = useRef<any>(null);

  // Secure Server-side Quote Fetcher
  // Calculation formula, margins and multipliers execute strictly on Cloudflare Workers edge (/api/calculate-quote)
  const fetchQuoteFromServer = async (
    n: number,
    s: number,
    f: number,
    sla: boolean,
    cycle: 'monthly' | 'annual'
  ) => {
    setIsCalculating(true);
    try {
      const res = await fetch('/api/calculate-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nodes: n,
          services: s,
          mutatingFixes: f,
          dedicatedSla: sla,
          billingCycle: cycle,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setMonthlyPrice(data.monthlyPrice);
          setAnnualSavings(data.annualSavings || 0);
        }
      }
    } catch {
      // In case of transient network disruption, preserve last calculated quote
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      fetchQuoteFromServer(nodes, services, mutatingFixes, dedicatedSla, billingCycle);
    }, 60);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [nodes, services, mutatingFixes, dedicatedSla, billingCycle]);

  const handleApplyQuote = () => {
    const note = `[Calculated Custom Plan Specification]
• Monitored Nodes: ${nodes} Nodes
• Active Services: ${services} Microservices
• Mutating Actions: ${mutatingFixes} actions/mo
• Dedicated SRE SLA: ${dedicatedSla ? 'Yes (< 15-min SLA)' : 'Standard'}
• Quoted Monthly Rate: $${monthlyPrice.toLocaleString()}/month (${billingCycle === 'annual' ? 'Annual commitment' : 'Monthly'})`;
    onNavigateToContact(note);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#0c0a09] font-sans selection:bg-[#d97706] selection:text-white pb-24">
      
      {/* Top Professional Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-6 sm:px-12 py-4.5 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 hover:text-black transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Platform</span>
        </button>

        <div className="flex items-center gap-2.5 cursor-pointer" onClick={onBack}>
          <div className="w-8 h-8 rounded-lg bg-[#d97706] flex items-center justify-center text-white font-black text-sm shadow-sm">
            A
          </div>
          <span className="font-black text-lg text-[#0c0a09] tracking-tight">AMBER</span>
          <span className="text-stone-300">|</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Calculator</span>
        </div>

        <button
          type="button"
          onClick={() => onNavigateToContact()}
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
        >
          <span>Schedule Call</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 sm:px-10 pt-10 sm:pt-14">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
            <span>Algorithmic Infrastructure Quoting</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#0c0a09] tracking-tight leading-tight">
            Transparent Pricing. <br />
            <span className="text-[#d97706]">Modeled for Your Exact Scale.</span>
          </h1>

          <p className="mt-3.5 text-stone-600 text-sm sm:text-base leading-relaxed">
            Zero per-seat taxes. Zero unpredictable LLM token surprises. Configure your cluster’s nodes, microservices, and autonomous remediation quotas with guaranteed in-VPC privacy.
          </p>
        </div>

        {/* 2-Column Split: Sliders vs Dynamic Quote Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Clean White Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Control 1: Monitored Nodes */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm hover:border-amber-400/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-[#d97706]">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900">Monitored Cloud &amp; K8s Nodes</h3>
                    <p className="text-xs text-stone-500">Total VM instances, EC2 hosts, and Kubernetes worker nodes</p>
                  </div>
                </div>
                <span className="font-mono text-sm font-bold px-3 py-1 rounded-lg bg-stone-100 text-stone-900 border border-stone-200">
                  {nodes} Nodes
                </span>
              </div>

              <input
                type="range"
                min={50}
                max={1000}
                step={10}
                value={nodes}
                onChange={(e) => setNodes(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#d97706]"
              />

              <div className="flex justify-between text-[11px] font-mono text-stone-500 mt-2">
                <span>50 Nodes (Community Floor)</span>
                <span>500 Nodes</span>
                <span>1,000+ Nodes</span>
              </div>
            </div>

            {/* Control 2: Active Microservices */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm hover:border-amber-400/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-[#d97706]">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900">Active Production Microservices</h3>
                    <p className="text-xs text-stone-500">Distinct services with dedicated telemetry &amp; runbook mapping</p>
                  </div>
                </div>
                <span className="font-mono text-sm font-bold px-3 py-1 rounded-lg bg-stone-100 text-stone-900 border border-stone-200">
                  {services} Services
                </span>
              </div>

              <input
                type="range"
                min={15}
                max={200}
                step={5}
                value={services}
                onChange={(e) => setServices(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#d97706]"
              />

              <div className="flex justify-between text-[11px] font-mono text-stone-500 mt-2">
                <span>15 Services</span>
                <span>100 Services</span>
                <span>200+ Services</span>
              </div>
            </div>

            {/* Control 3: Mutating Remediations */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm hover:border-amber-400/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-[#d97706]">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900">Monthly Mutating Actions</h3>
                    <p className="text-xs text-stone-500">Autonomous pod restarts, connection drains &amp; rollbacks</p>
                  </div>
                </div>
                <span className="font-mono text-sm font-bold px-3 py-1 rounded-lg bg-stone-100 text-stone-900 border border-stone-200">
                  {mutatingFixes} Fixes / mo
                </span>
              </div>

              <input
                type="range"
                min={100}
                max={1000}
                step={50}
                value={mutatingFixes}
                onChange={(e) => setMutatingFixes(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#d97706]"
              />

              <div className="flex justify-between text-[11px] font-mono text-stone-500 mt-2">
                <span>100 Fixes (Included Base)</span>
                <span>500 Fixes</span>
                <span>1,000+ Fixes</span>
              </div>
            </div>

            {/* Control 4: Dedicated Incident Bridge SLA */}
            <div 
              onClick={() => setDedicatedSla(!dedicatedSla)}
              className={`border rounded-2xl p-5 flex items-center justify-between cursor-pointer transition-all shadow-sm ${
                dedicatedSla 
                  ? 'bg-amber-50/70 border-[#d97706]' 
                  : 'bg-white border-stone-200/90 hover:border-stone-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                  dedicatedSla ? 'bg-[#d97706] border-[#d97706] text-white' : 'border-stone-300 bg-white'
                }`}>
                  {dedicatedSla && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-stone-900">Dedicated Incident Bridge SLA (&lt; 15-min Response)</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 uppercase">
                      Recommended for P0
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    An Amber Principal SRE directly joins your private incident war room if autonomous healing halts.
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy Guarantee Note */}
            <div className="p-4 rounded-xl bg-stone-100/80 border border-stone-200 flex items-start gap-3 text-xs text-stone-600">
              <Lock className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900">Air-Gapped In-VPC Guarantee:</strong> Your telemetry never leaves your cloud. Amber operates as a single-tenant software appliance on customer infrastructure with offline Ed25519 verification.
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Quote Card (5 Cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white border-2 border-stone-900 rounded-3xl p-7 shadow-xl relative overflow-hidden">
              
              {/* Badge & Cycle Toggle */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#d97706]">
                  Computed Infrastructure Quote
                </span>
                
                {/* Billing Cycle Pill */}
                <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-xs">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('annual')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                      billingCycle === 'annual' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                    }`}
                  >
                    Annual (-18%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                      billingCycle === 'monthly' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              <h2 className="text-2xl font-black text-stone-900 tracking-tight">
                Custom Enterprise Tier
              </h2>
              <p className="text-stone-500 text-xs mt-1">
                Dedicated single-tenant SRE engine with offline signed license key.
              </p>

              {/* Price Block */}
              <div className={`py-6 my-6 border-y border-stone-200/80 transition-opacity duration-200 ${isCalculating ? 'opacity-60' : 'opacity-100'}`}>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-stone-950 tracking-tight">
                    ${monthlyPrice.toLocaleString()}
                  </span>
                  <span className="text-stone-500 text-xs font-bold uppercase tracking-wider">
                    / month
                  </span>
                </div>
                <div className="text-xs font-bold text-[#b45309] mt-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {billingCycle === 'annual' 
                      ? `$${(monthlyPrice * 12).toLocaleString()} billed annually • Save $${annualSavings.toLocaleString()}/yr`
                      : 'Billed monthly • Cancel anytime'}
                  </span>
                </div>
              </div>

              {/* Quota Breakdown Table */}
              <div className="space-y-2.5 text-xs text-stone-700 mb-6">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Monitored Nodes:</span>
                  <span className="font-bold text-stone-900">{nodes} Cloud / K8s Nodes</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Microservice Quota:</span>
                  <span className="font-bold text-stone-900">{services} Active Services</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Autonomous Actions:</span>
                  <span className="font-bold text-[#d97706]">{mutatingFixes} Verified Fixes / mo</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Incident Escalation:</span>
                  <span className={`font-bold ${dedicatedSla ? 'text-emerald-700' : 'text-stone-700'}`}>
                    {dedicatedSla ? '< 15-min Principal SRE' : 'Standard Slack / Email'}
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
                onClick={handleApplyQuote}
                className="w-full py-3.5 px-5 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#d97706]/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Lock In Quote &amp; Deploy</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-4 text-center text-[11px] text-stone-400">
                Quotes are guaranteed for 30 days upon submission.
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Feature Confidence Grid */}
        <div className="mt-16 pt-12 border-t border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-[#d97706] mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-stone-900 mb-1">Deterministic Safe Execution</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every remediation action requires cryptographic SHA-256 parameter binding and strict static allowlist verification.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-[#d97706] mb-3">
              <Lock className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-stone-900 mb-1">Zero Training on Telemetry</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Run offline via local Ollama compute. Customer error traces and configurations never train public AI models.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-[#d97706] mb-3">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-stone-900 mb-1">Custom Runbook Engineering</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Our engineering team works with your SREs to author and validate custom runbooks for your proprietary services.
            </p>
          </div>
        </div>

      </main>

    </div>
  );
};
