const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db")
exports.run = (client, message, args) => {
let channel;
if(message.mentions.channels.first()) channel = message.mentions.channels.first().id
else channel = args[0]
if(!channel) return message.channel.send("Hata! Bir Kanal Etikellemeli veya Bir Kanal idsi girmelisin")
 db.set(`calisimmi_${channel}`, "aktif")
 message.channel.send("<a:ok:589407612227944461> | Artık <#" + channel + "> kanalında çalışmayacağım\nBu Özelliği Kapatmak İçin kapat çalışmakanal {kanal} uygulamanız gereklidir.")
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3,
    kategori: 'ekstra',
};
exports.help = {
  name: 'çalışmakanal',
  description: '',
  usage: 'Izinsiz Paylaşmayın Aq'
};