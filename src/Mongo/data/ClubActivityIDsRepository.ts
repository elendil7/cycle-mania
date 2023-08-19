import { logger } from "../../Logging/Winston";
import StravaClubActivityIDsModel from "../models/StravaClubActivityIDs";
import { ClubActivityIDs } from "../schemasExport";

export const createClubActivityIDs = async () => {
  try {
    // create club activity IDs document
    const clubActivityIDs = new ClubActivityIDs({});

    // save club activity IDs document
    await clubActivityIDs.save();

    // return club activity IDs
    return clubActivityIDs;
  } catch (e) {
    logger.error(e);
  }
};

export const getClubActivityIDs = async () => {
  try {
    return await ClubActivityIDs.findOne();
  } catch (e) {
    logger.error(e);
  }
};

export const updateClubActivityIDs = async (
  clubActivityIDs: StravaClubActivityIDsModel,
) => {
  try {
    return await ClubActivityIDs.updateOne(clubActivityIDs);
  } catch (e) {
    logger.error(e);
  }
};
