import { Events, Interaction } from "discord.js";
import DiscordBot from "../Structures/DiscordBot";
import CommandHandler from "../Handlers/CommandHandler";

export default {
  name: Events.InteractionCreate,
  once: false,
  async run(client: DiscordBot, interaction: Interaction) {
    // if command was not run in a guild, return
    if (!interaction.guild) return;

    // avoid handling any other command besides slash commands
    if (!interaction.isChatInputCommand()) return;

    // run command handler
    await CommandHandler(client, interaction);
  },
};
