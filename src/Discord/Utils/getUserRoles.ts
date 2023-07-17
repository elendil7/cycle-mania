import { GuildMember } from 'discord.js';

export const getUserRoles = async (guildMember: GuildMember) => {
	return [
		...guildMember.roles.cache
			.filter((role) => role.name !== '@everyone')
			.values(),
	];
};
