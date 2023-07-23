import axios from "axios";
import { stravaService } from "../../../../Index";
import getEnv from "../../../../Utils/getEnv";
import TokenRequest from "../models/Custom/TokenRequest";
import TokenResponse from "../models/Custom/TokenResponse";
import { readFileSync, writeFileSync } from "fs";
import { Symbols } from "../../../../Utils/constants";
import { sleep } from "../../../../Utils/sleep";
import StorageSchema from "../models/Custom/StorageSchema";

// restore storage.json file if deleted / doesn't exist
function restoreStorage(): void {
  // write a new storage.json file
  writeFileSync(
    stravaService.stravaConfig.path.storage,
    JSON.stringify({
      expires_at: 0,
      access_token: getEnv("STRAVA_ACCESS_TOKEN"),
      refresh_token: getEnv("STRAVA_REFRESH_TOKEN"),
    }),
  );
}

// checks if auth token is expired or not
function isExpired(expiresAt: number): boolean {
  // get current time as unix timestamp
  const currentTime = Math.floor(Date.now() / 1000);

  // if the current time is more than than the expires_at field, return true (access token IS expired)
  // otherwise, return true (access token isn't expired)
  return currentTime > expiresAt;
}

// export the main refresh token function
export default async function refreshToken(count: number): Promise<number> {
  // define variable to hold the storage.json file
  let storage: StorageSchema;

  // get the storage.json file
  try {
    storage = JSON.parse(
      readFileSync(stravaService.stravaConfig.path.storage).toString(),
    );
  } catch (e) {
    // if the storage.json file doesn't exist, restore it
    restoreStorage();
    return await refreshToken(count);
  }

  // if the access token is not expired, return (no need to refresh)
  if (!isExpired(storage.expires_at)) return 200;

  // if the function has been called more than 5 times, throw an error
  if (count > 5) {
    console.error(
      `${Symbols.WARNING} Could not refresh Strava Token. Strava may be down...`,
    );
    return 503;
  }

  console.log(
    `${Symbols.DUCK} Refreshing Strava Tokens (attempt #${count})...`,
  );

  // construct token request object, leveraging data from the storage.json and strava config files
  const tokenRequest: TokenRequest = {
    client_id: parseInt(stravaService.authConfig.client_id),
    client_secret: stravaService.authConfig.client_secret,
    grant_type: "refresh_token",
    refresh_token: storage.refresh_token,
  };

  try {
    // send post request to update the access & refresh tokens
    let { status, data } = await axios({
      method: "post",
      url: stravaService.stravaConfig.url.token_URL,
      data: tokenRequest,
    });

    // if the response is successful, update the access token
    if (status === 200) {
      // get the response data from the axios response
      const { expires_at, access_token, refresh_token }: TokenResponse = data;

      // define a 5 minute leeway, to be subtracted from the expires_at field to account for edge cases (network latency, etc.)
      // essentially, the expires_at field is set to 5 minutes before the actual expiration time, so that the token is refreshed before it has the chance to expire (in case a discord command related to strava is run within that 5 minute window)
      const leeway = 300; // 5 minute leeway

      // write the new access token & refresh token & expires_at field to the storage.json file
      writeFileSync(
        stravaService.stravaConfig.path.storage,
        JSON.stringify({
          expires_at: expires_at - leeway,
          access_token: access_token,
          refresh_token: refresh_token,
        }),
      );

      // update the access token in the strava service's memory
      stravaService.accessToken = access_token;

      console.log(`${Symbols.BOAR} Token Refreshed!`);

      // return success code
      return 200;
    } else {
      // if the response is not successful, log the error and try again
      console.error(
        `${Symbols.FAILURE} Error refreshing Strava Token. Retrying...`,
      );
      // increment the count, wait 2 seconds, then call the refreshToken function again
      count++;
      await sleep(2);
      return await refreshToken(count);
    }
  } catch (e) {
    console.log(e);
    return 500;
  }
}
