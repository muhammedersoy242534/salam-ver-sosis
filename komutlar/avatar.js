const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = function(client, message) {
  const DBL = require('dblapi.js')
  const dbl = new DBL('NTIzODM4OTU0MzI0MDk5MTEz.D3dLCQ.00q7Etx1Eun45tBO1TEOQXu3HGM', client)
  dbl.hasVoted(message.author.id).then(voted => {
  if(voted) {
    
    const embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag)
        .setImage(message.author.avatarURL)
    message.channel.send(embed);
  } else {
  message.channel.send("Bu komutu kullanabilmek için 12 saatte bir https://discordbots.org/bot/523838954324099113/vote sitesinden bota oy vermeniz gerekmektedir. Onaylanması birkaç dakika sürebilir, lütfen bekleyin.")
  }
 })
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['avatarım'],
  permLevel: 0 
};

exports.help = {
  name: 'avatar', 
  description: 'Avatarınızı gösterir',
  usage: 'avatar'
};
 