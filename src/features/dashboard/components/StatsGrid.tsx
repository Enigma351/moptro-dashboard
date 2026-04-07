import { type LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

interface StatProps {
  label: string;
  value: string;
  icon: LucideIcon;
  className?: string;
}

export const StatItem = ({ label, value, icon: Icon, className }: StatProps) => {
  return (
    <Card variant="glass" className={cn('p-6 hover:bg-white/10 transition-all group border-none', className)}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#0075FF]/20 flex items-center justify-center text-[#0075FF]">
          <Icon size={24} />
        </div>
        <div className="flex flex-col">
          <Typography variant="small" className="text-white/30">{label}</Typography>
          <Typography variant="large" className="group-hover:text-white transition-colors">{value}</Typography>
        </div>
      </div>
    </Card>
  );
};

interface StatsGridProps {
  stats: StatProps[];
  columns?: number;
}

export default function StatsGrid({ stats, columns = 4 }: StatsGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-6', gridCols[columns as keyof typeof gridCols] || gridCols[4])}>
      {stats.map((stat, index) => (
        <StatItem key={index} {...stat} />
      ))}
    </div>
  );
}
