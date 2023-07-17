import {
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
} from "../Discord/Utils/exportedEnvs";
import { config_STRAVA } from "../../config";

export default class StavaService {
  private BASE_URL = config_STRAVA.base_URL;
  private CLIENT_ID = STRAVA_CLIENT_ID;
  private CLIENT_SECRET = STRAVA_CLIENT_SECRET;

  constructor() {
    this.testStrava();
  }

  // run test to see if we can get a response from strava
  private testStrava() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
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
  public getClub() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
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
  public getClubGroupLeaderboard() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  public getClubSegmentLeaderboard() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }
}
