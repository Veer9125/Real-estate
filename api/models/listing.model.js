import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      default: [
        "https://www.pexels.com/photo/brown-and-gray-painted-house-in-front-of-road-1396122/",
        "https://www.pexels.com/photo/a-house-with-a-garage-and-driveway-in-front-of-it-27277237/",
        "https://images.pexels.com/photos/14509975/pexels-photo-14509975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://www.pexels.com/photo/cars-parked-on-the-driveway-16505287/",
      ],
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
