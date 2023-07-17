import { EmbedBuilder } from "discord.js";
import ICommandCategoriesCollection from "../../../Types/ICommandCategoriesCollection";
import ICommandsCollection from "../../../Types/ICommandsCollection";

// make full embed
export async function HelpEmbed(
  commandCategories: ICommandCategoriesCollection,
  commands: ICommandsCollection,
) {
  let embed = new EmbedBuilder()
    .setTitle("Help")
    .setDescription("Displays a list of commands and their descriptions.");

  // loop through command categories
  for (const [commandCategoryName, cmdNames] of commandCategories) {
    // add the command category name to the embed
    embed.addFields({
      name: commandCategoryName,
      value: cmdNames.map((name) => "`/" + name + "`").join(", "),
      inline: true,
    });
  }

  return embed;
}
