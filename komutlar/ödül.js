const Discord = require('discord.js'); //Discord lib
const db = require('quick.db'); //DB lib
var ms = require('parse-ms'); //MS lib

exports.run = async (client, message, args) => {

  let cooldown = 8.64e+7,
    amount = 350;
  let log = client.channels.get('590420059571224596') // Logging channel

  try {
    db.fetch(`lastDaily_${message.author.id}`).then(lastDaily => {
      db.fetch(`balance_${message.guild.id}_${message.member.id}`).then(m => {
        if (m == null) {
          db.set(`balance_${message.guild.id}_${message.member.id}`, 50);
        } else if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
          
          let timeObj = ms(cooldown - (Date.now() - lastDaily));
          
          let lastDailyEmbed = new Discord.RichEmbed()
            .setAuthor("Malesef")
            .setColor('#ff2222')
            .setDescription(`Günlük ödülü tekrar toplamadan önce beklemeniz gerekir. \nKalan zamant: **${timeObj.hours}:${timeObj.minutes}**!`)
            .setFooter('Kullanıcı ' + message.author.tag, message.author.avatarURL);
          
          let dailyCooldown = new Discord.RichEmbed()
            .setAuthor("Malesef")
            .setColor('#ff2222')
            .setDescription(`Dolum öncesi günlük olarak kullanılır.\nKalan zaman: **${timeObj.hours}:${timeObj.minutes}**!`)
            .setFooter('Kullanıcı ' + message.author.tag, message.author.avatarURL);

          message.channel.send(lastDailyEmbed);

        } else {

          db.set(`lastDaily_${message.author.id}`, Date.now());
          db.add(`balance_${message.guild.id}_${message.member.id}`, amount).then(i => {

            var embed = new Discord.RichEmbed()
              .setTitle('Günlük Ödül')
              .setDescription(`Başarıyla toplandı **$${amount}**`)
              .setColor('#ffffff')
              .setFooter('Kullanıcı ' + message.author.tag, message.author.avatarURL)

            message.channel.send(embed);
            
            let dailyGot = new Discord.RichEmbed()
            .setAuthor("Başarılı")
            .setColor('#22ff22')
            .setDescription("Başarılı bir şekilde günlük ödül aldı")
            .setFooter('Kullanıcı ' + message.author.tag, message.author.avatarURL);

          });
        }
      });
    });
  } catch (err) {
    console.log("[ERROR] When using DAILY - \n" + err)
  }

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori:'ekstra'
};

exports.help = {
  name: 'ödül',
  description: 'Günlük ödül.',
  usage: 'ödül'
};