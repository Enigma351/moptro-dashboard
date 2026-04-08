import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { CreditCard, CheckCircle2, Download, Zap, FileText, LayoutGrid } from 'lucide-react';
import { apiFetch } from '@/services/apiClient';
import PlanModal from '../components/PlanModal';
import PaymentModal from '../components/PaymentModal';

type BillingInfo = {
  planName: string;
  price: string;
  nextPayment: string;
  paymentMethod: {
    cardType: string;
    last4: string;
    expiry: string;
  };
};

type Invoice = {
  _id: string;
  invoiceId: string;
  date: string;
  amount: string;
  status: string;
};

export default function BillingPage() {
  const [billing, setBilling] = useState<BillingInfo | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [billingData, invoiceData] = await Promise.all([
          apiFetch('/dashboard/billing'),
          apiFetch('/dashboard/invoices')
        ]);
        setBilling(billingData);
        setInvoices(invoiceData);
      } catch (err) {
        console.error('Failed to fetch billing data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePlanUpdate = async (planId: string) => {

    try {
      const updatedSub = await apiFetch('/dashboard/billing/plan', {
        method: 'POST',
        body: JSON.stringify({ planId })
      });
      setBilling(updatedSub);
      setIsPlanModalOpen(false);
    } catch (err) {
      console.error('Failed to update plan', err);
    } finally {

    }
  };

  const handleTerminate = async () => {
    if (!window.confirm("PROTOCOL: Revert to previous fleet subscription tier? Current upgrades will be decommissioned.")) return;
    

    try {
      const updatedSub = await apiFetch('/dashboard/billing/terminate', {
        method: 'POST'
      });
      setBilling(updatedSub);
      // Refresh invoices as a new termination record was added
      const invoiceData = await apiFetch('/dashboard/invoices');
      setInvoices(invoiceData);
    } catch (err) {
      console.error('Failed to terminate license', err);
    } finally {

    }
  };

  const handlePaymentUpdate = (newMethod: any) => {
    if (billing) {
      setBilling({ ...billing, paymentMethod: newMethod });
    }
  };

  if (loading || !billing) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Typography variant="small" className="animate-pulse tracking-[4px]">Synchronizing Fiscal Node…</Typography>
      </div>
    );
  }

  const isDeactivated = billing.planName === 'DEACTIVATED';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-7xl mx-auto pb-20"
    >
      <div className="flex flex-col gap-2">
        <Typography variant="h2">Fleet Energy & Plans</Typography>
        <Typography variant="p" className="text-white/50">Oversee your enterprise energy allocation, active fleet subscriptions, and commercial billing telemetry.</Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Plan Card */}
        <Card variant="glass" className={`lg:col-span-2 relative overflow-hidden group transition-all duration-700 ${isDeactivated ? "filter grayscale opacity-80" : ""}`}>
          <div className={`absolute top-0 right-0 w-64 h-64 blur-[80px] pointer-events-none transition-all duration-700 ${isDeactivated ? "bg-red-500/10 group-hover:bg-red-500/20" : "bg-[#0075FF]/10 group-hover:bg-[#0075FF]/20"}`} />
          <CardContent className="p-6 sm:p-8 relative z-10">
            <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-12">
              <div className="flex-1">
                <motion.span 
                  key={billing.planName}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`px-3 py-1 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] rounded-full border inline-block ${
                    isDeactivated ? "bg-red-500/20 text-red-500 border-red-500/30" : "bg-[#0075FF]/20 text-[#0075FF] border-[#0075FF]/30"
                  }`}
                >
                  {isDeactivated ? "License Revoked" : "Active Plan"}
                </motion.span>
                <Typography variant="h2" className="mt-4 mb-2 text-2xl sm:text-3xl">{isDeactivated ? "No Active Subscription" : billing.planName}</Typography>
                <Typography variant="p" className="text-white/60 text-xs sm:text-sm max-w-sm">
                  {isDeactivated 
                    ? "Your fleet license has been terminated. All neural navigation and telemetry nodes have been disconnected." 
                    : "Full infrastructure access for large-scale electric fleets, providing high-fidelity telemetrics and synchronized charging management."}
                </Typography>
                <div className="mt-6 sm:mt-8 flex items-baseline gap-2">
                  <Typography variant="h1" className="text-white uppercase text-4xl sm:text-6xl">{billing.price}</Typography>
                  <Typography variant="small" className="text-white/40">{isDeactivated ? "" : "/ MONTH"}</Typography>
                </div>
              </div>
              
              <div className="flex flex-col justify-between sm:text-right border-t sm:border-t-0 sm:border-l border-white/10 pt-6 sm:pt-0 sm:pl-10 min-w-0 sm:min-w-[240px]">
                <div>
                  <Typography variant="small" className="text-white/40 block mb-1">{isDeactivated ? "Termination Date" : "Next Payment Due"}</Typography>
                  <Typography variant="h3">{isDeactivated ? "EFFECTIVE IMMEDIATELY" : billing.nextPayment}</Typography>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <Button 
                    onClick={() => setIsPlanModalOpen(true)}
                    className={`w-full font-black uppercase tracking-[0.2em] text-[10px] h-16 rounded-2xl transition-all active:scale-95 shadow-xl ${
                      isDeactivated ? "bg-[#0075FF] text-white hover:bg-[#125eff] shadow-[#0075FF]/30" : "bg-white text-black hover:bg-neutral-200 shadow-white/10"
                    }`}
                  >
                    {isDeactivated ? "Reactive Fleet" : "Change Tier"}
                  </Button>
                  {!isDeactivated && (
                    <Button 
                      onClick={handleTerminate}
                      variant="outline" 
                      className="w-full border-white/10 text-white hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 uppercase tracking-[0.2em] text-[10px] h-16 rounded-2xl transition-all opacity-40 hover:opacity-100"
                    >
                      Terminate License
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="lg:col-span-1 p-0 overflow-hidden">
          <CardTitle className="p-6 pb-2 flex items-center justify-between text-sm uppercase tracking-[0.2em] font-black opacity-40">
            Payment Method
            <Zap size={14} className="text-[#0075FF]" />
          </CardTitle>
          <CardContent className="p-6">
            <div className="h-44 rounded-3xl bg-gradient-to-br from-[#1A1F35] to-[#0A0D1C] border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl group cursor-pointer" onClick={() => setIsPaymentModalOpen(true)}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0075FF]/10 blur-[50px] transition-all duration-700 group-hover:bg-[#0075FF]/20" />
              <div className="flex justify-between items-start">
                <CreditCard size={24} className="text-white/80" />
                <Typography variant="small" className="font-mono text-white/40">{billing.paymentMethod.cardType}</Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="h3" className="font-mono text-lg tracking-[4px] mt-4">•••• •••• •••• {billing.paymentMethod.last4}</Typography>
                <div className="flex justify-between items-center opacity-40 mt-3 text-[10px] font-mono">
                  <span>EXP {billing.paymentMethod.expiry}</span>
                  <div className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-[#01b574]" /> ENCRYPTED</div>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => setIsPaymentModalOpen(true)}
              className="w-full mt-6 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/5 text-[10px] tracking-[0.2em] uppercase rounded-xl h-12 transition-all"
            >
              Update Primary Node
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Invoice History */}
      <Card variant="glass" className="border-none shadow-3xl overflow-hidden">
        <div className="p-8 flex items-center justify-between">
           <Typography variant="h3" className="text-xl uppercase tracking-tighter">Fiscal Telemetry</Typography>
           <div className="p-2 bg-white/5 rounded-lg border border-white/5">
             <FileText size={18} className="text-white/40" />
           </div>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto hidden sm:block">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-white/10 uppercase tracking-[0.2em] text-[9px] text-white/30 bg-white/2">
                  <th className="px-8 py-5 font-black">Fiscal Index</th>
                  <th className="px-8 py-5 font-black">Sync Date</th>
                  <th className="px-8 py-5 font-black">Kinetic Cost</th>
                  <th className="px-8 py-5 font-black">Status</th>
                  <th className="px-8 py-5 font-black text-right">Download</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv: Invoice) => (
                  <tr key={inv._id} className="border-b border-white/5 hover:bg-white/5 transition-all group cursor-pointer">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#0075FF]/10 group-hover:border-[#0075FF]/20 transition-all">
                          <LayoutGrid size={14} className="text-white/40 group-hover:text-[#0075FF]" />
                        </div>
                        <Typography variant="small" className="font-mono text-white/80">{inv.invoiceId}</Typography>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-white/60 text-xs font-bold">{inv.date}</td>
                    <td className="px-8 py-5 font-mono text-sm text-[#0075FF] font-black">{inv.amount}</td>
                    <td className="px-8 py-5">
                      <span className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-lg border flex items-center gap-2 w-fit ${
                        inv.status === 'Paid' ? "bg-[#01b574]/10 text-[#01b574] border-[#01b574]/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${inv.status === 'Paid' ? "bg-[#01b574] shadow-[0_0_10px_#01b574]" : "bg-yellow-500"}`} />
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl text-white/20 hover:text-[#0075FF] hover:bg-[#0075FF]/10 transition-all">
                        <Download size={18} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Invoice View */}
          <div className="flex flex-col sm:hidden divide-y divide-white/5">
            {invoices.map((inv: Invoice) => (
              <div key={inv._id} className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <LayoutGrid size={12} className="text-white/40" />
                    </div>
                    <Typography variant="small" className="font-mono text-white/80">{inv.invoiceId}</Typography>
                  </div>
                  <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-md border ${
                    inv.status === 'Paid' ? "bg-[#01b574]/10 text-[#01b574] border-[#01b574]/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                  }`}>
                    {inv.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <Typography variant="small" className="text-white/40 text-[10px] block mb-1">Sync Date</Typography>
                    <Typography variant="small" className="text-white/80 font-bold">{inv.date}</Typography>
                  </div>
                  <div className="text-right">
                    <Typography variant="small" className="text-white/40 text-[10px] block mb-1">Kinetic Cost</Typography>
                    <Typography variant="small" className="text-[#0075FF] font-black font-mono">{inv.amount}</Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>


      {/* Modals */}
      <PlanModal 
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        onSelect={handlePlanUpdate}
        currentPlan={billing.planName}
      />

      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onUpdate={handlePaymentUpdate}
        currentMethod={billing.paymentMethod}
      />
      
    </motion.div>
  );
}
