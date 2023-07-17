import { Events } from "discord.js";
import DiscordBot from "../Structures/DiscordBot";
import { Message } from "discord.js";

export default {
  name: Events.MessageCreate,
  once: false,
  async run(client: DiscordBot, message: Message) {},
};
