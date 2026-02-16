# Terminal Runner

A VSCode extension that helps you quickly launch and focus named terminals with predefined commands.

## Demo

https://github.com/user-attachments/assets/be05541e-6891-4af7-bdd5-87c68b2a376b

## What it does

Terminal Runner allows you to define custom terminal configurations in your VSCode settings. Each configuration specifies a terminal name and a startup command.
When triggered, the extension will:

1. Check if a terminal with the specified name already exists
2. If it does, simply show/focus that terminal
3. If it doesn't, create a new terminal with the given name and execute the startup command

## Configuration

Add your terminal configurations to your VSCode `settings.json` under the `terminalrunner.terminals` key:

```json
{

  "terminalrunner.openasdefault": "tab", // <-- if you don't define the
                                         //     `openas` propperty in a terminalrunner.terminal
                                         //     this value get's used

  "terminalrunner.terminals": {
    "devserver": { // <-- the command name (translates to `terminalrunner.runCommand.devserver)
      "terminalName": "Dev Server",  // <-- the created terminal will be renamed to this
      "startCommand": "npm run dev", // <-- this is the command, that is send to the default-shell
                                     //     inside the terminal
      "openas": "panel"  // <-- you can decide for each termina, if it runs in the Editor( as a `tab` )
                         //     or in the Terminal- `panel` (usually at the bottom)
    },
    "logs": {
      "terminalName": "Logs",
      "startCommand": "tail -f /var/log/app.log",
    },
    "build": {
      "terminalName": "Build",
      "startCommand": "npm run build -- --watch",
    },

	// This one opens a terminal with neovim opening the currently
	// edited file and navigating to the currently focused line.
	"neovim": {
		"terminalName": "Edit in NeoVim",
		"startCommand": "nvim ${file} +${line}",
		"openas": "tab"
	}

  }

}
```

> [!NOTE]<br />
> if you make changes to the commands, then you must restart VSCode / Codium, for the commands to become available.

Each configuration requires:
- `terminalName` (string): The display name for the terminal
- `startCommand` (string): The shell command to execute when creating the terminal

Optional configuration properties:
- `openas` (string): either `panel` or `tab`

### Variables for Start-Commands.
you can use the follosing variables to pass information from VSCode to the Terminal.

- `${file}` (string) - the currently opened Filename
- `${line}` (number) - the line number, that the active cursor is on.


## Usage with Keyboard Shortcuts

This extension is designed to be used with **custom keyboard shortcuts**.
After configuring your terminal commands, bind them to keys in your
`keybindings.json`:

The command format is: `terminalrunner.run.<your-command-name>`

the following example would trigger after you enter the sequence.
Ctrl+Space => l =>  d,l or b

```json
[
  {
    "command": "terminalrunner.run.devserver",
    "key": "ctrl+space l d"
  },
  {
    "command": "terminalrunner.run.logs",
    "key": "ctrl+space l l"
  },
  {
    "command": "terminalrunner.run.build",
    "key": "ctrl+space l b"
  }
  {
    "command": "terminalrunner.run.neovim",
    "key": "ctrl+space l v"
  }
]
```



## LLM-Disclaimer:

This project was partially written with the help of an LLM. (GLM-4.7-Flash to be exact).
Reason being, that I just want to make the Use of VSCode a bit more bearable for
my personal, very Terminal based workflows.
Yet, I don't want to deal with that mess, that Micro$oft calls an API-Documentation.
I don't take any responsibility if something breaks for you if you use this Plugin.

Don't like it => Then Don't use it.


## License:
```
        GLWTS(Good Luck With That Shit) Public License
                     Copyright (c) Everyone.

Everyone is permitted to copy, distribute, modify, merge, sell, publish,
sublicense or whatever they want with this software but at their
OWN RISK.

                             Preamble
The author has absolutely no clue about the consequences, that using
this code/project may have.  Except the in README.md described behavior.

                GOOD LUCK WITH THAT SHIT PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION, AND MODIFICATION

  0. You just DO WHATEVER YOU WANT TO as long as you NEVER LEAVE
A TRACE TO TRACK THE AUTHOR of the original product to blame for
or hold responsible.

IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.

Good luck and Godspeed.
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
