// import dotenv variables globally
import * as dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(__dirname, "..", ".env") });

import PuppeteerService from "./Services/PuppeteerService";
import StravaService from "./Services/StravaService";
import DiscordService from "./Services/DiscordService";
import { Symbols } from "./Utils/constants";

// variables
let puppeteerService: PuppeteerService;
let stravaService: StravaService;
let discordService;

// self executing function
(async function () {
  console.log(`${Symbols.INFORMATION} Starting services...`);

  // start services, sequentially
  puppeteerService = new PuppeteerService();
  stravaService = new StravaService();
  discordService = new DiscordService();

  // purge puppeteer cache (based on services no longer in use; derived from directory names)
  puppeteerService.purgeCache();

  console.log(`${Symbols.SUCCESS} Services started.`);
})();

// export certain services as singletons
export { puppeteerService, stravaService };
