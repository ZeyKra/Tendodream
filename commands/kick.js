module.exports = {
    name: 'kick',
    description: 'Command de kick',
    async execute(client, message, args) {

        const config = require('../config.json');

        if (!message.member.permissions.has("KICK_MEMBERS"))
            return message.channel.send(
                "**[:rotating_light:] **Tu dois avoir la permission d'expulser des membres `KICK_MEMBERS`"
            );

        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            return message.channel.send(
                "**[:rotating_light:]** Veuillez mentioner un membre valide."
            );
        if (!member.kickable)
            return message.channel.send(
                "**[:rotating_light:]** Cette personne ne peut pas êtres expulser."
            );


        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Aucune raison fournie";


        member.kick({ reason: reason })
            .catch(error =>
                message.reply(`**[:rotating_light:]** Je ne peut pas expulser cette personne ,Erreur: ${error} `)
            );

        let embed = new Discord.MessageEmbed()
            .setColor('#45de31')
            .setAuthor(`[Kick] ${member.user.tag}`, member.user.avatarURL)
            .addFields({
                name: 'Explusé',
                value: `${member.user.tag}`,
                inline: true // ./kick <@465185864004141056> grosse merde
            }, {
                name: 'Moderateur',
                value: `${message.author}`,
                inline: true
            }, {
                name: 'Raison',
                value: `${reason}`,
                inline: true
            })
            .setImage('https://media.discordapp.net/attachments/715466189027147797/769334681719930940/tumblr_mw4irwOMjK1solyeco1_500.gif')
            .setTimestamp()

        message.channel.send(embed);
    }
};