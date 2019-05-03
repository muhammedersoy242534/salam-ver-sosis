const Discord = require('discord.js');

exports.run = (client, message, params) => {
  const embed = new Discord.RichEmbed()
  .setColor(0x00ffff)
  .addField("**》 Yapımcım 《**", client.users.get('YOUR ID').tag)
  message.channel.sendEmbed(embed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yapimcim'],
  permLevel: 0
}

exports.help = {
  name: 'yapımcım',
  description: 'Botun Yapımcısını Gösterir',
  usage: 'yapımcım'
}