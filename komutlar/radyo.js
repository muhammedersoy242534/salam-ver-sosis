const Discord = require("discord.js");

exports.run = async (client, msg) => {

const radio = {
     "number1": "http://20723.live.streamtheworld.com/NUMBER1FM_SC?type=.mp3",
    "powerturk": "http://listen.powerapp.com.tr/powerturk/mpeg/icecast.audio?/;stream.nsv",
    "power": "http://listen.powerapp.com.tr/powerfm/mpeg/icecast.audio?/;stream.nsv",
    "metrofm": "http://17703.live.streamtheworld.com/METRO_FM_SC?type=.mp3",
    "fenomen": "http://listen.radyofenomen.com/fenomen/128/icecast.audio?/;stream.nsv",
    "bozkurtlarfm": "http://bozkurtlarfm.canliyayinda.com:4040/;stream.mp3",
    "fenomenfm": "http://fenomenoriental.listenfenomen.com/fenomenoriental/128/icecast.audio",
    "sonmeztv": "http://162.244.80.30:8122",
    "alemfm": "http://scturkmedya.radyotvonline.com/stream/80/",
    "joyfm": "http://17753.live.streamtheworld.com/JOY_FM128AAC_SC",
   "kralfm": "http://46.20.3.204",
    "linefm":"http://radioline.fm:8000/",
  "radyod": "http://radyo.dogannet.tv/radyod",
  "number1fm": "http://nr1digitalsc.radyotvonline.com/stream/264/",
  "cnnturk":"https://radyo.dogannet.tv/cnnturk",
"superfm": "http://17733.live.streamtheworld.com/SUPER_FM_SC",
"virgin": "http://17753.live.streamtheworld.com/VIRGIN_RADIO2_SC",
   "joyturk":"http://17733.live.streamtheworld.com/JOY_TURK_SC",
"ismiyok":"http://46.20.3.201/",
"powerfm" :"http://powerfm.listenpowerapp.com/powerfm/mpeg/icecast.audio",
"palstat": "http://shoutcast.radyogrup.com:1020/stream/1/",
"ntv": "http://ntvrdsc.radyotvonline.com/;",
"mydonese": "http://17733.live.streamtheworld.com/RADIO_MYDONOSE_SC",
"fg":"http://37.1.144.106:9001/stream/1/",
"stream":"http://yayin.netradyom.com:8050/stream/1/",
"voyage": "http://voyagewmp.radyotvonline.com/;",
"yon": "http://yonradyo.radyolarburada.com:8020/;",
"inbat":"http://allergo.serverroom.us:8127/;",
"nr1t": "http://46.20.4.61/;",
"eksen": "http://eksenwmp.radyotvonline.com/;stream.mp3",
  }
            if (!msg.guild.voiceConnection) {

                if (!msg.member.voiceChannel) return msg.channel.send('❎ | Lütfen bir **odaya gir!**')

            }
            let args = msg.content.split(" ").slice(1).join(" ").toLowerCase();

        if (!args) return msg.channel.send('❎ | Bir **radyo seçin:**  **number1**| **powerturk**| **metrofm**| **fenomen**| **bozkırlarfm**| **fenomenfm**| **sonmeztv**| **alemfm**| **joyfm**| **kralfm**| **linefm**| **radyod**| **number1fm**| **virgin**| **joyturk**| ** ismiyok**| **powerfm**| **palstat**| **ntv**| **mydonese**| **fg**| **stream**| **voyage**| **yon**| **imbat**| **nr1t**| **eksen**')

        if(!radio[args]) return msg.channel.send('❎ | Lütfen yandaki Radyolardan | **number1**| **powerturk**| **metrofm**| **fenomen**| **bozkırlarfm**| **fenomenfm**| **sonmeztv**| **alemfm**| **joyfm**| **kralfm**| **linefm**| **radyod**| **number1fm**| **virgin**| **joyturk**| ** ismiyok**| **powerfm**| **palstat**| **ntv**| **mydonese**| **fg**| **stream**| **voyage**| **yon**| **imbat**| **nr1t**| **eksen**')

    msg.member.voiceChannel.join().then(connection => {

    require('http').get(radio[args], (res) => {

            connection.playStream(res);

     let embed = new Discord.RichEmbed()
        .setAuthor("Radyo Çalınıyor", `https://images-ext-1.discordapp.net/external/0O8M-0Q93aKVqx6tonQInp6W7QRDjlLkH1E6mHMaCeM/%3Fv%3D1/https/cdn.discordapp.com/emojis/475822981277286400.gif`)
        .setColor("#FFB900")
        .addField("RADYO", args)
        .setFooter(msg.author.username, msg.author.avatarURL);

     msg.channel.send(embed);

          });

  });
  
  client.on('message', msg => {
  if (msg.author.id === client.user.id) return
  if (msg.content.startsWith('n!kapat')) {
    
    if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('#C34E4E')
    .setDescription('❎ | Sesli bir kanalda değilsin!'));
    
    msg.member.voiceChannel.leave()
    
}});

};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["radido"],
    permLevel: 0,
    kategori:'kullanıcı'
};

exports.help = {
    name : "radydo",
    kategori: "genel",
    usage: "radyo",
    description: "radyo"
};