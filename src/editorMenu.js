const vscode = require('vscode')

const FindProblem = async (chatViewProvider) => {
  const editor = vscode.window.activeTextEditor
  const selection = editor.selection;
  const selectedCode = editor.document.getText(selection);

  const options = {
    type: 'findProblem',
    content: selectedCode
  }
  chatViewProvider.sendMessageToIframe(options);
}

module.exports = {
  FindProblem
}