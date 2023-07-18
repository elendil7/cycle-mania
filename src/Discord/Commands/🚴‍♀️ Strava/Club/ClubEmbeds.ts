import { EmbedBuilder } from "discord.js";
import { Symbols } from "../../../../Utils/constants";
import SummaryClub from "../../../../API/Strava/v3/models/SummaryClub";

export async function InvalidClubEmbed(clubID: string) {
  let embed = new EmbedBuilder()
    .setTitle(`${Symbols.FAILURE} Invalid Club`)
    .setDescription(`Invalid club provided of ID ${clubID}`);

  return embed;
}

export async function ClubInfoEmbed(club: SummaryClub) {
  let embed = new EmbedBuilder()
    .setTitle(`${Symbols.STAR} ${club.name} club info ${Symbols.STAR}`)
    .setDescription(`Here's some info about the ${club.name} strava club.`)
    .setURL(`https://www.strava.com/clubs/${club.url}`)
    .setThumbnail(club.profile_medium)
    .setFields(
      { name: "Members", value: String(club.member_count), inline: true },
      { name: "Club ID", value: String(club.id), inline: true },
      { name: "State", value: club.state || "N.A.", inline: true },
      { name: "Country", value: club.country, inline: true },
      {
        name: "Activities",
        // @ts-ignore
        value: club.activity_types.map((v) => "`" + v + "`").join(", "),
        inline: false,
      },
    )
    .setImage(club.cover_photo)
    .setTimestamp()
    .setFooter({
      text: club.name,
      iconURL: club.profile_medium,
    });

  return embed;
}
