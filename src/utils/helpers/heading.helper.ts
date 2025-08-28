import parse, { Element } from 'html-react-parser';

export function extractHeadings(html: string) {
  const headings: { id: string; text: string; level: number }[] = [];

  parse(html, {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        if (domNode.name === 'h2' || domNode.name === 'h3') {
          const getText = (node: any): string => {
            if (!node) return '';
            if (typeof node === 'string') return node;
            if (node.type === 'text') return node.data || '';
            if (node.children) {
              return node.children.map(getText).join('');
            }
            return '';
          };

          const text = getText(domNode).trim();

          if (text) {
            const id = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-');

            const heading = {
              id,
              text,
              level: domNode.name === 'h2' ? 2 : 3,
            };

            headings.push(heading);
          }
        }
      }
      return domNode;
    },
  });

  return headings;
}
