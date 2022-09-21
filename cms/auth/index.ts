import { createAuth } from "@keystone-6/auth";
import { statelessSessions } from "@keystone-6/core/session";
import dotenv from "dotenv";

dotenv.config();

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  sessionData: "name",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
  },
});

let sessionSecret = process.env.DEV_SESSION ?? "";
let sessionMaxAge = 60 * 60 * 24 * 14;

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
});

export { withAuth, session };
