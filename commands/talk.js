module.exports = {
    name: 'talk',
    description: 'Commande de text to speech',
    execute(client, message, args) {

        const txtomp3 = require("text-to-mp3");
        const fs = require('fs')

        var options = { tl: 'fr' }

        txtomp3.attributes.tl = args[0];

        let text = args.slice(1).join(" ");
        let id = Math.random().toString(36).substr(2, 9);
        let fName = text.match(/.{1,260}/g);

        txtomp3.getMp3(text, options).then(function(binaryStream) {
                var file = fs.createWriteStream("./tmp/talk-" + args[0] + "-" + id + ".mp3"); // write it down the file
                file.write(binaryStream);
                file.end();
            })
            .then(() => {
                console.log('File created')
                setTimeout(function() {
                    var stats = fs.statSync("./tmp/talk-" + args[0] + "-" + id + ".mp3");
                    if (stats.size <= 1) {
                        message.channel.send('Je n\'ai pais réussit a créer le fichier audio.');
                        try {
                            fs.unlinkSync("./tmp/talk-" + args[0] + "-" + id + ".mp3");
                        } catch (error) {
                            throw e
                        }
                        return
                    }

                    message.channel.send({ files: ["./tmp/talk-" + args[0] + "-" + id + ".mp3"] }).then(() => {
                        setTimeout(function() {
                            try {
                                fs.unlinkSync("./tmp/talk-" + args[0] + "-" + id + ".mp3");
                            } catch (error) {
                                throw e
                            }
                        }, 1000)
                    })
                }, 10)
            })
            .catch(function(err) {
                message.channel.send('Je n\'ai pas réussis a créer le fichier.')
                console.log("Error", err);
            });

    }
};