export function formatSecondsToHHMM(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const hoursString = hours.toString().padStart(2, "0");
  const minutesString = minutes.toString().padStart(2, "0");

  return `${hoursString}h${minutesString}m`;
}

export function getStartOfWeekFromOffset(offset: number): string {
  const today = new Date();
  const startOfWeek = new Date(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate() - today.getUTCDay() - offset * 7,
  );

  // Get date in format: 5th July 2021
  const formattedDate = startOfWeek.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formattedDate;
}

export function getUnixTimestamp() {
  return Math.floor(Date.now() / 1000);
}
