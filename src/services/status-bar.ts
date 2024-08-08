import * as vscode from "vscode";

export const createStatusBarItem = () => {
  let myStatusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  myStatusBarItem.command = "featuresettings-updater";
  myStatusBarItem.text = `$(symbol-string) Featuresettings Updater`;
  myStatusBarItem.show();
};
