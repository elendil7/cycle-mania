import { EmbedBuilder } from "discord.js";
import { Symbols } from "../../../../Utils/constants";
import LeaderboardAthlete from "../../../../API/Strava/v3/models/LeaderboardAthlete";
import Club from "../../../../API/Strava/v3/models/Club";

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
) {
  // sort by rank
  leaderboard.sort((a, b) => a.rank - b.rank);

  // truncate by 10
  leaderboard = leaderboard.slice(0, 10);

  // grab the top athlete
  const topAthlete = leaderboard[0];

  let embed = new EmbedBuilder()
    .setTitle(`${club.name}'s Leaderboard`)
    .setDescription(
      `Here is a leaderboard of the top cyclists in the ${club.name} club, of ID ${club.id}.\n${Symbols.TROPHY} **Top Athlete**: ${topAthlete.athlete_firstname} ${topAthlete.athlete_lastname}!`,
    );

  for (let i = 0; i < leaderboard.length; i++) {
    const athlete = leaderboard[i];
    embed.addFields({
      name: `${
        i == 0
          ? Symbols.GOLD
          : i == 1
          ? Symbols.SILVER
          : i == 2
          ? Symbols.GOLD
          : Symbols.BUG
      } #${i + 1}. ${athlete.athlete_firstname} ${athlete.athlete_lastname}`,
      value: `**Distance:** ${athlete.distance}m\n**Elevation Gain:** ${athlete.elev_gain}m\n**Moving Time:** ${athlete.moving_time} seconds\n**Number of Activities:** ${athlete.num_activities}`,
      inline: true,
    });
  }

  return embed;
}
