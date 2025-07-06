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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <dialog
        ref={dialogRef}
        className="bg-transparent border-none p-0 m-0 max-w-[90vw] max-h-[90vh]"
        onClose={onDismiss}
      >
        <div className="relative">
          {children}
          <button
            onClick={onDismiss}
            className="absolute top-2 right-2 text-white text-3xl"
          >
            ✕
          </button>
        </div>
      </dialog>
    </div>,
    modalRoot
  );
}
