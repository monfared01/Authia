import { mongoose } from '../db'
import jwt from 'jsonwebtoken'
import geoip from 'geoip-lite'

import * as dotenv from 'dotenv'
dotenv.config()

interface ISession extends mongoose.Document {
  userId: mongoose.Types.ObjectId
  token: string
  date: Date
  country: string
  city: string
  os: string
  platform: string
  ip: string
}
interface ISessionModel extends mongoose.Model<ISession> {
  initial: (
    userId: mongoose.Types.ObjectId,
    ip: string,
    platform: string,
    os: string
  ) => Promise<string>
}

const Schema = new mongoose.Schema<ISession>({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    require: true,
    unique: true
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  ip: {
    type: String,
    require: true
  },
  platform: {
    type: String,
  },
  os: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
})

Schema.statics.initial = function (userId: mongoose.Types.ObjectId, ip: string, platform: string, os: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const geo = geoip.lookup(ip)
      let city = undefined
      let country = undefined
      if (geo != null) {
        country = geo.country
        city = geo.city
      }
      const token = jwt
        .sign(
          {
            data: userId
          },
          process.env.JWT_PIN as string
        )
        .toString()
      const _s = new Session({
        userId,
        token,
        platform,
        os,
        ip,
        city,
        country
      })
      await _s.save()
      resolve(token)
    } catch (e) {
      reject(e)
    }
  })
}

const Session = mongoose.model<ISession, ISessionModel>('session', Schema)

export { Session }
