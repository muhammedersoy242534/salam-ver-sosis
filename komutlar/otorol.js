const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async (client, message) => {
if (!message.member.hasPermission ('MANAGE_GUILD')) return message.channel.send (':x: | Sunucuyu yönet yetkin olmalı!')
  let rol = message.mentions.roles.first()
  let kanal = message.mentions.channels.first()
   
  if(!rol) return message.channel.send('<a:iptal:590136777155543040>| Bir Rol Etiketlemelisin Örnek: .otorol @Üye #kanal')
  else if(!kanal) return message.channel.send('<a:iptal:590136777155543040> | Bir kanal Etiketlemelisin Örnek: .otorol @Üye #kanal')
  
  db.set(`otorol_${message.guild.id}`, rol.id)
  db.set(`otorolkanal_${message.guild.id}`, kanal.id)
  message.channel.send(`<a:ok:589407612227944461> | Otorol <@&${rol.id}>, Otorol Kanalı <#${kanal.id}> olarak Ayarlandı!`)
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'otorol',  
  description: 'RitararyCode Sunucusuna Aittir!',
  usage: 'Izinsiz Paylaşmayın Aq'
};