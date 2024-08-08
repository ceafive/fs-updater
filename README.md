# Feature Settings Updater

The Feature Settings Updater is a Visual Studio Code extension that allows you to update a settings file based on the extension settings.

## Features

- Open a webview panel to update feature settings.
- Save updated settings to a file.
- Automatically format the settings file using Prettier.

## Requirements

- Visual Studio Code version 1.91.0 or higher.

## Installation

1. Install the extension from the VS Code Marketplace.

## Usage

1. Open a JSON file that you want to update.
2. Run the command `Update Feature Settings` from the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac).
3. The webview panel will open, allowing you to update the settings.
4. Save the updated settings to the file.

## Development

### Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Press `F5` to open a new window with your extension loaded.
4. Set breakpoints in your code inside `src/extension.ts` to debug your extension.
5. Find output from your extension in the debug console.

### Running Tests

1. Run the "watch" task via the **Tasks: Run Task** command.
2. Open the Testing view from the activity bar and click the "Run Test" button, or use the hotkey `Ctrl/Cmd + ; A`.
3. See the output of the test result in the Test Results view.
4. Make changes to `src/test/extension.test.ts` or create new test files inside the `test` folder.

### Publishing

1. Reduce the extension size and improve the startup time by [bundling your extension](https://code.visualstudio.com/api/working-with-extensions/bundling-extension).
2. [Publish your extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) on the VS Code extension marketplace.
3. Automate builds by setting up [Continuous Integration](https://code.visualstudio.com/api/working-with-extensions/continuous-integration).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

[MIT](LICENSE)
