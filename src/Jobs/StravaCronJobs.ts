import { stravaService, discordService } from "../Index";
// import cron
import { CronJob } from "cron";
import { config_CRONJOB, config_STRAVA } from "../../config";
import { ChannelType } from "discord.js";
import { ClubActivitiesEmbed } from "../Discord/Embeds/Strava/ClubActivitiesEmbed";
import { sleep } from "../Utils/sleep";
import { LeaderboardEmbed } from "../Discord/Commands/🚴‍♀️ Strava/Leaderboard/LeaderboardEmbeds";
import { ClubActivity } from "../API/Strava/v3/models/Custom/RichClubActivities";
import getEnv from "../Utils/getEnv";
import {
  createClubActivityIDs,
  getClubActivityIDs,
  updateClubActivityIDs,
} from "../Mongo/data/ClubActivityIDsRepository";
import StravaClubActivityIDsModel from "../Mongo/models/StravaClubActivityIDs";
import { logger } from "../Logging/Winston";

// schedule leaderboard job
export const scheduleLeaderboardJob = new CronJob(
  config_CRONJOB.time.leaderboard,
  async () => {
    try {
      // get leaderboard channel
      const channel = discordService.discordbot.channels.cache.get(
        getEnv("DISCORD_CHANNEL_LEADERBOARD_ID"),
      );

      // edge case handling (improper config)
      if (!channel)
        return logger.error("Invalid leaderboard channel. Check config.");

      if (channel.type !== ChannelType.GuildText)
        return logger.warn(
          "Leaderboard channel must be a guild text channel. Check config.",
        );

      // get club
      const club = await stravaService.getClub(config_STRAVA.clubID);

      // edge case handling (no club retrieved)
      if (!club) return logger.warn("No club retrieved.");

      // get the leaderboard from Strava
      const leaderboard = await stravaService.getClubLeaderboard(
        config_STRAVA.clubID,
        0,
      );

      // edge case handling (no leaderboard retrieved)
      if (!leaderboard) return logger.error("No leaderboard retrieved.");

      // send the leaderboard to the channel
      await channel.send({
        embeds: [await LeaderboardEmbed(club, leaderboard, 0)],
      });
    } catch (e) {
      logger.error(
        "An error occurred while retrieving and sending the leaderboard:",
        e,
      );
    }
  },
  null,
  true,
  "Europe/London",
);

// schedule activities job
export const scheduleActivitiesJob = new CronJob(
  config_CRONJOB.time.activities,
  async () => {
    try {
      // get the channel to send the activities to
      const channel = discordService.discordbot.channels.cache.get(
        getEnv("DISCORD_CHANNEL_ACTIVITIES_ID"),
      );

      // edge case handling (improper config)
      if (!channel)
        return logger.warn("Invalid activities channel. Check config.");

      if (channel.type !== ChannelType.GuildText)
        return logger.warn(
          "Activities channel must be a guild text channel. Check config.",
        );

      // Retrieve new activities from Strava
      const activities = await stravaService.getRichClubActivities(
        config_STRAVA.clubID,
      );

      if (!activities) return logger.info("No activities retrieved.");

      // * Ensure duplicate activities are not sent (i.e. activities that have already been sent in past cron job runs)
      // extract the ClubActivity[] array from the response. Index 0 = most recent activity, index 19 (20th) = oldest activity
      let newActivities: ClubActivity[] = activities.entries;

      // get / create the ClubActivityIDs document if it doesn't exist
      let oldActivityIDsDocument =
        (await getClubActivityIDs()) || (await createClubActivityIDs());

      // extract new activity IDs from the newActivities array
      const newActivityIDs = newActivities.map((entry) => entry.activity.id);
      // write the new activity IDs to mongodb (this step is performed after fetching the old IDs from mongo, to ensure that the new IDs are not overwritten)
      await updateClubActivityIDs({
        activityIDs: newActivityIDs,
      } as StravaClubActivityIDsModel);

      // extract the oldActivityIDs from the document
      const oldActivityIDs = oldActivityIDsDocument
        ? oldActivityIDsDocument.activityIDs
        : [];

      // remove any newActivities from the newActivities array that have already been sent, using the oldActivityIDs
      newActivities = newActivities.filter(
        (entry) => !oldActivityIDs.includes(entry.activity.id),
      );

      // send each activity to the channel, constructing an embed for each
      for (let i = newActivities.length - 1; i >= 0; i--) {
        // wait 2 seconds between sending each activity
        await sleep(2);
        // send the embed
        await channel.send({
          embeds: await ClubActivitiesEmbed(newActivities[i].activity),
        });
      }
    } catch (error) {
      logger.error(
        "An error occurred while retrieving and sending activities:",
        error,
      );
    }
  },
  null,
  true,
  "Europe/London",
);
