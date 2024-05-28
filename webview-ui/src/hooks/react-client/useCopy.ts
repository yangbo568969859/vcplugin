import { useState } from "react";

function useCopy () {
  const [copied, setCopied] = useState(false)

  const copy = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }).catch((err) => {
        console.error('Failed to copy: ', err);
      })
    } else {
      // 使用 document.execCommand('copy') 作为备选方案
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch (err) {
        console.error('复制失败:', err);
      }
      document.body.removeChild(textarea);
    }
  }
  return {
    copied,
    copy
  }
}

export default useCopy
