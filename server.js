
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
client.queue = new Map()
const db = require('quick.db');
const Jimp = require('jimp');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube('AIzaSyCkT_L10rO_NixDHNjoAixUu45TVt0ES-s');
const queue = new Map();
const eco = require('discord-economy'); 
let linkEngel = JSON.parse(fs.readFileSync("./jsonlar/linkEngelle.json", "utf8"));
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
.setFooter(`Sarnax-Bot Log Sistemi | ID: ${client.user.id}`)
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
.setFooter(`Sarnax-Bot Log Sistemi | ID: ${msg.id}`)
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
.setFooter(`Sarnax-Bot Log Sistemi | ID: ${role.id}`)
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
.setFooter(`Sarnax-Bot Log Sistemi | ID: ${role.id}`)
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
.setFooter(`Sarnax-Bot Log Sistemi | ID: ${emoji.id}`)
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
	.setFooter(`Sarnax-Bot Log Sistemi | ID: ${emoji.id}`)
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
.setFooter(`Sarnax-Bot Log Sistemi | ID: ${channel.id}`)
let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
if (!channel.guild.channels.get(membermodChannel)) return console.log('Yazı Kanal Oluşturuldu')
else channel.guild.channels.get(membermodChannel).send(embed) 
};
if (channel.type === "voice") {
var embed = new Discord.RichEmbed()
.setColor("BLUE")
.setAuthor(channel.guild.name, channel.guild.iconURL)
.setDescription(`${channel.name} kanalı oluşturuldu. _(sesli kanal)_`)
.setFooter(`Sarnax-Bot Log Sistemi | ID: ${channel.id}`)
let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
if (!channel.guild.channels.get(membermodChannel)) return console.log('Ses Kanalı Oluşturuldu')
else channel.guild.channels.get(membermodChannel).send(embed) }
})

.on('channelDelete', async channel => {
if (channel.type === "text") {
let embed = new Discord.RichEmbed()
.setColor("BLUE")
.setAuthor(channel.guild.name, channel.guild.iconURL)
.setDescription(`${channel.name} kanalı silindi. _(metin kanalı)_`)
.setFooter(`Sarnax-Bot' Log Sistemi | ID: ${channel.id}`)
let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
if (!channel.guild.channels.get(membermodChannel)) return console.log('Yazı Kanalı Silindi')
else channel.guild.channels.get(membermodChannel).send(embed)
};
if (channel.type === "voice") {
let embed = new Discord.RichEmbed()
.setColor("BLUE")
.setAuthor(channel.guild.name, channel.guild.iconURL)
.setDescription(`${channel.name} kanalı silindi. _(sesli kanal)_`)
.setFooter(`sarnax-Bot Log Sistemi | ID: ${channel.id}`)
let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
if (!channel.guild.channels.get(membermodChannel)) return console.log('Ses Kanalı Silindi')
else channel.guild.channels.get(membermodChannel).send(embed) }

});


///////////////////KÜFÜR ENGELLEME/////////////////////
client.on("message", async msg => {
db.fetch(`kufur_${msg.guild.id}`).then(i => {
if (i == 'Açık') {
const kufur = ["fuck", "FUCK", "SHIT", "shit", "PORN", "porn", "xnxx", "XNXX","amk","aq","sik","siktir","a q","a mk","oç","oruspu","orusbu","anan","sikerler","sikerim","s1kerler","s1kerim","s1ker1m","wtf","AMK","AQ","ORUSBU","ORUSPU","SİKERLER",,"GAY","GÖT","ANAN","PORNHUB.COM","pornhub.com","brazzers","BRAZZERS","ANANI","ananı","ananı sikerim","ananı sik","anamı sik","ANANI SİK","ANANI SİKERİM","şerefsiz","Şerefsiz","ŞEREFSİZ","orospu","orospu çocuğu","OC","Piç","PİÇ","yavşak","YAVŞAK","ibne","ipne","İBNE","İPNE","amına korum","pi.ç","piç"];
if (kufur.some(word => msg.content.includes(word))) {
try {
if (!msg.member.hasPermission("BAN_MEMBERS")) {
msg.delete();

return msg.reply(`Küfür Tespit Edildi! ${ayarlar.uyarı}`).then(msg => msg.delete(5000));
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

return msg.reply(`Reklam Tespit Edildi! ${ayarlar.uyarı}`).then(msg => msg.delete(5000));
} 
} catch(err) {
console.log(err);
}
} } else if (i == 'Kapalı') {

}

})
});

