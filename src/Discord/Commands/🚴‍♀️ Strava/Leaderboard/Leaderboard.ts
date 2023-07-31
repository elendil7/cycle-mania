import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  Interaction,
  SlashCommandBuilder,
} from "discord.js";
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
    )
    .addNumberOption((option) =>
      option
        .setName("offset")
        .setDescription("The offset (weeks ago) to fetch the leaderboard from.")
        .setRequired(false)
        .setMinValue(0)
        .setMaxValue(1),
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

    // get offset from interaction options, or use 0
    const offset = Number(interaction.options.get("offset", false)?.value || 0);

    // fetch the leaderboard page for the club in question
    const leaderboard = await stravaService.getClubLeaderboard(
      String(clubID),
      offset,
    );

    // make button for metric <=> imperial measurement toggle
    const measurementToggle = new ButtonBuilder()
      .setCustomId("measurement_toggle")
      .setLabel("Toggle measurements")
      .setStyle(ButtonStyle.Primary)
      .setEmoji("📏");

    // make the button row
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      measurementToggle,
    );

    // if there was an error fetching the leaderboard, reply with the failed to fetch leaderboard embed
    if (!leaderboard)
      return await interaction.editReply({
        embeds: [await FailedToFetchLeaderboardEmbed()],
      });

    // get leaderboard embed
    const leaderboardEmbed = await LeaderboardEmbed(club, leaderboard, offset);

    // edit reply to include the leaderboard embed and the button row, and store it in the "response" variable.
    let response = await interaction.editReply({
      embeds: [leaderboardEmbed],
      components: [row],
    });

    // create a collector for the button
    const collectorFilter = (i: Interaction) =>
      i.user.id === interaction.user.id;

    try {
      // loop infinitely to allow the user to toggle between metric and imperial measurements
      while (true) {
        const confirmation = await response.awaitMessageComponent({
          filter: collectorFilter,
          time: 300000,
        });

        // defer the update to the button click (to prevent the button from being disabled on next iteration)
        await confirmation.deferUpdate();

        if (confirmation.customId === "measurement_toggle") {
          // get current leaderboard embed
          const lbEmbed = response.embeds[0];

          // iterate through leaderboard embed fields (fields[])
          // toggle between metric and imperial measurements, for each field of the leaderboard embed (fields[].value.split("\n")[0])
          lbEmbed.fields.forEach((field) => {
            // get array of lines in the field (field.value.split("\n"))
            let arr = field.value.split("\n");

            // get the first line of the field (arr[0])
            let value = arr[0];

            if (value.includes("mi")) {
              // extract the number from the string, and convert it from miles to kilometers.
              const number = parseFloat(value.replace(/[^\d.]/g, ""));
              const numberSearch = `${number.toFixed(2)}mi`;
              const newNumber = `${(number * 1.60934).toFixed(2)}km`;

              // set the field value to the new value, and replace "mi" with "km"
              value = value.replace(numberSearch, newNumber);
            } else if (value.includes("km")) {
              // extract the number from the string, and convert it from kilometers to miles.
              const number = parseFloat(value.replace(/[^\d.]/g, ""));
              const numberSearch = `${number.toFixed(2)}km`;
              const newNumber = `${(number * 0.621371192).toFixed(2)}mi`;

              // set the field value to the new value, and replace "km" with "mi"
              value = value.replace(numberSearch, newNumber);
            }

            // set the field value to the new value
            arr[0] = value;

            // join the array of lines back into a string, and set the field value to the new string
            field.value = arr.join("\n");

            // return the field, so it gets updated
            return field;
          });

          // edit the reply to include the updated leaderboard embed
          response = await interaction.editReply({
            embeds: [lbEmbed],
            components: [row],
          });
        }
      }
    } catch (e) {}
  },
};

export default Leaderboard;
