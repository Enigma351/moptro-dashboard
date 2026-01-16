import { useEffect, useState } from 'react';

import ChargeIcon from '@/assets/charge.svg';
import CarIcon from '@/assets/Group.svg';
import ChargingIcon from '@/assets/Charging.svg';
import { apiFetch } from '@/utils/apiClient';

function Stat({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon?: string;
}) {
  return (
    <div className="bg-white/5 rounded-[15px] px-4 py-6 flex justify-between items-center">
      <div>
        <p className="text-xs text-white/60">{title}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>

      {icon && (
        <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
          <img src={icon} alt="" />
        </div>
      )}
    </div>
  );
}

type OverviewData = {
  battery: number;
  chargingStatus: string;
  chargingTime: string;
  batteryHealth: number;
  efficiency: number;
  consumption: number;
  distance: number;
};

export default function MopTroInfo({
  user,
}: {
  user?: { name?: string };
}) {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    apiFetch('/dashboard/overview')
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  /* loading */
  if (loading) {
    return (
      <div
        className="absolute rounded-[20px] backdrop-blur p-6 flex items-center justify-center"
        style={{
          top: '270px',
          left: '35px',
          width: '730px',
          height: '377px',
          background:
            'linear-gradient(135deg, #060B28F0 0%, #0A0E237D 100%)',
        }}
      >
        <p className="text-white/60 animate-pulse">
          Loading MOPTrO data…
        </p>
      </div>
    );
  }

  /* error */
  if (error || !data) {
    return (
      <div
        className="absolute rounded-[20px] backdrop-blur p-6 flex items-center justify-center"
        style={{
          top: '270px',
          left: '35px',
          width: '730px',
          height: '377px',
          background:
            'linear-gradient(135deg, #060B28F0 0%, #0A0E237D 100%)',
        }}
      >
        <p className="text-red-400">
          Failed to load MOPTrO information
        </p>
      </div>
    );
  }

   
  return (
    <div
      className="absolute rounded-[20px] backdrop-blur p-6"
      style={{
        top: '270px',
        left: '35px',
        width: '730px',
        height: '377px',
        background:
          'linear-gradient(135deg, #060B28F0 0%, #0A0E237D 100%)',
      }}
    >
      <h3 className="text-lg font-bold">
        MOPTrO Information
      </h3>

      <p className="text-sm text-white/60 mt-1">
        Hello, {user?.name ?? 'Guest'}! Your MOPTrO is ready.
      </p>

      <div className="flex gap-6 mt-8">
        {/* battery */}
        <div className="text-center">
          <div className="w-[160px] h-[160px] rounded-full flex items-center justify-center bg-gradient-to-b from-[#05CD99] to-transparent">
            <div>
              <img src={ChargeIcon} className="mx-auto mb-2" />
              <p className="text-3xl font-bold">
                {data.battery}%
              </p>
              <p className="text-xs">
                {data.chargingStatus}
              </p>
            </div>
          </div>

          <p className="mt-4">
            {data.chargingTime}
          </p>
          <p className="text-xs text-white/60">
            Time to full charge
          </p>
        </div>

        {/* stats */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          <Stat
            title="Battery Health"
            value={`${data.batteryHealth}%`}
            icon={CarIcon}
          />
          <Stat
            title="Efficiency"
            value={`+${data.efficiency}%`}
          />
          <Stat
            title="Consumption"
            value={`${data.consumption} W/km`}
            icon={ChargingIcon}
          />
          <Stat
            title="This Week"
            value={`${data.distance} km`}
          />
        </div>
      </div>
    </div>
  );
}
