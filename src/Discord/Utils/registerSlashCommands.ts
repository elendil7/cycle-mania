import Command from "../Structures/Command";
import { Collection, REST, Routes } from "discord.js";
import { Symbols } from "../../Utils/constants";
import getEnv from "../../Utils/getEnv";
import { config_DISCORDBOT } from "../../../config";
import { pluralize } from "../../Utils/pluralize";

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

  // ocd formatting
  const ocdTotalCommands = pluralize("command", totalCommands);
  const ocdTotalGuilds = pluralize("guild", totalGuilds);

  // and deploy your commands!
  try {
    // * if in production, deploy slash commands globally
    if (getEnv("PROD") === "true") {
      console.log(
        `${Symbols.HOURGLASS} Started refreshing ${totalCommands} application (/) ${ocdTotalCommands} globally.`,
      );

      await rest.put(Routes.applicationCommands(getEnv("DISCORD_BOT_ID")), {
        body: commandsInJSON,
      });

      console.log(
        `${Symbols.SUCCESS} Successfully reloaded ${totalCommands} application (/) ${ocdTotalCommands} globally.`,
      );

      // also (silently) delete all commands from all guilds
      for (let i = 0; i < totalGuilds; ++i) {
        try {
          const guildID = config_DISCORDBOT.guildIDs[i];

          await rest.put(
            Routes.applicationGuildCommands(getEnv("DISCORD_BOT_ID"), guildID),
            {
              body: [],
            },
          );
        } catch (e) {
          console.error(e);
        }
      }
    }
    // * otherwise (if in dev), deploy slash commands to each guild
    else {
      console.log(
        `${Symbols.HOURGLASS} Started refreshing ${totalCommands} application (/) ${ocdTotalCommands} in ${totalGuilds} ${ocdTotalGuilds}.`,
      );

      for (let i = 0; i < totalGuilds; ++i) {
        try {
          const guildID = config_DISCORDBOT.guildIDs[i];

          // The put method is used to fully refresh all commands in the guild with the current set
          await rest.put(
            Routes.applicationGuildCommands(getEnv("DISCORD_BOT_ID"), guildID),
            {
              body: commandsInJSON,
            },
          );
        } catch (e) {
          console.log(e);
        }
      }

      console.log(
        `${Symbols.SUCCESS} Successfully reloaded ${totalCommands} application (/) ${ocdTotalCommands} in ${totalGuilds} ${ocdTotalGuilds}.`,
      );

      // also (silently) delete all commands globally
      await rest.put(Routes.applicationCommands(getEnv("DISCORD_BOT_ID")), {
        body: [],
      });
    }
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
}
