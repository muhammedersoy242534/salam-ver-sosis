const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setThumbnail("https://78.media.tumblr.com/10b366f294d47b40d857d6e47872d0dc/tumblr_ntubqoYYsF1sqwlqgo3_250.gif")
  .setTitle("  🎵 Müzik Komutları 🎵")
  .setDescription('')
  .setColor(0x00ffff)
       .addField("**>oynat = Şarkıyı Başlatır**", `**>geç = Dinlenilen Şarkıyı Atlar**`)
  .addField("**>ses = Ses Seviyesini Ayarlar**", `**>çalan = O Anda Çalan Şarkıyı Söyler**`)
    .addField("**>duraklat = Çalan Şarkıyı Duraklatır **", `**>devamet = Duraklatılan Şarkıyı Devam Ettirir**`)

  
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(embedyardim);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.send('asciidoc', `= ${command.help.name} = \n${command.help.description}\nDoğru kullanım: ` + prefix + `${command.help.usage}`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['m', 'mzk','play'],
  permLevel: 0
};

exports.help = {
  name: 'müzik',
  description: 'Eğlence komutlarını gösterir.',
  usage: 'müzik'
};
