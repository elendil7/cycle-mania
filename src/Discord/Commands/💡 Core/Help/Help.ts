import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import DiscordBot from "../../../Structures/DiscordBot";
import { HelpEmbed } from "./HelpEmbed";

const Help = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Displays a list of commands and their descriptions.")
    .setDefaultMemberPermissions(null),
  async execute(client: DiscordBot, interaction: CommandInteraction) {
    // reply with an embed of commands and their descriptions
    await interaction.reply({
      embeds: [
        await HelpEmbed(client.getCommandCategories(), client.getCommands()),
      ],
    });
  },
};

export default Help;
