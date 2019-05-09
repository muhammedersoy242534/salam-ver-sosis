const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  if (!args[0]) return message.channel.send('✅Aç yada Kapat yazmalısın! Örnek: .reklamengel aç')
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('`SUNUCUYU_YÖNET` yetkisine sahip olmalısın!')
  
  if (args[0] == 'aç') {
    db.set(`reklam_${message.guild.id}`, 'Açık').then(i => {
      message.channel.send('✅ Reklam Engel başarıyla açıldı! Üyeleri Yasakla yetkisine sahip olanların reklamı engellenmicektir.')
    })
  }
  if (args[0] == 'kapat') {
    db.set(`reklam_${message.guild.id}`, 'Kapalı').then(i => {
      message.channel.send('✅ Reklam Engel başarıyla kapatıldı! Artık herkes reklam yapabilir.')
    })
  }

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['reklam-engel','reklam engelleme'],
  permLevel: 0
};

exports.help = {
  name: 'reklamengel',
  description: 'reklamengel',
  usage: 'reklamengel',
}