interface CountUpProps {
  target: number;
  suffix?: string;
  className?: string;
}

export function CountUp({ target, suffix = "", className = "" }: CountUpProps) {
  return (
    <div className={className}>
      {target}
      {suffix}
    </div>
  );
}
