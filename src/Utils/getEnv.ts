export default function getEnv(key: string) {
  const env = process.env[key];
  if (env) return env;
  else throw new Error(`No such environmental variable "${key}" exists`);
}
