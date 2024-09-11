import React from "react";
import { Route, Routes } from "react-router-dom";
import QuizInstruction from "../components/GeneralTest_components/Quiz/QuizInstruction";
import QuizHome from "../components/GeneralTest_components/QuizHome";
import Play from "../components/GeneralTest_components/Quiz/Play";

export default function GeneralTest_routes() {
  return (
    <Routes>
      <Route
        path="/general-test/quiz-instruction"
        element={<QuizInstruction />}
      />
      <Route path="/general-test/QuizHome" element={<QuizHome />} />
      <Route path="/general-test/play/quiz" element={<Play />} />
    </Routes>
  );
}
