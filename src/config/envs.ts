import 'dotenv/config';
import { get } from 'env-var';

const envs = {
  PORT: get('PORT').required().asPortNumber(),
  PROD: get('PROD').required().asBool(),
  MONGO_URL: get('MONGODB_URI').required().asString(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
  JWT_SECRET: get('JWT_SECRET').required().asString(),
};

export default envs;
