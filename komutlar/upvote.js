const Discord = require("discord.js");
const client = new Discord.Client();
const embed = new Discord.RichEmbed();
 var request = require('request'); 
 module.exports.run = async (bot, message, args) => {

  request('https://discordbotlistt.glitch.me/api/botlar/574331506806226951/oylar/'+message.author.id, function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) { 
      var api = JSON.parse(body);
      
      if (api.oy_durumu == "Bugün oy vermiş.") var rol = message.guild.roles.find(rol => rol.name === 'Destek')

      if (api.oy_durumu == "Bugün oy vermiş.") message.channel.send(`:white_check_mark: **${message.author.username} kullanıcısına __Destekçi__ rolü verildi** :white_check_mark:`);
      if (api.oy_durumu == "Bugün oy vermemiş.") message.channel.send(`:negative_squared_cross_mark: **${message.author.username} oy verdiysen 5 dakika sonra tekrar dene** :negative_squared_cross_mark:`);
      let embed = new Discord.RichEmbed()
      .setAuthor(`DİSCORD BOT LİST`,)
      .setColor(0x00AE86)
      .setDescription(":minidisc: Bota oy vermiş mi ? :minidisc: : " + api.oy_durumu +"\n :robot: Botun oy sayısı :robot: : **"+api.oy_sayisi+"** \n\n")
      message.channel.send({embed});
    }
  })

 }
 exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}
exports.help = {
  name: 'upvote',
  description: 'Bot bilglerini döker',
  usage: 'dblturkey'
};