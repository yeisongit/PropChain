export function scrollToTopSmooth(): void {
  if (typeof window === 'undefined') return;
  try {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch {
    window.scrollTo(0, 0);
  }
}
