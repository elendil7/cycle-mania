import { logger } from "../../Logging/Winston";
import { Symbols } from "../../Utils/constants";
import DiscordBot from "../Structures/DiscordBot";
import { Events } from "discord.js";

export default {
  name: Events.Error,
  once: false,
  async run(client: DiscordBot, error: Error) {
    logger.error(`${Symbols.FAILURE} WebSocket Connection Error: `, error);
  },
};
