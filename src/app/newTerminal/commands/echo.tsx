import { Command } from "../Command";

export default new Command()
    .addAlias("echo")
    .setDescription("Repeats text")
    .setHandler((ctx) => {
        ctx.echo(ctx.rawArgs.join(" "));
    });