module.exports = {
    name: 'stats',
    description: 'Commande de statistiques',
    async execute(client, message, args) {

        function m(n, d) {
            x = ('' + n).length, p = Math.pow, d = p(10, d)
            x -= x % 3
            return Math.round(n * d / p(10, x)) / d + " kMGTPE" [x / 3]
        }

        const mcstats = require("mc-stats");
        const Discord = require("discord.js");
        const Canvas = require('canvas');
        const { registerFont } = require('canvas');
        const config = require('../config.json')
        const MinecraftAPI = require('minecraft-api')

        let player = args[0];
        let game = args[1];
        let uuid;
        let stats;

        registerFont('./src/Montserrat-SemiBold.ttf', { family: 'Montserrat-SemiBold' });

        if (!player) return
        if (!game) return

        try {
            uuid = await MinecraftAPI.uuidForName(player);
        } catch (err) {
            console.error(err);
        }

        if (game === 'skywars' || game === 'sw') {
            mcstats.hypixelPlayer(player, config.HYPIXEL_API_TOKEN).then(async result => {
                console.log(result.statistics.skywars)
                stats = result.statistics.skywars;

                const canvas = Canvas.createCanvas(600, 500);
                const ctx = canvas.getContext('2d');

                const background = await Canvas.loadImage('./src/background-hypixel.png');

                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                let width = (canvas.width / 2) + 30
                let height = 133;
                ctx.font = "30px 'Montserrat-SemiBold'"

                //kills
                ctx.fillStyle = '#9AA2D1';
                ctx.fillText('Kills', width, height);
                ctx.fillStyle = '#ffffff';
                ctx.fillText(' ' + stats.kills, width + (ctx.measureText('Kills').width), height);

                let crossed_sword = await Canvas.loadImage('./src/crossed_sword.png');
                ctx.drawImage(crossed_sword, width - 44, height - 30.5, 38, 38);
                height += 45;
                //deaths
                ctx.fillStyle = '#EF5350';
                ctx.fillText('Morts', width, height);
                ctx.fillStyle = '#ffffff';
                ctx.fillText(' ' + stats.deaths, width + (ctx.measureText('Morts').width), height);

                let death_skull = await Canvas.loadImage('./src/death_skull.png');
                ctx.drawImage(death_skull, width - 44, height - 30.5, 38, 38);
                height += 45;
                // victoires
                ctx.fillStyle = '#66BB6A';
                ctx.fillText('Victoires', width, height);
                ctx.fillStyle = '#ffffff';
                ctx.fillText(' ' + stats.wins, width + (ctx.measureText('Victoires').width), height);

                let victoire = await Canvas.loadImage('./src/victoire.png');
                ctx.drawImage(victoire, width - 44, height - 30.5, 38, 38);
                height += 45;
                // Défaites
                ctx.fillStyle = '#ffffff';
                ctx.fillText('Défaites ' + stats.losses, width, height);

                let losses = await Canvas.loadImage('./src/loose.png');
                ctx.drawImage(losses, width - 44, height - 30.5, 38, 38);
                height += 45;
                // Souls
                ctx.fillStyle = '#18A4A4';
                ctx.fillText('Souls', width, height);
                ctx.fillStyle = '#ffffff';
                ctx.fillText(' ' + stats.souls, width + (ctx.measureText('Souls').width), height);

                let soul = await Canvas.loadImage('./src/soul.png');
                ctx.drawImage(soul, width - 44, height - 30.5, 38, 38);
                height += 45;
                // Coins
                ctx.fillStyle = '#FFD930';
                ctx.fillText('Coins', width, height);
                ctx.fillStyle = '#ffffff';
                ctx.fillText(' ' + stats.coins, width + (ctx.measureText('Coins').width), height);

                let coin = await Canvas.loadImage('./src/coin.png');
                ctx.drawImage(coin, width - 44, height - 30.5, 38, 38);
                height += 45;
                // TOKEN
                ctx.fillStyle = '#256126';
                ctx.fillText('Token', width, height);
                ctx.fillStyle = '#ffffff';
                ctx.fillText(' ' + stats.tokens, width + (ctx.measureText('Token').width), height);

                let token = await Canvas.loadImage('./src/token.png');
                ctx.drawImage(token, width - 44, height - 30.5, 38, 38);
                height += 45;

                let skin_render = await Canvas.loadImage('https://visage.surgeplay.com/full/832/' + uuid);
                ctx.drawImage(skin_render, 25, 75, 222, 370);

                let attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'stats-' + player + '-' + game + '.png');
                message.channel.send(attachment);
            });
        } else if (game === 'rush') {
            mcstats.funcraft(player).then(async result => {
                console.log(result)
                stats = result.games.Rush

                const canvas = Canvas.createCanvas(600, 500);
                const ctx = canvas.getContext('2d');

                const background = await Canvas.loadImage('./src/background-funcraft.png');

                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                let width = (canvas.width / 2) + 20
                let height = 133;
                ctx.font = "30px 'Montserrat-SemiBold'"

                //kills
                ctx.fillStyle = '#9AA2D1';
                ctx.fillText('Kills', width, height);
                ctx.fillStyle = '#ffffff';
                ctx.fillText(' ' + stats.kills, width + (ctx.measureText('Kills').width), height);

                let crossed_sword = await Canvas.loadImage('./src/crossed_sword.png');
                ctx.drawImage(crossed_sword, width - 44, height - 30.5, 38, 38);
                height += 45;
                //deaths
                ctx.fillStyle = '#EF5350';
                ctx.fillText('Morts', width, height);
                ctx.fillStyle = '#ffffff';
                ctx.fillText(' ' + stats.deaths, width + (ctx.measureText('Morts').width), height);

                let death_skull = await Canvas.loadImage('./src/death_skull.png');
                ctx.drawImage(death_skull, width - 44, height - 30.5, 38, 38);
                height += 45;
                // victoires
                ctx.fillStyle = '#66BB6A';
                ctx.fillText('Victoires', width, height);
                ctx.fillStyle = '#ffffff';
                ctx.fillText(' ' + stats.wins, width + (ctx.measureText('Victoires').width), height);

                let victoire = await Canvas.loadImage('./src/victoire.png');
                ctx.drawImage(victoire, width - 44, height - 30.5, 38, 38);
                height += 45;
                // Défaites
                ctx.fillStyle = '#ffffff';
                ctx.fillText('Défaites ' + stats.losses, width, height);

                let losses = await Canvas.loadImage('./src/loose.png');
                ctx.drawImage(losses, width - 44, height - 30.5, 38, 38);
                height += 45;
                // Lits détruits
                ctx.fillStyle = '#18A4A4';
                ctx.fillText('Lit détruits', width, height);
                ctx.fillStyle = '#ffffff';
                ctx.fillText(' ' + stats.destroyedBeds, width + (ctx.measureText('Lit détruits').width), height);

                let bed = await Canvas.loadImage('./src/bed.png');
                ctx.drawImage(bed, width - 44, height - 30.5, 38, 38);
                height += 45;
                // Points
                ctx.fillStyle = '#FF8949';
                ctx.fillText('Points', width, height);
                ctx.fillStyle = '#ffffff';
                ctx.fillText(' ' + m(stats.points, 2), width + (ctx.measureText('Points').width), height);

                let points = await Canvas.loadImage('./src/manette.png');
                ctx.drawImage(points, width - 44, height - 30.5, 38, 38);
                height += 45;
                // Classement
                ctx.fillStyle = '#C24EAA';
                ctx.fillText('Classement', width, height);
                ctx.fillStyle = '#ffffff';
                ctx.fillText(' ' + stats.ranking, width + (ctx.measureText('Classement').width), height);

                let classement = await Canvas.loadImage('./src/classement.png');
                ctx.drawImage(classement, width - 44, height - 30.5, 38, 38);
                height += 45;

                let skin_render = await Canvas.loadImage('https://visage.surgeplay.com/full/832/' + uuid);
                ctx.drawImage(skin_render, 25, 75, 222, 370);

                let attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'stats-' + player + '-' + game + '.png');
                message.channel.send(attachment);
            });
        } else if (game === 'bedwars' || game === 'bw') {
            mcstats.hypixelPlayer(player, config.HYPIXEL_API_TOKEN).then(async result => {
                console.log(result)
                stats = result.statistics.bedwars

                const canvas = Canvas.createCanvas(600, 500);
                const ctx = canvas.getContext('2d');

                const background = await Canvas.loadImage('./src/background-hypixel.png');

                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                let width = (canvas.width / 2) + 20
                let height = 133;
                ctx.font = "30px 'Montserrat-SemiBold'"

                //kills
                ctx.fillStyle = '#9AA2D1';
                ctx.fillText('Kills', width, height);
                ctx.fillStyle = '#ffffff';
                ctx.fillText(' ' + stats.kills, width + (ctx.measureText('Kills').width), height);

                let crossed_sword = await Canvas.loadImage('./src/crossed_sword.png');
                ctx.drawImage(crossed_sword, width - 44, height - 30.5, 38, 38);
                height += 45;
                // victoires
                ctx.fillStyle = '#66BB6A';
                ctx.fillText('Victoires', width, height);
                ctx.fillStyle = '#ffffff';
                ctx.fillText(' ' + stats.wins, width + (ctx.measureText('Victoires').width), height);

                let victoire = await Canvas.loadImage('./src/victoire.png');
                ctx.drawImage(victoire, width - 44, height - 30.5, 38, 38);
                height += 45;
                //deaths
                ctx.fillStyle = '#EF5350';
                ctx.fillText('Morts', width, height);
                ctx.fillStyle = '#ffffff';
                ctx.fillText(' ' + stats.deaths, width + (ctx.measureText('Morts').width), height);

                let death_skull = await Canvas.loadImage('./src/death_skull.png');
                ctx.drawImage(death_skull, width - 44, height - 30.5, 38, 38);
                height += 45;
                // Finial Kills                
                ctx.fillStyle = '#ffffff';
                ctx.fillText('Finial Kills ' + stats.finial_kills, width, height);

                let losses = await Canvas.loadImage('./src/finial_kills.png');
                ctx.drawImage(losses, width - 44, height - 30.5, 38, 38);
                height += 45;
                // Lits détruits
                ctx.fillStyle = '#18A4A4';
                ctx.fillText('Lit détruits', width, height);
                ctx.fillStyle = '#ffffff';
                ctx.fillText(' ' + stats.beds_broken, width + (ctx.measureText('Lit détruits').width), height);

                let bed = await Canvas.loadImage('./src/bed.png');
                ctx.drawImage(bed, width - 44, height - 30.5, 38, 38);
                height += 45;
                // Coins
                ctx.fillStyle = '#FFD930';
                ctx.fillText('Coins', width, height);
                ctx.fillStyle = '#ffffff';
                ctx.fillText(' ' + m(stats.coins, 2), width + (ctx.measureText('Coins').width), height);

                let points = await Canvas.loadImage('./src/coin.png');
                ctx.drawImage(points, width - 44, height - 30.5, 38, 38);
                height += 45;
                // Level
                ctx.fillStyle = '#9364DE';
                ctx.fillText('Niveau', width, height);
                ctx.fillStyle = '#ffffff';
                ctx.fillText(' ' + stats.level, width + (ctx.measureText('Niveau').width), height);

                let level = await Canvas.loadImage('./src/level.png');
                ctx.drawImage(level, width - 44, height - 30.5, 38, 38);
                height += 45;

                let skin_render = await Canvas.loadImage('https://visage.surgeplay.com/full/832/' + uuid);
                ctx.drawImage(skin_render, 25, 75, 222, 370);

                let attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'stats-' + player + '-' + game + '.png');
                message.channel.send(attachment);
            });
        }

    }
};