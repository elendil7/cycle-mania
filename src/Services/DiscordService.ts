// Require the necessary discord.js classes
import { GatewayIntentBits } from "discord.js";
import DiscordBot from "../Discord/Structures/DiscordBot";

export default class DiscordService {
  constructor() {
    this.startBot();
  }

  private async startBot() {
    // Create a new client instance
    const client = new DiscordBot({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
      ],
    });

    await client.start();
    await client.loadCommands();
    await client.registerCommands();
    await client.loadEvents();
  }
}
