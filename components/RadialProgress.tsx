interface RadialProgressProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  colorClassName?: string;
}

export function RadialProgress({
  percent,
  size = 128,
  strokeWidth = 10,
  colorClassName = "text-indigo-400",
}: RadialProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(Math.max(percent, 0), 100) / 100);
  const center = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="-rotate-90"
      role="img"
      aria-label={`${percent}%`}
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        strokeWidth={strokeWidth}
        className="stroke-neutral-800"
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className={`${colorClassName} transition-[stroke-dashoffset] duration-700 ease-out`}
        stroke="currentColor"
      />
    </svg>
  );
}
