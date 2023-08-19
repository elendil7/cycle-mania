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
  // Guild IDs where slash commands should be loaded (can be ignored for prod - as slash commands are global)
  guildIDs: ["843858501839355966"],
  // ensure that both cooldown.seconds and cooldown.milliseconds are the same
  cooldown: {
    // cooldown time in seconds
    seconds: 5,
    // cooldown time in milliseconds
    milliseconds: 5000,
  },
  // vanity stuff
  vanity: {
    // "Watching {botStatus}"
    botStatus: "Gnome lose to Hexic",
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
  clubID: "1154899",
};

export const config_PUPPETEER = {
  // paths
  path: {
    // puppeteer cache dir path
    cache: resolve(__dirname, "./system/cache/puppeteer"),
  },
};

// * Cronjob Configuration
export const config_CRONJOB = {
  // enabled / disabled
  enabled: {
    // leaderboard cronjob
    leaderboard: true,
    // activities cronjob
    activities: true,
  },
  // cronjob times
  time: {
    // leaderboard cronjob
    leaderboard: "0 0 * * *",
    // activities cronjob
    activities: "0 * * * *",
  },
};

// * Misc Configuration
export const config_MISC = {
  // github issues url
  url: {
    github: {
      repo: "https://github.com/elendil7/Cycle-Mania",
      issues: "https://github.com/elendil7/Cycle-Mania/issues/new",
    },
  },
  path: {
    logs: {
      winston: resolve(__dirname, "./system/logs/winston"),
    },
  },
};
