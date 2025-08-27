'use client';

import { Check, Copy } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import { useEffect, useRef, useState } from 'react';

import 'prismjs/components/prism-go';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';

export function CodeBlock({
  children,
  language = 'javascript',
}: {
  children: React.ReactNode;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  const [isLong, setIsLong] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);

      // check số dòng
      const lineCount = codeRef.current.innerText.split('\n').length;
      if (lineCount > 15) {
        setIsLong(true);
      } else {
        setIsLong(false);
      }
    }
  }, [children]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(String(children));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative code-block">
      <button
        className="copy-btn absolute top-2 right-2 p-2 bg-gray-800 text-white rounded"
        onClick={copyCode}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>

      <pre
        className={`rounded-lg transition-all duration-300 ${
          expanded ? 'max-h-full' : 'max-h-[400px]'
        } overflow-hidden`}
      >
        <code ref={codeRef} className={`language-${language}`}>
          {children}
        </code>
      </pre>

      {isLong && !expanded && (
        <div className="absolute bottom-0 left-0 w-full flex justify-center bg-gradient-to-t from-gray-900 to-transparent pt-8">
          <button
            onClick={() => setExpanded(true)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md"
          >
            Expand
          </button>
        </div>
      )}
    </div>
  );
}
