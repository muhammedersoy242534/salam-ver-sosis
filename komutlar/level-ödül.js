const Discord = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args) => {

  var user = message.author;
  var role = message.mentions.roles.first() || message.guild.roles.get(args[0]);
  if(!role) return message.channel.send( " | Bir ödül rolü belirtin.\n | Doğru kullanım: `seviye-ödül <@rol | rol_id> <seviye>`")
  var lvl = args[1]
  if(!lvl) return message.channel.send( + " | Bir seviye belirtin.\n| Doğru kullanım: `seviye-ödül <@rol | rol_id> <seviye>`")
  if(isNaN(parseInt(lvl))) return message.channel.send(" | Geçerli bir sayı belirtin.");
  var id = user.id
  var gid = message.guild.id;
  
  db.set(`role_${gid}_${lvl}lvl`, role.id)
  message.channel.send( " | **" + lvl + ". seviye** ödülü başarıyla **@" + message.guild.roles.get(await db.fetch(`role_${id}_${gid}_${lvl}lvl`)).name + "** olarak ayarlandı.")
  
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [], 
  permLevel: 3,
  kategori: "Seviye Komutları"
};

exports.help = {
  name: 'level-ödül', 
  description: 'Belirtilen seviyeye gelince kullanıcıya verilecek rolleri belirler.', 
  usage: 'seviye-ödül <@rol | rol_id> <seviye>'
};
   