client.on("message", async message => {
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
  if(message.content === "!!lele") {
 
      var id = message.author.id;
      var gid = message.guild.id;
      db.delete(`msgs_${id}_${gid}`);
      db.delete(`xp_${id}_${gid}`);
      db.delete(`lvl_${id}_${gid}`);
      db.delete(`xpToLvl_${id}_${gid}`);

    message.channel.send("başarılı")
  }
  
  if(message.content.startsWith(prefix)) return;
  if(message.author.bot) return;
  
  var id = message.author.id;
  var gid = message.guild.id;
  var msgs = await db.fetch(`msgs_${id}_${gid}`)
  var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);
  
  db.add(`msgs_${id}_${gid}`, 1);
  
  if(!lvl) {
    
    db.set(`xp_${id}_${gid}`, 5);
    db.set(`lvl_${id}_${gid}`, 1);
    db.set(`xpToLvl_${id}_${gid}`, 100);
    
  } else {
    
    var random = Math.random() * (5 - 2) + 2;
    db.add(`xp_${id}_${gid}`, random.toFixed());
    
    if(xp > xpToLvl) {
      
      db.add(`lvl_${id}_${gid}`, 1);
      db.add(`xpToLvl_${id}_${gid}`, await db.fetch(`lvl_${id}_${gid}`) * 100);      
      var lvl = await db.fetch(`lvl_${id}_${gid}`);
      message.channel.send(" | Tebrikler " + message.author + ", seviye atladın! Yeni seviyen: **" + lvl + "**");
      var role = message.guild.roles.get(await db.fetch(`role_${gid}_${lvl}lvl`));
      if(!role) return
      else {
        message.member.addRole(role);
        message.channel.send(" | Tebrikler " + message.author + ", **" + lvl + "** seviyeye gelerek, **@" + role.name + "** ödülünü kazandın.")
      } 
      
    }
    
  }
  
  
  
});
   

////////////////////////EVERYONE ENGELLEME///////////////////
client.on('message', message => {
if (message.content.includes('@everone')) {
message.reply("Lütfen **everyone** Kullanmayınız.!!")
message.delete()
}
});


client.on('message', message => {
if (message.content.includes('@herrr')) {
message.reply("Lütfen **here** Kullanmayınız.!!")
message.delete()
}
});

///////////////////////////OTOROL////////////////////////////
client.on("guildMemberAdd", async (member) => {
let autorole = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
let role = autorole[member.guild.id].sayi

member.addRole(role)

});

