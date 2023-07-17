import { Client, Collection, Events } from "discord.js";
import { config_DISCORDBOT } from "../../../config";
import { resolve } from "path";
import { readdirSync } from "fs";
import { DISCORD_BOT_TOKEN } from "../Utils/exportedEnvs";
import SlashCommand from "./Command";
import registerSlashCommands from "../Utils/registerSlashCommands";
import IEventsCollection from "../Types/IEventsCollection";
import ICommandCategoriesCollection from "../Types/ICommandCategoriesCollection";
import ICommandsCollection from "../Types/ICommandsCollection";

export default class DiscordBot extends Client {
  private config: any;
  private events: IEventsCollection;
  private commandCategories: ICommandCategoriesCollection;
  private commands: ICommandsCollection;

  constructor(args: any) {
    super(args);
    this.config = config_DISCORDBOT;
    this.events = new Collection<string, Events>();
    this.commandCategories = new Collection<string, string[]>();
    this.commands = new Collection<string, SlashCommand>();
  }

  // getters
  public getConfig(): any {
    return this.config;
  }

  public getEvents(): Collection<string, Events> {
    return this.events;
  }

  public getCommandCategories(): Collection<string, string[]> {
    return this.commandCategories;
  }

  public getCommands(): Collection<string, SlashCommand> {
    return this.commands;
  }

  public getCommand(commandName: string): SlashCommand | undefined {
    return this.commands.get(commandName);
  }

  public async start() {
    try {
      // login to Discord using bot token
      await super.login(DISCORD_BOT_TOKEN);
      console.log("Logged in to Discord.");
    } catch (e) {
      console.log(e);
    }
  }

  // setters
  public setCommand(commandName: string, command: SlashCommand): void {
    this.commands.set(commandName, command);
  }

  // removers
  public removeCommand(commandName: string): void {
    this.commands.delete(commandName);
  }

  // methods
  public async loadCommands(): Promise<void> {
    try {
      // get Command folder path
      const commandCategoriesPath = resolve(__dirname, "..", "Commands");

      // nab the command category names from the Commands folder
      const commandCategoryNames = readdirSync(commandCategoriesPath, "utf-8");

      // loop through command category names
      for (let i = 0; i < commandCategoryNames.length; ++i) {
        // get the current command category name
        const commandCategoryName = commandCategoryNames[i];

        // add the command category to the collection of command categories, to be accessed anytime
        this.commandCategories.set(commandCategoryName, []);

        // read the command folder names inside the current command category
        const commandFolderNames = readdirSync(
          resolve(commandCategoriesPath, commandCategoryName),
          "utf-8",
        );

        // array for storing all command names, before entering next nested for loop
        const commandNames: string[] = [];

        // loop through command folder names
        for (let j = 0; j < commandFolderNames.length; ++j) {
          // get the current command folder name
          const commandFolderName = commandFolderNames[j];

          // add the command name to the string[] array of the Collection<string, string[] of command categories
          commandNames.push(commandFolderName.toLowerCase());

          // read the single command file name inside that folder
          let commandName: string = readdirSync(
            resolve(
              commandCategoriesPath,
              commandCategoryName,
              commandFolderName,
            ),
            "utf-8",
          ).filter((file) => file === `${commandFolderName}.ts`)[0];

          // if no file at that path, skip to next iteration
          if (!commandName) continue;

          commandName = commandName.split(".ts")[0];

          // import the command file
          let command = (
            await import(
              `../Commands/${commandCategoryName}/${commandFolderName}/${commandName}`
            )
          ).default;

          command.info = {
            commandName: commandName,
            commandCategory: commandCategoryName,
          };

          command.info.commandName = commandName;
          command.info.commandCategory = commandCategoryName;

          // add the command to the collection of commands, to be accessed anytime
          this.commands.set(commandName.toLowerCase(), command);
        }

        // add the command names to the collection of command categories
        this.commandCategories.set(commandCategoryName, commandNames);
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async registerCommands(): Promise<void> {
    try {
      // log all commands
      // console.log(this.commands);

      await registerSlashCommands(this.commands);
    } catch (e) {
      console.log(e);
    }
  }

  public async loadEvents() {
    try {
      const path = resolve(__dirname, "..", "Events");

      // get all file names of events
      const eventNames = readdirSync(path, "utf-8")
        .filter((file) => file.endsWith(".ts"))
        .map((file) => file.split(".ts")[0]);

      // if event file names were fetched
      if (eventNames) {
        // loop through event file names
        for (let i = 0; i < eventNames.length; ++i) {
          // get event name
          const eventName = eventNames[i];
          const curEvent = (await import(`../Events/${eventName}`)).default;
          if (curEvent.once) {
            // if even only requires to be triggered once
            this.once(curEvent.name, (...args) => curEvent.run(this, ...args));
          } else {
            // otherwise expect event to be triggered multiple times
            this.on(curEvent.name, (...args) => curEvent.run(this, ...args));
          }
          // add the event object to the collection of events, to be accessed anytime
          this.events.set(eventName, curEvent);
        }
        // log all events
        // console.log(this.events);

        console.log("Events loaded.");
      } else {
        // if no events were fetched, send error message
        console.log("No events found.");
      }
    } catch (e) {
      console.log(e);
    }
  }
}
