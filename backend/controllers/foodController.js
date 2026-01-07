// controllers/foodController.js
import foodModel from "../models/foodModel.js";

// Add food item (existing code)
export const addFood = async (req, res) => {
  const image_filename = req.file.filename;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename
  });

  try {
    await food.save();
    res.status(201).json({ success: true, message: "Food added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add food" });
  }
};

// List all food items (existing code)
export const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find();
    res.status(200).json({ success: true, foods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to retrieve foods" });
  }
};

// Delete a food item by ID
export const deleteFood = async (req, res) => {
  const { id } = req.params; // Get the food ID from the URL

  try {
    const food = await foodModel.findByIdAndDelete(id); // Delete the food item by ID

    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    res.status(200).json({ success: true, message: "Food item deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete food item" });
  }
};
