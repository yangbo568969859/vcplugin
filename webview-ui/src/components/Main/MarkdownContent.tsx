import { memo, FC } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import 'github-markdown-css/github-markdown-dark.css'
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import useCopy from "@/hooks/react-client/useCopy";
import GlobalEvent from "@/utils/eventGlobal";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Base/Icons";

type ParentProps = {
  content: string;
  onlyContent?: boolean;
};

const MarkdownContent = memo<ParentProps>(function MarkdownContent1(props: ParentProps) {
  const { content, onlyContent = false } = props;
  const { copy } = useCopy();

  const InsertCode = (code: string) => {
    GlobalEvent.emit("vs:webviewEvent", {
      type: "insertCode",
      content: code,
    });
  };

  return (
    <div className="markdown-content">
      <ReactMarkdown
        children={content}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <div className="language-block">
                {
                  onlyContent ? <div className='language-title'>
                    <div className='title'>{match[1]}</div>
                    <div className='operation flex items-center'>
                    </div>
                  </div> : <div className="language-title">
                    <div className="title">{match[1]}</div>
                    <div className="operation flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copy(String(children))}
                      >
                        <Icons.copy
                          size={18}
                          className="rotate-0 scale-100 transition-all"
                        />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Icons.merge
                          size={18}
                          className="rotate-0 scale-100 transition-all"
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => InsertCode(String(children))}
                      >
                        <Icons.insert
                          size={18}
                          className="rotate-0 scale-100 transition-all"
                        />
                      </Button>
                    </div>
                  </div>
                }
                <div
                  id="codeblock-highlighter-markdown"
                  className="codeblock-highlighter-markdown"
                >
                  {/* @ts-ignore */}
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    children={String(children).replace(/\n$/, "")}
                    language={match[1]}
                    showLineNumbers={true}
                    style={{...vscDarkPlus}}
                  />
                </div>
              </div>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
})

export default MarkdownContent;
