
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const db = require('quick.db');
const Jimp = require('jimp');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube('AIzaSyCkT_L10rO_NixDHNjoAixUu45TVt0ES-s');
const queue = new Map();

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
.setFooter(`Boss-Bot Log Sistemi | ID: ${client.user.id}`)
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
.setFooter(`Boss-Bot Log Sistemi | ID: ${msg.id}`)
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
.setFooter(`Boss-Bot Log Sistemi | ID: ${role.id}`)
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
.setFooter(`Boss-Bot Log Sistemi | ID: ${role.id}`)
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
.setFooter(`Boss-Bot Log Sistemi | ID: ${emoji.id}`)
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
	.setFooter(`Boss-Bot Log Sistemi | ID: ${emoji.id}`)
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
.setFooter(`Boss-Bot Log Sistemi | ID: ${channel.id}`)
let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
if (!channel.guild.channels.get(membermodChannel)) return console.log('Yazı Kanal Oluşturuldu')
else channel.guild.channels.get(membermodChannel).send(embed) 
};
if (channel.type === "voice") {
var embed = new Discord.RichEmbed()
.setColor("BLUE")
.setAuthor(channel.guild.name, channel.guild.iconURL)
.setDescription(`${channel.name} kanalı oluşturuldu. _(sesli kanal)_`)
.setFooter(`Boss-Bot Log Sistemi | ID: ${channel.id}`)
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
.setFooter(`Boss-Bot' Log Sistemi | ID: ${channel.id}`)
let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
if (!channel.guild.channels.get(membermodChannel)) return console.log('Yazı Kanalı Silindi')
else channel.guild.channels.get(membermodChannel).send(embed)
};
if (channel.type === "voice") {
let embed = new Discord.RichEmbed()
.setColor("BLUE")
.setAuthor(channel.guild.name, channel.guild.iconURL)
.setDescription(`${channel.name} kanalı silindi. _(sesli kanal)_`)
.setFooter(`Boss-Bot Log Sistemi | ID: ${channel.id}`)
let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
if (!channel.guild.channels.get(membermodChannel)) return console.log('Ses Kanalı Silindi')
else channel.guild.channels.get(membermodChannel).send(embed) }

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
client.on("message", msg => {
db.fetch(`reklam_${msg.guild.id}`).then(i => {
if (i == 'acik') {
const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
if (reklam.some(word => msg.content.includes(word))) {
try {
if (!msg.member.hasPermission("BAN_MEMBERS")) {
msg.delete();
return msg.reply('Bu Sunucuda Reklam Engelleme Filtresi Aktiftir. Reklam Yapmana İzin Veremem !').then(msg => msg.delete(3000));


msg.delete(3000); 

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

////////////////////////EVERYONE ENGELLEME///////////////////
client.on('message', message => {
if (message.content.includes('@everyone')) {
message.reply("Lütfen **here** Kullanmayınız.!!")
message.delete()
}
});


client.on('message', message => {
if (message.content.includes('@here')) {
message.reply("Lütfen **here** Kullanmayınız.!!")
message.delete()
}
});

///////////////////////////TEMİZLEME////////////////////////////

client.on('message', msg => {
if (msg.content.toLowerCase() === '.çöp') {
if (msg.channel.type === 'dm') {
const ozelmesajuyari = new Discord.RichEmbed()
.setColor(0xdcff00)
.setTimestamp()
.setAuthor(msg.author.username, msg.author.avatarURL)
.addField('⚠ Uyarı ⚠', 'Bu komutu özel mesajlarda kullanamazsın.')
msg.author.sendEmbed(ozelmesajuyari); }
if (msg.channel.type !== 'dm') {
if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
if (msg.author.id !== ayarlar.yapimci) {
const mesajlariyonet = new Discord.RichEmbed()
.setColor(0xFF0000)
.setTimestamp()
.setAuthor(msg.author.username, msg.author.avatarURL)
.addField('⚠ Uyarı ⚠', 'Bu komutu kulllanmak için `Mesajları Yönet` iznine sahip olmalısın.')
return msg.author.sendEmbed(mesajlariyonet);
}}
msg.channel.bulkDelete(100);
msg.channel.bulkDelete(100);
msg.channel.bulkDelete(100);
msg.channel.bulkDelete(100);
msg.channel.bulkDelete(100); //500 mesaj gg
const sohbetsilindi = new Discord.RichEmbed()
.setColor(0x35ff00)
.setTimestamp()
.addField('Eylem:', '**Sohbet silme**')
.addField('Yetkili:', '` ' + msg.author.username + '`')
.addField('Silinen Mesaj Sayısı:', '»'+ ' **500** ' + '«')
.addField('Sonuç:', '`Başarılı`'+ ' ✅ ')
return msg.channel.sendEmbed(sohbetsilindi).then(msg => msg.delete(2900));
}}});

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

client.on('message', async msg => {

	if (msg.author.bot) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);
	let command = msg.content.toLowerCase().split(' ')[0];

	if (command === '.oynat') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
.setColor('RANDOM')
.setDescription('❎ | Lütfen Seli Bir Kanala Giriş Yapınız!'));
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.sendEmbed(new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('❎ | Lütfen Seli Bir Kanala Giriş Yapınız!'));
		}
		if (!permissions.has('SPEAK')) {
			 return msg.channel.sendEmbed(new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('❎ | Şarkıyı Çalamıyorum Bu Kanalda Konuşma Yetkim Yok!'));
}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			 return msg.channel.sendEmbed(new Discord.RichEmbed)
.setTitle(`✅** | **${playlist.title}** Adlı Şarkı Kuyruğa Eklendi!**`)
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;

				 msg.channel.sendEmbed(new Discord.RichEmbed() 
.setTitle('Şarkı Seçimi')
.setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
.setFooter('Lütfen 1-10 Arasında Bir Rakam Seçiniz 10 Saniye İçinde Liste İptal Edilecektir!')
	 .setFooter('Boss Müzik')
.setColor('0x36393E'));
msg.delete(5000)
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						 return msg.channel.sendEmbed(new Discord.RichEmbed()
.setColor('0x36393E')
.setDescription('❎ | **10 Saniye İçinde Şarkı Seçmediğiniz İçin seçim İptal Edilmiştir!**.'));
}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.sendEmbed(new Discord.RichEmbed()
.setColor('0x36393E')
.setDescription('❎ | YouTubede Böyle Bir Şarkı Yok !**'));
}
}
			return handleVideo(video, msg, voiceChannel);

		}
	} else if (command === '.gir') {
		return new Promise((resolve, reject) => {
			const voiceChannel = msg.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('Kanalda Kimse Olmadığından Çıkıyorum!');
			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
		});
	} else if (command === '.geç') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
.setColor('RANDOM')
.setDescription('❎ | Lütfen Seli Bir Kanala Giriş Yapınız!'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('❎ | Şu An Zaten Şarkı Çalmıyorum!')); 
		serverQueue.connection.dispatcher.end('**Sıradaki Şarkıya Geçildi!**');
		return undefined;
	} else if (command === '.durdur') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
