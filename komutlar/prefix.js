const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db")
exports.run = (client, message, args) => {
let prefix = args[0]
if(!prefix) return message.channel.send(":x: | Prefixi Ne Olarak Ayarlayacağını Yazmadın?")
db.set(`prefix_${message.guild.id}`, `${prefix}`)
message.channel.send(":white_check_mark: | Bu Sunucudaki Yeni Prefixim: **"+prefix +"\n**Bu Özelliği Kapatmak için **" + prefix + "kapat prefix**")
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3,
  kategori:'ekstra'
};
exports.help = {
  name: 'prefix',
  description: '',
  usage: 'Izinsiz Paylaşmayın Aq'
};