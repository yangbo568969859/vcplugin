const vscode = require('vscode')
const { baseURL } = require('./const/fetch')

class CompletionItemProvider {
  constructor() { }

  provideCompletionItems(document, position) {
    // const textLine = document.lineAt(position.line).text.trim();

    // 创建补全项数组
    const completionItems = [];
    // 添加一个简单的补全项
    const item = new vscode.CompletionItem('myFunction');
    item.kind = vscode.CompletionItemKind.Function;
    item.detail = 'This is a custom function';
    item.insertText = 'myFunction(${1:param})';
    completionItems.push(item);

    // 返回补全项数组
    return completionItems;
  }

  async provideInlineCompletionItems(document, position, context, token) {
    const activeTextEditor = vscode.window.activeTextEditor
    if (this.isActiveTextEditor(document, activeTextEditor)) {
      // 行中不需要不进行补充
    }
    // 获取当前行的文本
    const lineText = document.lineAt(position.line).text;
    // 定义一些简单的内联补全建议
    const completionItems = [];
    console.log('lineText', lineText)
    const res = await this.fetchCompletionData(lineText, position);
    console.log('provideInlineCompletionItems', res)
    if (res && res.text) {
      completionItems.push({
        insertText: res.text,
        range: new vscode.Range(position, position),
      })
    }
    // if (lineText.startsWith('Hello')) {
    //   completionItems.push({
    //     insertText: 'World1',
    //     range: new vscode.Range(position, position),
    //   });
    // }
    // if (lineText.startsWith('Good')) {
    //   completionItems.push({
    //     insertText: 'morning1',
    //     range: new vscode.Range(position, position),
    //   });
    //   completionItems.push({
    //     insertText: 'afternoon1',
    //     range: new vscode.Range(position, position),
    //   });
    //   completionItems.push({
    //     insertText: 'evening1',
    //     range: new vscode.Range(position, position),
    //   });
    // }
    return completionItems;
  }

  isActiveTextEditor (document, activeTextEditor) {
    const active = activeTextEditor.selection.active;
    return false;
  }

  async fetchCompletionData (text, position) {
    const response = await fetch(`${baseURL}/completion/inline`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        line: position.line,
        character: position.character
      })
    })
    const data = await response.json();
    return data;
  }
}

module.exports = {
  CompletionItemProvider
}