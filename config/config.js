const getConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        // DB Configuration for  development
        SALT_ROUNDS: process.env.SALT_ROUNDS,
        NODE_PORT: process.env.NODE_PORT,
        JWT_SECRET: process.env.JWT_SECRET
      }

    case 'production':
      return {
        // DB Configuration for production
        SALT_ROUNDS: process.env.SALT_ROUNDS,
        NODE_PORT: process.env.NODE_PORT,
        JWT_SECRET: process.env.JWT_SECRET
      }

    default:
      return {
        // Local Development DB
        SALT_ROUNDS: 10,
        NODE_PORT: 8000,
        JWT_SECRET: 'ThisWillBeChangedWithConstant'
      }
  }
}

export default getConfig()