/////////////////////SUNUCU KURMA/////////////////////
client.on('message', async message => {
const ms = require('ms');
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
let u = message.mentions.users.first() || message.author;
if (command === "sunucu-kur") {
if (message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
message.channel.send(`Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`)
if (!message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir.");
message.channel.awaitMessages(response => response.content === 'evet', {
max: 1,
time: 10000,
errors: ['time'],
})


.then((collected) => {
message.guild.createChannel('📜│Bilgilendirme.', 'category', [{
id: message.guild.id,
deny: ['SEND_MESSAGES']
}])

client.on('guildMemberAdd', async member => {
let rol = await db.fetch(`otorol_${member.guild.id}`)
db.fetch(`otorolkanal_${member.guild.id}`).then(async i => {
const channel = member.guild.channels.get(i)
if (!i) return;
let guild = member.guild;
let otorol = guild.roles.find('name', `${rol}`);
member.addRole(otorol);
channel.send(`**${member.user.tag}** adlı kullanıcıya \`${rol}\` adlı rol verildi!`)
})
});


message.guild.createChannel('📌│кυяαllαя', 'text', [{
id: message.guild.id,
deny: ['SEND_MESSAGES']
}])
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "📜│Bilgilendirme.")));
message.guild.createChannel('🍺│gıяıѕ-çıкıѕ', 'text', [{
id: message.guild.id,
deny: ['SEND_MESSAGES']
}])
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "📜│Bilgilendirme.")));
message.guild.createChannel('💥│ѕαчαç', 'text', [{
id: message.guild.id,
deny: ['SEND_MESSAGES']
}])
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "📜│Bilgilendirme.")));
message.guild.createChannel('📊│αикεт', 'text', [{
id: message.guild.id,
deny: ['SEND_MESSAGES']
}])
.then(channel => channel.setParent(message.guild.channels.find(channel => channel.name === "📜│Bilgilendirme.")));
message.guild.createChannel('📣│dυчυяυlαя', 'text', [{
id: message.guild.id,
deny: ['SEND_MESSAGES']
}])
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "📜│Bilgilendirme.")));

})
.then((collected) => {
message.guild.createChannel('⚡│Ana. Kanallar.', 'category', [{
id: message.guild.id,
}]);

message.guild.createChannel(`🌺│тαvsıyε`, 'text')
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "⚡│Ana. Kanallar.")));
message.guild.createChannel(`🌙│σzlu-ѕσzlεя`, 'text')
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "⚡│Ana. Kanallar.")));
message.guild.createChannel(`📷│fσтσğяαflαя`, 'text')
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "⚡│Ana. Kanallar.")));
message.guild.createChannel(`🤖│вσт-кσмυтlαяı`, 'text')
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "⚡│Ana. Kanallar.")));
message.guild.createChannel(`💭│gεиεl-ѕσнвεт`, 'text')
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "⚡│Ana. Kanallar.")));

message.guild.createChannel(`✯ │ŁØRÐ. &`, "voice")
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "🏆 │ Yetkili Katı")))
.then(c => {
let role = message.guild.roles.find("name", "@everyone");
let role2 = message.guild.roles.find("name", "⍫ Kurucu 🌹");

c.overwritePermissions(role, {
CONNECT: true,
});
c.overwritePermissions(role2, {
CONNECT: true,

});
})

message.guild.createChannel('🏆 │ Yetkili Katı', 'category', [{
id: message.guild.id,
}]);

message.guild.createChannel(`💮│Kâptân. &`, "voice")
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "🏆 │ Yetkili Katı")))
.then(c => {
let role = message.guild.roles.find("name", "@everyone");
let role2 = message.guild.roles.find("name", "⍫ Kurucu 🌹");
let role3 = message.guild.roles.find("name", "⍫ Yonetici 🌹");
c.overwritePermissions(role, {
CONNECT: true,
});
c.overwritePermissions(role2, {
CONNECT: true,
});
c.overwritePermissions(role3, {
CONNECT: true,
});
})

message.guild.createChannel(`⭐│Sohbet. †`, "voice")
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "🏆 │ Yetkili Katı")))
.then(c => {
let role = message.guild.roles.find("name", "@everyone");
c.overwritePermissions(role, {
CONNECT: true,
});
})

message.guild.createChannel(`⭐│Sohbet. ††`, "voice")
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "🏆 │ Yetkili Katı")))
.then(c => {
let role = message.guild.roles.find("name", "@everyone");
c.overwritePermissions(role, {
CONNECT: true,
});
})


message.guild.createRole({
name: '✯ │ŁØRÐ. &',
color: 'ff0000',
permissions: [
"ADMINISTRATOR",
]
})


