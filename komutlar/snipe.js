const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async (client, message, args) => {
      
  db.fetch(`sonmesajicerik_${message.channel.id}`).then(icerik => {
  db.fetch(`sonmesajsahipid_${message.channel.id}`).then(sahipid => {

  if(!sahipid) return message.channel.send(":x: | **Hata:** Kanalda Hiç Mesaj Silinmemiş")
  else if(!icerik) return message.channel.send(":x: | **Hata:** Kanalda Hiç Mesaj Silinmemiş")
    message.channel.send(new Discord.RichEmbed()
                        .setAuthor(client.users.get(sahipid).tag,client.users.get(sahipid).avatarURL)
                        .addField(`**Mesaj İçeriği:**`,icerik)
                        .setColor('ORANGE')
                        .setFooter(`Kullanıcı ID: ${sahipid}`,client.user.avatarURL))
    
})})
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori:'ekstra'
};
 
exports.help = {
  name: 'snipe',  
  description: 'RitararyCodeye Aittir',
  usage: 'Çalıp Paylaşmayın AMK'
};
