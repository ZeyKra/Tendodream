module.exports = {
    name: 'ban',
    description: 'Commande de ban',
    execute(client, message, args) {
        if (!message.member.permissions.has("BAN_MEMBERS"))
            return message.channel.send(
                "**[:rotating_light:] **Tu dois avoir la permission de bannir des membres : `BAN_MEMBERS`"
            );

        let member = message.mentions.members.first();
        if (!member)
            return message.channel.send(
                "**[:rotating_light:]** Veuillez mentioner un membre valide."
            );
        if (!member.bannable)
            return message.channel.send(
                "**[:rotating_light:]** Cette personne ne peut pas êtres banii.Il a peut êtres un role plus haut que moi."
            );

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Aucune raison fournie";

        member.ban({ days: 7, reason: reason })
            .then(console.log)
            .catch(error =>
                message.channel.send(`**[:rotating_light:]** Je ne peut pas bannir cette personne ,Erreur: ${error} `)
            );

        let embed = new Discord.MessageEmbed()
            .setColor('#eb3434')
            .setAuthor(`[Ban] ${member.user.tag}`, member.user.avatarURL)
            .addFields({
                name: 'Bannis',
                value: `${member.user.tag}`,
                inline: true // ./ban <@465185864004141056> grosse merde
            }, {
                name: 'Moderateur',
                value: `${message.author}`,
                inline: true
            }, {
                name: 'Raison',
                value: `${reason}`,
                inline: true
            })
            .setImage('https://media.discordapp.net/attachments/715457381760499713/769329370052952074/QwReiS0.gif')
            .setTimestamp()

        message.channel.send(embed);
    }
};