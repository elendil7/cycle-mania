interface ActivityType {
  cycling: boolean;
  running: boolean;
  triathlon: boolean;
  other: boolean;
}

export default interface SummaryClub {
  id: number;
  resource_state: number;
  name: string;
  profile_medium: string;
  cover_photo: string;
  cover_photo_small: string;
  sport_type: string;
  activity_types: ActivityType;
  city: string;
  state: string;
  country: string;
  private: boolean;
  member_count: number;
  featured: boolean;
  verified: boolean;
  url: string;
}
