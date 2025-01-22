import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

// for postgreSQL
// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,  -- Auto-increment primary key
//     username VARCHAR(255) NOT NULL,  -- Required field
//     name VARCHAR(255) NOT NULL,  -- Required field
//     password VARCHAR(255) NOT NULL,  -- Required field
//     avatar VARCHAR(255) DEFAULT '',  -- Optional, defaults to empty string
//     gender VARCHAR(6) CHECK (gender IN ('male', 'female')) NOT NULL,  -- Enum for gender
//     created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,  -- Timestamp for record creation
//     updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP  -- Timestamp for record updates
//   );
