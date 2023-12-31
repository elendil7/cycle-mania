import { ActivityType, Events } from "discord.js";
import DiscordBot from "../Structures/DiscordBot";
import { LineBreak, Symbols } from "../../Utils/constants";
import { config_DISCORDBOT } from "../../../config";
import { logger } from "../../Logging/Winston";

export default {
  name: Events.ClientReady,
  once: true,
  async run(client: DiscordBot) {
    if (client.user == null) return logger.warn("Client not found.");

    // set client status
    client.user.setPresence({
      status: "online",
      activities: [
        {
          name: config_DISCORDBOT.vanity.botStatus,
          type: ActivityType.Watching,
          url: "https://www.youtube.com/watch?v=6n3pFFPSlW4",
        },
      ],
    });

    logger.info(`${Symbols.CHECKMARK} Ready! Logged in as ${client.user.tag}`);
    console.log(LineBreak);
  },
};
