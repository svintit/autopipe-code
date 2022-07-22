'use strict';

import * as vscode from 'vscode';

export default class AutoPipe {
    private config: vscode.WorkspaceConfiguration;
    private disposable: vscode.Disposable;

    constructor() {
        let subscriptions: vscode.Disposable[] = [];
        vscode.workspace.onDidChangeConfiguration(this.onDidChangeConfiguration, this, subscriptions);

        const toggleAutoPipeCommand = vscode.commands.registerCommand('autopipe-code.toggleAutoPipe', this.toggleAutoPipe, this);
        subscriptions.push(toggleAutoPipeCommand);

        this.disposable = vscode.Disposable.from(...subscriptions);

        this.config = this.getConfig();
    }

    dispose() {
        this.disposable.dispose();
    }

    private getConfig(): vscode.WorkspaceConfiguration {
        return vscode.workspace.getConfiguration('autopipe-code');
    }

    private onDidChangeConfiguration() {
        this.config = this.getConfig();
    }

    private showStatusMessage(message: string) {
        vscode.window.setStatusBarMessage(`AutoPipe: ${message}`, 2000);
    }

    private toggleAutoPipe() {
        const newValue = this.toggleConfig('enable');
        const message = newValue ? 'enabled' : 'disabled';
        this.showStatusMessage(`Extension ${message}`);
    }

    private toggleConfig(section: string): boolean {
        const newValue = !this.config.get(section, true);
        this.config.update(section, newValue, true);
        return newValue;
    }
}
