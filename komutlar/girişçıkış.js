const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json")

let prefix = ayarlar.prefix;

exports.run = (client, message, params, args) => {
     if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(':x: Giriş Çıkış Komutunu Kullanmak İçin `Yönetici` yetkisine sahip olman gerek.')
     let giriş = message.mentions.channels.first();
     if (!giriş) return message.channel.send(':x: Kanal Etiketlemen Lazım. `${prefix}girişçıkış #kanal`')
     db.set(`giriş_${message.guild.id}`, message.mentions.channels.first().id).then(i => {
        message.channel.send(`:white_check_mark:  Giriş Çıkış Kanalı Artık, <#${i}> Olarak Ayarlandı.`)    
    })         
};

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['giriş-çıkış'],
 permLevel: 0
};

exports.help = {
 name: 'girişçıkış',
 description: 'sunucunun giriş çıkışlarını ayarlar',
 usage: 'girişçıkış'
};