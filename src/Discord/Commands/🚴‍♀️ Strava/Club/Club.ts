import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import DiscordBot from "../../../Structures/DiscordBot";
import SlashCommand from "../../../Structures/Command";
import { config_STRAVA } from "../../../../../config";
import { stravaService } from "../../../../Index";
import {
  ClubInfoEmbed,
  FetchingClubEmbed,
  InvalidClubEmbed,
} from "./ClubEmbeds";

const Club: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("club")
    .setDescription("Gives info about the strava club.")
    .addIntegerOption((option) =>
      option
        .setName("clubid")
        .setDescription("The ID of the club to get info about.")
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(99999999999999),
    )
    .addStringOption((option) =>
      option
        .setName("clubname")
        .setDescription("The name of the club to fetch the leaderboard for.")
        .setRequired(false)
        .setMinLength(1)
        .setMaxLength(100),
    ),

  async execute(client: DiscordBot, interaction: CommandInteraction) {
    // get the club ID or name from the interaction options, or use the default club ID, by order of priority (clubID > clubName > defaultClubID)
    const clubIDOrName = String(
      interaction.options.get("clubid", false)?.value ||
        interaction.options.get("clubname", false)?.value ||
        config_STRAVA.clubID,
    ).replace(/\s/g, "");

    // reply with fetching embed
    await interaction.reply({
      embeds: [await FetchingClubEmbed()],
    });

    // get club info
    const club = await stravaService.getClub(clubIDOrName);

    // if club doesn't exist, reply with invalid club embed
    if (!club)
      return await interaction.editReply({
        embeds: [await InvalidClubEmbed(clubIDOrName)],
      });

    // reply with club stats (if no error is thrown in the external getClub method), and if the club exists
    await interaction.editReply({
      embeds: [await ClubInfoEmbed(club)],
    });
  },
};

export default Club;
