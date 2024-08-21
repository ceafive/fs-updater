import * as vscode from "vscode";
import { webview } from "./webview";
import { dispose } from "./dispose";
import * as fs from "fs";
import path from "path";
import { getConfig } from "../utils";

export const createWebviewPanel = (
  context: vscode.ExtensionContext,
  uri: vscode.Uri,
  panel: vscode.WebviewPanel | undefined = undefined
) => {
  const columnToShowIn = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
  if (panel) {
    panel.reveal(columnToShowIn);
  } else {
    panel = vscode.window.createWebviewPanel(
      "featuresettings-updater.show",
      "Update Feature Settings",
      vscode.ViewColumn.One,

      {
        retainContextWhenHidden: true,
        enableScripts: true,
        localResourceRoots: [context.extensionUri],
      }
    );
    panel.iconPath = vscode.Uri.file(path.join(context.extensionPath, "images", "fs-updater-icon.png"));

    // Set the webview's initial html content
    panel.webview.html = webview(panel, context);
  }

  //Listen to messages
  panel.webview.onDidReceiveMessage(
    async (msg: any) => {
      switch (msg.command) {
        case "startup": {
          const json = fs.readFileSync(uri.fsPath, "utf8");
          const config = getConfig();
          panel!.webview.postMessage({
            command: "download",
            uri,
            json,
            definitionsFilePath: config.definitionsFilePath,
          });
          break;
        }
        case "save_to_file": {
          const { newData } = msg;
          fs.writeFileSync(uri.path, newData);
          vscode.window.showInformationMessage("File saved successfully");

          const workspaceuri = vscode.workspace.workspaceFolders?.[0].uri.fsPath || "";
          const prettierConfig = path.join(workspaceuri, "/.prettierrc");
          const terminal = vscode.window.createTerminal("Feature Settings Updater");
          // terminal.show();
          terminal.sendText(`npx --yes prettier ${uri.fsPath} --write --config ${prettierConfig}`);
          panel!.dispose();
          break;
        }
        case "confirm_delete": {
          const answer = await vscode.window.showInformationMessage(
            `Do you want to delete "${msg.key}"? Can not be undone`,
            "Yes",
            "No"
          );

          if (answer === "Yes") {
            panel!.webview.postMessage({
              ...msg,
              command: "delete",
            });
          }
          break;
        }
      }
    },
    null,
    context.subscriptions
  );

  return panel;
};
