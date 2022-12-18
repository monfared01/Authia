import { mongoose } from '../db'
import bcrypt from 'bcrypt'
import { validateEmail, validatePhone } from '../utils/validator'

export interface IUser extends mongoose.Document {
  name: string
  email: string
  date: Date
  password: string
  mobile: string
}

const Schema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    trim: true,
    sparse: true
  },
  mobile: {
    type: String,
    unique: true,
    validate: [validatePhone, 'Please fill a valid phone number'],
    sparse: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  existDate: {
    type: Date,
    default: Date.now,
    required: true
  }
})

Schema.pre<IUser>('save', function (next: mongoose.HookNextFunction) {
  if (this.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        next(err)
      } else {
        bcrypt.hash(this.password, salt, (err, hash) => {
          if (err) {
            next(err)
          } else {
            this.password = hash
            next()
          }
        })
      }
    })
  } else {
    next()
  }
})

const User = mongoose.model<IUser>('user', Schema)

export { User }
