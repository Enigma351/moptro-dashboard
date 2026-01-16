import { useEffect, useState } from 'react';
import { apiFetch } from '@/utils/apiClient';

type Setting = {
  key: string;
  label: string;
  enabled: boolean;
};

export default function PlatformSettings() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  
  useEffect(() => {
    apiFetch('/dashboard/settings')
      .then((res) => {
        setSettings(Array.isArray(res) ? res : []);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  /* toggle */
  const toggleSetting = async (key: string) => {
    
    const current = settings.find((s) => s.key === key);
    if (!current) return;

    const nextEnabled = !current.enabled;

    
    setSettings((prev) =>
      prev.map((s) =>
        s.key === key ? { ...s, enabled: nextEnabled } : s
      )
    );

    try {
      await apiFetch('/dashboard/settings', {
        method: 'PUT',
        body: JSON.stringify({
          key,
          enabled: nextEnabled,
        }),
      });
    } catch {
      // rollback 
      setSettings((prev) =>
        prev.map((s) =>
          s.key === key ? { ...s, enabled: current.enabled } : s
        )
      );
    }
  };

  
  if (loading) {
    return (
      <div className="absolute rounded-[20px] backdrop-blur p-6 flex items-center justify-center"
        style={{
          top: '680px',
          left: '35px',
          width: '360px',
          height: '330px',
          background:
            'linear-gradient(135deg, #060B28F0 0%, #0A0E237D 100%)',
        }}>
        <p className="text-white/60">Loading settings…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute rounded-[20px] backdrop-blur p-6 flex items-center justify-center"
        style={{
          top: '680px',
          left: '35px',
          width: '360px',
          height: '330px',
          background:
            'linear-gradient(135deg, #060B28F0 0%, #0A0E237D 100%)',
        }}>
        <p className="text-red-400">Failed to load settings</p>
      </div>
    );
  }

  
  return (
    <div
      className="absolute rounded-[20px] backdrop-blur p-6"
      style={{
        top: '680px',
        left: '35px',
        width: '360px',
        height: '330px',
        background:
          'linear-gradient(135deg, #060B28F0 0%, #0A0E237D 100%)',
      }}
    >
      <h3 className="text-lg font-bold">Platform Settings</h3>

      <div className="space-y-4 mt-6">
        {settings.map((item) => (
          <div key={item.key} className="flex justify-between items-center">
            <span className="text-xs text-white/70">
              {item.label}
            </span>

            <button
              onClick={() => toggleSetting(item.key)}
              className={`w-[36px] h-[18px] rounded-full relative transition-colors duration-200 ${
                item.enabled ? 'bg-blue-600' : 'bg-gray-500'
              }`}
            >
              <div
                className={`absolute top-[2px] w-[14px] h-[14px] bg-white rounded-full transition-transform duration-200 ${
                  item.enabled ? 'translate-x-[18px]' : 'translate-x-[2px]'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
