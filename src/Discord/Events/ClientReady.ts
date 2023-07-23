import { Events } from "discord.js";
import DiscordBot from "../Structures/DiscordBot";
import { Symbols } from "../../Utils/constants";

export default {
  name: Events.ClientReady,
  once: true,
  async run(client: DiscordBot) {
    if (client.user == null) return console.log("Client not found.");
    console.log(`${Symbols.CHECKMARK} Ready! Logged in as ${client.user.tag}`);
  },
};
