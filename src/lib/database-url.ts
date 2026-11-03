type DatabaseEnvironment = {
  PAYLOAD_DATABASE_URL?: string;
  DATABASE_URL?: string;
  NODE_ENV?: string;
};

export function resolvePayloadDatabaseURL(environment: DatabaseEnvironment): string {
  if (environment.PAYLOAD_DATABASE_URL) return environment.PAYLOAD_DATABASE_URL;
  if (environment.DATABASE_URL?.startsWith("mysql:")) return "file:./public/assets/daisa.sqlite";
  if (environment.DATABASE_URL) return environment.DATABASE_URL;
  return environment.NODE_ENV === "production"
    ? "file:./public/assets/daisa.sqlite"
    : "file:./.daisa-data/development.db";
}