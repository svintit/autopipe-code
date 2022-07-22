'use strict';

import * as vscode from 'vscode';
import Handler from './handler';

const PIPE: { [key: string]: vscode.CharacterPair } = {
    'PIPE': ['|', '|'],
};

export default class AutoPipeController<H extends Handler> {
    private config: vscode.WorkspaceConfiguration;
    private disposable: vscode.Disposable;
    private handler: H;

    constructor(handler: H) {
        let subscriptions: vscode.Disposable[] = [];

        this.handler = handler;
        subscriptions.push(this.handler);

        vscode.workspace.onDidChangeConfiguration(this.onDidChangeConfiguration, this, subscriptions);
        vscode.workspace.onDidChangeTextDocument(this.onDidChangeTextDocument, this, subscriptions);

        this.config = this.getConfig();
        this.disposable = vscode.Disposable.from(...subscriptions);
    }

    dispose() {
        this.disposable.dispose();
    }

    private getConfig(): vscode.WorkspaceConfiguration {
        return vscode.workspace.getConfiguration(`autopipe-code.${this.handler.configSectionName}`);
    }

    private onDidChangeConfiguration() {
        this.config = this.getConfig();
    }

    private onDidChangeTextDocument(change: vscode.TextDocumentChangeEvent) {
        if (!this.config.get('enable', true)) { return; }
        if (change.contentChanges.length !== 1) { return; }

        if (!this.config.get('enable', true)) {
            this.handler.considerHandling({ pair: PIPE.PIPE, change });
        }
    }
}
