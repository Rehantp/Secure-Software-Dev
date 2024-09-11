// AdvancedTest_controller.js
const axios = require("axios");

// Azure Custom Vision API Endpoint and Prediction Key
const predictionEndpoint = process.env.SIGHT_PREDICTION_ENDPOINT;
const predictionKey = process.env.SIGHT_PREDICTION_KEY;

// Controller function to upload and analyze the image
const uploadImage = async (req, res) => {
  try {
    // Send the image to the Azure Custom Vision API
    const response = await axios.post(predictionEndpoint, req.file.buffer, {
      headers: {
        "Prediction-Key": predictionKey,
        "Content-Type": "application/octet-stream",
      },
    });

    // Send the API response to the frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the image." });
  }
};

module.exports = {
  uploadImage,
};
