import * as vscode from 'vscode';

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

				if(!await activateTerminal(commandConfig))
					createNewTerminalWithName(commandConfig)

				return

			}));
		}
	}

	vscode.window.onDidCloseTerminal(terminal => {
		// NOTE: Micro$lop left a bug here, that makes it so, that this event does
		// not fire, if the Terminal was opened as an Editor and Moved
		// so if the tab is closed, the command it is running is not told to
		// shutdown either.

		// TODO: if Micro$oft decides to fix this bug, we can use this to savely end the
		// process running inside the closed terminal.
		// until then, this function is useless
		console.log("closed", terminal?.name)
	})

}

async function activateTerminal(commandConfig: TerminalCommand): Promise<boolean> {

	// Check if a terminal with the same name is already active
	const terminals = vscode.window.terminals;
	for (const terminal of terminals) {

		if (terminal.name === commandConfig.terminalName) {

			try {

				const processId = await terminal.processId

				console.log(process.kill(processId||-1, 0));
				return true;

			}
			catch {

				// fix your 💩 Micro$oft !!!
				// terminated terminals should not get stuck in this array, yet they are (if their Editors where moved)
				// Hence, why over time the "terminals" array will become filled with
				// unusable dispoed instances of terminals.
				terminal.dispose();

				continue;

			}

		}

	}

	return false;
}

function createNewTerminalWithName(commandConfig: TerminalCommand) {

	const terminal = vscode.window.createTerminal({
		name: commandConfig.terminalName,
		location: (commandConfig.openas || openAs || "panel") == "tab" ? vscode.TerminalLocation.Editor : vscode.TerminalLocation.Panel
	});

	let startCommand = commandConfig.startCommand
		.replace( /\$\{file\}/g, `"${vscode.window.activeTextEditor?.document?.fileName || ""}"` )
		.replace( /\$\{line\}/g, `${(vscode.window.activeTextEditor?.selection?.active?.line||0) + 1}` );

	terminal.sendText(startCommand + " ; exit")

	terminal.show();

}



export function deactivate() {}
