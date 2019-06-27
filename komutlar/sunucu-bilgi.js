  const Discord = require('discord.js');
const moment = require('moment');

exports.run = (client, message, params) => {
    message.delete(5000)

  
  var konum = ''
        if(message.guild.region === "russia") {
            var konum = 'Rusya :flag_ru:'
        }
        if(message.guild.region === "us-west") {
            var konum = 'Batı Amerika :flag_us: '
        }
        if(message.guild.region === "us-south") {
            var konum = 'Güney Amerika :flag_us: '
        }
        if(message.guild.region === "us-east") {
            var konum = 'Doğu Amerika :flag_us: '
        }
        if(message.guild.region === "us-central") {
            var konum = 'Amerika :flag_us: '
        }
        if(message.guild.region === "brazil") {
            var konum = 'Brezilya :flag_br:'
        }
        if(message.guild.region === "singapore") {
            var konum = 'Singapur :flag_sg:'
        }
        if(message.guild.region === "sydney") {
            var konum = 'Sidney :flag_sh:'
        }
        if(message.guild.region === "eu-west") {
            var konum = 'Batı Avrupa :flag_eu:'
        }
        if(message.guild.region === "eu-south") {
            var konum = 'Güney Avrupa :flag_eu:'
        }
        if(message.guild.region === "eu-east") {
            var konum = 'Doğu Avrupa :flag_eu:'
        }
        if(message.guild.region === "eu-central") {
            var konum = 'Avrupa :flag_eu:'
        }
        if(message.guild.region === "hongkong") {
            var konum = 'Hong Kong :flag_hk: '
        }
        if(message.guild.region === "japan") {
            var konum = 'Japonya :flag_jp:'
        }
        var tarih = ''
        if(moment(message.guild.createdAt).format('MM') === '01') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Ocak ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '02') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Şubat ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '03') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Mart ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '04') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Nisan ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '05') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Mayıs ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '06') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Haziran ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '07') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Temmuz ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '08') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Ağustos ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '09') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Eylül ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '10') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Ekim ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '11') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Kasım ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '12') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Aralık ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
  
   const embed = new Discord.RichEmbed()
   .setColor("RANDOM")
   .setAuthor(`${message.guild.name} - Sunucu Bilgileri`)
   .setThumbnail(message.guild.iconURL, true)
   .addField('<a:igne:592723100467068951> Sunucu İsmi', `\`\`\`${message.guild.name}\`\`\``, true)
   .addField('<a:igne:592723100467068951> Sunucu ID', `\`\`\`${message.guild.id}\`\`\``, true)
   .addField('<a:igne:592723100467068951> Sunucu Bölgesi', konum, true)
   .addField('<a:igne:592723100467068951> Oluşturma Tarihi', tarih)
   .addField('\n<a:igne:592723100467068951> Sunucu Üyeleri ['+message.guild.memberCount+']', `<:online:592671913298362378> Çevrimiçi: ${message.guild.members.filter(m => m.user.presence.status === "online").size} \n<:dnd:592669805564264468> Rahatsız Etmeyin: ${message.guild.members.filter(m => m.user.presence.status === "dnd").size} \n<:bosta:592672066533326868> Boşta: ${message.guild.members.filter(m => m.user.presence.status === "idle").size} \n<:offline:592671848420999168> Çevrımdışı/Görünmez: ${message.guild.members.filter(m => m.user.presence.status === "offline").size} \n🤖 Bot: ${message.guild.members.filter(m => m.user.bot).size}`, true)
   .addField('\n<a:igne:592723100467068951> Sunucu Kanalları ['+message.guild.channels.size+']', `:clapper: Yazı: ${message.guild.channels.filter(c => c.type === "text").size} 🎙 Sesli: ${message.guild.channels.filter(c => c.type === "voice").size} \n\n:rosette: Kategori: ${message.guild.channels.filter(c => c.type === "category").size}    :sleeping_accommodation: AFK Kanalı: ${message.guild.afkChannel ? message.guild.afkChannel : 'Bulunmuyor.'}`, true)

   .addField('\n<a:igne:592723100467068951> AFK Zaman Aşımı', message.guild.afkTimeout, true)
   
   .setFooter(`${message.author.username} | Tarafından Kontrol Ediliyor..`, message.guild.iconURL)
      .setTimestamp()
     .setImage('https://cdn.discordapp.com/attachments/586939858921062424/592669145234014208/JPEG_20190624_123749.jpg')

   message.channel.send({embed});
 };
 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ["sunucu", "server"],
   permLevel: 0,
    kategori: "sunucu",
   category: "server"
 };

 exports.help = {
   name: 'sunucu-bilgi',
   description: 'Bulunduğunuz sunucu hakkında bilgi verir.',
   usage: 'sunucu-bilgi',
   enname: 'server-info',
   endescription: 'Gives information about your current server.',
   enusage: 'server-info'
 };