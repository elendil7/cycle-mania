export default interface Club {
  id: number;
  resource_state: number;
  name: string;
  profile_medium: string;
  profile: string;
  cover_photo: string;
  cover_photo_small: string;
  activity_types: string[];
  activity_types_icon: string;
  dimensions: string[];
  sport_type: string;
  localized_sport_type: string;
  city: string;
  state: string;
  country: string;
  private: boolean;
  member_count: number;
  featured: boolean;
  verified: boolean;
  url: string;
  membership: string;
  admin: boolean;
  owner: boolean;
  description: string;
  club_type: string;
  following_count: number;
  website: string;
}