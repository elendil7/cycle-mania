import { config_STRAVA } from "../../config";
import axios from "axios";
import { Symbols } from "../Utils/constants";
import getEnv from "../Utils/getEnv";
import RefreshTokenDecorator from "../API/Strava/v3/decorators/RefreshTokenDecorator";
import Club from "../API/Strava/v3/models/Club";
import LeaderboardAthlete from "../API/Strava/v3/models/LeaderboardAthlete";
import AuthenticationConfig from "../API/Strava/v3/models/Custom/AuthenticationConfig";
import { Browser } from "puppeteer";
import { request } from "undici";
import { getUnixTimestamp } from "../Utils/timeConversions";
import { puppeteerService } from "../Index";
import RichClubActivities from "../API/Strava/v3/models/Custom/RichClubActivities";
import { logger } from "../Logging/Winston";

export default class StravaService {
  private readonly _configStrava: typeof config_STRAVA; // private field (immutable) to store the most recent config
  private readonly _configAuth: AuthenticationConfig; // private field (immutable) to store the most recent strava config
  private readonly _cookie: string; // private field (immutable) to store the user's cookie (for cron jobs)
  private _browser: Browser; // private field to store the puppeteer browser
  private _accessToken: string; // private field to store the most recent access token

  constructor() {
    this._configStrava = config_STRAVA;
    this._configAuth = {
      client_id: getEnv("STRAVA_CLIENT_ID"),
      client_secret: getEnv("STRAVA_CLIENT_SECRET"),
    };
    this._cookie = getEnv("STRAVA_USER_COOKIE");
    this._browser = undefined!;
    this._accessToken = undefined!;
  }

  // getter for config_STRAVA (immutable, to be run from the RefreshToken function
  public get stravaConfig() {
    return this._configStrava;
  }

  // getter for private field (current stravaConfig), to be run from the RefreshToken function
  public get authConfig() {
    return this._configAuth;
  }

  // getter for private field (current cookie), to be used for retrieving Rich application/json data from Strava, in cron jobs
  public get cookie() {
    return this._cookie;
  }

  // getter  & setter for browser
  public get browser() {
    return this._browser;
  }
  public set browser(browser: Browser) {
    this._browser = browser;
  }

  // getter & setter for access token
  public get accessToken() {
    return this._accessToken;
  }
  public set accessToken(token: string) {
    this._accessToken = token;
  }

  public async init() {
    // * load strava config
    /*     logger.info(`${Symbols.HOURGLASS} Loading Strava config...`);
    logger.info(`${Symbols.SUCCESS} Loaded!`); */
    /*     logger.info(`${Symbols.HOURGLASS} Launching StravaService browser...`);

    // launch puppeteer browser
    this.browser = await puppeteerService.launchBrowser(this.constructor.name);

    logger.info(`${Symbols.SUCCESS} Launched!`); */
  }

  @RefreshTokenDecorator // decorator to refresh token before calling the method
  public async attemptPing() {
    // * try pinging strava with the current access token
    try {
      logger.info(`${Symbols.HOURGLASS} Pinging strava...`);
      const response = await axios.get(`/athlete`, {
        baseURL: this.stravaConfig.url.base_URL,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      if (response.status === 200) {
        logger.info(`${Symbols.SUCCESS} Ping successful!`);
      } else {
        logger.error(
          `${Symbols.FAILURE} Failed to connect to the Strava API. Check refresh token.`,
        );
      }
    } catch (e) {
      logger.error(
        `${Symbols.FAILURE} Error connecting to to the Strava API. Restart bot.`,
      );
    }
  }

  @RefreshTokenDecorator
  public getActivities() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  @RefreshTokenDecorator
  public getAthlete() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  @RefreshTokenDecorator
  public getAthleteStats() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  // club
  @RefreshTokenDecorator // decorator to refresh token before calling the method
  public async getClub(clubIdentifier: string) {
    try {
      // get club at GET /clubs/{id} using axios
      const { data, status } = await axios.get(`/clubs/${clubIdentifier}`, {
        baseURL: this.stravaConfig.url.base_URL,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      return data as Club;
    } catch (e) {
      logger.error(e);
    }
  }

  @RefreshTokenDecorator
  public getClubActivities() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  @RefreshTokenDecorator
  public getClubAdmins() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  @RefreshTokenDecorator
  public getClubAllMembers() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  @RefreshTokenDecorator
  public getClubAnnouncements() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  @RefreshTokenDecorator
  public getClubSegmentLeaderboard() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  // leaderboard
  public async getClubLeaderboard(clubIdentifier: string, weekOffset: number) {
    try {
      // axios sucks - can't even handle anti-CORS headers. Uncidi for the win.
      const { statusCode, body } = await request(
        `https://www.strava.com/clubs/${clubIdentifier}/leaderboard`,
        {
          query: {
            week_offset: weekOffset,
          },
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        },
      );

      return (await body.json()).data as LeaderboardAthlete[];
    } catch (e) {
      logger.error(e);
    }
  }

  public async getRichClubActivities(clubID: string) {
    try {
      // get unixTimestamp
      const timestamp = getUnixTimestamp();

      const { statusCode, body } = await request(
        `https://www.strava.com/clubs/${clubID}/feed?feed_type=club&club_id=${clubID}&before=${timestamp}`,
        {
          headers: {
            Accept: "application/json",
            Cookie: this.cookie,
          },
        },
      );

      return (await body.json()) as RichClubActivities;
    } catch (e) {
      logger.error(e);
    }
  }
}
