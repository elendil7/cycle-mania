import { Interaction } from "discord.js";
import DiscordBot from "../Structures/DiscordBot";

export default async function CommandHandler(
  client: DiscordBot,
  interaction: Interaction,
) {
  // if command was not run in a guild, return
  if (!interaction.guild) return;

  // avoid handling any other command besides slash commands
  if (!interaction.isChatInputCommand()) return;

  // get the command from the client.commands Collection
  const command = client
    .getCommands()
    .get(interaction.commandName.toLowerCase());

  // if the command doesn't exist, return
  if (!command) return;

  // try to execute the command
  try {
    await command.execute(client, interaction);
  } catch (error) {
    // if there's an error, log it
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: false,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: false,
      });
    }
  }
}
