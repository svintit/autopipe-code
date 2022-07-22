# AutoPipe for VS Code

Brings additional **AutoPipe**-like completion functionality to [Visual Studio Code][vsc].

## Features

    ```text
    input: "|" (press <SPACE> at |)
    output: " |"
    ```

* Commands to globally toggle the extension.

## Requirements

This extension requires VS Code version 1.69.0 or higher.

## Extension Settings

This extension contributes the following settings:

* `autopipe-code.enable`: Set to false to completely disable AutoPipe
  behavior.

## Development

  ```bash
  yarn install
  # or
  npm install

  code .
  ```

Run the default debug configurations inside VS Code. Your local development copy
will override any version installed from the marketplace.

## Credits

Inspired by and documentation examples adapted from [AutoPairs][], copyright ©
2018 Jesse Brooklyn Hannah. Licensed under the terms of the MIT License.

[AutoPairs]: https://github.com/jiangmiao/auto-pairs
[vsc]: https://code.visualstudio.com/
