import { Colors, EmbedBuilder } from "discord.js";
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

  // grab the top athlete
  const topAthlete = leaderboard[0];

  let embed = new EmbedBuilder()
    .setTitle(`${Symbols.STAR} ${club.name}'s Leaderboard ${Symbols.STAR}`)
    .setURL(`https://www.strava.com/clubs/${club.id}`)
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
    .setTimestamp()
    .setColor(Colors.Orange);

  // variable defining total athletes to display on leaderboard
  const totalAthletesToDisplay = Math.min(leaderboard.length, 10);

  for (let i = 0; i < totalAthletesToDisplay; i++) {
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
      value: `**Distance:** ${"`"}${(athlete.distance / 1000).toFixed(
        2,
      )}km${"`"}\n**Elevation Gain:** ${"`"}${Math.floor(
        athlete.elev_gain,
      )}m${"`"}\n**Moving Time:** ${"`"}${formatSecondsToHHMM(
        athlete.moving_time,
      )}${"`"}\n**Total Activities:** ${"`"}${athlete.num_activities}${"`"}`,
      inline: true,
    });
  }

  // if there are more than 10 athletes on LB, add a field stating that there are more athletes

  if (leaderboard.length >= totalAthletesToDisplay) {
    embed.addFields({
      name: `${Symbols.ATHLETE} More athletes...`,
      value: `There are ${
        leaderboard.length - totalAthletesToDisplay
      } more athletes to see on the leaderboard. To view them, click [here](https://www.strava.com/clubs/${
        club.id
      })`,
      inline: true,
    });
  }

  return embed;
}
