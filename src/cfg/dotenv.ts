import * as dotenv from 'dotenv'

// Import dotenv configs. This populates process.env with default values for local development
const nodeEnv = process.env.NODE_ENV || 'development'
dotenv.config({
  path: `cfg/defaults/${nodeEnv}.env`,
})
