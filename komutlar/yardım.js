const Discord = require('discord.js');


exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setThumbnail("https://images-ext-2.discordapp.net/external/SuLhN3wmdmorQqYUD68rsK5Is-XEkOLdxDTnFuNKoJ0/https/78.media.tumblr.com/10b366f294d47b40d857d6e47872d0dc/tumblr_ntubqoYYsF1sqwlqgo3_250.gif")
.setTitle('» Komutlar;')
.setTimestamp()
.addField('» Eğlence Komutları', `.eğlence`)
.addField('» Moderatör Komutları', `.moderatör`)
.addField('» Genel Komutlar', `.genel`)
.addField('» Ekstra Komutlar', `.ekstra`)
.addField('» Müzik Komutları', `.müzik`)
.setFooter('© 2019 Boss Bot', client.user.avatarURL)
.setTimestamp()
.setThumbnail(client.user.avatarURL)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["help", "h", "y", "komutlar"], 
  permLevel: 0 
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};