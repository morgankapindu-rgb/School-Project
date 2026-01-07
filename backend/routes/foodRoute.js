// routes/foodRoute.js
import express from "express";
import { addFood, listFood, deleteFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image storage engine (multer setup)
const storage = multer.diskStorage({
  destination: "uploads",  // Directory for uploaded images
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);  // Custom filename
  }
});

const upload = multer({ storage });

// Define the route for adding food
foodRouter.post("/add", upload.single("image"), addFood);

// Define the route for listing food items
foodRouter.get("/list", listFood);

// Define the route for deleting food items by ID
foodRouter.delete("/delete/:id", deleteFood);

export default foodRouter;
