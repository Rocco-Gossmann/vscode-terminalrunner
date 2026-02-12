import * as vscode from 'vscode';

// Define the configuration interface
interface TerminalCommand {
	terminalName: string;
	startCommand: string;
}

interface TerminalCommandConfig {
	[shellcommand: string]: TerminalCommand;
}

export function activate(context: vscode.ExtensionContext) {

	const config = vscode.workspace.getConfiguration();

	const terminalCommands: TerminalCommandConfig | undefined = config.get('terminalrunner.terminals');

	if (terminalCommands && typeof terminalCommands === 'object') {
		// Process each terminal command
		for (const [commandName, commandConfig] of Object.entries(terminalCommands)) {
			// Register a command for each configured terminal command
			context.subscriptions.push(vscode.commands.registerCommand(`terminalrunner.run.${commandName}`, async () => {

				if(!activateTerminal(commandConfig))
					createNewTerminalWithName(commandConfig)

				return

			}));
		}
	}

}

function activateTerminal(commandConfig: TerminalCommand): boolean {

	// Check if a terminal with the same name is already active
	const terminals = vscode.window.terminals;
	for (const terminal of terminals) {
		if (terminal.name === commandConfig.terminalName) {
			terminal.show();
			return true;
		}
	}

	return false;
}

function createNewTerminalWithName(commandConfig: TerminalCommand) {

	const startCommand = commandConfig.startCommand;
	const shellArgs = startCommand.split(' ');

	vscode.window.createTerminal({
		name: commandConfig.terminalName,
		shellPath: shellArgs.shift(),
		shellArgs,
	}).show();

}



export function deactivate() {}
