import { Schema, model } from "mongoose";

const StravaClubActivityIDs = new Schema({
  activityIDs: { type: [String], default: [] },
});

const ClubActivityIDs = model("ClubActivityIDs", StravaClubActivityIDs);

export default ClubActivityIDs;
