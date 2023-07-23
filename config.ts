import { resolve } from "path";

// * Discord Bot Configuration
export const config_DISCORDBOT = {
  // ! bot prefix (deprecated)
  prefix: ">",
  // roles for the discord server leaderboard (based on strava club data)
  roleID: {
    gold: "1130274472662937621",
    silver: "1130274575884746792",
    bronze: "1130274631396368506",
  },
  // Guild IDs where slash commands should be loaded
  guildIDs: ["843858501839355966", "1127689845611970641"],
  // Server channel ID (for timed announcements)
  channelID: {
    announcements: "1127690836914745465",
    leaderboard: "1130292345556979722",
  },
};

// * Strava Service Configuration
export const config_STRAVA = {
  // URLs
  url: {
    // strava v3 api route
    base_URL: "https://www.strava.com/api/v3",
    // URL for token refresh
    token_URL: "https://www.strava.com/api/v3/oauth/token",
    // redirect URL (not used)
    redirect_URL: "http://localhost:3000/strava",
  },
  // your strava club ID
  clubID: 1154899,
  // paths
  path: {
    // storage file dir path
    storage: resolve(__dirname, "./system/data/storage.json"),
  },
};
