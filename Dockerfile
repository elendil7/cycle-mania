# Set base image
FROM node:17.9.1-alpine

# Set environment variables
ENV NODE_ENV=production

# Create app directory (working directory), and enter it
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml into the container (working directory)
COPY ["package.json", "pnpm-lock.yaml", "./"]

# Install pnpm package manager
RUN npm install -g pnpm
# Install dependencies
RUN pnpm install --prod

# Copy required source code into the container (working directory)
COPY . .

# Build the app
RUN pnpm run build:prod

# Start the app using pm2 (CMD is preferred over RUN, when executing the app inside the container)
CMD ["pnpm", "run", "pm2:start"]