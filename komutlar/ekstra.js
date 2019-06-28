
const Discord = require('discord.js');

exports.run = (client, message, args) => {
  
    
let komutlar = client.commands.filter(a => a.conf.kategori === "ekstra").map(x => `${x.help.name}: ${x.help.description}`).join("\n")
message.channel.send(`${komutlar}`, {split: true, 'code': 'html'})
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
    kategori: "ekstra",
 
};

exports.help = {
  name: 'ekstra',
  description: 'İstediğiniz yazıyı bota webhook ile etiketlenen kullanıcının ağzından yazdırır.',
  usage: 'yazdır <@kullanıcı> <yazı>'
};