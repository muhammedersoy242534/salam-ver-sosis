const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;

 exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('Özel mesajlarını kontrol et. :postbox:');
    message.channel.sendEmbed(ozelmesajkontrol) }
    const davet = new Discord.RichEmbed()
    .setColor('GREEN')
    .setDescription('**= Bot Davet Linki =**\nhttps://discordapp.com/oauth2/authorize?client_id=523838954324099113&scope=bot&permissions=268443704\n\n**= Destek Sunucusu Linki =**\nhttps://discord.gg/j3YY5ap\n\n**= Sitemiz =**\nhttps://BizimSky.glitch.me');
    return message.author.sendEmbed(davet)
 }

 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['davet'],
   permLevel: 0
 };
 exports.help = {
   name: 'davet-et',
   description: 'Botu sunucuna davet eder.',
   usage: 'davet-et'
 };