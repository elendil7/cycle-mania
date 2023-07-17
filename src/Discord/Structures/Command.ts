import DiscordBot from "./DiscordBot";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export default interface SlashCommand {
  data: SlashCommandBuilder;
  execute(
    client: DiscordBot,
    interaction: CommandInteraction,
    args?: any[],
  ): any;
}
