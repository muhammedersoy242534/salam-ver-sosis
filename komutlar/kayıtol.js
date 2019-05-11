const Discord = require('discord.js')

exports.run = async (client, message) => {
if (message.guild.id !== 'Sunucu ID') return;

let jsrole = message.guild.roles.get('Rol ID')

if (message.member.roles.has(jsrole.id)) return message.channel.send(":x: | Zaten Kayıt oldun")

  message.guild.members.get(message.author.id).addRole(jsrole)
  message.channel.send (':white_check_mark: | Başarılı Bir Şekilde Kayıt oldun')
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kayıtol',
  description: '',
  usage: 'kayıt'
};