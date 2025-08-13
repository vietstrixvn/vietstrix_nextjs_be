'use client';

import { useState } from 'react';
import type { CopyLinkButtonProps } from '@/types';
import { toast } from 'sonner';
import { ClipboardCopy, Check } from 'lucide-react';

export const CopyLinkButton = ({ url }: CopyLinkButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Cannot copy link!');
    }
  };

  return (
    <button
      aria-label={copied ? 'Copied link' : 'Copy link'}
      onClick={handleCopy}
      className={`p-2 transition 
    ${copied ? 'bg-green-500 text-white' : 'text-white bg-green-500 hover:bg-green-400'}`}
    >
      {copied ? <Check size={24} /> : <ClipboardCopy size={24} />}
    </button>
  );
};
