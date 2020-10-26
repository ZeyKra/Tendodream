const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

const BitlyClient = require('bitly').BitlyClient;
const bitly = new BitlyClient(config.ACCESS_TOKEN);
const fs = require('fs');
const txtomp3 = require("text-to-mp3");

client.on("ready", () => {
    console.log(`Bot is ready`);
    //client.user.setActivity(`${config.prefix}help [${client.guilds.size}]`);
});


client.on("message", async message => {
    if (message.author.bot) return;

    if (message.content.indexOf(config.PREFIX) !== 0) return;

    const args = message.content
        .slice(config.PREFIX.length)
        .trim()
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "ping") {

        var ping_embed = new Discord.RichEmbed()
            .setColor(7488370)
            .setFooter("Ping du bot", message.author.avatarURL)
            .setAuthor("Chargement ...", "https://i.imgur.com/GmSTXUI.gif")
            .setTimestamp();

        const m = await message.channel.send(ping_embed);

        var ping2_embed = new Discord.RichEmbed()
            .setColor(7488370)
            .setFooter(
                `Requette de ${message.author.username}`,
                message.author.avatarURL
            )
            .setAuthor("Ping", "https://i.imgur.com/adCLrTZ.png")
            .addField(
                "\nPings :",
                `\n**Ping du bot : ${Math.round(client.ping)}ms**`,
                true
            )
            .setTimestamp();
        setTimeout(function() {
            m.edit(ping2_embed);
        }, 3000);
    }

    if (command === "talk") {

        var options = {
            tl: args[0]
        }

        let text = args.slice(1).join(" ");
        let id = message.author.id


        txtomp3.saveMP3(text, id + ".mp3", options, function(err, absoluteFilePath) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(absoluteFilePath)
                //"File saved : /home/enrico/WebstormProjects/textToMp3/FileName.mp3"
                //const buffer = fs.readFileSync(absoluteFilePath);
                //const attachment = new MessageAttachment(buffer);
                //message.channel.send(`${message.author}, ok`, attachment);
        }).then(() => {
            try {
                console.log('file created')
                message.channel.send({ files: ['./' + id + '.mp3'] })
            } catch (error) {
                throw e
            }
        })

    }

    if (command === "stats") {
        mcstats.hypixelPlayer(args[0], "7d1071c5-1de4-46ed-94da-daa904d7c555").then(result => console.log(result.statistics.skywars));
    }

    if (command === "ascii") {
        const text = args.join(" ");

        figlet.text(
            text, {
                font: "Doom",
                horizontalLayout: "default",
                verticalLayout: "default"
            },
            function(err, data) {
                if (err) {
                    console.log(`Quelque chose n'a pas très bien fonctioné :c ...`);
                    message.channel.send(
                        `**Quelque chose n'a pas bien fonctioné :c ...**`
                    );
                    console.dir(err);
                    return;
                }
                console.log(data);
                message.channel.send("```\n" + data + "\n```");
            }
        );
    }

    if (command === "emote") {
        let id = args.join(" ");
        let emote = client.emojis.get(id);
        message.channel.send(`**Emoji : ${emote}**`);
        console.log(id);
    }

    if (command === "serverinfo") {
        let serverLevel = ["Aucun", "Faible", "Moyen", "Élevé", "Extreme"];
        let emojiList = message.guild.emojis.map((e, x) => e).join("");
        let emojisize = message.guild.emojis.size;
        if (!emojiList) emojiList = "Aucun émojis";
        if (!emojisize) emojisize = "0";

        const embed = new Discord.RichEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setThumbnail(message.guild.iconURL)
            .addField(`Fondateur`, message.guild.owner.user, true)
            .addField(`ID`, message.guild.id, true)
            .addField(`Membres`, message.guild.memberCount, true)
            .addField(
                `Bots`,
                message.guild.members.filter(mem => mem.user.bot === true).size,
                true
            )
            .addField(
                `Membres En ligne(s)`,
                message.guild.members.filter(mem => mem.presence.status != "offline")
                .size,
                true
            )
            .addField(
                "Niveau de Sécurité",
                serverLevel[message.guild.verificationLevel],
                true
            )
            .addField("Date de Création", message.guild.createdAt, true)
            .addField(
                `Liste des roles [${message.guild.roles.size - 1}]`,
                message.guild.roles
                .map(r => r)
                .join(" ")
                .replace("@everyone", " ")
            )
            .addField(`Liste des émojis [${emojisize}]`, emojiList);

        message.channel.send(embed);
    }


    if (command === "avatar") {
        let user = message.mentions.users.first() || message.author;

        let avatarembed = new Discord.RichEmbed()
            .setAuthor(`Photo de profil de ${user.username}`)
            .setImage(user.displayAvatarURL)
            .setColor("RANDOM");
        message.channel.send(avatarembed);
        console.log(getColorFromURL(user.displayAvatarURL));
    }

    if (command === "RPS") {
        if (!args[0]) return message.channel.send("`-rps pierre/feuille/papier`");
        let rep = ["pierre", "feuille", "papier"];
        let res = Math.floor(Math.random() * rep.length);

        if (rep === res) return message;
    }

    if (command === "8ball") {
        if (!args[0]) return message.channel.send("Tu dois poser une Question");
        let reponse = ["Oui", "Non", "Peut être", "Je ne sais pas"];

        let result = Math.floor(Math.random() * reponse.length);
        let question = args.slice(0).join(" ");

        var b_embed = new Discord.RichEmbed()
            .setColor(1644825)
            .setAuthor(`8ball ${message.author.username}`, message.author.avatarURL)
            .addField("Question", `${question}`)
            .addField("Réponse", reponse[result]);
        message.channel.send(b_embed);
    }

    if (command === "checkperm") {
        let has_kick = message.member.permissions.has("KICK_MEMBERS");

        if (has_kick) return message.channel.send("tu as la perm");
        if (!has_kick) return message.channel.send("tu n'as pas la perm");
    }


    if (command === "rename") {
        let puser = message.mentions.members.first();
        let p_name = args.slice(1).join(" ");

        if (!message.member.permissions.has("MANAGE_NICKNAMES"))
            return message.channel.send(
                "[:rotating_light:] Tu dois avoir la permission de changer les pseudo `MANAGE_NICKNAMES`"
            );

        if (message.member.permissions.has("MANAGE_NICKNAMES")) {
            message.channel.send(
                `[:white_check_mark:] Tu as bien Modifier le pseudo de ${puser}.`
            );

            puser.edit({
                nick: `${p_name}`
            });
        }
    }


    if (command === "poll") {
        if (!message.member.roles.some(r => ["Admin", "perm-pool"].includes(r.name)))
            return message.channel.send(
                "**[:rotating_light:]** Tu dois avoir le role : `perm-pool` ou `Admin`"
            );

        if (
            message.member.roles.some(r => ["Admin", "perm-pool"].includes(r.name))
        ) {
            let text_pool = args.slice(0).join(" ");
            let m_a = message.author;
            message.delete();
            var ban_embed = new Discord.RichEmbed()
                .setColor(16723759)
                .setAuthor(`Sondage de ${m_a.username}`, m_a.avatarURL)
                .addField(`Votez !!!`, `${text_pool}`);
            const mbot = await message.channel.send(ban_embed);
            mbot.react("✅");
            mbot.react("❌");
        }
    }

});

function story_random(min, max) {
    min = Math.ceil(1);
    max = Math.floor(3);
    let randnum = Math.floor(Math.random() * (max - min + 1) + min);
}

client.login(config.TOKEN);