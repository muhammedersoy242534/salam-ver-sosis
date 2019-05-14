const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setColor('RANDOM')
  .addField("** ⚠ Yetkili Komutları ⚠ **", `.ban = İstediğiniz kişiyi sunucudan banlar. \n.kick  = İstediğiniz kişiyi kunucudan atar. \n.unban = İstediğiniz kişinin banını açar. \n.sustur = İstediğiniz kişiyi susturur. \n.link-engelle = Reklam engeller. \n.küfür-engelle = Küfür engeller. \n.otorol = Gelen herkeze rol verir.`)
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