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
  TROPHY = "🏆",
  GOLD = "🥇",
  SILVER = "🥈",
  BRONZE = "🥉",
  PARTY = "🥳",
  PARTY2 = "🎉",
  TIME = "⏰",
  ATHLETE = "🚴‍♂️",
  ATHLETEID = "🆔",
  ACTIVITY_TYPE = "🔍",
  DATE = "📅",
  DESCRIPTION = "📝",
  CYCLING = "🚴‍♂️",
  CYCLING2 = "🚴‍♀️",
  RUNNING = "🏃‍♂️",
  RUNNING2 = "🏃‍♀️",
  DISTANCE = "🌍",
  ELEVATION = "🗻",
  TIME2 = "⏱️",
}

export enum StravaActivity {
  Run = "🏃",
  TrailRun = "🏞️",
  Walk = "🚶",
  Hike = "🥾",
  VirtualRun = "🎮",
  Ride = "🚴",
  MountainBikeRide = "⛰️",
  GravelBikeRide = "🚵",
  EBikeRide = "🔋",
  EMountainBikeRide = "🚵‍♂️",
  Velomobile = "🚲",
  VirtualRide = "🎮",
  Canoeing = "🛶",
  Kayak = "🚣",
  KitesurfSession = "🪁",
  Row = "🚣",
  StandUpPaddle = "🏄‍♂️",
  Surf = "🏄",
  Swim = "🏊",
  WindsurfSession = "🌬️",
  IceSkate = "⛸️",
  AlpineSki = "🎿",
  BackcountrySki = "⛷️",
  NordicSki = "🎿",
  Snowboard = "🏂",
  Snowshoe = "🥾",
  Golf = "⛳",
  Handcycle = "🚲",
  InlineSkate = "⛸️",
  RockClimb = "🧗",
  RollerSki = "🎿",
  Wheelchair = "♿",
  Crossfit = "🏋️",
  Elliptical = "🏃‍♂️",
  Sailing = "⛵",
  Skateboarding = "🛹",
  Soccer = "⚽",
  StairStepper = "🪜",
  WeightTraining = "🏋️",
  Yoga = "🧘",
  Workout = "🏋️",
  Tennis = "🎾",
  Pickleball = "🥒",
  Racquetball = "🎾",
  Squash = "🎾",
  Badminton = "🏸",
  TableTennis = "🏓",
  HIIT = "🏋️‍♀️",
  Pilates = "🤸‍♀️",
  VirtualRow = "🎮",
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

// Misc constants
// fancy linebreak
export const LineBreak = "--------------------------------------------------";

// Export every emoji possible
export const Emojis = {
  // * Misc
  CHECKMARK: "✅",
  CROSSMARK: "❌",
  LOADING: "⌛",
  BUG: "🐛",
  BOAR: "🐗",
  DUCK: "🦆",
  STAR: "⭐",
  LANGUAGE: "🔤",
  USER: "👤",
  BOT: "🤖",
  WEIGHTLIFTING: "🏋️",
  CALENDAR: "📅",
  TABLE_TENNIS: "🏓",
  WARNING: "⚠️",
  ERROR: "🚫",
  INFORMATION: "ℹ️",
  QUESTION: "❓",
  ARROW_UP: "⬆️",
  ARROW_DOWN: "⬇️",
  ARROW_LEFT: "⬅️",
  ARROW_RIGHT: "➡️",
  HOURGLASS: "⌛",
  // * Numbers
  ZERO: "0️⃣",
  ONE: "1️⃣",
  TWO: "2️⃣",
  THREE: "3️⃣",
  FOUR: "4️⃣",
  FIVE: "5️⃣",
  SIX: "6️⃣",
  SEVEN: "7️⃣",
  EIGHT: "8️⃣",
  NINE: "9️⃣",
  TEN: "🔟",
  // * Letters
  A: "🇦",
  B: "🇧",
  C: "🇨",
  D: "🇩",
  E: "🇪",
  F: "🇫",
  G: "🇬",
  H: "🇭",
  I: "🇮",
  J: "🇯",
  K: "🇰",
  L: "🇱",
  M: "🇲",
  N: "🇳",
  O: "🇴",
  P: "🇵",
  Q: "🇶",
  R: "🇷",
  S: "🇸",
  T: "🇹",
  U: "🇺",
  V: "🇻",
  W: "🇼",
  X: "🇽",
  Y: "🇾",
  Z: "🇿",
  // * Symbols
  EXCLAMATION: "❗",
  // * Flags
  USA: "🇺🇸",
  CANADA: "🇨🇦",
  UK: "🇬🇧",
  FRANCE: "🇫🇷",
  GERMANY: "🇩🇪",
  ITALY: "🇮🇹",
  RUSSIA: "🇷🇺",
  JAPAN: "🇯🇵",
  CHINA: "🇨🇳",
  KOREA: "🇰🇷",
  // * Animals
  DOG: "🐶",
  CAT: "🐱",
  MOUSE: "🐭",
  HAMSTER: "🐹",
  RABBIT: "🐰",
  FOX: "🦊",
  BEAR: "🐻",
  PANDA: "🐼",
  KOALA: "🐨",
  TIGER: "🐯",
  LION: "🦁",
  COW: "🐮",
  PIG: "🐷",
  PIG_NOSE: "🐽",
  FROG: "🐸",
  MONKEY: "🐵",
  CHICKEN: "🐔",
  PENGUIN: "🐧",
  BIRD: "🐦",
  EAGLE: "🦅",
  OWL: "🦉",
  BAT: "🦇",
  WOLF: "🐺",
  HORSE: "🐴",
  UNICORN: "🦄",
  BEE: "🐝",
  BUTTERFLY: "🦋",
  SNAIL: "🐌",
  SHELL: "🐚",
  CRAB: "🦀",
  SHRIMP: "🦐",
  SQUID: "🦑",
  OCTOPUS: "🐙",
  TROPICAL_FISH: "🐠",
  FISH: "🐟",
  DOLPHIN: "🐬",
  WHALE: "🐳",
  WHALE2: "🐋",
  CROCODILE: "🐊",
  LEOPARD: "🐆",
  TIGER2: "🐅",
  ZEBRA: "🦓",
  GORILLA: "🦍",
  ELEPHANT: "🐘",
  RHINO: "🦏",
  HIPPOPOTAMUS: "🦛",
  CAMEL: "🐪",
  GIRAFFE: "🦒",
  KANGAROO: "🦘",
  BUFFALO: "🐃",
  OX: "🐂",
  COW2: "🐄",
  RAM: "🐏",
  SHEEP: "🐑",
  LLAMA: "🦙",
  GOAT: "🐐",
  DEER: "🦌",
  DOG2: "🐕",
  GUIDE_DOG: "🦮",
  POODLE: "🐩",
  CAT2: "🐈",
  ROOSTER: "🐓",
  TURKEY: "🦃",
  PEACOCK: "🦚",
  PARROT: "🦜",
  SWAN: "🦢",
  FLAMINGO: "🦩",
  DOVE: "🕊️",
  RABBIT2: "🐇",
  RACCOON: "🦝",
  BADGER: "🦡",
  OTTER: "🦦",
  SLOTH: "🦥",
  MOUSE2: "🐁",
  RAT: "🐀",
  CHIPMUNK: "🐿️",
  HEDGEHOG: "🦔",
  FEET: "🐾",
  // * Food
  GRAPES: "🍇",
  MELON: "🍈",
  WATERMELON: "🍉",
  TANGERINE: "🍊",
  LEMON: "🍋",
  BANANA: "🍌",
  PINEAPPLE: "🍍",
  MANGO: "🥭",
  APPLE: "🍎",
  GREEN_APPLE: "🍏",
  PEAR: "🍐",
  PEACH: "🍑",
  CHERRIES: "🍒",
  STRAWBERRY: "🍓",
  KIWI: "🥝",
  TOMATO: "🍅",
  COCONUT: "🥥",
  AVOCADO: "🥑",
  EGGPLANT: "🍆",
  POTATO: "🥔",
  CARROT: "🥕",
  CORN: "🌽",
  HOT_PEPPER: "🌶️",
  CUCUMBER: "🥒",
  BROCCOLI: "🥦",
  MUSHROOM: "🍄",
  PEANUTS: "🥜",
  CHESTNUT: "🌰",
  BREAD: "🍞",
  CROISSANT: "🥐",
  BAGUETTE: "🥖",
  PRETZEL: "🥨",
  BAGEL: "🥯",
  PANCAKES: "🥞",
  WAFFLE: "🧇",
  CHEESE: "🧀",
  MEAT: "🍖",
  POULTRY_LEG: "🍗",
  BACON: "🥓",
  HAMBURGER: "🍔",
  FRIES: "🍟",
  PIZZA: "🍕",
  HOTDOG: "🌭",
  SANDWICH: "🥪",
  TACO: "🌮",
  BURRITO: "🌯",
  TAMALE: "🫔",
  STUFFED_FLATBREAD: "🥙",
  FALAFEL: "🧆",
  EGG: "🥚",
  COOKING: "🍳",
  SHALLOW_PAN: "🥘",
  POT: "🍲",
  FONDUE: "🫕",
  BOWL: "🥣",
  GREEN_SALAD: "🥗",
  POPCORN: "🍿",
  BUTTER: "🧈",
  SALT: "🧂",
  CANNED_FOOD: "🥫",
  BENTO: "🍱",
  RICE_CRACKER: "🍘",
  RICE_BALL: "🍙",
  CURRY: "🍛",
  RAMEN: "🍜",
  SPAGHETTI: "🍝",
  SWEET_POTATO: "🍠",
  ODEN: "🍢",
  SUSHI: "🍣",
  FRIED_SHRIMP: "🍤",
  FISH_CAKE: "🍥",
  MOON_CAKE: "🥮",
  DANGO: "🍡",
  DUMPLING: "🥟",
  FORTUNE_COOKIE: "🥠",
  TAKEOUT_BOX: "🥡",
  CRAB_LOBSTER: "🦀",
  SHRIMP_SQUID: "🦐",
  OYSTER: "🦪",
  ICE_CREAM: "🍦",
  DOUGHNUT: "🍩",
  COOKIE: "🍪",
  BIRTHDAY: "🎂",
  SHORTCAKE: "🍰",
  CUPCAKE: "🧁",
  PIE: "🥧",
  CHOCOLATE_BAR: "🍫",
  CANDY: "🍬",
  LOLLIPOP: "🍭",
  CUSTARD: "🍮",
  HONEY_POT: "🍯",
  BABY_BOTTLE: "🍼",
  MILK: "🥛",
  HOT_BEVERAGE: "☕",
  TEA: "🍵",
  SAKE: "🍶",
  CHAMPAGNE: "🍾",
  WINE_GLASS: "🍷",
  COCKTAIL: "🍸",
  TROPICAL_DRINK: "🍹",
  BEER: "🍺",
  BEERS: "🍻",
  CLINKING_GLASSES: "🥂",
  TUMBLER: "🥃",
  CUP_STRAW: "🥤",
  BUBBLE_TEA: "🧋",
  BEVERAGE_BOX: "🧃",
  MATE: "🧉",
  ICE: "🧊",
  CHOPSTICKS: "🥢",
  FORK_KNIFE: "🍴",
  SPOON: "🥄",
  // * Activities
  SOCCER: "⚽",
  BASKETBALL: "🏀",
  FOOTBALL: "🏈",
  BASEBALL: "⚾",
  SOFTBALL: "🥎",
  TENNIS: "🎾",
  VOLLEYBALL: "🏐",
  RUGBY_FOOTBALL: "🏉",
};
