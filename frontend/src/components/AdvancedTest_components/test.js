import { notification } from "antd";

const handleVerify = async () => {
  try {
    if (!selectedFile) {
      message.error("Please select a file first.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", selectedFile);

    const response = await axios.post(
      "http://localhost:4000/api/advancedTest/ImageQuality",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Check if any prediction has a probability greater than 0.75
    const highProbabilityPrediction = response.data.predictions.find(
      (prediction) => prediction.probability > 0.7
    );

    if (highProbabilityPrediction) {
      if (highProbabilityPrediction.tagName === "Approved") {
        // Display congratulations message with two buttons
        notification.success({
          message: "Congratulations!",
          description: "Image approved",
          duration: null, // Set duration to null for it to stay visible until closed manually
        });
      } else {
        notification.info({
          message: `your image is ${highProbabilityPrediction.tagName}`,
          description: "What would you like to do?",
          duration: null, // Set duration to null for it to stay visible until closed manually
        });
        setDisableButtons(true);
      }
    }
  } catch (error) {
    console.error("Error:", error);
    message.error("An error occurred while processing the image.");
  } finally {
    setLoading(false);
  }
};
