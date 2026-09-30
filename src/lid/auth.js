import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const dbUrl = process.env.BETTER_AUTH_DB_URL?.trim();
const baseURL = process.env.BETTER_AUTH_URL?.trim();
const secret = process.env.BETTER_AUTH_SECRET?.trim();

if (!dbUrl) {
  throw new Error("Missing BETTER_AUTH_DB_URL environment variable.");
}

if (!secret) {
  throw new Error("Missing BETTER_AUTH_SECRET environment variable.");
}

const client = new MongoClient(dbUrl);
const db = client.db(process.env.BETTER_AUTH_DB_NAME?.trim() || "better-auth");

export const auth = betterAuth({
  secret,
  baseURL,
  trustedOrigins: baseURL ? [baseURL] : ["http://localhost:3000"],
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
});