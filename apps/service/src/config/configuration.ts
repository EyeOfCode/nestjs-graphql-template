import { registerAs } from "@nestjs/config";

export default registerAs('app', () => ({
  PORT: parseInt(process.env.PORT, 10) | 3000,
  JWT_SECRET: process.env.JWT_SECRET,

  email: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SENDGRID_EMAIL: process.env.SENDGRID_EMAIL
  }
}));