.setColor('RANDOM')
.setDescription('❎ | Lütfen Seli Bir Kanala Giriş Yapınız!'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('❎ | Şu An Zaten Şarkı Çalmıyorum!')); 
		msg.channel.send(`:stop_button: **${serverQueue.songs[0].title}** Adlı Şarkı Durduruldu`);
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('**Şarkı Bitti**');
		return undefined;
	} else if (command === '.ses') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
.setColor('RANDOM')
.setDescription('❎ | Lütfen Seli Bir Kanala Giriş Yapınız!'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('❎ | Çalmayan Müziğin Sesine Bakamam')); 
		if (!args[1]) return msg.channel.sendEmbed(new Discord.RichEmbed()
.setTitle(`:loud_sound: Şuanki Ses Seviyesi: **${serverQueue.volume}**`)
.setColor('RANDOM'))
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.sendEmbed(new Discord.RichEmbed()
.setTitle(`🔊 Ses Seviyesi Ayarlanıyor: ${args[1]}`)
.setColor('RANDOM')); 
	} else if (command === '.çalan') {
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
.setTitle("❎ | Şu An Şarkı Çalınmıyor!")
.setColor('RANDOM'));
		return msg.channel.sendEmbed(new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle("Çalan") 
.addField('Başlık', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`, true)
.addField("Süre", `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`, true))
	} else if (command === '.sıra') {
let index = 0;
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
.setTitle("❎ | Şarkı Kuyruğunda Şarkı Bulunmamakta")
.setColor('RANDOM'));
		 return msg.channel.sendEmbed(new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('Şarkı Kuyruğu')
.setDescription(`${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}`))
.addField('Şu Anda Çalınan: ' + `${serverQueue.songs[0].title}`);
	} else if (command === '.durdur') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.sendEmbed(new Discord.RichEmbed()
.setTitle("**:pause_button: Şarkı Durduruldu!**")
.setColor('RANDOM'));
		}
		return msg.channel.send('❎ | Şarkı Çalmıyor Şu An');
	} else if (command === '.devam') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.sendEmbed(new Discord.RichEmbed()
.setTitle(":arrow_forward: Şarkı Devam Ediyor!")
.setColor('RANDOM'));
		}
		return msg.channel.sendEmbed(new Discord.RichEmbed()
.setTitle("❎ | Şu An Şarkı Çalınmıyor!")
.setColor('RANDOM'));
	}


	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
const serverQueue = queue.get(msg.guild.id);
console.log(video);
const song = {
id: video.id,
title: video.title,
url: `https://www.youtube.com/watch?v=${video.id}`,
durationh: video.duration.hours,
durationm: video.duration.minutes,
durations: video.duration.seconds,
views: video.views,
};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error("❎ | Şarkı Sisteminde Problem Var Hata Nedeni: ${error}");
			queue.delete(msg.guild.id);
			return msg.channel.sendEmbed(new Discord.RichEmbed()
.setTitle("❎ | Şarkı Sisteminde Problem Var Hata Nedeni: ${error}")
.setColor('RANDOM'))
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		return msg.channel.sendEmbed(new Discord.RichEmbed()
.setTitle("✅ | ${song.title} Adlı Şarkı Kuyruğa Eklendi!")
.setColor('RANDOM'))
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === '❎ | Yayın Akış Hızı Yeterli Değil.') console.log('Şarkı Bitti.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	 serverQueue.textChannel.sendEmbed(new Discord.RichEmbed() 
.setTitle("🎙 Şarkı Başladı",`https://i.hizliresim.com/RDm4EZ.png`)
.setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
.addField('\nBaşlık', `[${song.title}](${song.url})`, true)
.addField("\nSes Seviyesi", `${serverQueue.volume}%`, true)
.addField("Süre", `${song.durationm}:${song.durations}`, true)
.setColor('RANDOM'));
}

/////////////////////////RESİMLİ GİRİŞ ÇIKIŞ///////////////////////
client.on("guildMemberAdd", async member => {
const fs = require('fs');
let cogc = JSON.parse(fs.readFileSync("./jsonlar/cogc.json", "utf8"));
  
  const hgK = member.guild.channels.get(cogc[member.guild.id].gkanal)
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
  let cogc = JSON.parse(fs.readFileSync("./jsonlar/cogc.json", "utf8"));
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
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    hgK.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        
    })


client.login(ayarlar.token);