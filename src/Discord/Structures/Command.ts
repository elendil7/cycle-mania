import DiscordBot from "./DiscordBot";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import ICommandInfo from "../Types/ICommandInfo";

// main command interface for slash commands
interface SlashCommand {
  data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  info?: ICommandInfo;
  execute(
    client: DiscordBot,
    interaction: CommandInteraction,
    args?: any[],
  ): any;
}

export default SlashCommand;
