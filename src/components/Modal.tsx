import { useEffect, type ReactNode } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: Props) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-fade-in fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-xs flex items-center justify-center z-1000 p-4"
      onClick={onClose}
    >
      <div
        className="modal-slide-in relative w-full max-w-100 bg-white dark:bg-[#1c1c28] rounded-2xl p-7 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_20px_60px_rgba(0,0,0,0.2),0_4px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3.5 right-3.5 w-7 h-7 flex items-center justify-center text-black/40 dark:text-white/40 bg-black/6 dark:bg-white/8 rounded-lg border-none cursor-pointer transition-all duration-150 hover:bg-black/10 hover:text-black/70 dark:hover:bg-white/12 dark:hover:text-white/70"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {children}
      </div>

      {/* Keyframe animations can't be expressed in Tailwind utility classes */}
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .modal-fade-in  { animation: modalFadeIn  0.15s ease; }
        .modal-slide-in { animation: modalSlideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
};

export default Modal;
