import express, { Application } from 'express'
import cors from 'cors'
import useragent from 'express-useragent'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

import accountRouter from './routes/account.route'
import sessionRouter from './routes/session.route'
import verificationRouter from './routes/verification.route'
import userRouter from './routes/user.route'

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

const datetime = new Date()

const requestLogger = fs.createWriteStream(
  path.join(
    process.env.LOG_PATH as string,
    `${datetime.toISOString().slice(0, 10)}.log`
  )
)

dotenv.config()
const app: Application = express()

app.use(morgan("combined", { stream: requestLogger }))
app.use(express.json())
app.use(useragent.express())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))

app.use('/', accountRouter)
app.use('/verification', verificationRouter)
app.use('/session', sessionRouter)
app.use('/user', userRouter)

try {
  app.listen(process.env.PORT, (): void => {
    console.log(`Connected successfully on port ${process.env.PORT}`)
  })
} catch (e) {
  console.log(e)
}
