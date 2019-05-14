const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

    exports.run = (client, message, params) => {
    const embedyardim = new Discord.RichEmbed()
 .setThumbnail("https://78.media.tumblr.com/10b366f294d47b40d857d6e47872d0dc/tumblr_ntubqoYYsF1sqwlqgo3_250.gif")
    .setTitle(" Kullanıcı Komutları ")
.setDescription('')
.setColor("RANDOM")
    .addField('prefix+komut', 'açıklama/kullanım amacı')//ne kadar kullanıcı komutunuz varsa o kadar .addField('prefix+komut', 'açıklama/kullanım amacı') koyun.
    message.channel.sendEmbed(embedyardim);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'kullanıcı',
  description: '',
  usage: 'kullanıcı'
};