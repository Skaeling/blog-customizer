import { useEffect, type RefObject } from 'react';

type UseSidebarCloseOptions = {
  isOpen: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  setIsOpen: (value: boolean) => void;
};

export const useSidebarClose = ({
  isOpen,
  containerRef,
  setIsOpen,
}: UseSidebarCloseOptions): void => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent): void => {
      const container = containerRef.current;

      if (
        container &&
        event.target instanceof Node &&
        !container.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, containerRef, setIsOpen]);
};
