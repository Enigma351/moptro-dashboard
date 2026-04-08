import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Check, Zap, Rocket, ShieldCheck } from 'lucide-react';

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (planId: string) => void;
  currentPlan: string;
}

export default function PlanModal({ isOpen, onClose, onSelect, currentPlan }: PlanModalProps) {
  const plans = [
    {
      id: 'pro',
      name: 'Pro Fleet Hub',
      price: '₹24,000',
      icon: ShieldCheck,
      color: '#01b574',
      features: ['Up to 10 Vehicles', 'Real-time Telemetry', 'Standard Support', 'Basic AI routing']
    },
    {
      id: 'enterprise',
      name: 'Enterprise Fleet Capacity',
      price: '₹40,000',
      icon: Zap,
      color: '#0075FF',
      features: ['Unlimited Vehicles', 'Full Infrastructure Access', 'Priority Support', 'Advanced Neural Navigation']
    },
    {
      id: 'elite',
      name: 'Elite Quantum Fleet',
      price: '₹80,000',
      icon: Rocket,
      color: '#A0AEC0',
      features: ['Global Satellite Uplink', 'Predictive Maintenance AI', '24/7 Dedicated Console', 'Early Access Tech']
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-[#050B2E] border border-white/10 rounded-[40px] shadow-3xl overflow-hidden flex flex-col"
          >
            <div className="absolute top-0 right-0 p-4 sm:p-8 z-20">
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white/5 bg-black/20 backdrop-blur-md">
                <X size={20} className="sm:w-6 sm:h-6" />
              </Button>
            </div>

            <div className="overflow-y-auto flex-1 scrollbar-hide">
              <div className="p-6 sm:p-10 lg:p-12">
                <div className="text-center mb-10 sm:mb-12">
                  <Typography variant="h2" className="text-3xl sm:text-4xl uppercase tracking-tighter mb-4">Select Fleet Tier</Typography>
                  <Typography variant="p" className="text-white/40 max-w-xl mx-auto uppercase tracking-widest text-[9px] sm:text-[10px] font-black">
                    Calibrate your operational capacity. High-fidelity fleet management requires synchronized tier allocation.
                  </Typography>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <Card 
                      key={plan.id}
                      variant="glass" 
                      className={`relative p-6 sm:p-8 flex flex-col border-2 transition-all duration-500 sm:hover:scale-[1.02] ${
                        currentPlan.includes(plan.name) ? "border-[#0075FF] bg-[#0075FF]/5" : "border-white/5 sm:hover:border-white/20"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                          <plan.icon size={24} style={{ color: plan.color }} />
                        </div>
                        {currentPlan.includes(plan.name) && (
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#0075FF] bg-[#0075FF]/10 px-3 py-1 rounded-full border border-[#0075FF]/20">Active</span>
                        )}
                      </div>

                      <Typography variant="h4" className="mb-2 uppercase text-lg">{plan.name}</Typography>
                      <div className="flex items-baseline gap-1 mb-8">
                        <Typography variant="h2" className="text-3xl">{plan.price}</Typography>
                        <Typography variant="small" className="text-white/20">/ MONTH</Typography>
                      </div>

                      <div className="space-y-4 mb-10 flex-1">
                        {plan.features.map((f) => (
                          <div key={f} className="flex items-center gap-3 text-xs text-white/60">
                            <Check size={14} className="text-[#01b574] shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>

                      <Button 
                        onClick={() => onSelect(plan.id)}
                        disabled={currentPlan.includes(plan.name)}
                        className={`w-full h-12 rounded-xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 ${
                          currentPlan.includes(plan.name) ? "bg-white/5 text-white/20 border border-white/5" : "bg-white text-black sm:hover:bg-neutral-200"
                        }`}
                      >
                        {currentPlan.includes(plan.name) ? "Selected" : "Activate Tier"}
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

  );
}