message.guild.createRole({
name: '💮│Kâptân. &',
color: '49ff00',
permissions: [
"MANAGE_GUILD",
"MANAGE_ROLES",
"MUTE_MEMBERS",
"DEAFEN_MEMBERS",
"MANAGE_MESSAGES",
"MANAGE_NICKNAMES",
"KICK_MEMBERS"
]
})

message.guild.createRole({
name: '🍁│Yønetici. &',
color: 'ffb400',
permissions: [
"MANAGE_GUILD",
"MANAGE_ROLES",
"MUTE_MEMBERS",
"DEAFEN_MEMBERS",
"MANAGE_MESSAGES",
"MANAGE_NICKNAMES"
]
})

message.guild.createRole({
name: '💐│Łâdiεs. &',
color: 'd300ff',
})

message.guild.createRole({
name: '🏆│Bøys. &',
color: 'ffffff',
})

message.guild.createRole({
name: '🛡 │Authorizεd. Bot. &',
color: '0006ff',
})

message.channel.send("⍫ Gerekli Roller Ve Odalar Kuruldu 🌹")

})

}
});

//////////////////////MÜZİK KOMUTU////////////////////////


/////////////////////////RESİMLİ GİRİŞ ÇIKIŞ///////////////////////
client.on("guildMemberAdd", async member => {
const fs = require('fs');
let cogc = JSON.parse(fs.readFileSync("./jsonlar/cogc.json", "utf8"));

const hgK = member.guild.channels.get(cogc[member.guild.id].gkanal)
if (!hgK) return;
let username = member.user.username;

const bg = await
Jimp.read("https://i.postimg.cc/W3XJf156/12.png");
const userimg = await Jimp.read(member.user.avatarURL);
var font;
if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
await bg.print(font, 430, 170, member.user.tag);
await userimg.resize(300, 300);
await bg.composite(userimg, 50, 20).write("./img/"+ member.id + ".png");
setTimeout(function () {
hgK.send(new Discord.Attachment("./img/" + member.id + ".png"));
}, 1000);
setTimeout(function () {
fs.unlink("./img/" + member.id + ".png");
}, 10000);
const hgmK = member.guild.channels.get(cogc[member.guild.id].gkanal)
var kullanici = member.tag
var sunucu = member.guild.name
hgmK.send(`${cogc[member.guild.id].mesaj}`)
})
client.on("guildMemberRemove", async member => {
const fs = require('fs');
let cogc = JSON.parse(fs.readFileSync("./jsonlar/cogc.json", "utf8"));
const hgK = member.guild.channels.get(cogc[member.guild.id].gkanal)
if (!hgK) return;
let username = member.user.username;

const bg = await Jimp.read("https://i.postimg.cc/fydSWfw5/123.png");
const userimg = await Jimp.read(member.user.avatarURL);
var font;
if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
await bg.print(font, 430, 170, member.user.tag);
await userimg.resize(300, 300);
await bg.composite(userimg, 50, 20).write("./img/"+ member.id + ".png");
setTimeout(function () {
hgK.send(new Discord.Attachment("./img/" + member.id + ".png"));
}, 1000);
setTimeout(function () {
fs.unlink("./img/" + member.id + ".png");
}, 10000);

})


////////////////////////SAYAÇ SİSTEMİ//////////////////////////////

client.on("message", async message => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayaç.json", "utf8"));
    if(sayac[message.guild.id]) {
        if(sayac[message.guild.id].sayi <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Tebrikler ${message.guild.name}! Başarıyla ${sayac[message.guild.id].sayi} kullanıcıya ulaştık! Sayaç sıfırlandı!`)
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
});

client.on("message", async message => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayaç.json", "utf8"));
    if(sayac[message.guild.id]) {
        if(sayac[message.guild.id].sayi <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Tebrikler ${message.guild.name}! Başarıyla ${sayac[message.guild.id].sayi} kullanıcıya ulaştık! Sayaç sıfırlandı!`)
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
});


