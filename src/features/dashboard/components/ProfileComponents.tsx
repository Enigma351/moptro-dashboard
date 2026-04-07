import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

/* Timeline Item Component */
interface TimelineItemProps {
  event: string;
  time: string;
  status: 'success' | 'warning' | 'default';
}

export const TimelineItem = ({ event, time, status }: TimelineItemProps) => {
  const statusColors = {
    success: 'bg-[#01b574]',
    warning: 'bg-yellow-500',
    default: 'bg-white/40'
  };
  
  return (
    <li className="flex gap-4 group">
      <div className="flex flex-col items-center">
        <div className={cn('w-2.5 h-2.5 rounded-full mt-1.5 transition-transform group-hover:scale-125 duration-300', statusColors[status])} />
        <div className="w-[1px] h-full bg-white/5 min-h-[40px]" />
      </div>
      <div className="flex flex-col gap-1 pb-4">
        <Typography variant="p" className="text-sm font-bold text-white/90 leading-snug">{event}</Typography>
        <Typography variant="small" className="text-white/20">{time}</Typography>
      </div>
    </li>
  );
};

/* Field Component */
interface FieldProps {
  label: string;
  value: string;
  editable: boolean;
  onChange?: (v: string) => void;
}

export const ProfileField = ({ label, value, editable, onChange }: FieldProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Typography variant="small" className="text-white/30">{label}</Typography>
      {editable ? (
        <input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#0075FF] transition-all font-bold text-white shadow-inner"
        />
      ) : (
        <Typography variant="large" className="text-white/80">{value}</Typography>
      )}
    </div>
  );
};
