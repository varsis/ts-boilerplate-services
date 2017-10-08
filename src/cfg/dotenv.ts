import * as dotenv from 'dotenv'
import * as path from 'path'

// Import dotenv configs. This populates process.env with default values for local development
const nodeEnv = process.env.NODE_ENV || 'development'
dotenv.config({
  path: path.join(__dirname, `defaults/${nodeEnv}.env`),
})