const { promisify } = require('util')

client.config = require("./config.js")
client.logger = console
client.wait = promisify(setTimeout)
client.ayar = db

String.prototype.toProperCase = function() {
  return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};

process.on("uncaughtException", (err) => {
  const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
  console.error("Uncaught Exception: ", errorMsg);
  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: ", err);
});
client.on("guildMemberRemove", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayaç.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayaç.json", "utf8"));  
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
    giriscikiskanali.send(`:loudspeaker: <a:cikis:577496422643925002> \`${member.user.tag}\` Kullanıcısı Sunucudan Ayrıldı. \`${sayac[member.guild.id].sayi}\` Kişi Olmamıza \`${sayac[member.guild.id].sayi - member.guild.memberCount}\` Kişi Kaldı \`${member.guild.memberCount}\` Kişiyiz!`);
  } catch (e) { 
    return console.log(e)
  }

});
client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayaç.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayaç.json", "utf8"));  
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
    giriscikiskanali.send(`:loudspeaker: <a:giris:577496515459809282> \`${member.user.tag}\` Kullanıcısı Sunucuya Katıldı! \`${sayac[member.guild.id].sayi}\` Kişi Olmamıza \`${sayac[member.guild.id].sayi - member.guild.memberCount}\` Kişi Kaldı \`${member.guild.memberCount}\` Kişiyiz!` );
  } catch (e) { 
    return console.log(e)
  }

});
client.on('message', async msg => {
    if (msg.content.toLowerCase() === prefix + "disko") {
   if (msg.channel.type === "dm") return;
  const rol = 'Disko' // Rol ismi buraya
  setInterval(() => {
      msg.guild.roles.find(s => s.name === rol).setColor("RANDOM")
      }, 350);
  }
});



client.on('message', async message => {
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
  let kullanıcı = message.mentions.users.first() || message.author
  let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`)
  let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`)
  let sebep = afkkullanıcı
 
  if (message.author.bot) return;
  if (message.content.includes(`${prefix}afk`)) return;
  
  if (message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`\`${message.author.tag}\` adlı kullanıcı artık AFK değil.`)
      db.delete(`afk_${message.author.id}`)
    }
    if (afkkullanıcı) return message.channel.send(`${message.author}\`${kullanıcı.tag}\` şu anda AFK. Sebep : \`${sebep}\``)
  }

  if (!message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`\`${message.author.tag}\` adlı kullanıcı artık AFK değil.`)
      db.delete(`afk_${message.author.id}`)
    }
  }
});
client.on("messageDelete", message => {
  if(message.author.bot) return;
  db.set(`sonmesajicerik_${message.channel.id}`,message.content)
  db.set(`sonmesajsahipid_${message.channel.id}`,message.author.id)
  console.log('Sunucu:' + message.guild.name + 'Snipe: ' + message.content + ' ' + client.users.get(message.author.id).tag)
  });

client.on("message",message => {
  if(!message.author.bot) return;
  db.fetch(`usohbet_${message.channel.id}`).then(usdurum => {
    if(!usdurum || usdurum === 'pasif') return;
    else {
      message.delete(5000)
    }
})})
client.on('ready', msg => {
  let knl2 = client.channels.find(c => c.id === '594925693926768650'); // Ses Kanalı 2 İD
  let knl3 = client.channels.find(c => c.id === '594925720908595231'); // Ses Kanalı 3 İD
  let knl4 = client.channels.find(c => c.id === '594926325504933918');
  setInterval(() => {

    knl2.setName (client.users.array().length + ' - Kullanıcı', 'voice');
      knl3.setName(client.channels.size + ' - Kanal', 'voice');
        knl4.setName(client.guilds.size + ' - Sunucu', 'voice');
 

  },1 * 10000);
});
const DBL = require("dblapi.js");
const dbl = new DBL('dbl client id', client);

// Optional events
dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})
client.login(ayarlar.token);