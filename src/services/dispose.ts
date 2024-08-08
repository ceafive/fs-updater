import * as vscode from "vscode";

export const dispose = (panel: vscode.WebviewPanel) => {
  panel.dispose();
};
