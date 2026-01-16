import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { apiFetch } from '@/utils/apiClient';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  scales: {
    x: { display: false },
    y: { min: 0, max: 100 },
  },
};

type UtilizationData = {
  change: number;
  chart: number[];
  stats: { label: string; value: string }[];
};

export default function UtilizationCard() {
  const [data, setData] = useState<UtilizationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    apiFetch('/dashboard/utilization')
      .then((res) => {
        setData({
          change: res.change ?? 0,
          chart: Array.isArray(res.chart) ? res.chart : [],
          stats: Array.isArray(res.stats) ? res.stats : [],
        });
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="absolute rounded-[20px] backdrop-blur p-6 flex items-center justify-center"
        style={{
          top: '270px',
          left: '790px',
          width: '540px',
          height: '377px',
          background:
            'linear-gradient(135deg, #060B28F0 0%, #0A0E237D 100%)',
        }}
      >
        <p className="text-white/60">Loading utilization…</p>
      </div>
    );
  }

 
  if (error || !data) {
    return (
      <div className="absolute rounded-[20px] backdrop-blur p-6 flex items-center justify-center"
        style={{
          top: '270px',
          left: '790px',
          width: '540px',
          height: '377px',
          background:
            'linear-gradient(135deg, #060B28F0 0%, #0A0E237D 100%)',
        }}
      >
        <p className="text-red-400">Failed to load utilization</p>
      </div>
    );
  }

  const chartData = {
    labels: data.chart.map((_, i) => `${i + 1}`),
    datasets: [
      {
        data: data.chart,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        barThickness: 5,
      },
    ],
  };

  return (
    <div
      className="absolute rounded-[20px] backdrop-blur p-6"
      style={{
        top: '270px',
        left: '790px',
        width: '540px',
        height: '377px',
        background:
          'linear-gradient(135deg, #060B28F0 0%, #0A0E237D 100%)',
      }}
    >
      <h3 className="text-lg font-bold">Utilization</h3>
      <p className="text-sm text-green-400 mt-1">
        (+{data.change}%) than last week
      </p>

      <div className="mt-5 h-[170px] rounded-[15px] bg-black/30 px-4 py-3">
        <Bar data={chartData} options={options} />
      </div>

      <div className="grid grid-cols-4 gap-4 mt-5">
        {data.stats.map((item) => (
          <div
            key={item.label}
            className="bg-white/5 rounded-[15px] p-3"
          >
            <p className="text-[10px] text-white/60">
              {item.label}
            </p>
            <p className="text-[14px] font-bold mt-1">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
