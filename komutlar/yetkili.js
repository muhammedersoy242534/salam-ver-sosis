const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embed = new Discord.RichEmbed()
  .setTitle('Yetkili Komutları ')
  .setColor('RANDOM')
  .addField(`m!ban = İstediğiniz Kişiyi Sunucudan Banlar. \nm!kick  = İstediğiniz Kişiyi Sunucudan Atar. \nm!unban = İstediğiniz Kişinin Yasağını Açar. \nm!sustur = İstediğiniz Kişiyi Susturur. \nm!link-engelle = Anti Reklam Koruması. \nm!küfür-engelle = Anti Küfür Koruması. \nm!otorol = Gelen Herkeze Rol.`)
    message.channel.send(embed);
   
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