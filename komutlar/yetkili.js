const Discord = require('discord.js');

let botid = ('') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
 .setThumbnail("https://78.media.tumblr.com/10b366f294d47b40d857d6e47872d0dc/tumblr_ntubqoYYsF1sqwlqgo3_250.gif")
  .setColor('RANDOM')
  .addField(`.ban = İstediğiniz kişiyi sunucudan banlar. \n.kick  = İstediğiniz kişiyi sunucudan atar. \nm!unban = İstediğiniz kişinin yasağını açar. \n.sustur = İstediğiniz kişiyi susturur. \n.link-engelle = Reklam engeller. \n.küfür-engelle = Küfür engeller. \n.otorol = Gelen herkeze rol verir.`)
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