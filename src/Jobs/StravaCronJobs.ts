import { stravaService, discordService } from "../Index";
// import cron
import { CronJob } from "cron";
import { config_CRONJOB, config_DISCORDBOT, config_STRAVA } from "../../config";
import { ChannelType } from "discord.js";
import { ClubActivitiesEmbed } from "../Discord/Embeds/Strava/ClubActivitiesEmbed";
import { sleep } from "../Utils/sleep";
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "fs";
import { LeaderboardEmbed } from "../Discord/Commands/🚴‍♀️ Strava/Leaderboard/LeaderboardEmbeds";
import RichClubActivities, {
  ClubActivity,
} from "../API/Strava/v3/models/Custom/RichClubActivities";

// schedule leaderboard job
export const scheduleLeaderboardJob = new CronJob(
  config_CRONJOB.time.leaderboard,
  async () => {
    try {
      // get leaderboard channel
      const channel = discordService.discordbot.channels.cache.get(
        config_DISCORDBOT.channelIDs.leaderboard,
      );

      // edge case handling (improper config)
      if (!channel)
        return console.error("Invalid leaderboard channel. Check config.");

      if (channel.type !== ChannelType.GuildText)
        return console.error(
          "Leaderboard channel must be a guild text channel. Check config.",
        );

      // get club
      const club = await stravaService.getClub(config_STRAVA.clubID);

      // edge case handling (no club retrieved)
      if (!club) return console.error("No club retrieved.");

      // get the leaderboard from Strava
      const leaderboard = await stravaService.getClubLeaderboard(
        config_STRAVA.clubID,
        0,
      );

      // edge case handling (no leaderboard retrieved)
      if (!leaderboard) return console.error("No leaderboard retrieved.");

      // send the leaderboard to the channel
      await channel.send({
        embeds: [await LeaderboardEmbed(club, leaderboard, 0)],
      });
    } catch (e) {
      console.error(
        "An error occurred while retrieving and sending the leaderboard:",
        e,
      );
    }
  },
);

// schedule activities job
export const scheduleActivitiesJob = new CronJob(
  config_CRONJOB.time.activities,
  async () => {
    try {
      // get the channel to send the activities to
      const channel = discordService.discordbot.channels.cache.get(
        config_DISCORDBOT.channelIDs.activities,
      );

      // edge case handling (improper config)
      if (!channel)
        return console.error("Invalid activities channel. Check config.");

      if (channel.type !== ChannelType.GuildText)
        return console.error(
          "Activities channel must be a guild text channel. Check config.",
        );

      // Retrieve new activities from Strava
      const activities = await stravaService.getRichClubActivities(
        config_STRAVA.clubID,
      );

      if (!activities) return console.error("No activities retrieved.");

      // extract the ClubActivity[] array from the response, reverse it
      let newActivities: ClubActivity[] = activities.entries.reverse();

      // * Ensure duplicate activities are not sent
      // get path from config
      const path = config_STRAVA.path.activities;

      // create the activities.json file if it doesn't exist
      if (!existsSync(path)) {
        writeFileSync(path, JSON.stringify(newActivities));
      }
      // otherwise, if activities already exist, filter out duplicates
      else {
        // read the activities.json file
        const oldActivities: ClubActivity[] = JSON.parse(
          readFileSync(path, "utf-8"),
        );

        // filter out activities that are already in the file
        for (let i = 0; i < newActivities.length; i++) {
          for (let j = 0; j < oldActivities.length; j++) {
            if (oldActivities[j].activity.id === newActivities[i].activity.id) {
              // remove the activity from the newActivities array, as its already been sent in a previous cron job
              newActivities.splice(i, 1);
            }
          }
        }

        // append the new activities to the activities.json file
        writeFileSync(
          path,
          JSON.stringify([...new Set([...oldActivities, ...newActivities])]),
        );
      }

      // send each activity to the channel, constructing an embed for each
      for (let i = 0; i < newActivities.length; i++) {
        // wait 2 seconds between sending each activity
        await sleep(2);
        // send the embed
        await channel.send({
          embeds: await ClubActivitiesEmbed(newActivities[i].activity),
        });
      }
    } catch (error) {
      console.error(
        "An error occurred while retrieving and sending activities:",
        error,
      );
    }
  },
  null,
  true,
  "Europe/London",
);
