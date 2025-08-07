import * as Joi from 'joi';

export const validate = Joi.object({
  // PostgreSQL
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),

  // MongoDB
  MONGO_URI: Joi.string().required(),
  MONGO_USER: Joi.string().optional(),
  MONGO_PASSWORD: Joi.string().optional(),
  MONGO_DB: Joi.string().optional(),

  // Redis
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().default(6379),

  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().default('1d'),

  // App
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  // Optional CORS origin
  CORS_ORIGIN: Joi.string().optional(),
}).unknown(); // 👈 This line fixes the issue
