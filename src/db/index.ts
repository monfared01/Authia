import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()
mongoose.connect(
  `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_Name}`,
  { useUnifiedTopology: true, useNewUrlParser: true },
)
mongoose.set('useCreateIndex', true)

export { mongoose }
