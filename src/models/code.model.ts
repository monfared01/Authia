import randomstring from 'randomstring'
import * as dotenv from 'dotenv'

import { mongoose } from '../db'
import * as emailUtil from '../utils/email'
import * as smsUtil from '../utils/sms'
import { validateEmail, validatePhone } from '../utils/validator'

dotenv.config()

interface ICode extends mongoose.Document {
  userId: mongoose.Types.ObjectId
  mobile: string
  email: string
  date: Date
  publicKey: string
  privateKey: string
  type: Number
  sendViaEmail: () => Promise<Object>
  sendViaSMS: () => Promise<Object>
  isValid: () => Promise<Boolean>
}

interface ICodeModel extends mongoose.Model<ICode> {
  initial: (
    userId: any,
    mobile: any,
    email: any,
    type: Number,
  ) => Promise<ICode>
}

const Schema = new mongoose.Schema<ICode>({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  email: {
    type: String,
    trim: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    sparse: true
  },
  mobile: {
    type: String,
    trim: true,
    validate: [validatePhone, 'Please fill a valid phone number'],
    sparse: true
  },
  publicKey: {
    type: String,
    required: true,
    unique: true,
    minlength: 20,
    trim: true,
  },
  privateKey: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
  },
})

Schema.statics.initial = function (
  userId: any,
  mobile: any,
  email: any,
  type: Number,
) {
  return new Promise(async (resolve, reject) => {
    try {
      let publicKey: string
      let privateKey: string
      do {
        privateKey = randomstring.generate({
          length: 5,
          charset: '0123456789',
        })
        publicKey = randomstring.generate(50)
      } while (await Code.exists({ publicKey }))
      const _code = new Code({
        userId,
        mobile,
        email,
        type,
        publicKey,
        privateKey,
      })
      await _code.save()
      resolve(_code)
    } catch (e) {
      reject(e)
    }
  })
}

Schema.methods.sendViaEmail = function () {
  return new Promise<Object>(async (resolve, reject) => {
    try {
      const _type = emailUtil.enums(this.publicKey, this.privateKey, this.type)
      if (_type !== undefined) {
        emailUtil.send(this.email, _type.from, _type.subject, _type.html)
        resolve({
          ...(process.env.NODE_ENV === 'development') && { privateKey: this.privateKey },
          publicKey: this.publicKey,
        })
      } else {
        reject()
      }
    } catch (e) {
      reject(e)
    }
  })
}

Schema.methods.sendViaSMS = function () {
  return new Promise<Object>((resolve, reject) => {
    try {
      smsUtil.send(this.mobile, this.privateKey)
      resolve({
        ...(process.env.NODE_ENV === 'development') && { privateKey: this.privateKey },
        publicKey: this.publicKey,
      })
    } catch (e) {
      reject(e)
    }
  })
}

Schema.pre<ICode>('save', function (next: mongoose.HookNextFunction) {
  if (!this.email && !this.mobile)
    next(new mongoose.Error('email & mobile can not be null'))
  else next()
})

const Code = mongoose.model<ICode, ICodeModel>('code', Schema)

export { Code }
