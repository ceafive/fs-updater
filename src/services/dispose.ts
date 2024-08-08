import * as vscode from "vscode";

export const dispose = (panel: vscode.WebviewPanel) => {
  panel.dispose();
  //   while (disposables.length) {
  //     const x = disposables.pop();
  //     if (x) {
  //       x.dispose();
  //     }
  //   }
};
