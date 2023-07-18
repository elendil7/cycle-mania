import {
  STRAVA_ACCESS_TOKEN,
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
} from "../Discord/Utils/exportedEnvs";
import { config_STRAVA } from "../../config";
import axios from "axios";
import SummaryClub from "../API/Strava/v3/models/SummaryClub";
// import { default as strava, Strava } from "strava-v3";
const strava = require("strava-v3");
import { Strava } from "strava-v3";
import { Symbols } from "../Utils/constants";
import { puppeteerService } from "../Index";

export default class StravaService {
  private client: Strava;
  private config: typeof config_STRAVA;
  private CLIENT_ID: string;
  private CLIENT_SECRET: string;
  private ACCESS_TOKEN: string;

  constructor() {
    this.client = strava;
    this.config = config_STRAVA;
    this.CLIENT_ID = STRAVA_CLIENT_ID;
    this.CLIENT_SECRET = STRAVA_CLIENT_SECRET;
    this.ACCESS_TOKEN = STRAVA_ACCESS_TOKEN;
    this.init();
  }

  private async init() {
    // make puppeteer browser
    // await puppeteerService.launchBrowser(this.constructor.name);

    console.log(`${Symbols.HOURGLASS} Loading Strava config...`);
    this.client.config({
      client_id: this.CLIENT_ID,
      client_secret: this.CLIENT_SECRET,
      access_token: this.ACCESS_TOKEN,
      redirect_uri: this.config.redirect_URL,
    });
    console.log(`${Symbols.CHECKMARK} Loaded!`);

    try {
      console.log(`${Symbols.HOURGLASS} Pinging strava...`);
      const response = await axios.get(`${this.config.base_URL}/athlete`, {
        headers: {
          Authorization: `Bearer ${this.ACCESS_TOKEN}`,
        },
      });
      if (response.status === 200) {
        console.log(`${Symbols.CHECKMARK} Ping successful!`);
      } else {
        console.error(
          `${Symbols.FAILURE} Failed to connect to the Strava API. Check refresh token.`,
        );
      }
    } catch (e) {
      console.error(
        `${Symbols.FAILURE} Error connecting to to the Strava API. Restart bot.`,
      );
    }
  }

  public getActivities() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  public getAthlete() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  public getAthleteStats() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  // club
  public async getClub(clubID: string) {
    try {
      return (await this.client.clubs.get({
        id: clubID,
        access_token: this.ACCESS_TOKEN,
      })) as SummaryClub;
    } catch (e) {
      console.error(e);
    }
  }

  public getClubActivities() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  public getClubAdmins() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  public getClubAllMembers() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  public getClubAnnouncements() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  // leaderboard
  public async getClubGroupLeaderboard(clubID: string) {
    try {
    } catch (e) {
      console.error(e);
    }
  }

  public getClubSegmentLeaderboard() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }
}
