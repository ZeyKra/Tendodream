module.exports = {
    name: 'try',
    description: 'Commande de test temporaire',
    async execute(client, message, args) {

        const ColorThief = require('color-thief');
        var colorThief = new ColorThief();
        let palette = colorThief.getColor(args[0]);

        message.channel.send("hex : " + palette);
    }
};