// import dotenv variables globally
import * as dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(__dirname, "..", ".env") });

import StravaService from "./Services/StravaService";
import DiscordService from "./Services/DiscordService";

// self executing function
(async function () {
  console.log("Starting services...");

  // start services, sequentially
  const stravaService = new StravaService();
  const discordService = new DiscordService();
})();
