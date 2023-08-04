import { Colors, EmbedBuilder } from "discord.js";
import { Symbols } from "../../../Utils/constants";
import { config_DISCORDBOT, config_MISC } from "../../../../config";
import { pluralize } from "../../../Utils/pluralize";

export const YouAreOnCooldownEmbed = () => {
  const cooldownTimeSecs = config_DISCORDBOT.cooldown.seconds;

  const embed = new EmbedBuilder()
    .setTitle(`${Symbols.WARNING} You are on cooldown!`)
    .setDescription(
      `Please wait ${cooldownTimeSecs} more ${pluralize(
        "second",
        cooldownTimeSecs,
      )} before using this command again.`,
    )
    .setColor(Colors.Red)
    .setTimestamp()
    .setFooter({
      text: `This message will self destruct when you click "Dismiss Message"...`,
    });

  return embed;
};

export const CriticalBugEmbed = () => {
  const embed = new EmbedBuilder()
    .setTitle(`${Symbols.ERROR} Critical Bug ${Symbols.BUG}`)
    .setDescription(
      `A critical bug has been found in the bot. Please report it [here](${config_MISC.url.github.issues}).`,
    )
    .setColor(Colors.Red);

  return embed;
};
