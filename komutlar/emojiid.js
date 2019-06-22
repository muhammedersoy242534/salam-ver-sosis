const Discord = require('discord.js');
const superagent = require('superagent')
const db = require("quick.db")

exports.run = async (client, message, args) => {
   if (message.guild.emojis.some(x => `${x.name}`.includes(args[0]))) {
    if (!message.guild.emojis.some(x => `${x.name}`.includes(args[0]))) return message.channel.send(`Sunucuda  \`${args[0]}\`  adında bir emoji bulunamadı!`);
    const emoji = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL)
    .setDescription(`***Görünüm:***  ${message.guild.emojis.find('name', args[0])} \n***Emoji Adı:***  ${message.guild.emojis.find('name', args[0]).name} \n**Emoji İD adresi:**  ${message.guild.emojis.find('name', args[0]).id} \n***Emoji Kodu:***  \`${message.guild.emojis.find(x => x.name == args[0]).toString()}\``)
     try {
        message.channel.send(emoji)
    } catch (err) {
        const embed = new Discord.RichEmbed()
            .addField(`Sunucuda Bulunan Emojiler`, `${client.emojiler.carpi} Üzgünüm ama sunucuda ya çok fazla emoji bulunuyor ya da hiç emoji bulunmuyor. Bunları gösteremiyorum. Discord buna izin vermiyor.`)
            .setColor(0x00ffff)
            .setTimestamp()
        message.channel.send({embed})
    }
    return
  };
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ei'],
  kategori: ['eğlence'],
  permLevel: 0
};

exports.help = {
  name: 'emojiid',
  description: 'Emojiİd Tutarsın.',
  usage: 'prefix+emojiid'
};