// controllers/foodController.js

const FoodModel = require('../models/foodModel');

// Controller to handle storing food donation data (submit form data)
const submitFoodDonation = async (req, res) => {
  const { name, address, foodType, quantity, contactDetails } = req.body;

  try {
    // Validate input
    if (!name || !address || !foodType || !quantity || !contactDetails) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new food donation entry
    const newFoodDonation = new FoodModel({
      name,
      address,
      foodType,
      quantity,
      contactDetails,
    });

    // Save to the database
    await newFoodDonation.save();

    // Send back success response
    res.status(201).json({
      message: 'Food donation submitted successfully!',
      data: newFoodDonation,
    });
  } catch (error) {
    console.error('Error in submitting food donation:', error);
    res.status(500).json({ message: 'Error submitting donation', error: error.message });
  }
};

// Controller to return a list of all food donations stored in the database
const getAllFoodDonations = async (req, res) => {
  try {
    // Fetch all food donation records from the database
    const foodDonations = await FoodModel.find();

    // Check if no donations are found
    if (foodDonations.length === 0) {
      return res.status(404).json({ message: 'No food donations found' });
    }

    // Return the list of all food donations
    res.status(200).json({
      message: 'Food donations fetched successfully',
      data: foodDonations,
    });
  } catch (error) {
    console.error('Error fetching food donations:', error);
    res.status(500).json({ message: 'Error fetching donations', error: error.message });
  }
};

module.exports = {
  submitFoodDonation,
  getAllFoodDonations,
};
