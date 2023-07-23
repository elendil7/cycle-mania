<div align="center">
    <h1>
        <img width="25px" src="./public/icon/server-icon-emoji-512.png" alt="Server Icon">
        Cycle Mania Discord Bot
        <img width="25px" src="./public/icon/server-icon-emoji-512.png" alt="Server Icon">
    </h1>
    <p>Welcome to the repository.</p>
    <p><em>This custom discord bot was built for the members of the <b>Cycle Mania</b> community.</em></p>
    <p><em>It boasts a plethora of useful and fun features, many of which relate to retreiving data from the <b>Strava API</b>, and display it in a prettified format in our Discord server.</em></p>
</div>

## ⚡️ Features

- Dynamic slash commands for aesthetic user experience.
- Ability to fetch data from Strava API and visualize it (discord embed).

## 🚧 Roadmap

<em>Order: (Newest => Oldest)</em>

- [] []
- [x] [23.07.2023] [v1.0.5] Complete Strava API implementation - Self Sufficient Token Refresh
  - Polished RefreshToken method which uses a decorator to run checks before each API call.
  - Removed strava-v3 node.js package in favour of raw HTTP requests.
  - Made some miscellaneous quality-of-life changes.
- [x] [18.07.2023] [v1.0.5] Strava API implementation (in progress)
  - Install some dependencies
    - puppeteer
    - ts-node
  - Update tsconfig file
  - Implement singleton software design pattern for StravaService
  - Create first Strava-oriented command!
    - Club (fetches strava club based on ID)
- [x] [17.07.2023] [v1.0.5] First Commands!
  - Help command
  - Reload command
- [x] [17.07.2023] [v1.0.0] Base Project Setup
  - Install initial dependencies
  - Setup boilerplate for services
  - Setup Command & Event initialization methods
  - Configure Command handler for slash commands
  - Add environmental variables

## 🖼️ Gallery

<img width="40%" src="./public/icon/server-icon-emoji-512.png" alt="Server Icon">
