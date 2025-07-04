import dotenv from "dotenv";
import path from "path";

const envPath = path.join(process.cwd(), ".env");

dotenv.config({ path: envPath });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  saltrounds: process.env.BCRYPT_SALTROUNDS,
  jwt_expires_in: process.env.JWT_EXPIRES_IN,
  jwt_secrets: process.env.JWT_SECRETS,
};
