'use client';

import parse, { Element } from 'html-react-parser';
import React from 'react';
import { CodeBlock } from '../button/code.button';

interface RichTextParserProps {
  html: string;
}

export const RichTextParser: React.FC<RichTextParserProps> = ({ html }) => {
  const getText = (node: any): string => {
    if (!node) return '';
    if (typeof node === 'string') return node;
    if (node.type === 'text') return node.data || '';
    if (node.children) return node.children.map(getText).join('');
    return '';
  };

  return (
    <>
      {parse(html, {
        replace: (domNode) => {
          if (domNode instanceof Element) {
            // Code blocks
            if (domNode.name === 'pre' && domNode.children?.length) {
              const codeNode = domNode.children[0] as Element;
              if (codeNode.name === 'code') {
                const codeText = getText(codeNode);
                return <CodeBlock>{codeText}</CodeBlock>;
              }
            }

            // Headings
            if (domNode.name === 'h2' || domNode.name === 'h3') {
              const text = getText(domNode).trim();
              const id = text
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-');

              return domNode.name === 'h2' ? (
                <h2
                  id={id}
                  className="scroll-mt-24 font-bold text-2xl mt-12 mb-6 text-gray-800 dark:text-gray-100 border-b-2 border-gray-200 dark:border-gray-700 pb-2"
                >
                  {text}
                </h2>
              ) : (
                <h3
                  id={id}
                  className="scroll-mt-24 font-semibold text-xl mt-8 mb-4 text-gray-700 dark:text-gray-200"
                >
                  {text}
                </h3>
              );
            }
          }
        },
      })}
    </>
  );
};
