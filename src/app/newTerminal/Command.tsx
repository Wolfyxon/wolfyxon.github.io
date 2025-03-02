type CommandHandler = (ctx: CommandRunContext) => void;
type CommandExitHandler = () => boolean;

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
    exitHandler: CommandExitHandler;

    constructor(command: Command) {
        this.command = command;
        
        this.exitHandler = () => {
            return true;
        }    
    }

    echoHtml(html: string) {

    }

    echo(text: string) {
        
    }
}