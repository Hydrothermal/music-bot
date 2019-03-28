const { RichEmbed } = require('discord.js')
const { parseSeconds } = require('../utils.js')
const bar = '------------------------------'

module.exports = {
    usage: 'np',
    description: 'Shows what\'s playing now.',
    async run(message, args) {
        const guildData = message.client.database.get(message.guild.id)
        if (!guildData) {
            message.channel.send('<:error:560328317505372170> Nothing is playing right now.')
            return
        }

        const timeSincePlayingStarted = Math.round((Date.now() - guildData.playlist[0].startedPlaying) / 1000)
        const completed = timeSincePlayingStarted / guildData.playlist[0].length
        const progressBar = bar.split('')
        progressBar.splice(Math.floor(completed * bar.length), 1, '⚫')

        const embed = new RichEmbed()
            .setAuthor(`Currently Playing: ${guildData.playlist[0].title}`)
            .setDescription(`**${parseSeconds(timeSincePlayingStarted)} ${progressBar.join('')} ${parseSeconds(guildData.playlist[0].length)}**`)
            .setColor(0xA787F1)
        if (guildData.playlist[1]) {
            embed.setFooter(`Upcoming: ${guildData.playlist[1].title}`)
        }

        message.channel.send({ embed })
    }
}