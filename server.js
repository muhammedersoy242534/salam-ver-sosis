
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const db = require('quick.db');
const Jimp = require('jimp');
require('./util/eventLoader')(client);
var prefix = ayarlar.prefix;
const log = message => {
console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'SAGARİS ATLADI')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'SAGARİS ATLADI')));
});



/////////////////////MOD LOG////////////////////////////
client.on('guildBanAdd', async (guild, member) => {
   const embed = new Discord.RichEmbed()
        .setTitle('Üye yasaklandı.')
        .setColor("#36393E")
        .setDescription(`<@${member.user.id}> adlı kullanıcı yasaklandı!`)
        .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
        .setFooter(`Yasaklanan Kullanıcı ID: ${member.user.id}`)
        .setTimestamp();
            let membermodChannel = await db.fetch(`membermodChannel_${guild.id}`)
    if (!guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else guild.channels.get(membermodChannel).send(embed)
 
               
        })


.on('messageUpdate', async (oldMessage, newMessage) => {
 if (oldMessage.author.bot) {
        return false;
    }

    if (!oldMessage.guild) {
        return false;
    }

    if (oldMessage.content == newMessage.content) {
        return false;
    }

    if (!oldMessage || !oldMessage.id || !oldMessage.content || !oldMessage.guild) return;
  let embedds4 = new Discord.RichEmbed()
        .setColor("#0080ff")
        .setAuthor(`Mesaj Güncellendi!`)
        .setThumbnail(oldMessage.author.avatarURL)
        .addField("Gönderen", oldMessage.author.tag, true)
        .addField("Önceki Mesaj", `\`\`\`${oldMessage.content}\`\`\``, true)
        .addField("Şimdiki Mesaj", `\`\`\`${newMessage.content}\`\`\``, true)
        .addField("Kanal", newMessage.channel.name, true)
        .setFooter(` Imam-Bot Log Sistemi | ID: ${client.user.id}`)
    let membermodChannel = await db.fetch(`membermodChannel_${oldMessage.guild.id}`)
    if (!oldMessage.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else oldMessage.guild.channels.get(membermodChannel).send(embedds4)
})
       
        client.on('guildBanRemove', async (guild, member) => {
  let embedds6 = new Discord.RichEmbed()
        .setColor("#0080ff")
        .settitle(`Yasak Kaldırıldı!`)
        .setThumbnail(member.avatarURL)
        .setDescription(`'${member.tag}' adlı kişinin yasağı kaldırıldı.`, true)
    let membermodChannel = await db.fetch(`membermodChannel_${guild.id}`)
    if (!guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else guild.channels.get(membermodChannel).send(embedds6)
        })
       
        .on('messageDelete', async msg => {
 
                        var embed = new Discord.RichEmbed()
                        .setAuthor(msg.author.tag, msg.author.avatarURL)
                        .setColor("BLUE")
                        .setDescription(`<@!${msg.author.id}> tarafından <#${msg.channel.id}> kanalına gönderilen \`\`\`${msg.content}\`\`\` mesajı silindi.`)
                        .setFooter(`Imam-Bot Log Sistemi | ID: ${msg.id}`)
    let membermodChannel = await db.fetch(`membermodChannel_${msg.guild.id}`)
    if (!msg.guild.channels.get(membermodChannel)) return console.log('Mesaj Silindi')
    else msg.guild.channels.get(membermodChannel).send(embed)          
               
        })
.on('roleDelete', async role => {
  const fs = require('fs');
  let embed = new Discord.RichEmbed()
        .setColor("BLUE")
        .setAuthor(`Rol Silindi!`)
        .setDescription(`'${role.name}' adlı rol silindi.`, true)
  .setFooter(`Imam-Bot Log Sistemi | ID: ${role.id}`)
    let membermodChannel = await db.fetch(`membermodChannel_${role.guild.id}`)
    if (!role.guild.channels.get(membermodChannel)) return console.log('Mesaj Silindi')
    else role.guild.channels.get(membermodChannel).send(embed)    
})
.on('roleCreate', async role => {
  const fs = require('fs');
  let embed = new Discord.RichEmbed()
        .setColor("BLUE")
        .setAuthor(`Rol Oluşturuldu!`)
        .setDescription(`'${role.name}' adlı rol oluşturuldu.`, true)
  .setFooter(`Imam-Bot Log Sistemi | ID: ${role.id}`)
    let membermodChannel = await db.fetch(`membermodChannel_${role.guild.id}`)
    if (!role.guild.channels.get(membermodChannel)) return console.log('Mesaj Silindi')
    else role.guild.channels.get(membermodChannel).send(embed)    
})
.on('emojiCreate', async emoji => {
  const fs = require('fs');
  let embed = new Discord.RichEmbed()
        .setColor("BLUE")
        .setAuthor(`Emoji Oluşturuldu!`)
        .setDescription(`<:${emoji.name}:${emoji.id}> - ${emoji.name} adlı emoji oluşturuldu!`, true)
  .setFooter(`Imam-Bot Log Sistemi | ID: ${emoji.id}`)
                                 let membermodChannel = await db.fetch(`membermodChannel_${emoji.guild.id}`)
    if (!emoji.guild.channels.get(membermodChannel)) return console.log('Yazı Kanal Oluşturuldu')
    else emoji.guild.channels.get(membermodChannel).send(embed) 
})

.on('emojiDelete', async emoji => {
  const fs = require('fs');

  let embed = new Discord.RichEmbed()
        .setColor("BLUE")
        .setAuthor(`Emoji Silindi!`)
        .setDescription(`':${emoji.name}:' adlı emoji silindi!`, true)
  	.setFooter(`Imam-Bot Log Sistemi | ID: ${emoji.id}`)
                                 let membermodChannel = await db.fetch(`membermodChannel_${emoji.guild.id}`)
    if (!emoji.guild.channels.get(membermodChannel)) return console.log('Yazı Kanal Oluşturuldu')
    else emoji.guild.channels.get(membermodChannel).send(embed)                      
  })
        .on('channelCreate', async channel => {
 
               
                        if (channel.type === "text") {
                                var embed = new Discord.RichEmbed()
                        .setColor("BLUE")
                                .setAuthor(channel.guild.name, channel.guild.iconURL)
                                .setDescription(`<#${channel.id}> kanalı oluşturuldu. _(metin kanalı)_`)
                                .setFooter(`Boss Bot Log Sistemi | ID: ${channel.id}`)
                                 let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
    if (!channel.guild.channels.get(membermodChannel)) return console.log('Yazı Kanal Oluşturuldu')
    else channel.guild.channels.get(membermodChannel).send(embed)                      
                        };
                        if (channel.type === "voice") {
                                var embed = new Discord.RichEmbed()
                        .setColor("BLUE")
                                .setAuthor(channel.guild.name, channel.guild.iconURL)
                                .setDescription(`${channel.name} kanalı oluşturuldu. _(sesli kanal)_`)
                                .setFooter(`Boss Bot Log Sistemi | ID: ${channel.id}`)
         let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
    if (!channel.guild.channels.get(membermodChannel)) return console.log('Ses Kanalı Oluşturuldu')
    else channel.guild.channels.get(membermodChannel).send(embed)                       }
                        })
               
        .on('channelDelete', async channel => {
 if (channel.type === "text") {
                                let embed = new Discord.RichEmbed()
                        .setColor("BLUE")
                                .setAuthor(channel.guild.name, channel.guild.iconURL)
                                .setDescription(`${channel.name} kanalı silindi. _(metin kanalı)_`)
                                .setFooter(`Boss Bot' Log Sistemi | ID: ${channel.id}`)
         let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
    if (!channel.guild.channels.get(membermodChannel)) return console.log('Yazı Kanalı Silindi')
    else channel.guild.channels.get(membermodChannel).send(embed)
                        };
                        if (channel.type === "voice") {
                                let embed = new Discord.RichEmbed()
                        .setColor("BLUE")
                                .setAuthor(channel.guild.name, channel.guild.iconURL)
                                .setDescription(`${channel.name} kanalı silindi. _(sesli kanal)_`)
                                .setFooter(`Imam-Bot Log Sistemi | ID: ${channel.id}`)
 let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
    if (!channel.guild.channels.get(membermodChannel)) return console.log('Ses Kanalı Silindi')
    else channel.guild.channels.get(membermodChannel).send(embed)                       }
               
        });


///////////////////KÜFÜR ENGELLEME///////////////////////
client.on("message", async msg => {
  db.fetch(`kufur_${msg.guild.id}`).then(i => {
if (i == 'Açık') {
        const kufur = ["fuck", "FUCK", "SHIT", "shit", "PORN", "porn", "xnxx", "XNXX","amk","aq","sik","siktir","aq","amk","oç","oruspu","orusbu","anan","sikerler","sikerim","s1kerler","s1kerim","s1ker1m","wtf","AMK","AQ","ORUSBU","ORUSPU","SİKERLER",,"GAY","GÖT","ANAN","PORNHUB.COM","pornhub.com","brazzers","BRAZZERS","ANANI","ananı","ananı sikerim","ananı sik","anamı sik","ANANI SİK","ANANI SİKERİM","şerefsiz","Şerefsiz","ŞEREFSİZ","orospu","orospu çocuğu","OC","Piç","PİÇ","yavşak","YAVŞAK","ibne","ipne","İBNE","İPNE","amına korum","pi.ç","piç"];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
             if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();

                  return msg.reply(`Küfür Tespit Edildi! ${ayarlar.uyarı}`).then(msg => msg.delete(3000));
             }              
          } catch(err) {
            console.log(err);
          }
        } } else if (i == 'Kapalı') {
 
}
   
})
});


/////////////////////////REKLAM ENGELLEME/////////////////////////
client.on("message", async msg => {
  db.fetch(`reklam_${msg.guild.id}`).then(i => {
if (i == 'Açık') {
        
    const reklam = ["discordapp", ".com", ".net", ".xyz", ".tk", "gulu", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ". com"];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
             if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();

                  return msg.reply(`Reklam Tespit Edildi! ${ayarlar.uyarı}`).then(msg => msg.delete(3000));
             }              
          } catch(err) {
            console.log(err);
          }
        } } else if (i == 'Kapalı') {
 
}
   
})
});

arrow_double_up  bot.js içine 

client.login(ayarlar.token);