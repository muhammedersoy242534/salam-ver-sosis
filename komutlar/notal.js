const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
var yazı = args.join(" ")
if(!yazı) return message.channel.send("<a:iptal:590136777155543040> | Not almak için bir yazı yazınız")
db.add(`notsayi_${message.author.id}`,1)
db.fetch(`notsayi_${message.author.id}`).then(notsayı => {
db.push(`notlar_${message.author.id}`, `${notsayı - 1 + " - " + yazı}`)
  message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`**${message.author.tag}** adlı kullanıcının **${notsayı.toString().replace("1","0")}** sayılı notu **${yazı}** eklendi.<a:ok:589407612227944461>`).setColor("GREY")); 
})}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
    kategori: "ekstra",
};
exports.help = {
  name: 'notal',
  description: 'notalır',
  usage: 'Izinsiz Paylaşmayın Aq'
};