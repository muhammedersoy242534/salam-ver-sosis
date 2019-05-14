const Discord = require('discord.js');

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
.setThumbnail("https://78.media.tumblr.com/10b366f294d47b40d857d6e47872d0dc/tumblr_ntubqoYYsF1sqwlqgo3_250.gif")
  .setTitle(" Yetkili Komutları")
  .setColor('RANDOM')
  .addField(`m!ban = İstediğiniz Kişiyi Sunucudan Banlar. \nm!kick  = İstediğiniz Kişiyi Sunucudan Atar. \nm!unban = İstediğiniz Kişinin Yasağını Açar. \nm!sustur = İstediğiniz Kişiyi Susturur. \nm!link-engelle = Anti Reklam Koruması. \nm!küfür-engelle = Anti Küfür Koruması. \nm!otorol = Gelen Herkeze Rol.`)
    message.channel.sendEmbed(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'yetkili',
  description: '',
  usage: ''
};
   