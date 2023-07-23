export default interface TokenResponse {
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
}
