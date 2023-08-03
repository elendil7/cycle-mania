import { EmbedBuilder } from "discord.js";
import { Activity } from "../../../API/Strava/v3/models/Custom/RichClubActivities";
import { StravaActivity, Symbols } from "../../../Utils/constants";
import striptags from "striptags";
import parse from "node-html-parser";

export async function ClubActivitiesEmbed(activity: Activity) {
  // get URL (needs to be on every embed for the images to all be part of 1 embed)
  const URL = `https://www.strava.com/activities/${activity.id}`;

  // get emoji that represents the activity type
  const emoji =
    activity.type.toLowerCase() === "ride" ? Symbols.CYCLING : Symbols.RUNNING;

  // * Embed 1: Activity (full rich details)
  // create great embed for the activity, using the Activity model and the embed builder
  const activityEmbed = new EmbedBuilder()
    .setTitle(
      `${StravaActivity[activity.type] || Symbols.QUESTION} ${
        activity.activityName
      } ${StravaActivity[activity.type] || Symbols.QUESTION}`,
    )
    .setURL(URL)
    .setThumbnail(activity.athlete.avatarUrl)
    .setDescription(
      `${Symbols.ATHLETE} **Athlete**: ${activity.athlete.athleteName}\n${
        Symbols.ATHLETEID
      } **Athlete ID**: ${activity.athlete.athleteId}\n${
        Symbols.ACTIVITY_TYPE
      } **Activity Type**: ${activity.type}\n${Symbols.DATE} **Date**: ${
        activity.timeAndLocation.displayDateAtTime
      }\n${Symbols.DESCRIPTION} **Description**: ${striptags(
        activity.description || "N.A.",
      )
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

  // get the activity stats, and create 3 fields to display them
  const stats = activity.stats;

  // Extract distance
  const distanceStat = activity.stats.find((stat) => stat.key === "stat_one");
  const distanceValue = parse(distanceStat!.value || "N.A.").innerText.replace(
    /\s+/g,
    "",
  );

  // Extract elevation gain
  const elevGainStat = activity.stats.find((stat) => stat.key === "stat_two");
  const elevGainValue = parse(elevGainStat!.value || "N.A.").innerText.replace(
    /\s+/g,
    "",
  );

  // Extract time
  const timeStat = activity.stats.find((stat) => stat.key === "stat_three");
  const timeValue = parse(timeStat!.value || "N.A.").innerText.replace(
    /\s+/g,
    "",
  );

  activityEmbed.addFields(
    {
      name: `${Symbols.DISTANCE} Distance`,
      value: `*${distanceValue}*`,
      inline: true,
    },
    {
      name: `${Symbols.ELEVATION} Elev Gain`,
      value: `*${elevGainValue}*`,
      inline: true,
    },
    {
      name: `${Symbols.TIME2} Time`,
      value: `*${timeValue}*`,
      inline: true,
    },
  );

  // get the segments & best effort achievements, and sort them by rank
  let segments = activity.segAndBestEffortAchievements;
  segments.sort((a, b) => {
    if (a.description === "PR" && b.description !== "PR") {
      return -1; // "PR" should come before other elements
    } else if (a.description !== "PR" && b.description === "PR") {
      return 1; // "PR" should come after other elements
    } else {
      return a.description.localeCompare(b.description); // sort other elements alphabetically
    }
  });

  // for each segment, add a field to the embed (up to 25 (total fields per embed) - 3 fields (3 from stats))
  let count = 1;
  for (let i = 0; i < segments.length && i < 21; i++) {
    const segCur = segments[i];

    activityEmbed.addFields({
      name: `${Symbols.PARTY2} **Segment [#${count}]**`,
      value: `**ID**: ${"`"}${segCur.id_string}${"`"}\n**Name**: ${"`"}${
        segCur.name
      }${"`"}\n**Time**: ${"`"}${striptags(
        segCur.elapsed_time,
      )}${"`"}\n**Type**: ${"`"}${segCur.description}${"`"}`,
      inline: true,
    });

    count++;
  }

  // add "more" field if there are more segments
  if (segments.length > 21) {
    activityEmbed.addFields({
      name: `${Symbols.PARTY} **More Segments**`,
      value: `There are ${
        segments.length - 21
      } more segments in this activity. To view them, click [here](${URL}).`,
      inline: true,
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
