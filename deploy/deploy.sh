echo "** Connected to Oracle server via SSH. **"
echo "Pulling changes from GitHub repo..."
cd /home/opc
if [ -d "cycle-mania" ]; then
  cd cycle-mania
  git pull
else
  git clone
fi
echo "Changes pulled from GitHub repo."

echo "Copying environmental secrets from GitHub repo to Oracle server..."
echo "" > .env
echo "DISCORD_BOT_ID=${{ secrets.DISCORD_BOT_ID }}" >> .env
echo "DISCORD_BOT_OWNER_ID=${{ secrets.DISCORD_BOT_OWNER_ID }}" >> .env
echo "DISCORD_BOT_TOKEN=${{ secrets.DISCORD_BOT_TOKEN }}" >> .env
echo "DISCORD_CHANNEL_ACTIVITIES_ID=${{ secrets.DISCORD_CHANNEL_ACTIVITIES_ID }}" >> .env
echo "DISCORD_CHANNEL_LEADERBOARD_ID=${{ secrets.DISCORD_CHANNEL_LEADERBOARD_ID }}" >> .env
echo "MONGO_DB_NAME=${{ secrets.MONGO_DB_NAME }}" >> .env
echo "MONGO_PASSWORD=${{ secrets.MONGO_PASSWORD }}" >> .env
echo "MONGO_USERNAME=${{ secrets.MONGO_USERNAME }}" >> .env
echo "PROD=${{ secrets.PROD }}" >> .env
echo "STRAVA_ACCESS_TOKEN=${{ secrets.STRAVA_ACCESS_TOKEN }}" >> .env
echo "STRAVA_CLIENT_ID=${{ secrets.STRAVA_CLIENT_ID }}" >> .env
echo "STRAVA_CLIENT_SECRET=${{ secrets.STRAVA_CLIENT_SECRET }}" >> .env
echo "STRAVA_REFRESH_TOKEN=${{ secrets.STRAVA_REFRESH_TOKEN }}" >> .env
echo "STRAVA_USER_COOKIE=${{ secrets.STRAVA_USER_COOKIE }}" >> .env
echo "Environmental secrets copied from GitHub repo to Oracle server

echo "Building new Docker image..."
sudo docker build --tag cycle-mania:${{ github.sha }} .
echo "New Docker image built."

echo "Stopping and deleting existing Docker container..."
sudo docker stop cycle-mania || true
sudo docker rm cycle-mania || true
echo "Existing Docker container stopped and deleted."

echo "Running new Docker container..."
sudo docker run -d --name cycle-mania --env-file .env cycle-mania:${{ github.sha }}
echo "New Docker container running."

echo "Waiting for new Docker container to start..."
sleep 10
echo "New Docker container started."

echo "Checking if new Docker container is running..."
sudo docker ps | grep cycle-mania
echo "New Docker container is running."

echo "Deployment successful."
exit 0