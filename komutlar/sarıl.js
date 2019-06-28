const Discord = require('discord.js');

const ayarlar = require("../ayarlar.json")

var prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
message.delete()
  
  let user = message.mentions.users.first();
  if(!user) {
    
const embed = new Discord.RichEmbed()
.setTitle(`${message.guild.name}  - Sevenleri Kavuşturdu !`)
.setColor('RANDOM')
.setDescription(`**\n:x: Sarılacağın birisini etiketlemelisin !** \n\n** Doğru Kullanım :: ** \`\`\`${ayarlar.prefix}sarıl <@kullanıcı>\`\`\` `)
.setTimestamp()
.setThumbnail('https://thumbs.gfycat.com/ArtisticClearcutGreyhounddog-size_restricted.gif')
.setFooter(`${message.author.username} | Tarafından Kontrol Ediliyor..`, message.author.avatarURL )
return  message.channel.send(embed);

  }

  
var request = require('request');
request('https://simsekapi.cf/saril', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) {
        var veri = JSON.parse(body);
        

const embed = new Discord.RichEmbed()
.setTitle(`${message.guild.name} - Sevenleri Kavuşturdu !`)
.setColor('RANDOM')
.setDescription(`<@${message.author.id}> | ${user} Adlı Kullanıcıya Sarıldı. `)
.setImage(`${veri.saril}`)
.setTimestamp()
.setFooter(`${message.author.username} | Tarafından Kontrol Ediliyor..`, message.author.avatarURL )
return  message.channel.send(embed);
   
    }
});

} 

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['anime','sarıl'],
  permLevel: 0,
    kategori: "ekstra",
};

module.exports.help = {
  name: 'sarıl',
  description: 'Arkadaşına Sarılırsın.',
  usage: 'sarıl <@kullanıcı>'
};