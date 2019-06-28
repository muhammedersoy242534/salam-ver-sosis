const Discord = require('discord.js')

exports.run = (client, message, params) => {
const embed = new Discord.RichEmbed()
.setTitle('🇹🇷 Türkiyemizin Saati Aşağida Yazmaktadir')
.setTimestamp()
.setFooter('Türkiyemizin Saati ->')
.setColor(0xff7f00)

message.channel.sendMessage(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['time'],
    permLevel: 0,
    kategori: "ekstra",
  };
  
  exports.help = {
    name: 'saat',
    description: 'saat',
    usage: 'saat'
  };
