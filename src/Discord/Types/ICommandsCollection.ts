import { Collection } from "discord.js";
import SlashCommand from "../Structures/Command";

export default interface ICommandsCollection
  extends Collection<string, SlashCommand> {}
