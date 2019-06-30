const ytdl = require('ytdl-core');

module.exports.run = async(Octopus, message, args) => {
    var url = 'https://www.youtube.com/watch?v=XkcB7JLO-sk';
    const voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send("Lütfen herhangi bir ses kanalına girin.");
    if(message.guild.voiceConnection) return message.channel.send("Şuanda ses kanalındayım.");
    
    var connection = await voiceChannel.join();
    message.channel.send("lilala lilala lilala")
        .then(msg => {
            msg.delete(10000)
        });

    const dispatcher = connection.playStream(ytdl(url))
        .on('end', () => {
            voiceChannel.leave();
        });
    dispatcher.setVolumeLogarithmic(5 / 5);
}

process.on('unhandledRejection', error => console.error(`İzin Hatası:\n${error}`));

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['lilala'],
  kategori: 'özel',
  permLevel: 0
};

exports.help = {
  name: 'lilala',
  description: 'Acaba ne?',
  usage: 'earrape'
};