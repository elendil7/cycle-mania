interface ActivityType {
  id: number;
  name: string;
}

type MembershipStatus = "member" | "pending";

export default interface DetailedClub {
  id: number;
  resource_state: number;
  name: string;
  profile_medium: string;
  cover_photo: string;
  cover_photo_small: string;
  sport_type?: string; // Deprecated
  activity_types: ActivityType[];
  city: string;
  state: string;
  country: string;
  private: boolean;
  member_count: number;
  featured: boolean;
  verified: boolean;
  url: string;
  membership: MembershipStatus;
  admin: boolean;
  owner: boolean;
  following_count: number;
}
