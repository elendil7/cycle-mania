export default interface RichClubActivities {
  entries: ClubActivity[];
  pagination: Pagination;
}

export interface ClubActivity {
  viewingAthlete: ViewingAthlete;
  entity: Entity;
  activity: Activity;
  cursorData: CursorData;
  callbacks: null;
}

export interface Activity {
  stats: Stat[];
  description: null | string;
  descriptionMentionedAthleteIds: any[];
  descriptionMentionsClubIds: any[];
  flagged: null;
  activityName: string;
  id: string;
  ownedByCurrentAthlete: boolean;
  segAndBestEffortAchievements: SegAndBestEffortAchievement[];
  powerAndSegmentGoalAchievements: any[];
  type: Type;
  mapVisPrompt: MapVisPrompt;
  maharajAchievement: MaharajAchievement | null;
  isVirtual: boolean;
  isCommute: boolean;
  workoutType: null | string;
  privacyTagKey: null;
  shareable: boolean;
  twitterUrl: string;
  isBoosted: boolean;
  visibility: Visibility;
  athlete: ActivityAthlete;
  mapAndPhotos: MapAndPhotos;
  timeAndLocation: TimeAndLocation;
  kudosAndComments: KudosAndComments;
  hiddenStatIndicatorString: null;
  embedDropdownEnabled: boolean;
  activityContextHeader: null;
  activitySuggestionType: null;
}

interface ActivityAthlete {
  avatarUrl: string;
  athleteName: string;
  athleteId: string;
  memberType: MemberType;
  title: string;
  sex: "M" | "F";
  firstName: string;
}

enum MemberType {
  Empty = "",
  Premium = "premium",
}

interface KudosAndComments {
  canKudo: boolean;
  hasKudoed: boolean;
  highlightedKudosers: HighlightedKudoser[];
  kudosCount: number;
  commentsEnabled: boolean;
  comments: Comment[];
}

interface Comment {
  comment_id: number;
  deletable: boolean;
  reportable: boolean;
  quarantinable: boolean;
  comment: string;
  timestamp: string;
  athlete: CommentAthlete;
  reactions_summary: ReactionsSummary;
}

interface CommentAthlete {
  id: number;
  url: string;
  name: string;
  firstname: string;
  athlete_name: string;
  short_name: string;
  avatar_url: string;
  member_type: MemberType;
}

interface ReactionsSummary {
  entity_id: number;
  has_reacted: boolean;
  facepile: null;
  reaction_count: number;
}

interface HighlightedKudoser {
  destination_url: string;
  display_name: string;
  avatar_url: string;
  show_name: boolean;
}

interface MaharajAchievement {
  type: string;
  image: string;
  image_caption: string;
  text: string;
  url: string;
  analytics: Analytics;
  subtitle?: string;
}

interface Analytics {
  challenge_id?: number;
  period?: string;
  value_type?: number;
  segment_id?: number;
  rank?: number;
}

interface MapAndPhotos {
  isRoutable: boolean;
  activityMap: ActivityMap;
  photoList: PhotoList[];
}

interface ActivityMap {
  url: string;
  retina_srcset: string;
}

interface PhotoList {
  photo_id: string;
  media_type: number;
  activity_id: number;
  post_id: null;
  activity_name_escaped: null;
  caption_escaped: string;
  thumbnail: string;
  large: string;
  video: null | string;
  duration: number | null;
  lat: null;
  lng: null;
  native: boolean;
  owner_id: string;
  viewing_athlete_id: string;
  editable: boolean;
  activity: MapVisPrompt;
  dimensions: Dimensions;
  is_sponsored_photo: boolean;
  enhanced_photo: null;
  parent_trackable_id: string;
  showEnhancedTag: boolean;
}

interface MapVisPrompt {}

interface Dimensions {
  large: Large;
  thumbnail: Large;
}

interface Large {
  height: number;
  width: number;
}

interface SegAndBestEffortAchievement {
  id: number;
  id_string: string;
  activity_id: number;
  name: string;
  sprite: Sprite;
  featured: boolean;
  elapsed_time: string;
  description: Description;
  distance_based_best_effort: boolean;
  hidden: null;
}

enum Description {
  PR = "PR",
  The10ThOverall = "10th overall",
  The2NdFastestTime = "2nd fastest time",
  The3RDFastestTime = "3rd fastest time",
}

enum Sprite {
  IconAtKom10 = "icon-at-kom-10",
  IconAtPR1 = "icon-at-pr-1",
  IconAtPR2 = "icon-at-pr-2",
  IconAtPR3 = "icon-at-pr-3",
}

interface Stat {
  key: Key;
  value: string;
  value_object: null;
}

enum Key {
  StatOne = "stat_one",
  StatOneSubtitle = "stat_one_subtitle",
  StatThree = "stat_three",
  StatThreeSubtitle = "stat_three_subtitle",
  StatTwo = "stat_two",
  StatTwoSubtitle = "stat_two_subtitle",
}

interface TimeAndLocation {
  timestampFormat: TimestampFormat;
  displayDateAtTime: string;
  displayDate: string;
  location: string;
}

enum TimestampFormat {
  DateAtTime = "date_at_time",
}

enum Type {
  Ride = "Ride",
}

enum Visibility {
  Everyone = "everyone",
}

interface CursorData {
  updated_at: number;
  rank: number;
}

enum Entity {
  Activity = "Activity",
}

interface ViewingAthlete {
  id: string;
  name: string;
  avatarUrl: string;
  memberType: MemberType;
}

interface Pagination {
  hasMore: boolean;
}
