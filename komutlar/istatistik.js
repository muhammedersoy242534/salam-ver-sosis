const Discord = require("discord.js"); 
const client = new Discord.Client();
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async(client, message, args) => {
  message.delete()
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");

    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setThumbnail(client.user.avatarURL)
    .setTitle('<a:ezz2:591242960490725377> Saito Bot <a:ezz2:591242960490725377>')
    .addField('<a:saat:589333651884474369> Gecikme: ', client.ping + 'ms')
    .addField('<a:mzik:589122538974478336> Müzik Çalınan Sunucu Sayısı;', client.voiceConnections.size, true)
    .addField('<a:xx:589333857699102741> Çalışma Süresi: ', `${duration}`, true)
    .addField('<a:kullanc:592270311035109396> Kullanıcılar:', client.guilds.reduce((a, b) => a + b.memberCount, 0), true)
    .addField('<a:yuppig:592723842506424334> Kanallar:', client.channels.size, true)
    .addField('<a:zumrut:592723604966211604> Sunucular:', client.guilds.size, true)
    .addField('<a:ates:592993226885955584> Bellek kullanımı:', (process.memoryUsage().heapUsed / 2048 / 2048).toFixed(2), true)
    .addField('<a:discord2:594044361038364693> Kütüphanesi;', `Discord.js`, true)
    .addField(`<a:dc:592723436535808016> Discord.js sürümü:`, Discord.version, true)
      .addField('<a:pika:589334489604292610> Yapımcım:', '<@536770852629381131> \n `Saito`', false)
      .addField('<a:saat:589333651884474369> Botun Başlanma Zamanı:', "Bot **28.06.2019**'de yapılmaya başlanmıştır", true)
    .setFooter('Saito Bot | Her Hakkı Saklıdır..', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['i'],
    permLevel: 0,
    kategori: "bot",
  category: "bot"
  };
  
  exports.help = {
    name: 'istatistik',
    description: 'Botun istatistiklerini gösterir.',
    usage: 'istatistik',
    enname: 'stat',
    endescription: 'Displays the bot statistics.',
    enusage: 'stat'
  };