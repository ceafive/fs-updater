import * as vscode from "vscode";
import { getConfig, workspaceConfiguration } from "../utils";
import { createWebviewPanel } from "./panel";

export const register = (context: vscode.ExtensionContext): vscode.Disposable => {
  workspaceConfiguration();
  const config = getConfig();
  vscode.commands.executeCommand("setContext", "ext.supportedFolders", config.supportedFiles);

  let currentPanel: vscode.WebviewPanel | undefined = undefined;

  return vscode.commands.registerCommand("featuresettings-updater.show", (uri: vscode.Uri) => {
    createWebviewPanel(context, uri, currentPanel);
    // currentPanel = createWebviewPanel(context, uri, currentPanel);
  });
};
