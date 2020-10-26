module.exports = {
    name: 'clear',
    description: 'Commande de Clear message',
    async execute(client, message, args) {
        const deleteCount = parseInt(args[0], 10);

        if (!message.member.permissions.has("MANAGE_MESSAGES"))
            return message.channel.send(
                "**[:rotating_light:]** Tu dois avoir la permission de gerer les messages `MANAGE_MESSAGES`"
            );

        if (message.member.permissions.has("MANAGE_MESSAGES")) {
            if (!deleteCount || deleteCount < 1 || deleteCount > 100)
                return message.reply("Vous devez mettre un nombre de 1 à 100");

            message.delete();

            await message.channel.messages.fetch({ limit: deleteCount }).then(messages => {
                message.channel.bulkDelete(messages)
            });

            message.channel.send(deleteCount + ' messages ont était supprimés avec succès  :white_check_mark:').then(msg => {
                msg.delete({ timeout: 3000 })
            })
        }
    }
};