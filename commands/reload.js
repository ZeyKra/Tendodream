module.exports = {
    name: 'reload',
    description: 'Recharger une commande',
    execute(client, message, args) {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("**[:rotating_light:] **Tu dois avoir la permission de bannir des membres : `ADMINISTRATOR`");
        if (!args.length) return message.channel.send(`Vous devez préciser une commande a recharger!`);
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName) ||
            message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return message.channel.send(`Il n'y a pas de commande avec le nom \`${commandName}\` !`);

        delete require.cache[require.resolve(`./${command.name}.js`)];
        try {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`Commande \`${command.name}\` rechargée avec succès :white_check_mark:.`);
        } catch (error) {
            console.error(error);
            message.channel.send(`Il y a eu une erreur lors de rechargement de la commande \`${command.name}\`:\n\`${error.message}\``);
        }
    },
};