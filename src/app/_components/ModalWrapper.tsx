'use client';

import { usePathname } from 'next/navigation';

export function ModalWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isFullImagePage = pathname?.startsWith('/img/');

  if (isFullImagePage) {
    return null;  // Don’t render modal on full image page
  }

  return <>{children}</>;
}
