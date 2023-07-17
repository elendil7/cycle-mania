import Command from "../Structures/Command";
import { Collection, REST, Routes } from "discord.js";
import {
  DISCORD_BOT_ID,
  DISCORD_BOT_TOKEN,
  DISCORD_GUILD_IDS,
} from "./exportedEnvs";
import { Symbols } from "../../Utils/constants";

export default async function registerSlashCommands(
  commands: Collection<string, Command>,
) {
  let commandsInJSON: any = [];

  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  commands.forEach((cmd, cmdName) => {
    if (cmd.data) {
      commandsInJSON.push(cmd.data.toJSON());
    } else {
      console.log(
        `${Symbols.WARNING} [WARNING] The command at ${cmdName} is missing a required "data" or "execute" property.`,
      );
    }
  });

  // Construct and prepare an instance of the REST module
  const rest = new REST().setToken(DISCORD_BOT_TOKEN);

  let totalCommands = commandsInJSON.length;
  let totalGuilds = DISCORD_GUILD_IDS.length;

  // and deploy your commands!
  try {
    console.log(
      `Started refreshing ${totalCommands} application (/) commands in ${totalGuilds} guilds.`,
    );

    for (let i = 0; i < DISCORD_GUILD_IDS.length; ++i) {
      const guildID = DISCORD_GUILD_IDS[i];

      // The put method is used to fully refresh all commands in the guild with the current set
      await rest.put(Routes.applicationGuildCommands(DISCORD_BOT_ID, guildID), {
        body: commandsInJSON,
      });
    }

    console.log(
      `Successfully reloaded ${totalCommands} application (/) commands in ${totalGuilds} guilds.`,
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
}
