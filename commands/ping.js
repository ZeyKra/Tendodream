const { Client } = require("discord.js");

module.exports = {
    name: 'ping',
    description: 'Commande de ping',
    async execute(client, message, args) {

        const Discord = require('discord.js')

        let botMsg = await message.channel.send("〽️ Pinging ...")

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
            .setImage('https://media.discordapp.net/attachments/715466189027147797/769927869198499850/cc0ba6d97079af61dccb5789efb6d6e4.gif')
            .setTimestamp()
        botMsg.edit(embed);

        function msToTime(ms) {
            days = Math.floor(ms / 86400000); // 24*60*60*1000
            daysms = ms % 86400000; // 24*60*60*1000
            hours = Math.floor(daysms / 3600000); // 60*60*1000
            hoursms = ms % 3600000; // 60*60*1000
            minutes = Math.floor(hoursms / 60000); // 60*1000
            minutesms = ms % 60000; // 60*1000
            sec = Math.floor(minutesms / 1000);

            let str = "";
            if (days) str = str + days + "d";
            if (hours) str = str + hours + "h";
            if (minutes) str = str + minutes + "m";
            if (sec) str = str + sec + "s";

            return str;
        }
    }
};