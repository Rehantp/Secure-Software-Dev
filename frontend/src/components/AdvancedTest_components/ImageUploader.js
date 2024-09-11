import React, { useState, useRef } from "react";
import {
  Upload,
  Button,
  Spin,
  message,
  Image,
  Modal,
  notification,
} from "antd";
import { UploadOutlined, CameraOutlined } from "@ant-design/icons";
import axios from "axios";
import Webcam from "react-webcam";
import "./ImageUploader.css";
import VideoBG from "../../assets/Backround_video.mp4";

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const webcamRef = useRef(null);

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const TIMEOUT_DURATION = 8000; // 8 seconds timeout

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        message.error("Please select a file first.");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await axios.post(
        "http://localhost:4000/api/advancedTest/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: TIMEOUT_DURATION,
        }
      );

      const formattedPredictions = response.data.predictions.map(
        (prediction) => {
          const probabilityPercentage = (prediction.probability * 100).toFixed(
            2
          );
          return `${prediction.tagName}: ${probabilityPercentage}%`;
        }
      );

      setPredictionResult(formattedPredictions.join("\n"));
      setDisableButtons(true);

      // Check if any prediction has a probability greater than 0.75
      const highProbabilityPrediction = response.data.predictions.find(
        (prediction) => prediction.probability > 0.75
      );

      if (highProbabilityPrediction) {
        if (highProbabilityPrediction.tagName === "Healthy Eyes") {
          // Display congratulations message with two buttons
          Modal.confirm({
            title: "Congratulations!",
            content: (
              <div>
                <p>You have healthy vision!</p>
              </div>
            ),
            okText: "Redo Test",
            cancelText: "OK",
            onOk: redoTest,
            onCancel: () => {},
          });
        } else {
          // Display a popup for other predictions with buttons "Re-Do Test" and "Find Clinics"
          Modal.confirm({
            title: `You have ${highProbabilityPrediction.tagName}`,
            content: (
              <div>
                <p>What would you like to do?</p>
              </div>
            ),
            okText: "Re-Do Test",
            cancelText: "Find Clinics",
            onOk: redoTest,
            onCancel: () => {
              window.location.href = "/clinicHome";
            },
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      if (axios.isCancel(error)) {
        message.error("Request timed out. Please refresh and try again.");
      } else {
        message.error("Network error. Please refresh and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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
          timeout: TIMEOUT_DURATION,
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
            description: "your Image approved - Upload the image to analyze!",
            duration: 5,
          });
          setIsApproved(true);
        } else {
          notification.info({
            message: `Sorry your image is ${highProbabilityPrediction.tagName}`,
            description: "Try again uploading a better image",
            duration: 5,
          });
          setIsApproved(false);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      if (axios.isCancel(error)) {
        message.error("Request timed out. Please refresh and try again.");
      } else {
        message.error("Network error. Please refresh and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const openCamera = () => {
    setCameraVisible(true);
  };

  const closeCamera = () => {
    setCameraVisible(false);
  };

  const takePicture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSelectedFile(dataURLtoFile(imageSrc, "snapshot.png"));
    closeCamera();
  };

  const redoTest = () => {
    window.location.reload();
  };

  const dataURLtoFile = (dataUrl, fileName) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  const renderImagePreview = () => {
    if (selectedFile) {
      return (
        <div className="image-preview">
          <Image src={URL.createObjectURL(selectedFile)} />
        </div>
      );
    }
    return (
      <div className="image-preview">
        <Image
          src="https://via.placeholder.com/150"
          alt="Default Image"
          width={150}
          height={150}
        />
      </div>
    );
  };

  return (
    <div>
      <video
        src={VideoBG}
        autoPlay
        loop
        muted
        style={{
          width: "100%",
          minHeight: "100%",
          objectFit: "cover",
          position: "fixed", // Fixed position to cover the entire viewport
          top: 0,
          left: 0,
          zIndex: -1,
        }}
        title="Background Video"
      />

      <div className="card">
        <h1>Azure Advanced Analysis</h1>
        <h2>Image Preview:</h2>
        {renderImagePreview()}
        <div style={{ marginTop: "20px" }}>
          <Button
            icon={<UploadOutlined />}
            onClick={openCamera}
            disabled={disableButtons}
          >
            Open Camera
          </Button>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Upload
            accept="image/*"
            customRequest={() => {}}
            showUploadList={false}
            onChange={(info) => {
              setSelectedFile(info.file.originFileObj);
              handleFileChange(info);
            }}
          >
            <Button icon={<UploadOutlined />} disabled={disableButtons}>
              Select Image
            </Button>
          </Upload>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            onClick={handleVerify}
            disabled={!selectedFile || disableButtons}
          >
            Verify the Image
          </Button>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={!selectedFile || disableButtons || !isApproved}
          >
            Upload the image to analyze
          </Button>
        </div>
        {loading && (
          <div style={{ marginTop: "20px" }}>
            <Spin tip="Processing..." />
          </div>
        )}
        {predictionResult && (
          <div>
            <h2>Predictions:</h2>
            <pre>{predictionResult}</pre>
          </div>
        )}
        {disableButtons && (
          <div style={{ marginTop: "20px" }}>
            <Button type="primary" onClick={redoTest}>
              Re-Do Test
            </Button>
          </div>
        )}
        <Modal
          title="Camera"
          visible={cameraVisible}
          onCancel={closeCamera}
          footer={[
            <Button key="back" onClick={closeCamera}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={takePicture}
              disabled={disableButtons}
            >
              Take Picture
            </Button>,
          ]}
          width={800}
          bodyStyle={{ height: 500 }}
        >
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            width={768}
            height={476}
          />
        </Modal>
      </div>
    </div>
  );
}

export default ImageUploader;
