import { Collection } from "discord.js";
import Command from "../Structures/Command";

export default interface ICommandsCollection
  extends Collection<string, Command> {}
