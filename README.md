# Terminal Runner

A VSCode extension that helps you quickly launch and focus named terminals with predefined commands.

## Demo

https://github.com/user-attachments/assets/b0da67bc-8dbd-4325-9de3-d06d6644a342


## What it does

Terminal Runner allows you to define custom terminal configurations in your VSCode settings. Each configuration specifies a terminal name and a startup command.
When triggered, the extension will:

1. Check if a terminal with the specified name already exists
2. If it does, simply show/focus that terminal
3. If it doesn't, create a new terminal with the given name and execute the startup command

## Configuration

Add your terminal configurations to your VSCode `settings.json` under the `terminalcommands` key:

```json
{
  "terminalcommands": {
    "devserver": { // <-- the command name (translates to `terminalrunner.runCommand.devserver)
      "terminalName": "Dev Server",  // <-- the created terminal will be renamed to this
      "startCommand": "npm run dev" // <-- the shell/bash/zsh/... command to run, when the terminal is freshly openend
    },
    "logs": {
      "terminalName": "Logs",
      "startCommand": "tail -f /var/log/app.log"
    },
    "build": {
      "terminalName": "Build",
      "startCommand": "npm run build -- --watch"
    }
  }
}
```

> [!NOTE]<br />
> if you make changes to the commands, then you must restart VSCode / Codium, for the commands to become available.

Each configuration requires:
- `terminalName` (string): The display name for the terminal
- `startCommand` (string): The shell command to execute when creating the terminal

## Usage with Keyboard Shortcuts

This extension is designed to be used with **custom keyboard shortcuts**.
After configuring your terminal commands, bind them to keys in your
`keybindings.json`:

The command format is: `terminalrunner.runCommand.<your-command-name>`

the following example would trigger after you enter the sequence.
Ctrl+Space => l =>  d,l or b

```json
[
  {
    "command": "terminalrunner.runCommand.devserver",
    "key": "ctrl+space l d"
  },
  {
    "command": "terminalrunner.runCommand.logs",
    "key": "ctrl+space l l"
  },
  {
    "command": "terminalrunner.runCommand.build",
    "key": "ctrl+space l b"
  }
]
```



## LLM-Disclaimer:

This project was written with the help of an LLM. (GLM-4.7-Flash to be exact).
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
