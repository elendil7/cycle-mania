import { Collection } from "discord.js";

export default interface ICommandCategoriesCollection
  extends Collection<string, string[]> {}
