const mongoose = require('mongoose');

// Define a food donation schema
const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    foodType: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    contactDetails: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,  // automatically adds createdAt and updatedAt
  }
);

// Create a model based on the schema
const FoodModel = mongoose.model('FoodDonation', foodSchema);

module.exports = FoodModel;
