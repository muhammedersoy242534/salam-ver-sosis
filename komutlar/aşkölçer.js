const Discord = require('discord.js')
exports.run = async (client, message, args) => {
    let member = message.guild.member(message.mentions.users.array()[0] || message.guild.members.get(args[0]))
    let member2 = message.guild.member(message.mentions.users.array()[1] || message.guild.members.get(args[1]))
    var s = message.author
    if(member2) {
        var s = member2.user
    }
    if(!member) {
        const embed = new Discord.RichEmbed()
            .setDescription(`Bir Kişi Etiketlemelisin.`)
    .setAuthor('Hata', 'https://cdn.discordapp.com/emojis/534964783833808906.gif')
            .setColor("#FF0000")
            .setFooter(message.author.tag + ' tarafından istendi!', message.author.avatarURL) 
        message.channel.send({embed})
        return
    }
    var anasonuc = Math.floor(Math.random() * 101)
    var kalp = ''
    var akalp = ''
    if(Math.floor(Math.round(anasonuc / 10) * 10) >= 10) {
        var c = 0
        for(var i = 0; i < Math.floor(Math.round(anasonuc / 10)); i++) {
            kalp += '❤️'
            c++
        }
        for(var x = c; x < 10; x++) {
            akalp += `🖤`
        }
    } else {
        var kalp = '🖤'
        var akalp = '🖤🖤🖤🖤🖤🖤🖤🖤🖤'
    }
    var yorum = `Birbiriniz için yaratılmışsınız!`
    
    if(anasonuc < 80) {
      var yorum = 'Biraz daha sev... '
      }
   
    if(anasonuc < 70) {
      var yorum = 'Oluyor sanırım.'
      }
  
    if(anasonuc < 60) {
      var yorum = 'Eh işte triplerle bir aşk...'
      }
 
    if(anasonuc < 50) {
      var yorum = 'Belki bu aşk devam eder.'
      }
  
    if(anasonuc < 40) {
      var yorum = 'Azda olsa bir umut var...'
      }
  
    if(anasonuc < 30) {
      var yorum = 'Eh işte.'
      }
  
    if(anasonuc < 20) {
      var yorum = 'Maalesef birbirinize uymuyorsunuz.'
      }
  
    if(anasonuc < 10) {
      var yorum = 'Bence artık ayrılma vakti geldi.'
      }
      
    const embed = new Discord.RichEmbed()
        .setDescription(`<@${member.user.id}> & <@${s.id}>`)
        .addField(`Aşk Çubuğu`, `${kalp}${akalp}`)
        .addField(`Aşk Yüzdesi`, `%${anasonuc}`)
        .addField(`Yorum`, `${yorum}`)
        .setColor("7000d8")
        
    message.channel.send({embed})
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['aşkölçer', 'aşkölç', 'aşk'],
    permLevel: 0
}
exports.help = {
    name: 'aşkölçer',
    description: 'İki Kullanıcı Arasındaki Aşkı Ölçer.',
    usage: 'aşkölçer [@Kullanıcı]'
}
