import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import DiscordBot from "../../../Structures/DiscordBot";
import SlashCommand from "../../../Structures/Command";
import { config_STRAVA } from "../../../../../config";
import { stravaService } from "../../../../Index";
import { ClubInfoEmbed, InvalidClubEmbed } from "./ClubEmbeds";
import { AxiosError } from "axios";

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

    try {
      // get club info
      const club = await stravaService.getClub(clubID);

      // reply with club stats (if no error is thrown in the external getClub method), and if the club exists
      await interaction.reply({
        embeds: [await ClubInfoEmbed(club)],
      });
    } catch (e: any) {
      // if error is 404, don't throw an error, just reply with an embed
      if (e.response.status !== 404) return console.error(e);

      await interaction.reply({
        embeds: [await InvalidClubEmbed(clubID)],
      });
      return;
    }
  },
};

export default Club;
