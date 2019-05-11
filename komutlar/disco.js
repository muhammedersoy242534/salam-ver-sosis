const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, msg, args) => {
  if (!msg.member.hasPermission ("ADMINISTRATOR")) return msg.reply(`Bu Komutu Kullanmak İçin **Yöneitici** İznine Sahip Olmalısın!`);
  
  let discoR = await db.fetch(`discorol_${msg.guild.id}`);
   setInterval(() => {
  msg.guild.roles.find('name', discoR).setColor("RANDOM");
   }, 1500);
msg.channel.send(`Disico Başladı!`)

  };

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['disiko-baslat','disco-başlat'],
     kategori: 'ayararlar',
    permLevel: 3
}

exports.help = {
    name: 'disco',
    description: 'Disco',
    usage: 'disco'
}