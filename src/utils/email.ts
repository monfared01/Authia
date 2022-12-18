import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
import { name } from './shared'

import config from '../authia.config.json'
import codeTypes from '../types/code.type'

dotenv.config()

export function enums(publicKey: string, privateKey: string, type: Number) {
  const obj = {
    from: `"${name()}" <${config.email.address}>`,
  }
  if (type == codeTypes.signup) {
    return {
      ...obj,
      subject: 'Authentication',
      html: `<div dir='rtl'><h3>${name()}</h3><h4>Authentication</h4>
          <p>code: ${privateKey}</p>
          </div>`,
    }
  } else if (type == codeTypes.recovery) {
    return {
      ...obj,
      subject: 'Password recovery',
      html: `<div dir='rtl'><h3>${name()}</h3><h4>Password recovery</h4>
        <p>code : ${privateKey}</p>
        </div>`,
    }
  } else if (type == codeTypes.mobile) {
    return {
      ...obj,
      subject: 'Change phone number',
      html: `<div dir='rtl'><h3>${name()}</h3><h4>Change phone number</h4>
        <p>code: ${privateKey}</p>
        </div>`,
    }
  } else if (type == codeTypes.email) {
    return {
      ...obj,
      subject: 'Change email',
      html: `<div dir='rtl'><h3>${name()}</h3><h4>Change phone email</h4>
          <p>code: ${privateKey}</p>
          </div>`,
    }
  } else return undefined
}

export function send(
  to: string,
  from: string,
  subject: string,
  html: string,
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      if (process.env.NODE_ENV !== 'development') {
        const transporter = nodemailer.createTransport({
          host: config.email.host,
          port: config.email.port,
          secure: config.email.secure,
          auth: {
            user: config.email.address,
            pass: process.env.EMAIL_PASSWORD,
          },
        })
        await transporter.sendMail({ from, to, subject, html })
      } else {
        console.log({ from, to, subject, html })
      }
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}
