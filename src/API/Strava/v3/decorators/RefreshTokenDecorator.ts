import refreshToken from "../services/RefreshToken";

// export a decorator that wraps around StravaService methods, to always call refreshToken() before the method (e.g., getActivities()). This will ensure that the access token is always valid before making a request to the Strava API.
export default function RefreshTokenDecorator(
  target: Function,
  context: ClassMethodDecoratorContext,
): any {
  if (context.kind === "method") {
    // wrap the original method with a new method, which calls refreshToken() before the original method
    return async function (this: any, ...args: any[]) {
      // Call the RefreshToken function before the original method
      const status = await refreshToken(1);

      // if the status is 200, call the original method e.g., getActivities(), getAthlete(), etc.)
      if (status === 200) return await target.apply(this, args);
    };
  }
}
