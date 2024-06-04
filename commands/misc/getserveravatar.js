// getserveravatar.js
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'getserveravatar',
    aliases: ['getserverav', 'getservav', 'getsvav'],
    description: `Gets user's server by mentioning or providing user ID.`,
    async execute(message, args) {
        try {
            let users = [];

            if (message.mentions.users.size) {
                users = message.mentions.users.map(user => user);
            } else if (args.length) {
                for (const arg of args) {
                    try {
                        const user = await message.client.users.fetch(arg);
                        users.push(user);
                    } catch (error) {
                        const embed = new EmbedBuilder()
                            .setColor('#F39C12')
                            .setDescription('<:error:1247140297784426567> Invalid user provided.');
                        return message.reply({ embeds: [embed] });
                    }
                }
            } else {
                users = [message.author];
            }

            const embeds = await Promise.all(users.map(async (user) => {
                const member = await message.guild.members.fetch(user.id);
                return new EmbedBuilder()
                    .setColor('#EBDCFA')
                    .setTitle(`${user.username}'s Server Avatar`)
                    .setImage(member.displayAvatarURL({ dynamic: true, size: 512 }));
            }));

            return message.reply({ embeds: embeds });
        } catch (error) {
            throw error;
        }
    },
};
