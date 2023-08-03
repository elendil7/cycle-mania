export default interface StravaTokenStorageModel {
  expires_at: number;
  access_token: string;
  refresh_token: string;
}
