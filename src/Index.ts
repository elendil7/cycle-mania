// import dotenv variables globally
import * as dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(__dirname, "..", ".env") });

import PuppeteerService from "./Services/PuppeteerService";
import StravaService from "./Services/StravaService";
import DiscordService from "./Services/DiscordService";
import { LineBreak, Symbols } from "./Utils/constants";
import MongoService from "./Services/MongoService";
import CronJobService from "./Services/CronJobService";
// variables
let cronJobService: CronJobService;
let mongoService: MongoService;
let puppeteerService: PuppeteerService;
let stravaService: StravaService;
let discordService: DiscordService;

function startServices() {
  console.log(LineBreak);
  console.log(
    `\x1b[1m<<< ${Symbols.INFORMATION} Starting services... >>>\x1b[0m`,
  );
  console.log(LineBreak);

  // * Start each Service, sequentially
  mongoService = new MongoService();
  console.log(`${Symbols.SUCCESS} Started MongoService.`);
  cronJobService = new CronJobService();
  console.log(`${Symbols.SUCCESS} Started CronJobService.`);
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

  // * MongoService
  await mongoService.init(); // initialize the service (connect to DB)

  // * CronJobService
  await cronJobService.init(); // initialize the service (import all jobs & start them)

  // * StravaService
  await stravaService.init(); // initialize the service
  await stravaService.attemptPing(); // attempt ping to strava

  // * PuppeteerService
  /*   puppeteerService.createPaths(); // create paths for puppeteer cache (if do not exist _configPuppeteer.path.cache)
  puppeteerService.purgeCache(); // purge puppeteer cache (based on services no longer in use; derived from directory names) */

  // * DiscordService
  await discordService.startBot(); // start discord bot

  console.log(LineBreak);
}
// start services
startServices();

// export certain services as singletons (for use in other files, before services are initialized)
export {
  cronJobService,
  puppeteerService,
  stravaService,
  discordService,
  mongoService,
};

// initialize services
initializeServices();
