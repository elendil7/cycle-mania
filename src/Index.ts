// import dotenv variables globally
import * as dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(__dirname, "..", ".env") });

import PuppeteerService from "./Services/PuppeteerService";
import StravaService from "./Services/StravaService";
import DiscordService from "./Services/DiscordService";
import { LineBreak, Symbols } from "./Utils/constants";

// variables
let puppeteerService: PuppeteerService;
let stravaService: StravaService;
let discordService: DiscordService;

function startServices() {
  console.log(
    `\n\x1b[1m<<< ${Symbols.INFORMATION} Starting services... >>>\x1b[0m`,
  );
  console.log(LineBreak);

  // start services, sequentially
  puppeteerService = new PuppeteerService();
  stravaService = new StravaService();
  discordService = new DiscordService();

  console.log(LineBreak);
}

async function initializeServices() {
  console.log(
    `\x1b[1m<<< ${Symbols.INFORMATION} Initializing services... >>>\x1b[0m`,
  );
  console.log(LineBreak);

  // purge puppeteer cache (based on services no longer in use; derived from directory names)
  puppeteerService.purgeCache();
  // attempt ping to strava
  await stravaService.attemptPing();
  // start discord bot
  await discordService.startBot();

  console.log(LineBreak);
}

// start services
startServices();

// export certain services as singletons (for use in other files, before services are initialized)
export { puppeteerService, stravaService };

// initialize services
initializeServices();
