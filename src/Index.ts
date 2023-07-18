// import dotenv variables globally
import * as dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(__dirname, "..", ".env") });

import PuppeteerService from "./Services/PuppeteerService";
import StravaService from "./Services/StravaService";
import DiscordService from "./Services/DiscordService";

// variables
let puppeteerService: PuppeteerService;
let stravaService: StravaService;
let discordService;

// self executing function
(async function () {
  console.log("Starting services...");

  // start services, sequentially
  puppeteerService = new PuppeteerService();
  stravaService = new StravaService();
  discordService = new DiscordService();

  // purge cache (based on services no longer in use; derived from directory names)
  await puppeteerService.purgeCache();
})();

// export certain services as singletons
export { puppeteerService, stravaService };
