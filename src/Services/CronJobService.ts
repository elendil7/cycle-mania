import { CronJob } from "cron";
import { discordService } from "../Index";
import { Events } from "discord.js";
import { join } from "path";
import { readdirSync } from "fs";
import {
  scheduleActivitiesJob,
  scheduleLeaderboardJob,
} from "../Jobs/StravaCronJobs";
import { Symbols } from "../Utils/constants";

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
    console.log(`${Symbols.HOURGLASS} Importing cronjobs...`);
    await this.importJobs();
    console.log(`${Symbols.SUCCESS} Imported cronjobs.`);

    console.log(`${Symbols.HOURGLASS} Starting all cronjobs...`);
    await this.startAll();
    console.log(`${Symbols.SUCCESS} All cronjobs started.`);
  }

  public async importJobs() {
    // * import all job exports from each file from the src\Jobs\ directory, dynamically

    // get all files from the src\Jobs\ directory
    // ! filtering out any files that are not .js or .ts files, specifically (for build)
    const jobFiles = readdirSync(join(__dirname, "../Jobs/"), {
      encoding: "utf-8",
      withFileTypes: false,
    }).filter((file) => {
      const fileName = file.split(".")[0];
      return file === `${fileName}.js` || file === `${fileName}.ts`;
    });

    // console.log(jobFiles);

    // iterate through each file
    for (let jobFile of jobFiles) {
      // strip the file's extension
      jobFile = jobFile.split(".")[0];

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
        // job.fireOnTick(); // fire on tick immediately
        job.start(); // start job
      });
    });
  }

  public async stopAll() {
    // stop all jobs
    this._jobs.forEach((job) => job.stop());
  }
}
