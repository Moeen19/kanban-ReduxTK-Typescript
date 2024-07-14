import mongoose from "mongoose";
import bcrypt from "bcryptjs"

interface UserDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId
  name: string
  email: string
  password: string
  matchPassword(enteredPassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Check for password
userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model<UserDocument>("User", userSchema);