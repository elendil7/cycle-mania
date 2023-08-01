import { EmbedBuilder } from "discord.js";
import { Activity } from "../../../API/Strava/v3/models/Custom/RichClubActivities";
import { Symbols } from "../../../Utils/constants";
import striptags from "striptags";

export async function ClubActivitiesEmbed(activity: Activity) {
  // get URL (needs to be on every embed for the images to all be part of 1 embed)
  const URL = `https://www.strava.com/activities/${activity.id}`;

  // * Embed 1: Activity (full rich details)
  // create great embed for the activity, using the Activity model and the embed builder
  const activityEmbed = new EmbedBuilder()
    .setTitle(activity.activityName)
    .setURL(URL)
    .setThumbnail(activity.athlete.avatarUrl)
    .setDescription(
      `${Symbols.ATHLETE} **Athlete**: ${activity.athlete.athleteName}\n${
        Symbols.ATHLETEID
      } **Athlete ID**: ${activity.athlete.athleteId}\n${
        Symbols.DATE
      } **Date**: ${activity.timeAndLocation.displayDateAtTime}\n${
        Symbols.DESCRIPTION
      } **Description**: ${striptags(activity.description || "N.A.")
        .trim()
        .split("\n\n")
        .join("\n")}`,
    )
    .setFooter({
      text: `Activity ID: ${activity.id}`,
    })
    .setTimestamp()
    .setColor("Orange");

  // if map exists, add it to the embed
  if (activity.mapAndPhotos.activityMap)
    activityEmbed.setImage(activity.mapAndPhotos.activityMap.url);

  // for each segment, add a field to the embed
  let segments = activity.segAndBestEffortAchievements;

  for (let i = 0; i < segments.length && i < 25; i++) {
    const segCur = segments[i];

    activityEmbed.addFields({
      name: `${Symbols.PARTY2} **Segment [#${i + 1}]**`,
      value: `**ID**: ${segCur.id_string}\n**Activity ID**: ${segCur.activity_id}\n**Name**: ${segCur.name}\n**Time**: ${segCur.elapsed_time}\n**Type**: ${segCur.description}`,
      inline: false,
    });
  }

  // make an array of embeds to return, and push the first embed to it
  let embedsArr = [];
  embedsArr.push(activityEmbed);

  // * Embeds #2, #3, #4, etc (photoList only)
  // for each photo in the photoList, create an embed
  for (let i = 0; i < activity.mapAndPhotos.photoList.length && i < 9; i++) {
    const photoCur = activity.mapAndPhotos.photoList[i].large;

    // create embed for the photo
    const photoEmbed = new EmbedBuilder().setURL(URL).setImage(photoCur);

    // push the embed to the embeds array
    embedsArr.push(photoEmbed);
  }

  // return the array of embeds
  return embedsArr;
}
