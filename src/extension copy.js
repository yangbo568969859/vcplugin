// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const { getHtmlForWebview } = require('./webview')

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

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vcplugin" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('vcplugin.helloWorld', function () {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
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
    // panel.webview.html = '<html><body>Hello World</body></html>';
    // panel.webview.html = getWebViewContent('index.html', context.extensionPath, 'http://127.0.0.1:5173/')
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
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
  activate,
  deactivate
}
