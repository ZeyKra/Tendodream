module.exports = {
    name: 'example',
    description: 'Commande d\'example',
    execute(client, message, args) {

        const Discord = require("discord.js");
        const low = require('lowdb')
        const FileSync = require('lowdb/adapters/FileSync')

        const adapter = new FileSync('./examples.json')
        const exampleFile = low(adapter)
        const config = require('../config.json')

        let example = args[0];

        try {
            let e = exampleFile
                .get(example)
                .value()
            let data = e[0]
                //console.log(data)

            let embed = new Discord.MessageEmbed()
                .setColor('#ff792b')
                .addFields({
                    name: 'Description',
                    value: '```\n' + data.description + '\n```',
                    inline: false
                }, {
                    name: 'Utilisation',
                    value: '```\n' + data.utilisation.replace(/\{prefix\}/, config.PREFIX) + '\n```',
                    inline: true
                }, {
                    name: 'Exemple',
                    value: '```\n' + data.example.replace(/\{prefix\}/, config.PREFIX) + '\n```',
                    inline: true
                }, {
                    name: 'Permission',
                    value: '```\n' + data.permission + '\n```',
                    inline: true
                })
                .setTimestamp()

            message.channel.send(embed)

        } catch (err) {
            message.channel.send('cette commande n\'existe pas')
        }

    }
};