import { EmbedBuilder } from "discord.js";
import { Symbols } from "../../../../Utils/constants";
import LeaderboardAthlete from "../../../../API/Strava/v3/models/LeaderboardAthlete";
import Club from "../../../../API/Strava/v3/models/Club";
import {
  formatSecondsToHHMM,
  getStartOfWeekFromOffset,
} from "../../../../Utils/timeConversions";

export async function FetchingLeaderboardEmbed() {
  let embed = new EmbedBuilder()
    .setTitle("Leaderboard")
    .setDescription("Fetching the leaderboard...");

  return embed;
}

export async function FailedToFetchLeaderboardEmbed() {
  let embed = new EmbedBuilder()
    .setTitle(`${Symbols.ERROR} Failed to fetch leaderboard`)
    .setDescription(
      "There was an error fetching the leaderboard. Please try again later.",
    );

  return embed;
}

export async function LeaderboardEmbed(
  club: Club,
  leaderboard: LeaderboardAthlete[],
  offset: number,
) {
  // sort by rank
  leaderboard.sort((a, b) => a.rank - b.rank);

  // truncate by 10
  leaderboard = leaderboard.slice(0, 10);

  // grab the top athlete
  const topAthlete = leaderboard[0];

  let embed = new EmbedBuilder()
    .setTitle(`${Symbols.STAR} ${club.name}'s Leaderboard ${Symbols.STAR}`)
    .setThumbnail(club.profile)
    .setDescription(
      `${Symbols.TROPHY} **Top Athlete**: ${topAthlete.athlete_firstname} ${
        topAthlete.athlete_lastname
      }!\n${Symbols.ARROW_RIGHT} Starting week: ${getStartOfWeekFromOffset(
        offset,
      )}\n${Symbols.ARROW_RIGHT} Club name: ${club.name}\n${
        Symbols.ARROW_RIGHT
      } Club ID: ${club.id}`,
    )
    .setFooter({
      text: `Offset 0 = this week, offset 1 = last week`,
      iconURL: club.profile_medium,
    })
    .setTimestamp();

  for (let i = 0; i < leaderboard.length; i++) {
    const athlete = leaderboard[i];
    embed.addFields({
      name: `${
        i == 0
          ? Symbols.GOLD
          : i == 1
          ? Symbols.SILVER
          : i == 2
          ? Symbols.BRONZE
          : Symbols.BUG
      } #${i + 1}. ${athlete.athlete_firstname} ${athlete.athlete_lastname}`,
      value: `**Distance:** ${(athlete.distance / 1000).toFixed(
        2,
      )}km\n**Elevation Gain:** ${Math.floor(
        athlete.elev_gain,
      )}m\n**Moving Time:** ${formatSecondsToHHMM(
        athlete.moving_time,
      )}\n**Total Activities:** ${athlete.num_activities}`,
      inline: true,
    });
  }

  return embed;
}
