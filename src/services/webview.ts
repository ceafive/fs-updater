import * as vscode from "vscode";
import path from "path";
import * as fs from "fs";
import { getNonce } from "../utils";

export const webview = (panel: vscode.WebviewPanel, context: vscode.ExtensionContext) => {
  const template = vscode.Uri.file(path.join(context.extensionPath, "assets", "index.html"));
  //   const scriptUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "dist", "app.js"));
  //   const styleUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "dist", "main.css"));

  const linksPath = [vscode.Uri.file(path.join(context.extensionPath, "dist", "main.css"))];
  const scriptsPath = [vscode.Uri.file(path.join(context.extensionPath, "dist", "app.js"))];

  const nonce = getNonce();

  return fs
    .readFileSync(template.fsPath)
    .toString()
    .replace(
      "{{LINKS}}",
      linksPath
        .map(
          (l) =>
            `<link rel="stylesheet" href="${
              panel.webview.asWebviewUri ? panel.webview.asWebviewUri(l) : l.with({ scheme: "vscode-resource" })
            }">`
        )
        .join("\n")
    )
    .replace(
      "{{SCRIPTS}}",
      scriptsPath
        .map(
          (l) =>
            `<script nonce="${nonce}" src="${
              panel.webview.asWebviewUri ? panel.webview.asWebviewUri(l) : l.with({ scheme: "vscode-resource" })
            }"></script>`
        )
        .join("\n")
    );
};
