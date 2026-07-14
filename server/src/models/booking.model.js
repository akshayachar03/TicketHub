import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },

    bookingDate: {
      type: String,
      required: true,
    },

    showTime: {
      type: String,
      required: true,
    },

    seats: [
      {
        type: String,
        required: true,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    bookingStatus: {
      type: String,
      enum: ["CONFIRMED", "CANCELLED"],
      default: "CONFIRMED",
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS"],
      default: "SUCCESS",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Booking", bookingSchema);