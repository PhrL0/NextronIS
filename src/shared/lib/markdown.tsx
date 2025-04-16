import 'react-markdown';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type CMarkdownProps = {
  children: string;
};
export default function CMarkdown({ children }: CMarkdownProps) {
  return (
    <div className="prose-sm size-full max-w-none flex-1">
      <Markdown remarkPlugins={[remarkGfm]}>{children}</Markdown>
    </div>
  );
}
