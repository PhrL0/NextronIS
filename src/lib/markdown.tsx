import "react-markdown";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type CMarkdownProps = {
  children: string;
};
export default function CMarkdown({ children }: CMarkdownProps) {
  return (
    <div className="flex-1 size-full prose-sm   max-w-none">
      <Markdown remarkPlugins={[remarkGfm]}>{children}</Markdown>
    </div>
  );
}
