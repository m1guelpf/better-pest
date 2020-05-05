const vscode = require('vscode');
const assert = require('assert');
const PestCommand = require('./pest-command');
const RemotePestCommand = require('./remote-pest-command.js');
const DockerPestCommand = require('./docker-pest-command.js');

var globalCommand;

module.exports.activate = function (context) {
    let disposables = [];

    disposables.push(vscode.commands.registerCommand('better-pest.run', async () => {
        let command;

        if (vscode.workspace.getConfiguration("better-pest").get("docker.enable")) {
            command = new DockerPestCommand;
        } else if (vscode.workspace.getConfiguration("better-pest").get("ssh.enable")) {
            command = new RemotePestCommand;
        } else {
            command = new PestCommand;
        }

        await runCommand(command);
    }));

    disposables.push(vscode.commands.registerCommand('better-pest.run-file', async () => {
        let command;

        if (vscode.workspace.getConfiguration("better-pest").get("docker.enable")) {
            command = new DockerPestCommand({ runFile: true });
        } else if (vscode.workspace.getConfiguration("better-pest").get("ssh.enable")) {
            command = new RemotePestCommand({ runFile: true });
        } else {
            command = new PestCommand({ runFile: true });
        }

        await runCommand(command);
    }));

    disposables.push(vscode.commands.registerCommand('better-pest.run-suite', async () => {
        let command;

        if (vscode.workspace.getConfiguration("better-pest").get("docker.enable")) {
            command = new DockerPestCommand({ runFullSuite: true });
        } else if (vscode.workspace.getConfiguration("better-pest").get("ssh.enable")) {
            command = new RemotePestCommand({ runFullSuite: true });
        } else {
            command = new PestCommand({ runFullSuite: true });
        }

        await runCommand(command);
    }));

    disposables.push(vscode.commands.registerCommand('better-pest.run-previous', async () => {
        await runPreviousCommand();
    }));

    disposables.push(vscode.tasks.registerTaskProvider('pest', {
        provideTasks: () => {
            return [new vscode.Task(
                { type: "pest", task: "run" },
                2,
                "run",
                'pest',
                new vscode.ShellExecution(globalCommand.output),
                '$pest'
            )];
        }
    }));

    context.subscriptions.push(disposables);
}

async function runCommand(command) {
    setGlobalCommandInstance(command);

    vscode.window.activeTextEditor
        || vscode.window.showErrorMessage('Better Pest: open a file to run this command');

    await vscode.commands.executeCommand('workbench.action.terminal.clear');
    await vscode.commands.executeCommand('workbench.action.tasks.runTask', 'pest: run');
}

async function runPreviousCommand() {
    await vscode.commands.executeCommand('workbench.action.terminal.clear');
    await vscode.commands.executeCommand('workbench.action.tasks.runTask', 'pest: run');
}

function setGlobalCommandInstance(commandInstance) {
    // Store this object globally for the provideTasks, "run-previous", and for tests to assert against.
    globalCommand = commandInstance;
}

// This method is exposed for testing purposes.
module.exports.getGlobalCommandInstance = function () {
    return globalCommand;
}
