const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async (client, message) => {
if (!message.member.hasPermission ('MANAGE_GUILD')) return message.channel.send ('<a:iptal:590136777155543040>| Sunucuyu yönet yetkin olmalı!')
  
  db.delete(`otorol_${message.guild.id}`)
  db.delete(`otorolkanal_${message.guild.id}`)
  message.channel.send(`<a:ok:589407612227944461> | Otorol başarıyla kapatıldı!`)
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'otorolkapat',
  description: 'RitararyCodeye Aittir',
  usage: 'Çalıp Paylaşmayın AMK'
};
