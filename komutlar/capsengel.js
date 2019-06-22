const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
 
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`🔥 Yeterli yetki, bulunmamakta!`)
  
  let capslock = await db.fetch(`capslock_${message.guild.id}`)
  if (capslock) {
    db.delete(`capslock_${message.guild.id}`)
    message.channel.send(`🔥 Capslock engelleme sistemi, kapatıldı!`)
  }
 
  if (!capslock) {
    db.set(`capslock_${message.guild.id}`, 'acik')
    message.channel.send(`🔥 Capslock engelleme sistemi, aktif!`)
  }
};

	exports.conf = {
		enabled: true,
		guildOnly: false,
		aliases: ['büyükharf-engel'],
		permLevel: 0,
    kategori: "ayarlar",
    category: "settings"
	};
	  
exports.help = {
		name: 'caps-engelle',
		description: 'Büyük harf engelleme sistemini açıp kapatmanızı sağlar.',
		usage: 'caps-engelle <aç/kapat>',
    enname: 'caps-prevention',
    endescription: 'It allows you to turn the caps lock blocking system on and off.',
    enusage: 'caps-prevention <on/off>'
	};
	