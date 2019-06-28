const Discord = require('discord.js');

const cevaplar = [
    "Evet",
    "Hayır",
    "Belki",
];

exports.run = function(client, message, args) {
    var soru = args.join(' ');

    var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];

    if(!soru) return message.channel.sendEmbed(new Discord.RichEmbed().setColor('RANDOM').setAuthor('Hata').setDescription('Soru Giriniz'))
    else return message.channel.sendEmbed(new Discord.RichEmbed().setColor('RANDOM').setDescription(cevap).setAuthor('Cevap:'))

};  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['8ball'],
  permLevel: 0 ,
    kategori: "ekstra",
};

exports.help = {
  name: '8ball', 
  description: 'Sorduğunuz Soruya Rastgele Cevap Verir.',
  usage: '8ball [soru]'
};