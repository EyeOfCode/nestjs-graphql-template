import { registerAs } from "@nestjs/config";

export default registerAs('app', () => ({
  PORT: parseInt(process.env.PORT, 10) | 3000,
  JWT_SECRET: process.env.JWT_SECRET
}));