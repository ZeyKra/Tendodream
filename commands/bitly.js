module.exports = {
    name: 'bitly',
    description: 'Command bitly',
    async execute(client, message, args) {

        const config = require('../config.json');

        const Discord = require("discord.js");
        const BitlyClient = require('bitly').BitlyClient;
        const bitly = new BitlyClient(config.ACCESS_TOKEN);

        let url = args[0];

        if (!args[0]) {
            message.channel.send('Veuillez préciser un lien.')
            return
        }

        try {
            let response = await bitly.shorten(url);

            let embed = new Discord.MessageEmbed()
                .setColor('#ff792b')
                .addFields({
                    name: 'Votre Lien :knot: :',
                    value: `[${response.link}](${response.link})`,
                    inline: false
                })
                .setThumbnail('https://media.discordapp.net/attachments/715466189027147797/769543441859870730/bitly.png')
                .setTimestamp()

            message.channel.send(embed);

        } catch (error) {
            throw error
        }
    }
};