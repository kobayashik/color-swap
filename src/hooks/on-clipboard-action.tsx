import { MutableRefObject, useEffect } from 'react';

export const useOnClipboardAction = ({
  ref,
  onCopy,
  onPaste,
}: {
  ref?: MutableRefObject<HTMLInputElement | null>;
  onCopy?: () => void;
  onPaste?: (value: string) => void;
}) => {
  useEffect(() => {
    const handleSelectInput = () => {
      setTimeout(() => {
        ref && ref.current?.select();
      }, 0);
    };

    const handlePaste = (event: ClipboardEvent) => {
      event.preventDefault();
      const pasteData = event.clipboardData?.getData('text/plain');

      if (pasteData) {
        onPaste && onPaste(pasteData);
      }

      handleSelectInput();
    };

    const handleCopy = async () => {
      ref && (await navigator.clipboard.writeText(ref.current?.value || ''));
      handleSelectInput();
      onCopy && onCopy();
    };

    document?.addEventListener('copy', handleCopy);
    document?.addEventListener('paste', handlePaste);

    return () => {
      document?.removeEventListener('copy', handleCopy);
      document?.removeEventListener('paste', handlePaste);
    };
  }, []);
};
