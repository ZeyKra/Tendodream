const { Console } = require("console");
const Discord = require("discord.js");
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const config = require("./config.json");

//imports
client.on("message", async message => {
    if (message.author.bot) return;

    if (message.content.indexOf(config.PREFIX) !== 0) return;

    const args = message.content
        .slice(config.PREFIX.length)
        .trim()
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(client, message, args);
    } catch (error) {
        console.error(error);

    }

});

client.on("ready", () => {
    console.log(`Bot is ready`);
    client.user.setStatus('available')
    client.user.setActivity("la Table des zoulettes", {
        type: "STREAMING",
        url: "https://www.twitch.tv/tendodream"
    });
});

console.log('----------------------')
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command)

    try {

        let e = ' - ' + command.name + '.js'
        console.log(e + ' '.repeat((18 - e.length)) + '✅ |');
    } catch (error) {
        console.log('erreur')
    }

}
console.log('----------------------')

client.login(config.TOKEN);