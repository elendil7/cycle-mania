import { logger } from "../../Logging/Winston";
import StravaTokenStorageModel from "../models/StravaTokenStorage";
import { TokenStorage } from "../schemasExport";

export const createTokenStorage = async () => {
  try {
    // create token storage document
    const tokenStorage = new TokenStorage({});

    // save token storage document
    await tokenStorage.save();

    // return token storage
    return tokenStorage;
  } catch (e) {
    logger.error(e);
  }
};

export const getTokenStorage = async () => {
  try {
    return await TokenStorage.findOne();
  } catch (e) {
    logger.error(e);
  }
};

export const updateTokenStorage = async (
  tokenStorage: StravaTokenStorageModel,
) => {
  try {
    return await TokenStorage.updateOne(tokenStorage);
  } catch (e) {
    logger.error(e);
  }
};
