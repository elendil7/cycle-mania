import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import DiscordBot from "../../../Structures/DiscordBot";
import SlashCommand from "../../../Structures/Command";
import { config_STRAVA } from "../../../../../config";
import { stravaService } from "../../../../Index";
import { ClubInfoEmbed, InvalidClubEmbed } from "./ClubEmbeds";

const Club: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("club")
    .setDescription("Gives info about the strava club.")
    .addNumberOption((option) =>
      option
        .setName("clubid")
        .setDescription("The ID of the club to get info about.")
        .setRequired(false),
    ),
  async execute(client: DiscordBot, interaction: CommandInteraction) {
    const clubID = String(
      interaction.options.get("clubid", false)?.value || config_STRAVA.clubID,
    );

    const club = await stravaService.getClub(clubID);

    if (!club) {
      await interaction.reply({
        embeds: [await InvalidClubEmbed(clubID)],
      });
      return;
    }

    // reply with club stats
    await interaction.reply({
      embeds: [await ClubInfoEmbed(club)],
    });
  },
};

export default Club;
