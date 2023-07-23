import { ActivityType, Events } from "discord.js";
import DiscordBot from "../Structures/DiscordBot";
import { Symbols } from "../../Utils/constants";

export default {
  name: Events.ClientReady,
  once: true,
  async run(client: DiscordBot) {
    if (client.user == null) return console.log("Client not found.");

    // set client status
    client.user.setPresence({
      status: "online",
      activities: [
        {
          name: "Gnome lose to Hexic",
          type: ActivityType.Watching,
          url: "https://www.youtube.com/watch?v=6n3pFFPSlW4",
        },
      ],
    });

    console.log(`${Symbols.CHECKMARK} Ready! Logged in as ${client.user.tag}`);
  },
};
