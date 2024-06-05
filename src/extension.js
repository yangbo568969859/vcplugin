// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const { getHtmlForWebview } = require('./webview')
const { FindProblem } = require('./editorMenu')
const { ChatViewProvider } = require('./chatViewProvider')
const { CompletionItemProvider } = require('./CompletionItemProvider')


const getWebViewContent = (pagePath, basePath, url) => {
  const resourcePath = path.join(basePath, pagePath);
  return fs.readFileSync(resourcePath, 'utf-8').replace('${url}', url)
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "vcplugin" is now active!');
  const chatViewProvider = new ChatViewProvider(context); //注册webview实例
  const completionItemprovider = new CompletionItemProvider(); // 注册补全项实例

  let disposable = vscode.commands.registerCommand('vcplugin.helloWorld', function () {
    const dateMsg = new Date().toLocaleString();
    vscode.window.showInformationMessage('Hello vcplugin! current Time is ' + dateMsg);
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(vscode.commands.registerCommand('vcplugin.askQuestion', async () => {
    let answer = await vscode.window.showInformationMessage('Ask Question', 'good', 'bad');
    if (answer === 'bad') {
      vscode.window.showInformationMessage("sorry to hear it")
    } else {
      console.log({ answer })
    }
  }));

  const setMinifyContext = (isMinified) => {
    vscode.commands.executeCommand('setContext', 'vcplugin:isMinified', isMinified);
  };
  context.subscriptions.push(
    vscode.commands.registerCommand('vcplugin.minify', () => {
      setMinifyContext(true);
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('vcplugin.restore', () => {
      setMinifyContext(false);
    })
  );
  // webview
  const openWebview = vscode.commands.registerCommand('vcplugin.openCodeWebview', () => {
    console.log('openWebview')
    // const chatViewProvider = new ChatWebviewProvider(context); //webview实例
    // vscode.window.registerWebviewViewProvider('testWebview', chatViewProvider, {
    //   webviewOptions: {retainContextWhenHidden: true}
    // })
    const panel = vscode.window.createWebviewPanel(
      'testWebview', // ID
      'webview演示', // 标题
      vscode.ViewColumn.Active, // 显示在编辑器的哪个部位
      {
        enableScripts: true, // 启用JS，默认禁用
        retainContextWhenHidden: false, // webview被隐藏时保持状态，避免被重置
      }
    )
    panel.webview.html = getHtmlForWebview();
    panel.webview.onDidReceiveMessage((message) => {
      switch (message.command) {
				case 'alert':
				  vscode.window.showErrorMessage(message.text);
				  return;
			  }
    }, undefined, context.subscriptions);
  })
  context.subscriptions.push(openWebview);
  setMinifyContext(false);
  context.subscriptions.push(vscode.commands.registerCommand('vcplugin.insert-code-into-chat', () => {}));
  context.subscriptions.push(vscode.commands.registerCommand('vcplugin.find-problem', () => {
    FindProblem(chatViewProvider);
  }));
  context.subscriptions.push(vscode.commands.registerCommand('vcplugin.explain', () => {}));
  context.subscriptions.push(vscode.commands.registerCommand('vcplugin.generate-code', () => {}));
  context.subscriptions.push(vscode.commands.registerCommand('vcplugin.review-code', () => {}));

  context.subscriptions.push(vscode.window.registerWebviewViewProvider(
    'vcplugin.chat-webview',
    chatViewProvider,
    {
      webviewOptions: {
        retainContextWhenHidden: true
      }
    }
  ))
  const inlineProvider = {
    provideInlineCompletionItems(document, position, context, token) {
      // 在这里实现你的内联补全逻辑
      // 返回一个 InlineCompletionList 或 null
      return [];
    }
  }
  context.subscriptions.push(vscode.languages.registerCompletionItemProvider('*', completionItemprovider))
  context.subscriptions.push(vscode.languages.registerInlineCompletionItemProvider('*', completionItemprovider))
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
  activate,
  deactivate
}
