
import {window} from "vscode";

export type IVSCode= {
  postMessage(message: any): void
  window: typeof window
};




