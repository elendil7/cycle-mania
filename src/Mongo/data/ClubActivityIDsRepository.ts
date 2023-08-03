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
    console.log(e);
  }
};

export const getClubActivityIDs = async () => {
  try {
    return await ClubActivityIDs.findOne();
  } catch (e) {
    console.log(e);
  }
};

export const updateClubActivityIDs = async (
  clubActivityIDs: StravaClubActivityIDsModel,
) => {
  try {
    return await ClubActivityIDs.updateOne(clubActivityIDs);
  } catch (e) {
    console.log(e);
  }
};
