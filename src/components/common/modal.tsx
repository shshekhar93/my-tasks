import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { StyleObject, useStyletron } from 'styletron-react';
import { useIsMobile } from './layout/breakpoints';
import { Flex } from './layout/flex';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  labelledById?: string;
  describedById?: string;
  style?: StyleObject;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  labelledById,
  describedById,
  style,
}) => {
  const [css] = useStyletron();
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      // Focus the modal
      modalRef.current?.focus();
      // Prevent background scroll
      document.body.style.overflow = 'hidden';
    }
    else {
      // Restore focus
      previouslyFocusedElement.current?.focus();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
      else if (e.key === 'Tab') {
        const focusableEls = modalRef.current?.querySelectorAll<HTMLElement>(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusableEls || focusableEls.length === 0) return;
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];
        if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
        else if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Flex
      alignItems="center"
      justifyContent="center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledById || 'modal-title'}
      aria-describedby={describedById}
      tabIndex={-1}
      ref={modalRef}
      className={css({
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
      })}
      onClick={onClose}
    >
      <div
        className={css({
          background: '#fff',
          // padding: '2rem',
          borderRadius: '8px',
          minWidth: '300px',
          maxWidth: isMobile ? '100vw' : '90vw',
          maxHeight: isMobile ? '100vh' : '90vh',
          width: isMobile ? '100vw' : undefined,
          height: isMobile ? '100vh' : undefined,
          ...style,
          overflowY: 'hidden',
          position: 'relative',
        })}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className={css({
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
          })}
        >
          &times;
        </button>
        <h2
          id={labelledById || 'modal-title'}
          className={css({
            padding: '2rem 2rem 0 2rem',
            marginBottom: '1rem',
          })}
        >
          {title}
        </h2>
        <div
          id={describedById}
          className={css({
            maxHeight: '100%',
            overflowY: 'auto',
            padding: '0 2rem 8rem',
          })}
        >
          {children}
        </div>
      </div>
    </Flex>,
    document.body,
  );
};

export default Modal;
