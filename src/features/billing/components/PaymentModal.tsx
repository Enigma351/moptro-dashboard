import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { X, CreditCard, ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import { apiFetch } from '@/services/apiClient';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: any) => void;
  currentMethod: { cardType: string; last4: string; expiry: string };
}

export default function PaymentModal({ isOpen, onClose, onUpdate, currentMethod }: PaymentModalProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCardNumber('');
      setExpiry(currentMethod.expiry);
      setCvc('');
      setError(null);
    }
  }, [isOpen, currentMethod]);

  const getCardType = (number: string) => {
    const res = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^6(?:011|5)/,
    };
    for (const [card, regex] of Object.entries(res)) {
      if (regex.test(number)) return card.toUpperCase();
    }
    return 'UNKNOWN';
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(' ') || '';
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setExpiry(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawNumber = cardNumber.replace(/\s/g, '');
    
    if (rawNumber.length < 13) {
      setError('Invalid card number telemetry');
      return;
    }
    if (expiry.length < 5) {
      setError('Invalid expiration node');
      return;
    }

    setIsSyncing(true);
    setError(null);

    try {
      const cardType = getCardType(rawNumber);
      const last4 = rawNumber.slice(-4);
      
      const response = await apiFetch('/dashboard/billing/payment', {
        method: 'POST',
        body: JSON.stringify({
          cardType,
          last4,
          expiry
        })
      });

      onUpdate(response.paymentMethod);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Fiscal synchronization failed');
    } finally {
      setIsSyncing(false);
    }
  };

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
            className="relative w-full max-w-md bg-[#050B2E] border border-white/10 rounded-[40px] shadow-3xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 z-10">
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white/5 text-white/40">
                <X size={20} />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#0075FF]/10 rounded-[24px] border border-[#0075FF]/20 flex items-center justify-center mx-auto mb-6">
                  <CreditCard size={32} className="text-[#0075FF]" />
                </div>
                <Typography variant="h3" className="uppercase tracking-tighter mb-2">Update Core Payment</Typography>
                <Typography variant="p" className="text-white/40 uppercase tracking-widest text-[9px] font-black">
                  Secure nodal encryption active. Syncing with global banking node...
                </Typography>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-400 text-xs font-bold uppercase tracking-widest"
                >
                  <AlertCircle size={14} />
                  {error}
                </motion.div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-2">
                    <Typography variant="small" className="text-white/20 font-black tracking-widest uppercase text-[8px]">Primary Card Ref</Typography>
                    <Typography variant="small" className="text-[#0075FF] font-black tracking-widest uppercase text-[8px]">
                      {getCardType(cardNumber.replace(/\s/g, ''))}
                    </Typography>
                  </div>
                  <div className="relative">
                    <input 
                      type="text"
                      className="w-full h-14 bg-white/5 rounded-2xl border border-white/10 px-6 font-mono text-sm tracking-widest text-white/80 focus:outline-none focus:border-[#0075FF] transition-all"
                      placeholder="XXXX XXXX XXXX XXXX"
                      autoComplete="cc-number"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      required
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-30">
                      <ShieldCheck size={18} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Typography variant="small" className="text-white/20 font-black tracking-widest uppercase text-[8px] ml-2">Expiration</Typography>
                    <input 
                      type="text"
                      className="w-full h-14 bg-white/5 rounded-2xl border border-white/10 px-6 font-mono text-sm text-white/80 focus:outline-none focus:border-[#0075FF]"
                      placeholder="MM/YY"
                      autoComplete="cc-exp"
                      value={expiry}
                      onChange={handleExpiryChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Typography variant="small" className="text-white/20 font-black tracking-widest uppercase text-[8px] ml-2">Security Hash (CVC)</Typography>
                    <input 
                      type="password"
                      className="w-full h-14 bg-white/5 rounded-2xl border border-white/10 px-6 font-mono text-sm text-white/80 focus:outline-none focus:border-[#0075FF]"
                      placeholder="***"
                      autoComplete="cc-csc"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.substring(0, 4))}
                      required
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit"
                disabled={isSyncing}
                className="w-full h-14 bg-[#0075FF] text-white hover:bg-[#125eff] rounded-2xl font-black uppercase tracking-widest text-xs relative overflow-hidden group shadow-[0_15px_30px_rgba(0,117,255,0.2)]"
              >
                {isSyncing ? (
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="animate-pulse" />
                    Synchronizing...
                  </div>
                ) : (
                  "Update Fiscal Node"
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
