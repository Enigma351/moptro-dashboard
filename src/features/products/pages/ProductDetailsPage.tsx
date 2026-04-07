import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { apiFetch } from '@/services/apiClient';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings2, Zap } from 'lucide-react';

type Product = {
  _id: string;
  id: number;
  name: string;
  image: string;
  description: string;
};

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Step Navigation & Animation State
  const [step, setStep] = useState(1);
  const [isSyncing, setIsSyncing] = useState(false);
  const totalSteps = 4;

  // Configuration States
  const [color, setColor] = useState<'obsidian' | 'pearl' | 'cobalt'>('obsidian');
  const [battery, setBattery] = useState<'standard' | 'long_range'>('standard');
  const [autopilot, setAutopilot] = useState(false);
  const [wheels, setWheels] = useState<'standard' | 'aero'>('standard');
  const [interior, setInterior] = useState<'obsidian' | 'lunar'>('obsidian');
  const [software, setSoftware] = useState<'basic' | 'neural'>('basic');

  useEffect(() => {
    if (!id) return;
    
    apiFetch(`/dashboard/products/${id}`)
      .then((res: Product) => {
        setProduct(res);
      })
      .catch(() => navigate('/dashboard')) 
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleOrder = async () => {
    if (!product) return;
    setSubmitting(true);
    try {
      await apiFetch('/dashboard/orders', {
        method: 'POST',
        body: JSON.stringify({
          productId: product._id,
          color,
          battery,
          autopilot,
          wheels,
          interior,
          softwarePackage: software,
          price: estimatedPrice
        })
      });
      setShowSuccess(true);
      setTimeout(() => navigate('/dashboard'), 3500);
    } catch (err) {
      console.error('Order failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Improved Price Calculator
  const { basePrice, addonPrice, estimatedPrice } = useMemo(() => {
    let base = 2000000;
    if (product?.name === 'WASP') base = 2800000;
    if (product?.name === 'BOLT') base = 3840000;

    let addons = 0;
    if (battery === 'long_range') addons += 400000;
    if (autopilot) addons += 640000;
    if (wheels === 'aero') addons += 200000;
    if (software === 'neural') addons += 360000;
    if (interior === 'lunar') addons += 120000;
    
    const total = base + addons;
    return {
      basePrice: base,
      addonPrice: addons,
      estimatedPrice: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(total)
    };
  }, [product, battery, autopilot, wheels, interior, software]);

  if (loading || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Typography variant="small" className="animate-pulse">CALIBRATING FLEET TELEMETRY…</Typography>
      </div>
    );
  }

  const nextStep = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setStep(s => Math.min(s + 1, totalSteps));
      setIsSyncing(false);
    }, 600);
  };

  const prevStep = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setStep(s => Math.max(s - 1, 1));
      setIsSyncing(false);
    }, 400);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1600px] mx-auto pb-20 relative"
    >
      {showSuccess && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center text-center p-6"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 12 }}
            className="w-32 h-32 bg-[#01b574] rounded-[40px] flex items-center justify-center mb-8 shadow-[0_0_80px_rgba(1,181,116,0.4)]"
          >
            <Zap size={64} className="text-white fill-white" />
          </motion.div>
          <Typography variant="h1" className="text-white mb-4 uppercase text-5xl">Registry Synchronized</Typography>
          <Typography variant="p" className="text-white/60 max-w-md mx-auto mb-10 uppercase text-[10px] font-black">
            The {product.name} node has been verified. Serializing configuration for immediate network-wide distribution.
          </Typography>
          <div className="flex items-center gap-2 text-[#0075FF] font-black uppercase tracking-[0.2em] text-[10px]">
            <span className="w-2 h-2 bg-[#0075FF] rounded-full animate-ping" />
            Initializing Deployment...
          </div>
        </motion.div>
      )}

      {/* Header & Navigation */}
      <div className="mb-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="hover:bg-white/10 rounded-2xl w-14 h-14 border border-white/5 bg-white/2">
            <ArrowLeft size={24} />
          </Button>
          <div>
             <Typography variant="small" className="text-[#0075FF] block mb-1">Command Port 01</Typography>
             <Typography variant="h2" className="text-2xl uppercase">{product.name} <span className="text-white/10 ml-2">/ Fleet Inclusion</span></Typography>
          </div>
        </div>

        {/* Stepper Logic with Sync pulse */}
        <div className="hidden lg:flex items-center gap-12 relative">
           {[1, 2, 3, 4].map((s) => (
             <div key={s} className="flex items-center gap-4 group">
                <div className={`w-10 h-10 rounded-[14px] border-2 flex items-center justify-center text-xs font-black transition-all duration-700 relative overflow-hidden ${
                  step === s ? "border-[#0075FF] bg-[#0075FF] text-white shadow-[0_0_20px_rgba(0,117,255,0.5)]" : 
                  step > s ? "border-[#01b574] bg-[#01b574] text-white" : "border-white/10 text-white/20 bg-white/2"
                }`}>
                  {isSyncing && step === s && (
                    <motion.div initial={{ y: "100%" }} animate={{ y: "-100%" }} transition={{ repeat: Infinity, duration: 1 }} className="absolute inset-0 bg-white/20" />
                  )}
                  {step > s ? "✓" : s}
                </div>
                <div className="flex flex-col hidden xl:flex">
                  <span className={`text-[9px] font-black uppercase tracking-[3px] transition-colors duration-500 ${step === s ? "text-white" : "text-white/20"}`}>
                    {s === 1 ? "Propulsion" : s === 2 ? "Aesthetics" : s === 3 ? "Intelligence" : "Manifest"}
                  </span>
                  <span className="text-[8px] text-white/5 font-bold uppercase tracking-widest">{s === 1 ? "Energy" : s === 2 ? "Skin & Hubs" : s === 3 ? "Neural" : "Summary"}</span>
                </div>
             </div>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        
        {/* LEFT COMPONENT: Dynamic Telemetry Preview */}
        <div className="space-y-12 lg:sticky lg:top-10">
          <div className="relative rounded-[48px] overflow-hidden border border-white/10 shadow-3xl bg-black aspect-video group">
            {/* Sync Overlay Animation */}
            <AnimatePresence>
              {isSyncing && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  className="absolute inset-0 z-40 bg-[#0075FF]/10 backdrop-blur-sm flex items-center justify-center"
                >
                   <div className="flex flex-col items-center gap-6">
                      <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                         <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-full h-full bg-[#0075FF]" />
                      </div>
                      <Typography variant="small" className="text-[#0075FF] font-black uppercase tracking-[6px] text-[10px] animate-pulse">Syncing Telemetry...</Typography>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 z-20" />
            <motion.img 
              key={`${color}-${interior}-${step}`}
              initial={{ scale: 1.1, filter: "blur(10px) brightness(0)" }}
              animate={{ scale: 1, filter: "blur(0px) brightness(1)" }}
              transition={{ duration: 1.2, ease: "circOut" }}
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover relative z-0"
              style={{ filter: color === 'obsidian' ? 'brightness(0.7) grayscale(0.2)' : color === 'pearl' ? 'brightness(1.1) contrast(1.1)' : 'hue-rotate(-15deg) saturate(1.5)' }}
            />
            {/* Holographic Watermark Layer */}
            <div className="absolute top-12 left-12 z-30 pointer-events-none select-none overflow-hidden opacity-20 flex flex-col gap-2">
               <Typography variant="h1" className="text-[120px] font-black leading-none text-white blur-[1px]">{product.name}</Typography>
               <Typography variant="small" className="text-[#0075FF] border-t border-[#0075FF]/30 pt-4">Nodal Inclusion Protocol</Typography>
            </div>
          </div>

          {/* Real-time Specs Display */}
          <div className="grid grid-cols-4 gap-8 px-8">
            {[
              { label: 'Propulsion', value: battery === 'long_range' ? 'HP-EX' : 'HP-ST', sub: 'Drive Unit' },
              { label: 'Efficiency', value: battery === 'long_range' ? '450' : '300', sub: 'MI Range' },
              { label: 'Intelligence', value: software === 'neural' ? 'V12' : 'V9.2', sub: 'Logic Suite' },
              { label: 'Investment', value: estimatedPrice.split('.')[0], sub: 'Incl. Upgrades' },
            ].map((spec, i) => (
              <div key={i} className="flex flex-col gap-2 group cursor-default">
                <Typography variant="small" className="text-white/20 uppercase tracking-[3px] font-black text-[8px] group-hover:text-[#0075FF] transition-colors">{spec.label}</Typography>
                <Typography variant="h3" className="text-xl font-black drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{spec.value}</Typography>
                <Typography variant="small" className="text-white/10 uppercase tracking-widest text-[7px] font-bold">{spec.sub}</Typography>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COMPONENT: Advanced Configuration Matrix */}
        <div className="bg-white/2 backdrop-blur-xl rounded-[40px] border border-white/5 p-8 lg:p-12 min-h-[600px] flex flex-col shadow-2xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {/* STEP 1: PROPULSION */}
            {step === 1 && (
              <motion.div key="st1" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="space-y-10">
                <div>
                  <Typography variant="h2" className="text-4xl font-black tracking-tighter mb-3">Propulsion Terminal</Typography>
                  <Typography variant="p" className="text-white/40 leading-relaxed text-sm max-w-sm uppercase tracking-widest font-bold text-[10px]">Define the core energy density and kinetic potential of your unit.</Typography>
                </div>
                
                <div className="space-y-4">
                   <div onClick={() => setBattery('standard')} className={`p-8 rounded-[32px] border-2 transition-all cursor-pointer flex justify-between items-center ${battery === 'standard' ? "border-[#0075FF] bg-gradient-to-br from-[#0075FF]/10 to-transparent shadow-[0_20px_40px_rgba(0,117,255,0.15)]" : "border-white/5 bg-white/2"}`}>
                     <div>
                       <Typography variant="h4" className="text-xl mb-1 font-black">Standard Core</Typography>
                       <Typography variant="small" className="text-white/30 uppercase tracking-[2px] text-[8px] font-black">300 MI · Optimized Urban Deployment</Typography>
                     </div>
                     <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${battery === 'standard' ? "border-[#0075FF]" : "border-white/20"}`}>
                        {battery === 'standard' && <div className="w-3 h-3 rounded-full bg-[#0075FF]" />}
                     </div>
                   </div>

                    <div onClick={() => setBattery('long_range')} className={`p-8 rounded-[32px] border-2 transition-all cursor-pointer flex justify-between items-center ${battery === 'long_range' ? "border-[#0075FF] bg-gradient-to-br from-[#0075FF]/10 to-transparent shadow-[0_20px_40px_rgba(0,117,255,0.15)]" : "border-white/5 bg-white/2"}`}>
                     <div>
                       <Typography variant="h4" className="text-xl mb-1 font-black text-[#01b574]">Ex-Range Hub</Typography>
                       <Typography variant="small" className="text-[#01b574] uppercase tracking-[2px] text-[8px] font-black">450 MI · Inter-City Nodal Transit</Typography>
                     </div>
                     <div className="text-right">
                        <Typography variant="small" className="text-[#01b574] font-black block mb-2 tracking-widest">+ ₹4,00,000</Typography>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ml-auto ${battery === 'long_range' ? "border-[#0075FF]" : "border-white/20"}`}>
                           {battery === 'long_range' && <div className="w-3 h-3 rounded-full bg-[#0075FF]" />}
                        </div>
                     </div>
                   </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: AESTHETICS (Expanded with Interior) */}
            {step === 2 && (
              <motion.div key="st2" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="space-y-12">
                <div>
                  <Typography variant="h2" className="text-4xl font-black tracking-tighter mb-3">Aesthetic Matrix</Typography>
                  <Typography variant="p" className="text-white/40 leading-relaxed text-sm uppercase tracking-widest font-bold text-[10px]">Customize the visual telemetry and internal environment.</Typography>
                </div>

                {/* Exterior Paint */}
                <div className="space-y-6">
                   <Typography variant="small" className="text-white/20 uppercase tracking-[4px] font-black text-[9px]">Reactive Surface Finish</Typography>
                   <div className="flex gap-8">
                      {[
                        { id: 'obsidian', class: 'bg-black' },
                        { id: 'pearl', class: 'bg-slate-200' },
                        { id: 'cobalt', class: 'bg-[#1e3a8a]' }
                      ].map((c) => (
                        <div key={c.id} className="flex flex-col items-center gap-3">
                           <motion.button 
                             whileHover={{ scale: 1.15 }} onClick={() => setColor(c.id as any)}
                             className={`w-14 h-14 rounded-full p-1 border-2 transition-all ${color === c.id ? "border-[#0075FF] shadow-[0_0_25px_rgba(0,117,255,0.4)]" : "border-transparent"}`}
                           >
                             <div className={`w-full h-full rounded-full ${c.class}`} />
                           </motion.button>
                           <span className={`text-[8px] font-black uppercase tracking-widest ${color === c.id ? "text-white" : "text-white/10"}`}>{c.id}</span>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Interior Environment (NEW) */}
                <div className="space-y-6 pt-4 border-t border-white/5">
                   <Typography variant="small" className="text-white/20 uppercase tracking-[4px] font-black text-[9px]">Interior Neural Environment</Typography>
                   <div className="grid grid-cols-2 gap-4">
                      {[
                        { id: 'obsidian', label: 'Dark Matter', sub: 'Obsidian Black Alcantara' },
                        { id: 'lunar', label: 'Lunar Base', sub: 'Pearl White Vegan Leather', premium: '+₹1.2L' }
                      ].map((int) => (
                        <div key={int.id} onClick={() => setInterior(int.id as any)} className={`p-6 rounded-[28px] border-2 transition-all cursor-pointer ${interior === int.id ? "border-[#0075FF] bg-[#0075FF]/5" : "border-white/5 bg-white/2 hover:bg-white/5"}`}>
                           <div className="flex justify-between items-start mb-1">
                              <Typography variant="small" className="font-black uppercase tracking-widest text-[9px]">{int.label}</Typography>
                              {int.id === 'lunar' && <Typography variant="small" className="text-[#01b574] font-black text-[8px]">{int.premium}</Typography>}
                           </div>
                           <Typography variant="p" className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{int.sub}</Typography>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Wheels Selection (RESTORED) */}
                <div className="space-y-6 pt-4 border-t border-white/5">
                   <Typography variant="small" className="text-white/20 uppercase tracking-[4px] font-black text-[9px]">Aerodynamic Node Hubs</Typography>
                   <div className="grid grid-cols-2 gap-4">
                      <div onClick={() => setWheels('standard')} className={`p-6 rounded-[28px] border-2 transition-all cursor-pointer ${wheels === 'standard' ? "border-[#0075FF] bg-[#0075FF]/5" : "border-white/5 bg-white/2"}`}>
                         <Typography variant="small" className="font-black uppercase tracking-widest text-[10px] block mb-1">Standard Alloys</Typography>
                         <Typography variant="p" className="text-[10px] text-white/30">Stock Performance</Typography>
                      </div>
                      <div onClick={() => setWheels('aero')} className={`p-6 rounded-[28px] border-2 transition-all cursor-pointer ${wheels === 'aero' ? "border-[#0075FF] bg-[#0075FF]/5" : "border-white/5 bg-white/2"}`}>
                         <div className="flex justify-between items-start">
                            <Typography variant="small" className="font-black uppercase tracking-widest text-[10px] block mb-1 text-[#01b574]">Orbital Stealth</Typography>
                            <Typography variant="small" className="text-[#01b574] font-black text-[8px]">+₹2.0L</Typography>
                         </div>
                         <Typography variant="p" className="text-[10px] text-white/30">Reduced Drag Factor</Typography>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: INTELLIGENCE */}
            {step === 3 && (
              <motion.div key="st3" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="space-y-12">
                <div>
                  <Typography variant="h2" className="text-4xl font-black tracking-tighter mb-3">Intelligence Layer</Typography>
                  <Typography variant="p" className="text-white/40 leading-relaxed text-sm max-w-sm uppercase tracking-widest font-bold text-[10px]">Configure the neural processing nodes and connectivity spectrum.</Typography>
                </div>

                <div className="space-y-6">
                   <div onClick={() => setAutopilot(!autopilot)} className={`p-8 rounded-[32px] border-2 transition-all cursor-pointer group flex justify-between items-center ${autopilot ? "border-[#0075FF] bg-gradient-to-br from-[#0075FF]/10 to-transparent" : "border-white/5 bg-white/2"}`}>
                     <div className="flex gap-6 items-center">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#0075FF] border border-white/5">
                           <Settings2 size={28} />
                        </div>
                        <div>
                           <Typography variant="h4" className="text-xl font-black">Neural Autopilot</Typography>
                           <Typography variant="p" className="text-white/30 text-[9px] uppercase tracking-[3px] font-black">Level 5 Autonomous Logic</Typography>
                        </div>
                     </div>
                     <div className="text-right flex flex-col items-end gap-3">
                        <Typography variant="small" className="text-[#01b574] font-black block tracking-widest text-[10px]">+ ₹6,40,000</Typography>
                        <div className={`w-12 h-6 rounded-full transition-all relative ${autopilot ? "bg-[#0075FF] shadow-[0_0_15px_rgba(0,117,255,0.4)]" : "bg-white/10"}`}>
                           <motion.div animate={{ x: autopilot ? 24 : 4 }} className="absolute top-1 left-0 w-4 h-4 rounded-full bg-white shadow-xl shadow-black/50" />
                        </div>
                     </div>
                   </div>

                   <div onClick={() => setSoftware(software === 'neural' ? 'basic' : 'neural')} className={`p-8 rounded-[32px] border-2 transition-all cursor-pointer group flex justify-between items-center ${software === 'neural' ? "border-[#01b574] bg-gradient-to-br from-[#01b574]/10 to-transparent" : "border-white/5 bg-white/2"}`}>
                     <div className="flex gap-6 items-center">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#01b574] border border-white/5">
                           <Zap size={28} />
                        </div>
                        <div>
                           <Typography variant="h4" className="text-xl font-black">Software Node V12</Typography>
                           <Typography variant="p" className="text-white/30 text-[9px] uppercase tracking-[3px] font-black">Satellite Sync + Performance Mapping</Typography>
                        </div>
                     </div>
                     <div className="text-right flex flex-col items-end gap-3">
                        <Typography variant="small" className="text-[#01b574] font-black block tracking-widest text-[10px]">+ ₹3,60,000</Typography>
                        <div className={`w-12 h-6 rounded-full transition-all relative ${software === 'neural' ? "bg-[#01b574] shadow-[0_0_15px_rgba(1,181,116,0.4)]" : "bg-white/10"}`}>
                           <motion.div animate={{ x: software === 'neural' ? 24 : 4 }} className="absolute top-1 left-0 w-4 h-4 rounded-full bg-white shadow-xl shadow-black/50" />
                        </div>
                     </div>
                   </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: MANIFEST (Itemized Review) */}
            {step === 4 && (
              <motion.div key="st4" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="space-y-10">
                <div>
                  <Typography variant="h2" className="text-4xl font-black tracking-tighter mb-3">Registry Manifest</Typography>
                  <Typography variant="p" className="text-white/40 leading-relaxed text-sm uppercase tracking-widest font-bold text-[10px]">Verify all configuration nodes before fleet inclusion.</Typography>
                </div>

                <div className="bg-white/2 rounded-[32px] border border-white/5 p-8 space-y-6 shadow-inner">
                   <div className="space-y-4">
                      {[
                        { label: 'Model Identification', value: product.name, price: `BA: ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(basePrice)}` },
                        { label: 'Propulsion Unit', value: battery.replace('_', ' '), price: battery === 'long_range' ? '+₹4,00,000' : 'Included', highlight: battery === 'long_range' },
                        { label: 'Hub Geometry', value: wheels.replace('_', ' '), price: wheels === 'aero' ? '+₹2,00,000' : 'Included', highlight: wheels === 'aero' },
                        { label: 'Environment Layer', value: interior, price: interior === 'lunar' ? '+₹1,20,000' : 'Included', highlight: interior === 'lunar' },
                        { label: 'Logic Suite', value: autopilot ? 'Neural Autopilot' : 'Standard Logic', price: autopilot ? '+₹6,40,000' : 'Included', highlight: autopilot },
                        { label: 'Software Node', value: software === 'neural' ? 'Premium V12' : 'Basic Hub', price: software === 'neural' ? '+₹3,60,000' : 'Included', highlight: software === 'neural' },
                      ].map((item, id) => (
                        <div key={id} className="flex justify-between items-center group">
                           <div className="flex flex-col">
                              <span className="text-[7px] font-black uppercase tracking-[3px] text-white/20 group-hover:text-white/40 transition-colors">{item.label}</span>
                              <span className="text-[11px] font-black uppercase tracking-widest text-white/80">{item.value}</span>
                           </div>
                           <span className={`text-[9px] font-black uppercase tracking-widest ${item.highlight ? "text-[#01b574]" : "text-white/10"}`}>{item.price}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center group pt-2 border-t border-white/5">
                        <span className="text-[7px] font-black uppercase tracking-[3px] text-white/20">Upgrades Applied</span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#01b574]">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(addonPrice)}</span>
                      </div>
                   </div>
                   
                   <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                      <div>
                         <Typography variant="small" className="text-white/30 uppercase tracking-[5px] font-black text-[9px] block mb-2">Total Investment</Typography>
                         <Typography variant="h3" className="text-5xl font-black tracking-tighter text-[#01b574]">{estimatedPrice.split('.')[0]}</Typography>
                      </div>
                      <div className="text-right">
                         <Typography variant="small" className="text-white/20 uppercase tracking-[2px] font-black text-[8px] block mb-1">Status Code 201</Typography>
                         <Typography variant="small" className="text-[#0075FF] uppercase tracking-[4px] font-black text-[10px]">Ready for Sourcing</Typography>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls Matrix */}
          <div className="mt-auto pt-10 flex gap-8">
             {step > 1 ? (
               <Button variant="ghost" onClick={prevStep} disabled={isSyncing} className="h-20 px-12 rounded-[24px] border border-white/10 font-black uppercase tracking-[4px] text-[10px] hover:bg-white/5 disabled:opacity-20">
                 Back
               </Button>
             ) : (
               <Button variant="ghost" onClick={() => navigate('/dashboard')} className="h-20 px-12 rounded-[24px] border border-white/10 font-black uppercase tracking-[4px] text-[10px] hover:bg-white/5 transition-all">
                 Abort
               </Button>
             )}

             {step < totalSteps ? (
               <Button onClick={nextStep} disabled={isSyncing} className="flex-1 h-20 rounded-[24px] bg-white text-black font-black uppercase tracking-[5px] text-[10px] hover:bg-white/90 shadow-[0_15px_40px_rgba(255,255,255,0.1)] transition-all">
                 {isSyncing ? "Syncing..." : "Commit Step"}
               </Button>
             ) : (
               <Button onClick={handleOrder} disabled={submitting || isSyncing} className="flex-1 h-20 rounded-[24px] bg-[#0075FF] font-black uppercase tracking-[6px] text-[10px] hover:bg-blue-600 shadow-[0_20px_50px_rgba(0,117,255,0.4)] transition-all">
                 {submitting ? 'Authenticating Manifest…' : 'Finalize Inclusion'}
               </Button>
             )}
          </div>

        </div>

      </div>
    </motion.div>
  );
}
