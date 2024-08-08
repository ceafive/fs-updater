import * as vscode from "vscode";

export interface Config {
  supportedFiles: string[];
  definitionsFilePath: string;
}

let currentConfig: Config | undefined;

export const getConfig = (): Config => {
  if (currentConfig === undefined) {
    throw new Error("config should be loaded");
  }
  return currentConfig;
};

export const setConfig = (newConfig: Config) => {
  currentConfig = newConfig;
};

export const workspaceConfiguration = (): Config => {
  const workspaceConfig = vscode.workspace.getConfiguration("featuresettings-updater");
  const config: Config = {
    supportedFiles: workspaceConfig.get<string[]>("supportedFiles") || ["featuresettings.json"],
    definitionsFilePath: workspaceConfig.get<string>("definitionsFilePath") || "",
  };

  setConfig(config);
  return config;
};

export function getNonce(): string {
  let text: string = "";
  const possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
