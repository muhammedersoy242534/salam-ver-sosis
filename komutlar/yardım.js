const Discord = require('discord.js');
const db = require("quick.db")
let botid = ('591951563023712257') 
exports.run = async(client, message, args) => {
  
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${client.user.username} Yardım Komutları`)
     .addField("**__➤ Yardım Komutları__**", '**➳ remix,notlar,notbilgi,otorol,kapat,otorolkapat,çalışmakanal,notal,notsil,alıntı,snipe,8ball,ascii,atatürk,capsengel,anket,atamınsözleri,ara155,ailemiz,deyim,düello,emoji,emojiid,espri,eval,image,çık,konuş,saat,trump,us,sarıl')
    .addField(`» Linkler`, `[Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/CwHrVs7) **|** [Bota Oy Ver (Vote)](https://discordbots.org/bot/${botid}/vote) **|**`)
    message.channel.sendEmbed(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'yardım',
  description: '',
  usage: ''
};
   
