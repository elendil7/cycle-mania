import { Interaction } from "discord.js";
import DiscordBot from "../Structures/DiscordBot";
import getEnv from "../../Utils/getEnv";
import { config_DISCORDBOT } from "../../../config";

export function IsUserBeingCooledDown(
  client: DiscordBot,
  interaction: Interaction,
): boolean {
  // if owner, return false
  if (interaction.user.id === getEnv("DISCORD_BOT_OWNER_ID")) return false;

  // if user is admin, return false
  if (
    interaction.memberPermissions &&
    interaction.memberPermissions.has("Administrator")
  )
    return false;

  // get userID
  let userID = interaction.user.id;

  // if user is not in cooldowns list
  if (!client.cooldowns.has(userID)) {
    // set user's cooldown to cooldown specified in config
    client.cooldowns.set(
      userID,
      Date.now() + config_DISCORDBOT.cooldown.milliseconds,
    );

    // return false (user is not being cooled down)
    return false;
  }
  // if user is in cooldowns list
  else {
    // get user's cooldown
    let userCooldown = client.cooldowns.get(userID);

    // edge case check
    if (!userCooldown) return false;

    // if user's cooldown is over
    if (userCooldown < Date.now()) {
      // set user's cooldown to cooldown specified in config
      client.cooldowns.set(
        userID,
        Date.now() + config_DISCORDBOT.cooldown.milliseconds,
      );

      // return false
      return false;
    }
  }

  // if failed all checks (user's cooldown is not over),
  // - reset user's cooldown to cooldown specified in config, out of caution
  // - return true (user is being cooled down)
  client.cooldowns.set(
    userID,
    Date.now() + config_DISCORDBOT.cooldown.milliseconds,
  );
  return true;
}
