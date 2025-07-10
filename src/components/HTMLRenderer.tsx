
import { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface HTMLRendererProps {
  content: string;
  className?: string;
}

const HTMLRenderer = ({ content, className = '' }: HTMLRendererProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Sanitize HTML content
    const sanitizedHTML = DOMPurify.sanitize(content);
    contentRef.current.innerHTML = sanitizedHTML;

    // Find all code blocks and replace them with syntax highlighter
    const codeBlocks = contentRef.current.querySelectorAll('pre code, code');
    
    codeBlocks.forEach((block) => {
      if (block.parentElement?.tagName === 'PRE') {
        // This is a code block
        const code = block.textContent || '';
        const language = block.className.match(/language-(\w+)/)?.[1] || 'javascript';
        
        const wrapper = document.createElement('div');
        wrapper.className = 'my-4 direction-ltr';
        
        // Create a temporary container for React rendering
        const tempContainer = document.createElement('div');
        block.parentElement?.parentNode?.insertBefore(wrapper, block.parentElement);
        block.parentElement?.remove();
        
        // We'll handle this with a simpler approach - just add proper styling
        wrapper.innerHTML = `
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto direction-ltr text-left">
            <code class="font-mono text-sm">${code}</code>
          </pre>
        `;
      } else {
        // This is inline code
        block.className = 'bg-muted px-2 py-1 rounded text-sm font-mono direction-ltr';
      }
    });
  }, [content]);

  return (
    <div 
      ref={contentRef}
      className={`prose prose-lg max-w-none text-right direction-rtl ${className}`}
      dir="rtl"
    />
  );
};

export default HTMLRenderer;
