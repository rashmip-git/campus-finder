require("dotenv").config();

const mongoose = require("mongoose");
const Item = require("./src/models/Item");

const checkItems = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const items = await Item.find({})
      .select("name category location date image status")
      .lean();

    console.log("\n===== Campus Finder Items =====\n");

    items.forEach((item, index) => {
      console.log(`Item ${index + 1}`);
      console.log("Status   :", item.status);
      console.log("Name     :", item.name);
      console.log("Category :", item.category);
      console.log("Location :", item.location);
      console.log("Date     :", item.date);
      console.log("Image    :", item.image);
      console.log("-----------------------------");
    });

  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await mongoose.connection.close();
  }
};

checkItems();