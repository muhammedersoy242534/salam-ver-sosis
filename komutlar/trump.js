const Discord = require('discord.js');
exports.run = async(client, message, args) => {
const db = require('quick.db');
    
   let yazı = args.slice(0).join(' ');
   if (yazı.length < 1) return message.reply('Ne Yazdırmak İstiyorsun');
var request = require('request');
request(`https://pinkie-api.glitch.me/api/trump/${yazı}`, function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) {
        var veri = JSON.parse(body);
        const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setImage(veri.message)
        .setFooter(`${message.author.username} Adlı Kişi Tarafından İstendi `, message.author.avatarURL)
        .setTimestamp()
    return message.channel.sendEmbed(embed);
    }
    
});
}

    

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'trump',
  description: '',
  usage: 'trump'
};