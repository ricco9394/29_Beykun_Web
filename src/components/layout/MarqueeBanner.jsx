export function MarqueeBanner({ scrollAmount = 10, children, className }) {
  return (
    <marquee className={className} scrollAmount={scrollAmount}>
      {children}
    </marquee>
  );
}
