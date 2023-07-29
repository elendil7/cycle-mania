import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import DiscordBot from "../../../Structures/DiscordBot";
import SlashCommand from "../../../Structures/Command";
import {
  FailedToFetchLeaderboardEmbed,
  FetchingLeaderboardEmbed,
  LeaderboardEmbed,
} from "./LeaderboardEmbeds";
import { stravaService } from "../../../../Index";
import { config_STRAVA } from "../../../../../config";

const Leaderboard: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Shows the strava leaderboard for the Cycle Mania club.")
    .addNumberOption((option) =>
      option
        .setName("clubid")
        .setDescription("The ID of the club to fetch the leaderboard for.")
        .setRequired(false),
    ),

  async execute(client: DiscordBot, interaction: CommandInteraction) {
    // reply with the fetching leaderboard embed
    await interaction.reply({ embeds: [await FetchingLeaderboardEmbed()] });

    // get the club ID from the interaction options, or use the default club ID
    const clubID = String(
      interaction.options.get("clubid", false)?.value || config_STRAVA.clubID,
    );

    // fetch club name by ID
    const club = await stravaService.getClub(String(clubID));

    // fetch the leaderboard page for the club in question
    const leaderboard = await stravaService.getClubLeaderboard(
      String(clubID),
      1,
    );

    if (leaderboard)
      return await interaction.editReply({
        embeds: [await LeaderboardEmbed(club, leaderboard)],
      });

    // if there was an error fetching the leaderboard, reply with the failed to fetch leaderboard embed
    return await interaction.editReply({
      embeds: [await FailedToFetchLeaderboardEmbed()],
    });
  },
};

export default Leaderboard;
