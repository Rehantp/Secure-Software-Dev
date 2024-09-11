import React from "react";
import { Route, Routes } from "react-router-dom";
import ImageUploader from "../components/AdvancedTest_components/ImageUploader";

export default function AdvancedTest_routes() {
  return (
    <Routes>
      <Route path="/advanced-test/upload-image" element={<ImageUploader />} />
    </Routes>
  );
}
