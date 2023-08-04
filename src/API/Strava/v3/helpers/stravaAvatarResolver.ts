export const stravaAvatarResolver = (profile: string) => {
  // if the profile is the generic club image, return the default club image, otherwise return the proper profile image (already a URL)
  return profile.includes("avatar/club")
    ? "https://d3nn82uaxijpm6.cloudfront.net/assets/avatar/club/large-4eeaf75f16a28b11d6627f2b1d82afb42196fbf2f6d781842e2a4926c8ccbd71.png"
    : profile;
};
