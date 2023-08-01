// Require the necessary discord.js classes
import { GatewayIntentBits } from "discord.js";
import DiscordBot from "../Discord/Structures/DiscordBot";

export default class DiscordService {
  private client: DiscordBot;

  constructor() {
    // Create a new client instance
    this.client = new DiscordBot({
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
  }

  public async startBot() {
    await this.client.loadCommands();
    await this.client.registerCommands();
    await this.client.loadEvents();
    await this.client.start();
  }

  get discordbot() {
    return this.client;
  }
}
