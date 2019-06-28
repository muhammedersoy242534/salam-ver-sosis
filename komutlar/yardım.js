const Discord = require("discord.js");

exports.run = async (client, message, args, tools, con) => {
 
  let logsEmbed = new Discord.RichEmbed() 
  .setColor("#e62828")
  .setTimestamp()
  .addField('= <BoşAmaHoş> Komutlar  =', `${client.commands.map(cmd => `\`${cmd.help.name}\``).join("\n ")}`)
  message.channel.send(logsEmbed);
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'remix',
  description: 'Komut kategorilerini gösterir.',
  usage: 'yardım'
};
 