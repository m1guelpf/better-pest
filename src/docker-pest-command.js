const vscode = require('vscode');
const RemotePestCommand = require('./remote-pest-command');

module.exports = class DockerPestCommand extends RemotePestCommand {
    get paths() {
        return this.config.get("docker.paths");
    }

    get dockerCommand() {
        if (this.config.get("docker.command")) {
            return this.config.get("docker.command");
        }

        const msg = "No better-pest.docker.command was specified in the settings";
        vscode.window.showErrorMessage(msg);

        throw msg;
    }

    wrapCommand(command) {
        if (vscode.workspace.getConfiguration("better-pest").get("ssh.enable")) {
            return super.wrapCommand(`${this.dockerCommand} ${command}`);
        }
        return `${this.dockerCommand} ${command}`;
    }
} 