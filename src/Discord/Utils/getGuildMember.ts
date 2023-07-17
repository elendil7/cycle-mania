import { Guild, User } from 'discord.js';

// get GuildMember
export const getGuildMember = async (user: User, guild: Guild) => {
	return await guild.members.fetch({
		user: user,
		withPresences: true,
	});
};
