import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Provide a username"],
    unique: true,
  },
  number: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please Provide an email"],
    unique: true,
  },
  password: {
    type: String,
    
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,

  profilepic_id: {
    type: String,
    default: "",
  },
  profile_link: {
    type: String,
    default: "",
  },

  // Fields for OAuth users
  provider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local',
  },
  googleId: {
    type: String,
    // Only used for OAuth users
  },
  favdocuments: [
    {
      imgurl: { type: String, required: true },
      name: { type: String, required: true },
      size: { type: String, required: true },
      type: { type: String, required: true }
    }
  ]
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
