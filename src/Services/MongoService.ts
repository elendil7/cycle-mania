import { connect, connection, deleteModel, disconnect } from "mongoose";
import getEnv from "../Utils/getEnv";
import { Symbols } from "../Utils/constants";
import { logger } from "../Logging/Winston";

export default class MongoService {
  private readonly dbname: string;
  private readonly uri: string;

  constructor() {
    this.dbname = getEnv("MONGO_DB_NAME");
    this.uri = `mongodb+srv://${getEnv("MONGO_USERNAME")}:${getEnv(
      "MONGO_PASSWORD",
    )}@cluster0.qiwebok.mongodb.net/${this.dbname}`;
  }

  public async init() {
    logger.info(`${Symbols.HOURGLASS} Connecting to MongoDB..`);
    await this.connect();
    logger.info(
      `${Symbols.SUCCESS} Connected to MongoDB. [DB name: ${this.dbname}]`,
    );
  }

  public async connect() {
    return connect(this.uri, {
      writeConcern: {
        w: "majority",
      },
      retryWrites: true,
    });
  }

  public async disconnect() {
    return disconnect();
  }

  public async isConnected() {
    return connection.readyState === 1;
  }
}
