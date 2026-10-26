export function CardNumber({ last4, className }: { last4: string; className?: string }) {
  return (
    <span className={className}>
      <span aria-hidden="true" className="mr-[3px] inline-flex translate-y-[-1px] gap-[2px] align-middle">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="h-[2.4px] w-[2.4px] rounded-full bg-current" />
        ))}
      </span>
      <span className="sr-only">ending </span>
      {last4}
    </span>
  );
}
