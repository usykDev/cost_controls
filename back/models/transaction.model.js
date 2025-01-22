import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ["cahs", "card"],
    required: true,
  },
  category: {
    type: String,
    enum: ["saving", "expense", "investment"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    default: "Unknown",
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Transaction", TransactionSchema);

// for postgreSQL
// CREATE TABLE transactions (
//     id SERIAL PRIMARY KEY,  -- Auto-increment primary key
//     user_id INT REFERENCES users(id) ON DELETE CASCADE,  -- Foreign key referencing the users table
//     description VARCHAR(255) NOT NULL,  -- Required field for the description
//     payment_type VARCHAR(20) CHECK (payment_type IN ('cash', 'card')) NOT NULL,  -- Enum for payment type
//     category VARCHAR(20) CHECK (category IN ('saving', 'expense', 'investment')) NOT NULL,  -- Enum for category
//     amount DECIMAL(10, 2) NOT NULL,  -- Required field for the amount
//     location VARCHAR(255) DEFAULT 'Unknown',  -- Optional, defaults to 'Unknown'
//     date TIMESTAMPTZ NOT NULL,  -- Required field for the date of the transaction
//     created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,  -- Timestamp for record creation
//     updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP  -- Timestamp for record updates
//   );
