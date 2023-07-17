import DiscordBot from "../Structures/DiscordBot";
import { Symbols } from "../../Utils/constants";
import { Events } from "discord.js";

export default {
  name: Events.Error,
  once: false,
  async run(client: DiscordBot, error: Error) {
    console.error(`${Symbols.FAILURE} WebSocket Connection Error: `, error);
  },
};
