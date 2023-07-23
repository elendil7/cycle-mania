export default interface TokenRequest {
  client_id: number;
  client_secret: string;
  grant_type: string;
  refresh_token: string;
}
