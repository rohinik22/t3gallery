'use client';

import { type ElementRef, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [isMounted]);

  function onDismiss() {
    router.back();
  }

  if (!isMounted) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <div className="fixed inset-0 z-40 bg-black/80 flex items-start justify-center">
      <dialog
        ref={dialogRef}
        className="mt-[98px] border-none p-0 bg-transparent open:flex items-start justify-center"
        onClose={onDismiss}
      >
        {children}
      </dialog>
    </div>,
    modalRoot
  );
}
