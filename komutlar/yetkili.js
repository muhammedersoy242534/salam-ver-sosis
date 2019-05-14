const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
.setThumbnail("https://78.media.tumblr.com/10b366f294d47b40d857d6e47872d0dc/tumblr_ntubqoYYsF1sqwlqgo3_250.gif")
  .setTitle(" Yetkili Komutları ")
  .setColor('RANDOM')
  .addField(`.ban = İstediğiniz kişiyi sunucudan banlar. \n.kick  = İstediğiniz kişiyi kunucudan atar. \n.unban = İstediğiniz kişinin banını açar. \n.sustur = İstediğiniz kişiyi susturur. \n.link-engelle = Reklam engeller. \n.küfür-engelle = Küfür engeller. \n.otorol = Gelen herkeze rol verir.`)
    message.channel.send(embedyardim);
   
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yetkilik'],
  permLevel: 0
};

exports.help = {
  name: 'yetkili',
  description: 'Sunucu Yetkilisi Komutlarını Gösterir',
  usage: 'yetkili [komut]'
};