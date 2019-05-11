const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

let botid = ('') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL)
        .setColor('0x36393E')
        .setTitle(`${client.user.username} - Komutlar`)
        .setDescription(`:white_small_square: | **${ayarlar.prefix}yetkili** Moderasyon Komutları.\n :white_small_square: | **${ayarlar.prefix}kullanıcı** Kullanıcıya Komutları.\n :white_small_square: |  **${ayarlar.prefix}eğlence** Eğlence Komutları.\n :white_small_square: | **${ayarlar.prefix}ekstra** Ekstra Komutları.\n :white_small_square: | **${ayarlar.prefix}müzik** Müzik Komutları.\n`)
        .setThumbnail(client.user.avatarURL)
        .addField(`» Linkler`, `[Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=${botid}&scrmissions=8) **|** [Destek Sunucusu](https://dird.gg/BAĞLANTI) **|** [Bota Oy Ver (Vote)](https://disdorg/bot/${botid}/vote) **|** [Web Sitesi]()`)//websiteniz yoksa  **|** [Web Sitesi]() yeri silebilirsiniz
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL)
    return message.channel.sendEmbed(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['help','h'],
  permLevel: 0,
};

exports.help = {
  name: 'yardım',
  description: '',
  usage: ''
};
   