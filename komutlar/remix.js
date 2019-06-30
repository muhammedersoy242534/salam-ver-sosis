
const Discord = require('discord.js');

exports.run = (client, message, args) => {
  
    
let komutlar = client.commands.filter(a => a.conf.kategori === "özel").map(x => `${x.help.name}: ${x.help.description}`).join("\n")
message.channel.send(`${komutlar}`, {split: true, 'code': 'html'})
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
    kategori: "özel",
 
};

exports.help = {
  name: 'remix',
  description: '',
  usage: 'yazdır <@kullanıcı> <yazı>'
};