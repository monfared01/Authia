const Kavenegar = require('kavenegar')
import { name } from './shared'
import config from '../authia.config.json'
import * as dotenv from 'dotenv'

dotenv.config()

export function send(receptor: string, privateKey: string) {
  if (process.env.NODE_ENV !== 'development') {
    var api = Kavenegar.KavenegarApi({
      apikey: process.env.SMS_KEY,
    })
    api.Send({
      message: `${name()}\ncode : ${privateKey}`,
      sender: config.SMS.sender,
      receptor,
    })
  } else {
    console.log(`code : ${privateKey}`)
  }

}
