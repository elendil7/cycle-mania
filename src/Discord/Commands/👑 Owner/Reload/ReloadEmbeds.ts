import { EmbedBuilder } from "discord.js";
import { Symbols } from "../../../../Utils/constants";

export async function NotOwnerEmbed() {
  let embed = new EmbedBuilder()
    .setTitle(`${Symbols.INFORMATION} Command Execution Denied`)
    .setDescription(
      `You are not the owner of this bot, therefore you do not have the authority to run this command.`,
    );

  return embed;
}

export async function ReloadSuccessEmbed(commandName: string) {
  let embed = new EmbedBuilder()
    .setTitle(`${Symbols.CHECKMARK} Reloaded Command`)
    .setDescription(
      `The command "${"`" + commandName + "`"}" has been reloaded.`,
    );

  return embed;
}

export async function InvalidCommandEmbed(commandName: string) {
  let embed = new EmbedBuilder()
    .setTitle(`${Symbols.FAILURE} Invalid Command`)
    .setDescription(
      `The command "${"`" + commandName + "`"}" you have entered is invalid.`,
    );

  return embed;
}
