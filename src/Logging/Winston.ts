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

  const fileErrGlobal = new File({
    filename: `${logPath}/error.log`,
    level: "error",
    format: globalFormat,
  });

  const fileInfoGlobal = new File({
    filename: `${logPath}/info.log`,
    level: "info",
    format: globalFormat,
  });

  const fileCombinedGlobal = new File({
    filename: `${logPath}/combined.log`,
    format: globalFormat,
  });

  // if in production
  if (getEnv("PROD") === "true") {
    logger = createLogger({
      transports: [
        consoleProd,
        discordTransportProd,
        fileErrGlobal,
        fileInfoGlobal,
        fileCombinedGlobal,
      ],
    });
  }
  // if in development
  else {
    logger = createLogger({
      transports: [
        consoleDev,
        // discordTransportDev,
        fileErrGlobal,
        fileInfoGlobal,
        fileCombinedGlobal,
      ],
    });
  }
})();

export { logger };
