import postgres from "postgres";
import { neon } from "@neondatabase/serverless";

const isRemotedB = true;

const sql = isRemotedB
  ? neon(process.env.POSTGRES_URL!)
  : postgres(process.env.LOCAL_POSTGRES_URL!, {
      // uncomment if using local database
      // ssl: process.env.NODE_ENV === "production" ? "require" : false
    });

export default sql;
