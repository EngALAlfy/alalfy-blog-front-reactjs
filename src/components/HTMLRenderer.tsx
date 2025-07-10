
import { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';

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
        // This is a code block - escape HTML and prevent rendering
        const code = block.textContent || '';
        const language = block.className.match(/language-(\w+)/)?.[1] || 'javascript';
        
        const wrapper = document.createElement('div');
        wrapper.className = 'my-4 direction-ltr';
        
        // Escape HTML entities to prevent rendering
        const escapedCode = code
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;');
        
        block.parentElement?.parentNode?.insertBefore(wrapper, block.parentElement);
        block.parentElement?.remove();
        
        // Create styled code block with escaped content
        wrapper.innerHTML = `
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto direction-ltr text-left font-mono text-sm leading-relaxed">
            <code class="language-${language}">${escapedCode}</code>
          </pre>
        `;
      } else {
        // This is inline code - escape content
        const code = block.textContent || '';
        const escapedCode = code
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        
        block.innerHTML = escapedCode;
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
