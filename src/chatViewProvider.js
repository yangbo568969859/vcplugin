const vscode = require('vscode')
const { getHtmlForWebview } = require('./webview')

class ChatViewProvider {
  constructor(context) {
    this._context = context
  }
  
  resolveWebviewView (webviewView, context) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      retainContextWhenHidden: true,
    };

    webviewView.webview.html = getHtmlForWebview();

    webviewView.webview.onDidReceiveMessage((message) => {
      switch (message.command) {
				case 'insertCode':
				  // vscode.window.showErrorMessage(message.content);
          this.insertCode(message.content);
				  return;
			  }
    }, undefined, context.subscriptions);
  }

  // vscode向webview发送消息
  sendMessageToIframe (options) {
    this._view.webview.postMessage({
      origin: 'vscode',
      ...options
    });
  }

  insertCode (content) {
    const editor = vscode.window.activeTextEditor;
    // console.log('insertCode', editor)
    if (editor) {
      const selection = editor.selection;
      // console.log('isEmpty', selection)
      if (selection) {
        // 当前有选中,在当前位置插入代码
        editor.edit((editBuilder) => {
          editBuilder.insert(selection.active, content);
        })
      } else {
        const previousSelection = this.getPreviousSelection(editor);
        if (previousSelection) {
          editor.edit((editBuilder) => {
            editBuilder.insert(selection.active, content);
          })
        }
      }
    }
  }
  // 获取上一次选中位置
  getPreviousSelection (editor) {
    const selections = editor.selections;
    if (selections.length > 1) {
      return selections[selections.length - 2];
    }
    return undefined;
  }
}

module.exports = {
  ChatViewProvider
}
