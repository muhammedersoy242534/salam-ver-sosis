const db = require('quick.db')
const Discord = require('discord.js')
exports.run = async (client, message, args) => {

  const Bot = 'Botunuzun adını yazacaksınız.'
  const p = 'Botunuzun prefixini yazacaksınız.'
  
  if (!message.member.hasPermission('ADMINSTRATOR')) return message.channel.send('Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!')

  const Bilgi = new Discord.RichEmbed()
    .setColor('#000096')
    .setThumbnail(client.user.avatarURL)
    .addField(`**${Bot} | Oto-Cevap Sistemi**`, `Oto-Cevap Sistemi, Sunucunuza Gelenlerin Bazı Yazıları Yazmaları Durumunda Botun Onlara Verecek Tepkisidir.\nBu Yazılara sa / slm / selam / selamın aleyküm / sea / selamun aleyküm - Aleyküm Selam, Hoşgeldin!`, `naber / nasılsınız / nbr - İyi, sen?`, `görüşürüz / bye bye / bye / bay / bay bay / bb / güle güle - Hoşçakal! Dahildir.\nAçmak için **${p}otocevap aç**, kapatmak için **${p}otocevap kapat** yazmalısınız.`)
    .setFooter(Bot, client.user.avatarURL)
    .setTimestamp()
  
  if (!args[0]) return message.channel.send(Bilgi)

  const Açık = new Discord.RichEmbed()
    .setColor('#960000')
    .setThumbnail(client.user.avatarURL)
    .addField(`**${Bot} | Oto-Cevap Sistemi**`, ':white_check_mark: Oto-Cevap Başarıyla Açıldı!')
    .setFooter(Bot, client.user.avatarURL)
    .setTimestamp()
  
  if (args[0] == 'aç') {
    db.set(`otocevap_${message.guild.id}`, 'acik'); message.channel.send(Açık)
  }

  const Kapalı = new Discord.RichEmbed()
    .setColor('#960000')
    .setThumbnail(client.user.avatarURL)
    .addField(`**${Bot} | Oto-Cevap Sistemi**`, ':white_check_mark: Oto-Cevap Başarıyla Kapatıldı!')
    .setFooter(Bot, client.user.avatarURL)
    .setTimestamp()
  
  if (args[0] == 'kapat') {
    db.set(`otocevap_${message.guild.id}`, 'kapali'); message.channel.send(Kapalı)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['oto-cevap', 'otocevap', 'sa-as'],
  permLevel: 3
}

exports.help = {
  name: 'oto-Cevap',
  category: 'Yetkili'
}
