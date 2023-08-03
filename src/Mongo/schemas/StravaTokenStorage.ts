import { Schema, model } from "mongoose";
import getEnv from "../../Utils/getEnv";

const StravaTokenStorage = new Schema({
  expires_at: { type: Number, default: 0 },
  access_token: { type: String, default: getEnv("STRAVA_ACCESS_TOKEN") },
  refresh_token: { type: String, default: getEnv("STRAVA_REFRESH_TOKEN") },
});

// make model
const TokenStorage = model("TokenStorage", StravaTokenStorage);

export default TokenStorage;
