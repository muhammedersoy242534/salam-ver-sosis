const Discord = require('discord.js');

let botid = ('') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${client.user.username} Yetkili Komutları`)
    .addField('prefix+komut', 'açıklama/kullanım amacı')//ne kadar yetkili komutunuz varsa o kadar .addField('prefix+komut', 'açıklama/kullanım amacı') koyun
    
    
    


exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setColor('RANDOM')
  .addField("** ⚠ Sunucu Yetkilisi Komutları ⚠ **", `m!ban = İstediğiniz Kişiyi Sunucudan Banlar. \nm!kick  = İstediğiniz Kişiyi Sunucudan Atar. \nm!unban = İstediğiniz Kişinin Yasağını Açar. \nm!sustur = İstediğiniz Kişiyi Susturur. \nm!link-engelle = Anti Reklam Koruması. \nm!küfür-engelle = Anti Küfür Koruması. \nm!otorol = Gelen Herkeze Rol.`)
    message.channel.send(embedyardim);
   
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yetkilik'],
  permLevel: 0
};

exports.help = {
  name: 'yetkili',
  description: 'Sunucu Yetkilisi Komutlarını Gösterir',
  usage: 'yetkili [komut]'
};
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    message.channel.sendEmbed(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'yetkili',
  description: '',
  usage: ''
};