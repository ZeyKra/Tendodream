module.exports = {
    name: 'help',
    description: 'commande pour avoir de l\'aide',
    execute(client, message, args) {
        let embed = new Discord.MessageEmbed()
            .setColor('#3F94FF') //#36393F
            .addFields({
                name: 'Serveur :computer:',
                value: '```\n' + (botMsg.createdAt - message.createdAt) + 'ms\n```',
                inline: true // ./kick <@465185864004141056> grosse merde
            }, {
                name: 'Api :satellite:',
                value: '```\n' + Math.round(client.ws.ping) + 'ms\n```',
                inline: true
            }, {
                name: 'En fonctionnement :stopwatch:',
                value: '```\n' + msToTime(client.uptime) + '\n```',
                inline: true
            })
            .setTimestamp()
        message.channel.send(embed);
    }
};