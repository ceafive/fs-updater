import * as vscode from "vscode";
import { register } from "./services/register";

export function activate(context: vscode.ExtensionContext) {
  const onConfigChange = vscode.workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration("featuresettings-updater")) {
      register(context);
    }
  });

  context.subscriptions.push(onConfigChange, register(context));
}

export function deactivate() {}
