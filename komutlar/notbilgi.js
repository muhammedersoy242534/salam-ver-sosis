const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
  var hangisi = args[0]
  if(!hangisi) return message.channel.send(":x: | Lütfen Hangi Nota Bakacağını Sayı İle Yaz")
db.fetch(`notsayi_${message.author.id}`).then(notsayi => {
db.fetch(`notlar_${message.author.id}`).then(yazı => {
if(hangisi > notsayi) return message.channel.send(":x: | Bu Sayıda Bir Notun Yok!")
  let annn = yazı[hangisi].split(notsayi - 1 + " - ").join("")
  if(annn === undefined) return message.channel.send(":x: | Bu Sayıda Bir Notun Yok! Lütfen **1** yerine **0** kullanmayı deneyin")
message.channel.send("Not içeriği: **" + annn + "**")
  
})})}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'notbilgi',
  description: 'RitararyCode Sunucusuna Aittir!',
  usage: 'Izinsiz Paylaşmayın Aq'
};