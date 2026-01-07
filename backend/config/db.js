import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    await mongoose.connect('mongodb+srv://savagelondi123:90886871@cluster0.bzjpn.mongodb.net/food-del');
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Failed:", error);
  }
};
