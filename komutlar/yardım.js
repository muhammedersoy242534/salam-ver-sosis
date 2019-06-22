exports.run = (client, message, args) => {
 message.channel.send('remix,alıntı,snipe,8ball,anket,ara155,ailemiz')
}
exports.conf = {
enabled: true,
aliases: [],
permLevel: 0
};

exports.help = {
name: "yardım",
description: "remix listesi",
usage: "yardım"
};