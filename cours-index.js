const Discord = require('discord.js');

const Client = new Discord.Client();

const config = require('./config.json');

Client.on('ready', () => {
    console.log('Le bot est pret');
})

Client.on('message', msg => {
    if (msg.content.startsWith(config.PREFIX)) {

        var args = msg.content.split(' ');
        console.log(args);
        var command = args[0].toLowerCase();

        if (command === config.PREFIX + 'spam') {

            if (args[1]) {

                try {

                    let nbr = parseInt(args[1]);

                    if (nbr <= 25) {

                        for (var i = 0; i < nbr; i++) {
                            msg.channel.send('Sale grosse merde');
                        }

                    } else {
                        msg.channel.send('le nombre dois être compris entre 1 & 25 ')
                    }


                } catch (err) {

                    msg.channel.send('Vous devez préciser un nombre');

                }

            } else {
                msg.channel.send('Vous devez preciser un nombre entre 1 et 25');
            }
        }

    }

})

Client.login(config.TOKEN);