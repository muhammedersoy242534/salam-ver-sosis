const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {

var yazı = db.fetch(`notlar_${message.author.id}`)
if(!yazı) return message.channel.send(':x: | Hiç notun yok')
var annn = yazı.join(',\n')
message.channel.send(`Notların: \n**${annn}**`)
  
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['not'],
  permLevel: 0
};

exports.help = {
  name: 'notlar',
  description: 'Ritar',
  usage: 'Izinsiz Paylaşmayın Aq'
};