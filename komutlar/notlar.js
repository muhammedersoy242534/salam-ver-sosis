const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {

db.fetch(`notlar_${message.author.id}`).then(yazı => {
if(!yazı) return message.channel.send('<a:iptal:59013677715
  message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`n**${annn}**`).setColor("GREY"));
  
})}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
    kategori: "ekstra",
};

exports.help = {
  name: 'notlar',
  description: 'notlarınız',
  usage: 'Izinsiz Paylaşmayın Aq'
}