const Discord = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message) => {

  var user = message.mentions.users.first() || message.author;
  var id = user.id
  var gid = message.guild.id;
  
  var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);
  var msgs = db.fetch(`msgs_${id}_${gid}`);
  
  var percent = (100/xpToLvl*xp).toFixed()
  
  var embed = new Discord.RichEmbed()
    .setAuthor(user.tag, user.avatarURL)
    .setColor("RANDOM")
    .setDescription((percent, 30) + " " + percent + "%")
    .addField("Seviye: ", lvl ? lvl : "0")
    .addField("XP: ", xp ? xp : "0", true)
    .setFooter(`Seviye atlamaya kalan son ${xp ? xpToLvl - xp : "0"} XP`)
  message.channel.send(embed);
  
  
  
  
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['rank','seviye'], 
  permLevel: 0,
  kategori: "Seviye Komutları"
};

exports.help = {
  name: 'level', 
  description: 'Kullanıcının seviyesini gösterir.', 
  usage: 'seviye [@kullanıcı]'
};
   