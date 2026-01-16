import { useEffect, useState } from 'react';
import { apiFetch } from '@/utils/apiClient';

type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  apiFetch('/dashboard/products')
    .then((res) => {
      console.log('PRODUCTS API RESPONSE 👉', res);
      setProducts(res);
    })
    .finally(() => setLoading(false));
}, []);


  if (loading) {
    return (
      <div
        className="absolute rounded-[20px] backdrop-blur p-6 flex items-center justify-center"
        style={{
          top: '680px',
          left: '420px',
          width: '910px',
          height: '430px',
          background:
            'linear-gradient(135deg, #060B28F0 0%, #0A0E237D 100%)',
        }}
      >
        <p className="text-white/60">Loading products…</p>
      </div>
    );
  }

  return (
    <div
      className="absolute rounded-[20px] backdrop-blur p-6"
      style={{
        top: '680px',
        left: '420px',
        width: '910px',
        height: '430px',
        background:
          'linear-gradient(135deg, #060B28F0 0%, #0A0E237D 100%)',
      }}
    >
      <h3 className="text-lg font-bold">Products</h3>
      <p className="text-sm text-white/60">
        Architects design houses
      </p>

      <div className="grid grid-cols-3 gap-6 mt-6">
        {products.map((product, i) => (
          <div
            key={product.id}
            className="bg-white/5 rounded-[20px] overflow-hidden"
          >
            
            <div className="h-[140px] rounded-t-[20px] bg-black/30 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <p className="text-xs text-white/60">
                Vehicle #{i + 1}
              </p>

              <p className="font-bold">{product.name}</p>

              <p className="text-xs text-white/50 mt-2">
                {product.description}
              </p>

              <button className="mt-4 px-4 py-1 text-xs border rounded-full">
                Info
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
