import { cn } from '../../utils/cn';

export type Status = 'safe' | 'caution' | 'warn' | 'danger';

type StatusBadgeProps = {
  status: Status;
  children: React.ReactNode;
  className?: string;
};

const styles: Record<Status, string> = {
  safe: 'bg-status-safe text-gray-0',
  caution: 'bg-status-caution text-gray-900', // Figma에서 caution만 글자색이 어두움
  warn: 'bg-status-warn text-gray-0',
  danger: 'bg-status-danger text-gray-0',
};

export default function StatusBadge({ status, children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-badge px-[10px] py-[3px] text-caption-m',
        styles[status],
        className,
      )}
    >
      {children}
    </span>
  );
}
