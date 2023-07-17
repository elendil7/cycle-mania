import { getEnv } from "../../Utils/getEnv";

// * For discord bot
export const DISCORD_BOT_OWNER_ID = getEnv("DISCORD_BOT_OWNER_ID");
export const DISCORD_BOT_TOKEN = getEnv("DISCORD_BOT_TOKEN");
export const DISCORD_BOT_ID = getEnv("DISCORD_BOT_ID");

export const DISCORD_GUILD_IDS = getEnv("DISCORD_GUILD_IDS")
  .split(",")
  .map((id) => id.trim());

// * For Strava API
export const STRAVA_CLIENT_ID = getEnv("STRAVA_CLIENT_ID");
export const STRAVA_CLIENT_SECRET = getEnv("STRAVA_CLIENT_SECRET");
