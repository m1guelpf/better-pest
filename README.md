# Better Pest

A fork of [Better PHPUnit](https://github.com/calebporzio/better-phpunit) that works with [Pest](https://pestphp.com)

## Run a test method:
- Place your cursor in/on the method you want to run
- Open the command menu: `cmd+shift+p`
- Select: `Better Pest: run`

## Run a test file:
- Open the command menu: `cmd+shift+p`
- Select: `Better Pest: run-file`

## Run the entire suite:
- Open the command menu: `cmd+shift+p`
- Select: `Better Pest: run suite`

## Run the previous test:
- Open the command menu: `cmd+shift+p`
- Select: `Better Pest: run previous`

## Features:
- Color output!
- Run individual methods by placing your cursor anywhere in/on the method
- Test failures are displayed in the "Problems" panel for quick access

> Note: this plugin registers "tasks" to run pest, not a command like other extensions. This makes it possible to leverage the problem output and color terminal.

Keybindings:
```
{
    "key": "cmd+k cmd+r",
    "command": "better-pest.run"
},
{
    "key": "cmd+k cmd+f",
    "command": "better-pest.run-file"
},
{
    "key": "cmd+k cmd+p",
    "command": "better-pest.run-previous"
}
```

Config:
```
{
    "better-pest.commandSuffix": null, // This string will be appended to the pest command, it's a great place to add flags like '--stop-on-failure'
    "better-pest.pestBinary": null // A custom pest binary. Ex: 'pest', '/usr/local/bin/pest'
    "better-pest.suiteSuffix": null // Specify options to appended only to the 'run suite' command, for example add options like '--testsuite unit' or '--coverage --coverage-xml'.
}
```

Running tests over ssh (For VMs like Laravel Homestead):
```
{
    "better-pest.ssh.enable": true,
    "better-pest.ssh.paths": {
        "/your/local/path": "/your/remote/path"
    },
    "better-pest.ssh.user": "user",
    "better-pest.ssh.host": "host",
    "better-pest.ssh.port": "22"
    "better-pest.ssh.binary": "putty -ssh"
}
```

Running tests in already running Docker containers:
```
{
    "better-pest.docker.enable": true,
    "better-pest.docker.command": "docker exec container-name",
    "better-pest.docker.paths": {
        "/your/local/path": "/your/remote/path"
    },
}
```

Running tests with Docker Compose, starting up a service and removing the container when finished:
```
{
    "better-pest.docker.enable": true,
    "better-pest.docker.command": "docker-compose run --rm service-name",
    "better-pest.docker.paths": {
        "/your/local/path": "/your/remote/path"
    },
}
```

**Note:**
For running Docker over a SSH session just use both options _ssh.enable_ and _docker.enable_ combined.

## Wish List:
- Handling PHP fatal and parser errors
- A sidebar panel for managing errors
- Re-run failures
