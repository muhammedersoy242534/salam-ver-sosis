
Save  New  Duplicate & Edit  Just Text  Twitter
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
	message.channel.send({embed: {
            color: 0xD97634,
            author: {
              name: "Ping Menüsü",
              icon_url: "https://cdn.discordapp.com/attachments/487719679868272689/488331544587403274/image0.jpg"
            },
			    "thumbnail": {
				 "url": "https://cdn.discordapp.com/attachments/481333323470471195/496029363691716619/cobrabotabi.jpg"
			},
            title: "",
            description: `:ping_pong: [Ping](https://www.discordapp.com) : **${Math.round(client.ping)}** ms \nÇok Hızlıyım Dimi :joy:`,
            fields: [
            ],
            timestamp: new Date(),
            footer: {
              icon_url: "",
              text: "© Bot İsmi"
            }
          }
        });  
	    message.react("📝")
}};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['p', 'pong', 'uptime',],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Tüm komutları gösterir.',
  usage: 'ping'
};