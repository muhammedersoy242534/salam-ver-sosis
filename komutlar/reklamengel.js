const db = require('quick.db')
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
var prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  if (!args[0]) return message.channel.send(`:x: Aç yada Kapat yazmalısın! Örnek: ${prefix}reklamengel aç`)
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('`SUNUCUYU_YÖNET` yetkisine sahip olmalısın!')
  
  if (args[0] == 'aç') {
    db.set(`creklams_${message.guild.id}`, 'aciik').then(i => {
      message.channel.send('✅ **Reklam Engel başarıyla açıldı! Üyeleri Yasakla yetkisine sahip olanların reklamı engellenmicektir.**')
    })
  }
  if (args[0] == 'kapat') {
    db.set(`creklams_${message.guild.id}`, 'kapalii').then(i => {
      message.channel.send('✅ **Reklam Engel başarıyla kapatıldı! Artık herkes reklam yapabilir.**')
    })
  }

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['reklam'],
  permLevel: 0
};

exports.help = {
  name: 'reklamengel',
  description: 'reklamengel',
  usage: 'reklamengel'
};