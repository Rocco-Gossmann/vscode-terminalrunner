import * as vscode from 'vscode';
import * as process from 'process';

// Define the configuration interface
interface TerminalCommand {
	terminalName: string;
	startCommand: string;
	openas?: string
}

interface TerminalCommandConfig {
	[shellcommand: string]: TerminalCommand;
}

let openAs: string = "panel";

export function activate(context: vscode.ExtensionContext) {

	const config = vscode.workspace.getConfiguration();

	const terminalCommands: TerminalCommandConfig | undefined = config.get('terminalrunner.terminals');
	openAs = config.get('terminalrunner.openasdefault') || "panel";

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

	const terminal = vscode.window.createTerminal({
		name: commandConfig.terminalName,
		location: (commandConfig.openas || openAs || "panel") == "tab" ? vscode.TerminalLocation.Editor : vscode.TerminalLocation.Panel
	});

	terminal.sendText(commandConfig.startCommand)

	terminal.show();

}



export function deactivate() {}
