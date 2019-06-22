const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
  var keyler = [1,2,3,4,5,6,7,8,9,0]
  
var yazı = args[0]
if(!yazı) return message.channel.send(":x: | Hangi Notu Sileceksiniz")
//if(!yazı.includes(keyler.some)) return message.channel.send(":x: | Hangi Notu Sileceksiniz")
let x = args[0] //silinecek veri
let arr = []
db.fetch(`notlar_${message.author.id}`).then(amk => {
db.delete(`notlar_${message.author.id}`, `${yazı}`)
amk.forEach(v => {
if (!v.startsWith(x)) {
db.push(`notlar_${message.author.id}`,v)
}
})});
db.fetch(`notsayi_${message.author.id}`).then(yarrak => {
if(args[0] > yarrak) return message.channel.send("Bu Sayıda Bir Notun Yok!")
//db.delete(`notlar_${message.author.id}`, `${yazı}`)
db.add(`notsayi_${message.author.id}`, -1)
message.channel.send(`**${message.author.tag}** notlarına **${args[0]}** sayılı notu silindi.`)
  
})}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'notsil',
  description: 'RitararyCode Sunucusuna Aittir!',
  usage: 'Izinsiz Paylaşmayın Aq'
};