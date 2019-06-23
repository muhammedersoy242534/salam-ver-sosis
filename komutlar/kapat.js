const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db")

exports.run = (client, message, args) => {
var büne = args[0]
if(büne === "çalışmakanal") {
let channel;
if(message.mentions.channels.first()) channel = message.mentions.channels.first().id
else channel = args[1]

if(!channel) return message.channel.send("<a:iptal:590136777155543040>|Bir Kanal Etikellemeli veya Bir Kanal idsi girmelisin")


 db.delete(`calisimmi_${channel}`)
 message.channel.send("<a:ok:589407612227944461> | Artık <#" + channel + "> kanalında çalışacağım")
  
} else if(büne === "üyeotorol") {

 db.delete(`üyeotorol_${message.guild.id}`)
 db.delete(`üyeotorolk_${message.guild.id}`)
 message.channel.send(":<a:ok:589407612227944461> | Artık üyelere otorol verilmeyecek")
  
} else if(büne === "bototorol") {

 db.delete(`bototorol_${message.guild.id}`)
 db.delete(`bototorolk_${message.guild.id}`)
 message.channel.send("<a:ok:589407612227944461> | Artık botlara otorol verilmeyecek")
  
} else if (büne === "prefix"){
 db.fetch(`prefix_${message.guild.id}`).then(nbr => {
   if(!nbr) return message.channel.send("<a:iptal:590136777155543040>| Sunucuya Özel Prefix Zaten Kapalı Ayarlamak için** " + ayarlar.prefix + "prefix [prefix]**")
 

 db.delete(`prefix_${message.guild.id}`)
 message.channel.send("<a:ok:589407612227944461> | Sunucudaki Özel Prefix Kapatıldı!\nKomutlar Bundan Sonra **"+ ayarlar.prefix + "** prefixi ile çalışacak!")

})} else {
  message.channel.send("Kapatabileceğin Özellikler: `çalışmakanal`,`prefix`,`bototorol`,`üyeotorol`")
}}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'kapat',
  description: 'RitararyCode Sunucusuna Aittir!',
  usage: 'Izinsiz Paylaşmayın Aq'
};