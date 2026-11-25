import { cn } from '../../utils/cn';
import { ChevronRightIcon, HeartIcon } from './icons';

type ListCardProps = {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function ListCard({
  title,
  subtitle,
  icon = <HeartIcon className="text-pink-500" />,
  onClick,
  className,
}: ListCardProps) {
  const classes = cn(
    'flex w-full items-center gap-[10px] rounded-button border border-gray-100 bg-gray-0 p-[10px] text-left',
    onClick && 'transition-colors active:bg-gray-100',
    className,
  );

  const content = (
    <>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-pink-200">
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-px">
        <span className="truncate text-caption-m text-gray-900">{title}</span>
        <span className="truncate text-micro text-gray-600">{subtitle}</span>
      </span>
      <ChevronRightIcon className="shrink-0 text-gray-600" />
    </>
  );

  return onClick ? (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  ) : (
    <div className={classes}>{content}</div>
  );
}
