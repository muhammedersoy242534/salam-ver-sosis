const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
var yazı = args.join(" ")
if(!yazı) return message.channel.send(":x: | Not almak için bir yazı yazınız")
db.add(`notsayi_${message.author.id}`,1)
db.fetch(`notsayi_${message.author.id}`).then(notsayı => {
db.push(`notlar_${message.author.id}`, `${notsayı - 1 + " - " + yazı}`)
message.channel.send(`**${message.author.tag}** adlı kullanıcının **${notsayı.toString().replace("1","0")}** sayılı notu **${yazı}** eklendi.`)
  
})}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'notal',
  description: 'RitararyCode Sunucusuna Aittir!',
  usage: 'Izinsiz Paylaşmayın Aq'
};