const ytdl = require('ytdl-core');

module.exports.run = async(Octopus, message, args) => {
    var url = 'https://www.youtube.com/watch?v=_PZSdpkWppA';
    const voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send("Lütfen herhangi bir ses kanalına girin.");
    if(message.guild.voiceConnection) return message.channel.send("Şuanda ses kanalındayım.");
    
    var connection = await voiceChannel.join();
    message.channel.send("şıp şıp su sesi")
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
  aliases: ['şıp'],
  kategori: 'özel',
  permLevel: 0
};

exports.help = {
  name: 'susesi',
  description: 'Acaba ne?',
  usage: 'earrape'
};