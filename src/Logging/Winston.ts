import { createLogger, format, Logger } from "winston";
import DiscordTransport from "winston-discord-transport";
import getEnv from "../Utils/getEnv";
import { Console, File } from "winston/lib/winston/transports";
import { config_MISC } from "../../config";

let logger: Logger;

(() => {
  // some variables
  const logPath = config_MISC.path.logs.winston;
  const webhook = getEnv("DISCORD_WEBHOOK_LOG");

  // * Dev vs Prod transports defined here (to be used in createLogger)

  // ! PROD
  const discordTransportProd = new DiscordTransport({
    webhook: webhook,
    defaultMeta: { service: "stack: WARN, ERR" },
    level: "warn",
  });

  const consoleProd = new Console({
    level: "info",
    format: format.combine(
      format.timestamp(),
      format.printf(
        (info) =>
          `[${info.level}] ${info.timestamp} | ${info.message} ${
            info.stack ? `\n${info.stack}` : ""
          }`,
      ),
    ),
  });

  // ! DEV
  const discordTransportDev = new DiscordTransport({
    webhook: webhook,
    defaultMeta: { service: "stack: INFO, WARN, ERR" },
    level: "info",
  });

  const consoleDev = new Console({
    level: "info",
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(
        (info) =>
          `[${info.level}] ${info.timestamp} | ${info.message} ${
            info.stack ? `\n${info.stack}` : ""
          }`,
      ),
    ),
  });

  // ! Global format
  const globalFormat = format.combine(
    format.timestamp(),
    format.printf(
      (info) =>
        `[${info.level}] ${info.timestamp} | ${info.message} ${
          info.stack ? `\n${info.stack}` : ""
        }`,
    ),
  );

  // combined log for level info and higher
  const fileCombinedGlobal = new File({
    level: "info",
    filename: `${logPath}/[0]_[🔀📃]_combined.log`,
    format: globalFormat,
  });

  const fileErrGlobal = new File({
    filename: `${logPath}/[1]_[❗️🚫]_error.log`,
    level: "error",
    format: globalFormat,
  });

  const fileWarnGlobal = new File({
    filename: `${logPath}/[2]_[⚠️🔶]_warn.log`,
    level: "warn",
    format: globalFormat,
  });

  const fileInfoGlobal = new File({
    filename: `${logPath}/[3]_[ℹ️📋]_info.log`,
    level: "info",
    format: globalFormat,
  });

  const fileDebugGlobal = new File({
    filename: `${logPath}/[4]_[🐞🔍]_debug.log`,
    level: "debug",
    format: globalFormat,
  });

  const fileSillyGlobal = new File({
    filename: `${logPath}/[5]_[🤪🎉]_silly.log`,
    level: "silly",
    format: globalFormat,
  });

  // if in production
  if (getEnv("PROD") === "true") {
    logger = createLogger({
      transports: [
        consoleProd,
        discordTransportProd,
        fileCombinedGlobal,
        fileErrGlobal,
        fileWarnGlobal,
        fileInfoGlobal,
      ],
    });
  }
  // if in development
  else {
    logger = createLogger({
      transports: [
        consoleDev,
        // discordTransportDev,
        fileCombinedGlobal,
        fileErrGlobal,
        fileWarnGlobal,
        fileInfoGlobal,
        fileDebugGlobal,
        fileSillyGlobal,
      ],
    });
  }
})();

export { logger };
