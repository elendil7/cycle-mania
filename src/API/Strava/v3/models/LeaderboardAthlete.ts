export default interface LeaderboardAthlete {
  rank: number;
  athlete_id: number;
  velocity: number;
  elev_gain: number;
  num_activities: number;
  moving_time: number;
  distance: number;
  best_activities_distance: number;
  best_activities_distance_activity_id: number;
  athlete_firstname: string;
  athlete_lastname: string;
  athlete_picture_url: string;
  athlete_member_type: null;
}
