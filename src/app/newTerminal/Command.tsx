type CommandHandler = (ctx: CommandRunContext) => void;
type CommandExitHandler = () => boolean;

export const FLAG_PREFIX = "--";

export class Command {
    aliases: string[];
    description: string;
    handler?: CommandHandler;

    constructor() {
        this.aliases = [];
        this.description = "";
    }

    addAlias(alias: string): Command {
        this.aliases.push(alias);
        return this;
    }

    setDescription(description: string): Command {
        this.description = description;
        return this;
    }

    setHandler(handler: CommandHandler) {
        this.handler = handler;
        return this;
    }
}

// TODO: Implement everything
export class CommandRunContext {
    command: Command;
    rawArgs: string[];
    args: string[];
    flags: string[];
    exitHandler: CommandExitHandler;

    constructor(command: Command, rawArgs: string[]) {
        this.command = command;
        this.rawArgs = rawArgs;
        this.args = [];
        this.flags = [];

        rawArgs.forEach((arg) => {
            if(arg.startsWith(FLAG_PREFIX)) {
                this.flags.push(arg.substring(FLAG_PREFIX.length, arg.length));
            } else {
                this.args.push(arg);
            }
        });

        this.exitHandler = () => {
            return true;
        }    
    }

    echoHtml(html: string) {

    }

    echo(text: string) {
        
    }
}