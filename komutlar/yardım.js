exports.run = (client, message, args) => {
 message.channel.send('remix,notlar,notbilgi,notal,notsil,alıntı,snipe,8ball,ascii,atatürk,capsengel,anket,atamınsözleri,ara155,ailemiz,deyim,düello,emoji,emojiid,espri,eval,image,çık,konuş,saat,trump,us,sarıl')
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