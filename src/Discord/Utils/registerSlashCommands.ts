import Command from "../Structures/Command";
import { Collection, REST, Routes } from "discord.js";
import { Symbols } from "../../Utils/constants";
import getEnv from "../../Utils/getEnv";
import { config_DISCORDBOT } from "../../../config";

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
  const rest = new REST().setToken(getEnv("DISCORD_BOT_TOKEN"));

  let totalCommands = commandsInJSON.length;
  let totalGuilds = config_DISCORDBOT.guildIDs.length;

  // and deploy your commands!
  try {
    console.log(
      `${Symbols.HOURGLASS} Started refreshing ${totalCommands} application (/) commands in ${totalGuilds} guilds.`,
    );

    for (let i = 0; i < totalGuilds; ++i) {
      const guildID = config_DISCORDBOT.guildIDs[i];

      // The put method is used to fully refresh all commands in the guild with the current set
      await rest.put(
        Routes.applicationGuildCommands(getEnv("DISCORD_BOT_ID"), guildID),
        {
          body: commandsInJSON,
        },
      );
    }

    console.log(
      `${Symbols.SUCCESS} Successfully reloaded ${totalCommands} application (/) commands in ${totalGuilds} guilds.`,
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
}
