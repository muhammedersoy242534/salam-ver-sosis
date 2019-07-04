const Discord = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<a:iptal:590136777155543040>Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
   message.guild.createChannel(`📜│kurallar`, 'text')
  message.guild.createChannel(`📢│duyuru`, 'text')
   message.guild.createChannel(`🥂│partner `, 'text')
   message.guild.createChannel(`🌹│sayaç`, 'text')
   message.guild.createChannel(`🔐│güvenlik`, 'text')
   message.guild.createChannel(`🔒│log`, 'text')
   message.guild.createChannel(`🚪│hoşgeldin`, 'text')
   message.guild.createChannel(`🌚│otorol`, 'text')
   message.guild.createChannel(`🕳│rol-alma`, 'text')
   message.guild.createChannel(`⭐│yıldızmesaj`, 'text')
   message.guild.createChannel(`💬│sohbet`, 'text')
   message.guild.createChannel(`🤖│bot-komut`, 'text')
   message.guild.createChannel(`📷│foto-chat`, 'text')
   message.guild.createChannel(`🔞│nsfw-gif`, 'text')
   message.guild.createChannel(`🔱│staff-sohbet`, 'text')
   message.guild.createChannel(`❤│kayıt`, 'text')
   message.guild.createChannel(`✅│kayıt-tamamlandı`, 'text')
   message.guild.createChannel(`📞│Destek`, 'text')
   message.guild.createChannel(`「🔊」Sσнвєт`, 'voice')
   message.guild.createChannel(`「🔊」Sσнвєт ↬ 2`, 'voice')
   message.guild.createChannel(`「🎵」Müziк ↬ 2`, 'voice')
   message.guild.createChannel(``, 'voice')
   message.guild.createChannel(``, 'voice')
   message.guild.createChannel(``, 'voice')
   message.guild.createChannel(``, 'voice')
   message.guild.createChannel(``, 'voice')
   message.guild.createChannel(``, 'voice')
  
}



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori:'sunucu'
};

exports.help = {
  name: 'sunucu-kurucu',
  description: 'sunucunuza bottaki kural listesini atar',
  usage: ''
};