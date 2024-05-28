const webviewUrl = 'http://10.242.180.182:5173/';

const getHtmlForWebview = () => {
  let hash = new Date().getTime();
  let realUrl = `${webviewUrl}?hash=${hash}`
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CodeMaker</title>
      </head>
      <body style="padding-left:0;padding-right:0">
        <iframe
          src="${realUrl}"
          frameborder="0"
          style="width:100%;height: calc(100vh - 3px)"
          id="codemaker-webui"
          allow="cross-origin-isolated; autoplay; clipboard-read; clipboard-write"
        ></iframe>
      </body>
      <script>
      const iframeuri = "${realUrl}";
      const webviewUrl = "${webviewUrl}";
      const iframe = document.getElementById('codemaker-webui');
      const vscode = acquireVsCodeApi();
      console.log('vscode', vscode)
      window.addEventListener('message', event => {
        console.log(event, webviewUrl)
        const data = event.data;
        vscode.postMessage({
          command: data.type,
          content: data.content,
        })
        // 只接受从指定的域名发送过来的消息
        if (event.origin === "${webviewUrl}") {
          vscode.postMessage(event.data);
        } else if (event.origin && event.origin.startsWith('vscode-webview')) {
          iframe.contentWindow.postMessage(event.data, iframeuri);
        }
      });
      </script>
    </html>`
}

module.exports = {
  getHtmlForWebview
}