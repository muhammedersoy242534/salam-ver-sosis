
const Discord = require('discord.js');
const db = require("quick.db")
let botid = ('591951563023712257') 
exports.run = async(client, message, args) => {
  
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${client.user.username} Remix Komutları`)
     .addField("**__➤ RemixKomutları__**", '**➳adam,duldul,balvin,rte,haksızmıyım,muharrem,karışık,hakan,76darbe,usmanaga,deli,kimkimikoparıyor,yamaç,silkbeni,tvk,evlenecem,kmoi,çukulata,gırtlak,severim,mercedes,bunlardan birisini seç kullan örnek kullanım: t?gırtlak çık komutu t?çık Not:sunucunuzdaki prefix ile yapın. ')
    .addField(`» Linkler`, `[Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/CwHrVs7) **|** [Bota Oy Ver (Vote)](https://discordbots.org/bot/${botid}/vote) **|** `)
    message.channel.sendEmbed(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'remix',
  description: '',
  usage: ''
};
   