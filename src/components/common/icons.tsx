type IconProps = { className?: string };

export function SearchIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="5.25" />
      <path d="M12 12l3.5 3.5" />
    </svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9 15.5l-1.1-1C4.3 11.3 2 9.2 2 6.6 2 4.5 3.6 3 5.6 3c1.2 0 2.4.6 3.4 1.7C10 3.6 11.2 3 12.4 3 14.4 3 16 4.5 16 6.6c0 2.6-2.3 4.7-5.9 7.9L9 15.5z" />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 3.5L10.5 8 6 12.5" />
    </svg>
  );
}
