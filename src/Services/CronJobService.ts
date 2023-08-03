import { CronJob } from "cron";
import {
  scheduleActivitiesJob,
  scheduleLeaderboardJob,
} from "../Jobs/StravaCronJobs";
import { discordService } from "../Index";
import { config_CRONJOB } from "../../config";
import { Events } from "discord.js";
import { join } from "path";
import { readdirSync } from "fs";

export default class CronJobService {
  private _jobs: Map<string, CronJob>;

  constructor() {
    this._jobs = new Map<string, CronJob>();

    // add jobs to collection
    this._jobs.set("scheduleActivitiesJob", scheduleActivitiesJob);
    this._jobs.set("scheduleLeaderboardJob", scheduleLeaderboardJob);
  }

  // getters
  get jobs() {
    return this._jobs;
  }

  public async init() {
    // * import all job exports from each file from the src\Jobs\ directory, dynamically

    // get all files from the src\Jobs\ directory
    const jobFiles = readdirSync(join(__dirname, "../Jobs/"));

    // iterate through each file
    for (const jobFile of jobFiles) {
      // get the file's path
      const jobFilePath = join(__dirname, "../Jobs/", jobFile);

      // import the file
      const jobFileImport = await import(jobFilePath);

      // iterate through each export in the file
      for (const jobExport in jobFileImport) {
        // get the export's name
        const jobExportName = jobExport;

        // get the export's value
        const jobExportValue = jobFileImport[jobExport];

        // if the export is a cron job
        if (jobExportValue instanceof CronJob) {
          // add the cron job to the collection
          this._jobs.set(jobExportName, jobExportValue);
        }
      }
    }
  }

  public async startAll() {
    // start all jobs, after discord bot is ready
    // on discord bot ready
    discordService.discordbot.once(Events.ClientReady, () => {
      // start all jobs
      this._jobs.forEach((job) => {
        job.fireOnTick(); // fire on tick immediately
        job.start();
      });
    });
  }

  public async stopAll() {
    // stop all jobs
    this._jobs.forEach((job) => job.stop());
  }
}
