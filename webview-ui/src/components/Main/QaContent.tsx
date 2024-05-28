import { FC, useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { AnswerTypes } from '@/types/answer';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "@/components/Base/Icons";
import "./index.css";

import ChildQuestion from "./ChildQuestion";
import ChildAnswer from "./ChildAnswer";
import ChildStreaming from "./ChildStreaming";
import ToggleTheme from "../Action/ThemeToggle";
import DragResizeCom from "../Action/DragResizeCom";

import GlobalEvent from "@/utils/eventGlobal.js";

import { answerList } from './mock.js';

interface QaContentProps {
  type: AnswerTypes;
  content: string;
}

type ParentProps = {
  isAnswer: boolean,
  setIsAnswer: (params: boolean) => void;
  hasHistory: boolean;
}

const QaContent: FC<ParentProps> = (props: ParentProps) => {
  const { isAnswer, setIsAnswer, hasHistory } = props;
  const { toast } = useToast()

  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme()
  const [value, setValue] = useState("");
  const [streamingContent, setStreamingContent] = useState("");
  const streamingContentRef = useRef("");
  const [isFocused, setIsFocused] = useState(false);
  const [items, setItems] = useState([] as Array<QaContentProps>);

  const handleEventRef = useRef<any>(null);
  const getVscodeMessage = (event: any) => {
    handleSendQuestion(event.content)
  }
  useEffect(() => {
    handleEventRef.current = getVscodeMessage;
    GlobalEvent.on('vs:sendMessage', handleEventRef.current)
    return () => {
      GlobalEvent.off('vs:sendMessage', handleEventRef.current);
    }
  })

  useEffect(() => {
    streamingContentRef.current = streamingContent;
  }, [streamingContent])

  const handleKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!value) {
      return;
    }
    if (event.ctrlKey && event.key === "Enter") {
      if (isAnswer) {
        toast({
          duration: 2000,
          description: "当前对话未结束，请稍后再试或终止回答",
        })
        return;
      }
      event.preventDefault();
      // 在这里处理Ctrl + Enter事件
      handleSendQuestion(value);
      setValue("");
      setIsAnswer(true);
      const index = Math.floor(Math.random() * answerList.length);
      // await dealText(answerList[index]);
      await dealText(answerList[0]);

      setIsAnswer(false);
      console.log(streamingContentRef.current)
      setItems((prevItems) => [
        ...prevItems,
        {
          type: "answer",
          content: streamingContentRef.current,
        }
      ]);
      setStreamingContent("");
    }
  };

  const handleSendQuestion = (value: string) => {
    setItems((prevItems) => [
      ...prevItems,
      {
        type: "question",
        content: value,
      }
    ]);
  }

  const dealText = (text: string) => {
    return new Promise((resolve) => {
      const reverse = text;
      let index = 0;
      function repeat () {
        const num = Math.floor(Math.random() * 10)
        // lastindex = index;
        const currentValue = text.substring(index, num + index)
        index = index + num;
        setStreamingContent((prevstr) => prevstr + currentValue)
        if (index < text.length) {
          setTimeout(repeat, 100)
        } else {
          resolve(true)
        }
      }
      setTimeout(repeat, 100)
    })
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleFocus: any = () => {
    setIsFocused(true);
  }

  const handleBlur: any = () => {
    setIsFocused(false);
  }

  const editText = (text: string) => {
    setValue("");
    setValue(text);
    textareaRef.current?.focus();
  }

  const toBottom = () => {
    const container = scrollRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  const handleScroll = () => {
    // console.log('handleScroll', e)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-auto overflow-hidden">
        <div className="message-pane h-full">
          <div className="flex flex-row-reverse gap-2 items-center p-2 box-border"></div>
          <div ref={scrollRef} onScroll={handleScroll} className="h-full overflow-y-scroll markdown-body shrink px-2 text-[#000] bg-[#0d1117] dark:text-[#e5e7eb] dark:bg-[#1f1f1f]">
            {
              hasHistory ? 
              <div className="chat-message flex items-center justify-center m-4">
                <Button size="sm">更多历史消息</Button>
              </div> : null
            }
            <div className="qaList">
              {items.map((item, index) => {
                if (item.type === "question") {
                  return <ChildQuestion content={item.content} editText={editText} key={index} />;
                } else if (item.type === "answer") {
                  return <ChildAnswer content={item.content} key={index} />;
                } else {
                  return null;
                }
              })}
            </div>
            {
              isAnswer ?
              <ChildStreaming content={streamingContent} />
              : null
            }
          </div>
          <div className="message-pane-footer relative w-full px-2 pb-0">
            <div className="w-7 h-7"></div>
            <div className="w-7 h-7"></div>
            <div className="w-7 h-7">
              <Button variant="ghost" size="icon">
                <Icons.chevronsDown
                  size={20}
                  className="rotate-0 scale-100 transition-all"
                  onClick={toBottom}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <DragResizeCom containerRef={containerRef} />
      <div className="flex-none overflow-hidden custom-h" ref={containerRef}>
        <div className="h-full w-full p-2 pt-0 gap-2 grid grid-rows-1">
          <div
            className={clsx(
              (isFocused ? "border-[#786FFF]" : theme ==='dark' ? "border-[#ffffff1a]" : "border-[#e2e8f0]"),
              'flex flex-col p-3 h-full rounded-lg custom-input transition-all border dark:bg-[#1f1f1f]'
            )}
          >
            <Textarea
              ref={textareaRef}
              value={value}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Ctrl + Enter 发送，/ 使用快捷指令，@引用文件，知识库或代码表"
              className="input-text text-sm"
            ></Textarea>
            <div className="input-toolbox mt-2 flex justify-between items-center">
              <div className="flex gap-1 items-center">左边</div>
              <div className="flex items-center">
                <div>
                  <ToggleTheme />
                  <Button variant="ghost" size="icon">
                    <Icons.setting
                      size={18}
                      className="rotate-0 scale-100 transition-all"
                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QaContent;
