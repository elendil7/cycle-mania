import { config_STRAVA } from "../../config";
import axios from "axios";
import { Symbols } from "../Utils/constants";
import { puppeteerService } from "../Index";
import getEnv from "../Utils/getEnv";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import RefreshTokenDecorator from "../API/Strava/v3/decorators/RefreshTokenDecorator";
import Club from "../API/Strava/v3/models/Club";
import AuthenticationConfig from "../API/Strava/v3/models/Custom/AuthenticationConfig";
import StorageSchema from "../API/Strava/v3/models/Custom/StorageSchema";

export default class StravaService {
  private readonly _configStrava: typeof config_STRAVA; // private field (immutable) to store the most recent config
  private readonly _configAuth: AuthenticationConfig; // private field (immutable) to store the most recent strava config

  private _accessToken: string; // private field to store the most recent access token

  constructor() {
    this._configStrava = config_STRAVA;
    this._configAuth = {
      client_id: getEnv("STRAVA_CLIENT_ID"),
      client_secret: getEnv("STRAVA_CLIENT_SECRET"),
    };
    // mandatory setting of access token (useless, as its set in the init function)
    this._accessToken = "";

    // initialize the service
    this.init();
  }

  // getter for config_STRAVA (immutable, to be run from the RefreshToken function
  public get stravaConfig() {
    return this._configStrava;
  }

  // getter for private field (current stravaConfig), to be run from the RefreshToken function
  public get authConfig() {
    return this._configAuth;
  }

  // getters for access token
  public get accessToken() {
    return this._accessToken;
  }

  // setter for access token
  public set accessToken(token: string) {
    this._accessToken = token;
  }

  private init() {
    // * load strava config
    console.log(`${Symbols.HOURGLASS} Loading Strava config...`);

    // get the storage path from the strava config
    const storagePath = this.stravaConfig.path.storage;

    // Check if the storage.json file exists
    const fileExists = existsSync(storagePath);

    // If the file doesn't exist, create the directory structure and the file
    if (!fileExists) {
      // Get the directory path from the storage path
      const directoryPath = dirname(storagePath);

      // Create the directory structure recursively
      mkdirSync(directoryPath, { recursive: true });

      // Create the storage.json file, with "0" as the expires_at field, and the access and refresh tokens from the .env file
      // (these fields will be updated later accordingly when the access token needs to be refreshed)
      writeFileSync(
        storagePath,
        JSON.stringify({
          expires_at: 0,
          access_token: getEnv("STRAVA_ACCESS_TOKEN"),
          refresh_token: getEnv("STRAVA_REFRESH_TOKEN"),
        }),
        "utf8",
      );

      // load access token into the strava service's memory
      this.accessToken = getEnv("STRAVA_ACCESS_TOKEN");
    }
    // if file exists, read the file and load the access token into the strava service's memory
    else {
      const storage: StorageSchema = JSON.parse(
        readFileSync(storagePath, "utf8"),
      );
      this.accessToken = storage.access_token;
    }

    console.log(`${Symbols.SUCCESS} Loaded!`);

    // TODO - make puppeteer browser
    // make puppeteer browser
    // await puppeteerService.launchBrowser(this.constructor.name);
  }

  @RefreshTokenDecorator // decorator to refresh token before calling the method
  public async attemptPing() {
    // * try pinging strava with the current access token
    try {
      console.log(`${Symbols.HOURGLASS} Pinging strava...`);
      const response = await axios.get(`/athlete`, {
        baseURL: this.stravaConfig.url.base_URL,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      if (response.status === 200) {
        console.log(`${Symbols.SUCCESS} Ping successful!`);
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
  public async getClub(clubID: string): Promise<Club> {
    try {
      // get club at GET /clubs/{id} using axios
      const { data, status } = await axios.get(`/clubs/${clubID}`, {
        baseURL: this.stravaConfig.url.base_URL,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      if (status === 200) {
        return data as Club;
      } else {
        throw new Error(
          `Error getting club with ID ${clubID}. Status code: ${status}`,
        );
      }
    } catch (e) {
      throw e;
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

  // leaderboard
  @RefreshTokenDecorator
  public async getClubGroupLeaderboard(clubID: string) {
    try {
    } catch (e) {
      console.error(e);
    }
  }

  @RefreshTokenDecorator
  public getClubSegmentLeaderboard() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }
}
