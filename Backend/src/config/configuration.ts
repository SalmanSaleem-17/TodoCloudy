export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  database: {
    postgres: {
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    mongo: {
      uri: process.env.MONGO_URI,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION || '1d',
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
});