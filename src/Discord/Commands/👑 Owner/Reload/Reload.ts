import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import DiscordBot from "../../../Structures/DiscordBot";
import {
  ReloadSuccessEmbed,
  InvalidCommandEmbed,
  NotOwnerEmbed,
} from "./ReloadEmbeds";
import SlashCommand from "../../../Structures/Command";
import { resolve } from "path";
import getEnv from "../../../../Utils/getEnv";

const Reload: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reloads a slash command.")
    .addStringOption((option) =>
      option
        .setName("command")
        .setDescription("The command to reload.")
        .setRequired(true)
        .setAutocomplete(true),
    ),
  async execute(client: DiscordBot, interaction: CommandInteraction) {
    // check if user is owner. If not, they don't have the authority to run the command lol.
    if (interaction.user.id !== getEnv("DISCORD_BOT_OWNER_ID")) {
      await interaction.reply({
        embeds: [await NotOwnerEmbed()],
      });
      return;
    }

    // get command name from interaction input
    const commandName = String(interaction.options.get("command", true).value)
      .trim()
      .toLowerCase();

    // get command from client
    const command = client.getCommands().get(commandName);

    // if command doesn't exist, send invalid command embed
    if (!command) {
      await interaction.reply({
        embeds: [await InvalidCommandEmbed(commandName)],
      });
      return;
    }

    // * else, simply reload slash command

    // store command info fields, for later insertion into the new command object (into info field)
    const commandInfo = command.info;

    // get full path to command file
    const fullPathToCmd = resolve(
      __dirname,
      `../../${commandInfo?.commandCategory}/${commandInfo?.commandName}/${commandInfo?.commandName}`,
    );

    try {
      // console.log("BEFORE", client.getCommands());

      // delete old command file from cache
      delete require.cache[require.resolve(fullPathToCmd)];

      // import the new command file (which automatically overwrites the old import, just by importing it again)
      const newCommand = await import(fullPathToCmd).then(
        (module) => module.default,
      );

      // set info of new command object, using the old command info fields
      newCommand.info = {
        commandName: commandInfo?.commandName,
        commandCategory: commandInfo?.commandCategory,
      };

      // overwrite the old command object from the client's commands collection with the new command object
      client.removeCommand(commandName);
      client.setCommand(commandName, newCommand);

      // console.log("AFTER", client.getCommands());

      // send confirmation embed
      await interaction.reply({
        embeds: [await ReloadSuccessEmbed(commandName)],
      });
    } catch (error) {
      console.error(error);
      await interaction.reply(
        `There was an error while reloading the command "${commandName}".`,
      );
    }
  },
};

export default Reload;
