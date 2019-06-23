let Discord = require('discord.js')
exports.run = async(client, message) => {
let premiummesaj = [
  'Hey hesabın Hazır ,\n Reklamı Geçerek Ulaşabilirsin : `link` ',
  'Hey hesabın Hazır ,\n Reklamı Geçerek Ulaşabilirsin : `linç`'
] 
        var random = Math.floor(Math.random()*(premiummesaj.length-0+1)+0);
        message.channel.send(new Discord.RichEmbed()
                             .addField('Özel Mesajlarını Kontrol Et ! 📮 ','Premium Generator')
                             .setColor('RANDOM')
)
        client.users.get(message.author.id).send(premiummesaj[random]);
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4
};
exports.help = {
  name: 'preal',
  description: 'RitararyCode Sunucusuna Aittir!',
  usage: 'Izinsiz Paylaşmayın Aq'
};