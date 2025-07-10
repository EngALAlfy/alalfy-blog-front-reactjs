
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  children: string;
  language?: string;
  inline?: boolean;
}

const CodeBlock = ({ children, language = 'javascript', inline = false }: CodeBlockProps) => {
  if (inline) {
    return (
      <code className="bg-muted px-2 py-1 rounded text-sm font-mono direction-ltr">
        {children}
      </code>
    );
  }

  return (
    <div className="my-4 direction-ltr">
      <SyntaxHighlighter
        style={tomorrow}
        language={language}
        PreTag="div"
        className="rounded-lg"
        customStyle={{
          direction: 'ltr',
          textAlign: 'left',
          fontFamily: 'monospace',
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
