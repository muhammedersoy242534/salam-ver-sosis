const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
  var hangisi = args[0]
  if(!hangisi) return message.channel.send("<a:iptal:590136777155543040> | Lütfen Hangi Nota Bakacağını Sayı İle Yaz")
db.fetch(`notsayi_${message.author.id}`).then(notsayi => {
db.fetch(`notlar_${message.author.id}`).then(yazı => {
if(hangisi > notsayi) return message.channel.send("<a:iptal:590136777155543040> | Bu Sayıda Bir Notun Yok!")
  let annn = yazı[hangisi].split(notsayi - 1 + " - ").join("")
  if(annn === undefined) return  message.channel.sendEmbed(new Discord.RichEmbed().setDescription("<a:iptal:590136777155543040> | Bu Sayıda Bir Notun Yok! Lütfen **1** yerine **0** kullanmayı deneyin").setColor("GREY"));
message.channel.send("Not içeriği: **" + annn + "**")
  
})})}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
    kategori: "ekstra",
};
exports.help = {
  name: 'notbilgi',
  description: 'aldığınız not hakında bilgi verir',
  usage: 'Izinsiz Paylaşmayın Aq'
};