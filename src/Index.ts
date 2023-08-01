// import dotenv variables globally
import * as dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(__dirname, "..", ".env") });

import PuppeteerService from "./Services/PuppeteerService";
import StravaService from "./Services/StravaService";
import DiscordService from "./Services/DiscordService";
import { LineBreak, Symbols } from "./Utils/constants";
import {
  scheduleActivitiesJob,
  scheduleLeaderboardJob,
} from "./Jobs/StravaCronJobs";
import { sleep } from "./Utils/sleep";
import { Events } from "discord.js";
import { config_CRONJOB } from "../config";

// variables
let puppeteerService: PuppeteerService;
let stravaService: StravaService;
let discordService: DiscordService;

function startServices() {
  console.log(
    `\n\x1b[1m<<< ${Symbols.INFORMATION} Starting services... >>>\x1b[0m`,
  );
  console.log(LineBreak);

  // * Start each Service, sequentially
  puppeteerService = new PuppeteerService();
  console.log(`${Symbols.SUCCESS} Started PuppeteerService.`);
  stravaService = new StravaService();
  console.log(`${Symbols.SUCCESS} Started StravaService.`);
  discordService = new DiscordService();
  console.log(`${Symbols.SUCCESS} Started DiscordService.`);

  console.log(LineBreak);
}

async function initializeServices() {
  console.log(
    `\x1b[1m<<< ${Symbols.INFORMATION} Initializing services... >>>\x1b[0m`,
  );
  console.log(LineBreak);

  // * StravaService
  await stravaService.init(); // initialize the service
  await stravaService.attemptPing(); // attempt ping to strava

  // * PuppeteerService
  /*   puppeteerService.createPaths(); // create paths for puppeteer cache (if do not exist _configPuppeteer.path.cache)
  puppeteerService.purgeCache(); // purge puppeteer cache (based on services no longer in use; derived from directory names) */

  // * DiscordService
  await discordService.startBot(); // start discord bot

  console.log(LineBreak);

  // start cron jobs
  startCronJobs();
}

async function startCronJobs() {
  // on discord bot ready
  discordService.discordbot.once(Events.ClientReady, () => {
    // if leaderboard cron job is enabled, start it
    if (config_CRONJOB.enabled.leaderboard) {
      scheduleLeaderboardJob.fireOnTick();
      scheduleLeaderboardJob.start();
    }

    // if activities cron job is enabled, start it
    if (config_CRONJOB.enabled.activities) {
      scheduleActivitiesJob.fireOnTick();
      scheduleActivitiesJob.start();
    }
  });
}

// start services
startServices();

// export certain services as singletons (for use in other files, before services are initialized)
export { puppeteerService, stravaService };

// initialize services
initializeServices();
