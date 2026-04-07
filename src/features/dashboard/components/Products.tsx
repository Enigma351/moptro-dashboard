import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '@/services/apiClient';
import { ArrowRight } from 'lucide-react';

type Product = {
  _id: string;
  id: number;
  name: string;
  image: string;
  description: string;
};

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/dashboard/products')
      .then((res: Product[]) => {
        setProducts(res);
      })
      .finally(() => setLoading(false));
  }, []);

  const cardBaseStyle = "rounded-[24px] p-6 sm:p-8 w-full min-h-[380px] flex flex-col border border-white/10 shadow-2xl relative overflow-hidden";
  const cardBgStyle = {
    background: 'linear-gradient(135deg, rgba(6, 11, 40, 0.94) 0%, rgba(10, 14, 35, 0.49) 100%)',
  };

  if (loading) {
    return (
      <div className={`${cardBaseStyle} items-center justify-center`} style={cardBgStyle}>
        <p className="text-white/60 animate-pulse font-black uppercase tracking-widest text-[10px]">Loading fleet…</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cardBaseStyle} 
      style={cardBgStyle}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#0075FF] rounded-full blur-[150px] opacity-10 pointer-events-none" />

      <div className="flex justify-between items-center mb-1 relative z-10">
        <h3 className="text-2xl font-black tracking-tight">Vehicle Fleet</h3>
        <span className="text-[10px] font-black bg-blue-600/20 text-[#0075FF] px-3 py-1 rounded-full border border-blue-600/20 shadow-[0_0_10px_rgba(0,117,255,0.2)]">
          {products.length} MODELS
        </span>
      </div>
      <p className="text-[11px] font-bold text-white/40 uppercase tracking-[3px] mb-8 relative z-10">
        Precision engineering at its peak
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1 relative z-10">
        {products.map((product, i) => (
          <motion.div
            key={product._id || product.id}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative bg-[#0B0F29]/80 rounded-[24px] border border-white/10 overflow-hidden flex flex-col h-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_rgba(0,117,255,0.2)] hover:border-[#0075FF]/30 backdrop-blur-md"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F29] via-transparent to-[#0075FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative h-[180px] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F29] via-transparent to-transparent opacity-80" />
            </div>

            <div className="p-6 flex flex-col flex-1 relative z-10 -mt-8">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-[9px] font-black text-[#0075FF] uppercase tracking-[3px] drop-shadow-[0_0_2px_#0075FF]">Series #{i + 1}</p>
                  <p className="font-black text-xl tracking-tight group-hover:text-white text-white/90 transition-colors mt-1">{product.name}</p>
                </div>
              </div>

              <p className="text-[11px] font-medium text-white/40 leading-relaxed line-clamp-2 mb-8 group-hover:text-white/70 transition-colors">
                {product.description}
              </p>

              <div onClick={() => navigate(`/product/${product._id}`)} className="mt-auto relative h-12 overflow-hidden rounded-xl cursor-pointer">
                {/* Default state button */}
                <div className="absolute inset-0 flex items-center justify-between px-4 text-[#0075FF] font-bold text-[10px] uppercase tracking-[2px] transition-transform duration-500 group-hover:-translate-y-full border border-white/5 rounded-xl bg-white/5">
                  View Details
                  <ArrowRight size={14} />
                </div>
                
                {/* Hover state button */}
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${product._id}`);
                  }}
                  className="absolute inset-0 flex items-center justify-between px-6 bg-gradient-to-r from-[#0075FF] to-[#01b574] text-white font-black text-[10px] uppercase tracking-[2px] translate-y-full group-hover:translate-y-0 transition-transform duration-500 shadow-[0_0_20px_rgba(0,117,255,0.4)] rounded-xl"
                >
                  Configure
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <ArrowRight size={16} />
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
