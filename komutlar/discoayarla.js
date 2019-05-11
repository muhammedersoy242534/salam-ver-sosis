const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  const db =require("quick.db")
  db.fetch(`karamliste_${message.author.id}`).then(i => {
    if (i == 'aktif') {
    return message.reply('Olamaz sen botun karalistesinde bulunuyorsun.')
    }
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  let discorol = message.mentions.roles.first()
  

  if (!discorol) {
    return message.channel.send(` Disco Rol Olarak Ayarlamak İstediğin Rolü Etiketlemelisin.`)
    }
    
  
  
  db.set(`discorol_${message.guild.id}`, discorol.name)
  
    message.channel.send(`Disco Rolü \`${discorol.name}\` Olarak Ayarlandı.`)
  })
  };

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['disco-rol', "disiko-rol"],
    kategori: 'ayararlar',
    permLevel: 0
}

exports.help = {
    name: 'disco-rol-ayarla',
    description: 'Disco Rolünü Ayarlar.',
    usage: 'disco-rol-ayarla <@rol>'
}