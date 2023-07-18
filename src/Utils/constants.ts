// Permissions
export const Discord_Permissions = {
  "1": "CREATE_INSTANT_INVITE",
  "2": "KICK_MEMBERS",
  "4": "BAN_MEMBERS",
  "8": "ADMINISTRATOR",
  "16": "MANAGE_CHANNELS",
  "32": "MANAGE_SERVER",
  "64": "ADD_REACTIONS",
  "128": "VIEW_AUDIT_LOG",
  "256": "PRIORITY_SPEAKER",
  "512": "STREAM_VIDEO",
  "1024": "VIEW_CHANNELS",
  "2048": "SEND_MESSAGES",
  "4096": "SEND_TTS_MESSAGES",
  "8192": "MANAGE_MESSAGES",
  "16384": "EMBED_LINKS",
  "32768": "ATTACH_FILES",
  "65536": "READ_MESSAGE_HISTORY",
  "131072": "MENTION_ALL_ROLES",
  "262144": "USE_EXTERNAL_EMOJIS",
  "524288": "VIEW SERVER INSIGHTS",
  "1048576": "CONNECT_VOICE",
  "2097152": "SPEAK",
  "4194304": "MUTE_MEMBERS",
  "8388608": "DEAFEN_MEMBERS",
  "16777216": "MOVE_MEMBERS",
  "33554432": "USE_VOICE_ACTIVITY",
  "67108864": "CHANGE_NICKNAME",
  "134217728": "MANAGE_NICKNAMES",
  "268435456": "MANAGE_ROLES",
  "536870912": "MANAGE_WEBHOOKS",
  "1073741824": "MANAGE_EMOJIS_AND_STICKERS",
  "2147483648": "USE_APPLICATION_COMMANDS",
  "4294967296": "REQUEST_TO_SPEAK",
  "8589934592": "MANAGE_EVENTS",
  "17179869184": "MANAGE_THREADS",
  "34359738368": "PUBLIC_THREADS",
  "68719476736": "PRIVATE_THREADS",
  "137438953472": "USE_EXTERNAL_STICKERS",
  "274877906944": "SEND_MESSAGES_IN_THREADS",
  "549755813888": "START_ACTIVITIES",
  "1099511627776": "MODERATE_MEMBERS",
};

// * Typescript
// Custom types
export type numberORstring = number | string;

// * Miscellaneous
// Colours
export enum Colour_Hex {
  RED = "#F4070D",
  GREEN = "#95F3E3",
  BlUE = "#08C4CD",
  ORANGE = "#FE902E",
  DARK_RED = "#D22426",
  DARK_GREEN = "#71CFB7",
  DARK_BLUE = "#27939D",
  DARK_ORANGE = "#EE6B35",
}

export enum Colour_Codes {
  DEFAULT = 0,
  AQUA = 1752220,
  DARKAQUA = 1146986,
  GREEN = 5763719,
  DARKGREEN = 2067276,
  BLUE = 3447003,
  DARKBLUE = 2123412,
  PURPLE = 10181046,
  DARKPURPLE = 7419530,
  LUMINOUSVIVIDPINK = 15277667,
  DARKVIVIDPINK = 11342935,
  GOLD = 15844367,
  DARKGOLD = 12745742,
  ORANGE = 15105570,
  DARKORANGE = 11027200,
  RED = 15548997,
  DARKRED = 10038562,
  GREY = 9807270,
  DARKGREY = 9936031,
  DARKERGREY = 8359053,
  LIGHTGREY = 12370112,
  NAVY = 3426654,
  DARKNAVY = 2899536,
  YELLOW = 16776960,
}

// Symbols
export enum Symbols {
  SUCCESS = "✔️",
  FAILURE = `❌`,
  LOADING = `⌛`,
  BUG = "🐛",
  BOAR = "🐗",
  DUCK = "🦆",
  STAR = "⭐",
  LANGUAGE = "🔤",
  USER = "👤",
  BOT = "🤖",
  WEIGHTLIFTING = "🏋️",
  CALENDAR = "📅",
  TABLE_TENNIS = "🏓",
  WARNING = "⚠️",
  ERROR = "🚫",
  INFORMATION = "ℹ️",
  QUESTION = "❓",
  CHECKMARK = "✅",
  CROSSMARK = "❌",
  ARROW_UP = "⬆️",
  ARROW_DOWN = "⬇️",
  ARROW_LEFT = "⬅️",
  ARROW_RIGHT = "➡️",
  HOURGLASS = "⌛",
}

// Time values
export enum Convert_MS {
  MS = 1,
  SECS = 1000,
  MINS = 60000,
  HOURS = 3600000,
  DAYS = 86400000,
  WEEKS = 604800000,
  MONTHS = 2592000000,
  YEARS = 31536000000,
}

// Image sizes available for serving by Discord
export enum Images_Sizes {
  MICROSCROPIC = "8",
  MINISCULE = "16",
  TINY = "32",
  SMALL = "64",
  MEDIUM = "128",
  LARGE = "256",
  XLARGE = "512",
  XXLARGE = "1024",
  XXXLARGE = "2048",
  XXXXLARGE = "4096",
}

// Links to external GIFs stored remotely in CDNs or simply websites
export enum GIF_Links {
  ANIMATED_CHECKMARK = "https://cdn.discordapp.com/emojis/723073203307806761.gif?v=1",
  DEFAULT_BANNER = "https://whatifgaming.com/wp-content/uploads/2022/03/Living-the-Mountain-Life.jpg",
}

// * Network St
export const Status_Codes = {
  "200": "OK -- Successfully retrieved data",
  "400": "Bad Request -- Something went wrong",
  "401": "Unauthorized -- Your API key is wrong",
  "403": "Forbidden -- You do not have permission to access this resource",
  "404": "Not Found -- The specified resource could not be found",
  "405":
    "Method Not Allowed -- You tried to access a resource with an invalid method",
  "406": "Not Acceptable -- You requested a format that isn't json",
  "422": "Unprocessable Entity -- Your input failed validation.",
  "429": "Too Many Requests -- You're making too many API requests.",
  "500":
    "Internal Server Error -- We had a problem with our server. Try again later.",
  "503":
    "Service Unavailable -- We're temporarily offline for maintenance. Please try again later.",
};
