///////////////RESİMLİ GİRİŞ ÇIKIŞ///////////////////////////
client.on("guildMemberAdd", async member => {
const fs = require('fs');
let gc = JSON.parse(fs.readFileSync("./jsonlar/gc.json", "utf8"));
  
  const hgK = member.guild.channels.get(gc[member.guild.id].gkanal)
    if (!hgK) return;
        let username = member.user.username;
   
            const bg = await Jimp.read("https://i.postimg.cc/LXrHDVJC/guildAdd.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    hgK.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        let hgm = JSON.parse(fs.readFileSync("./jsonlar/hgm.json", "utf8"));
    const hgmK = member.guild.channels.get(hgm[member.guild.id].gkanal)
    var kullanici = member.tag
    var sunucu = member.guild.name
    hgmK.send(`${gc[member.guild.id].mesaj}`)
    })
client.on("guildMemberRemove", async member => {
const fs = require('fs');
let gc = JSON.parse(fs.readFileSync("./jsonlar/gc.json", "utf8"));
    const hgK = member.guild.channels.get(gc[member.guild.id].gkanal)
    if (!hgK) return;
        let username = member.user.username;
         
                        const bg = await Jimp.read("https://i.postimg.cc/zGJqxvfr/guild-Remove.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    hgK.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        
    });


//////////////////////KÜFÜR ENGELLEME/////////////////////////

client.on("message", msg => {
  
  
  db.fetch(`kufur_${msg.guild.id}`).then(i => {
    if (i == 'acik') {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir. Küfür Etmene İzin Veremem !').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    else if (i == 'kapali') {  
    }
    if (!i) return;
  })
    });

//////////////////SAYAÇ SİSTEMİ/////////////////////////

    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
    if(sayac[message.guild.id]) {
        if(sayac[message.guild.id].sayi <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
                .setDescription(`:tada: Tebrikler **\`${message.guild.name}\`** Başarıyla **\`${sayac[message.guild.id].sayi}\`** Kullanıcıya Ulaştı Sayaç Sıfırlandı`)
                .setColor("RANDOM")
                .setTimestamp()
            message.channel.send({embed})
            delete sayac[message.guild.id].sayi;
            delete sayac[message.guild.id];
            fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
                console.log(err)
            })
        }
    }
})
client.on("guildMemberRemove", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("RED")
    .setFooter("", client.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`**:loudspeaker: :outbox_tray: Kullanıcı Ayrıldı** **\`${sayac[member.guild.id].sayi}\`** **Kişi Olmamıza** **\`${sayac[member.guild.id].sayi - member.guild.memberCount}\`** **Kişi Kaldı Şu Anda** **\`${member.guild.memberCount}\`** **Kişiyiz - Görüşürüz** **\`${member.user.tag}\`**`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }
 
});
client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("GREEN")
    .setFooter("", client.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`**:loudspeaker: :inbox_tray: Kullanıcı Katıldı** **\`${sayac[member.guild.id].sayi}\`** **Kişi Olmamıza** **\`${sayac[member.guild.id].sayi - member.guild.memberCount}\`** **Kişi Kaldı Şu Anda** **\`${member.guild.memberCount}\`** **Kişiyiz - Hoşgeldin** **\`${member.user.tag}\`**` );
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }

  
////////////////////MOD LOG///////////////////////
 
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
                                .setFooter(`Imam-Bot Log Sistemi | ID: ${channel.id}`)
                                 let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
    if (!channel.guild.channels.get(membermodChannel)) return console.log('Yazı Kanal Oluşturuldu')
    else channel.guild.channels.get(membermodChannel).send(embed)                      
                        };
                        if (channel.type === "voice") {
                                var embed = new Discord.RichEmbed()
                        .setColor("BLUE")
                                .setAuthor(channel.guild.name, channel.guild.iconURL)
                                .setDescription(`${channel.name} kanalı oluşturuldu. _(sesli kanal)_`)
                                .setFooter(`Imam-Bot Log Sistemi | ID: ${channel.id}`)
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
                                .setFooter(`Imam-Bot' Log Sistemi | ID: ${channel.id}`)
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