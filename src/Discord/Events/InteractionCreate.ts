import { Events, Interaction } from "discord.js";
import DiscordBot from "../Structures/DiscordBot";
import CommandHandler from "../Handlers/CommandHandler";

export default {
  name: Events.InteractionCreate,
  once: false,
  async run(client: DiscordBot, interaction: Interaction) {
    // run command handler
    await CommandHandler(client, interaction);
  },
};
