import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import Quizmage from "../../../assets/GeneralTest_assets/img/Question.png";
import QuestionAnswer from "../../../assets/GeneralTest_assets/img/QuestionAns.png";
//import "../../../../node_modules/materialize-css/dist/css/materialize.min.css";


const QuizInstruction = () => (
  <>
    <h1>Quiz Instructions</h1>
    <Fragment>
      <Helmet>Quiz Instruction-Eye Quiz</Helmet>
      <div className="instructions-container">
        <h2>How Test Your Eyes</h2>
        <p>Ensure you read this guide from start to finish.</p>
        <ul className="browser-default" id="main-list">
          <li>
            Place your device on a stable surface, such as a table or desk
          </li>
          <b>
            <li>Keep 1m distance from your device</li>
          </b>
          <li>
            Once your device is positioned correctly and you are comfortable,
            follow the on-screen instructions to begin the eye test.
          </li>
          <li>
            Quiz mainly focuses on the color
            <b> blindness ,Astimagtism ,cataract and visual acuity</b>
          </li>
          <li>
            Each Eye Quiz consists of<b> 15 Test cases</b>
          </li>
          <li>
            Every Test contains 4 Options
            <img src={Quizmage} alt="Quiz Options" />
          </li>
          <li>
            Select the option which best answers the question by clicking it.
          </li>
          <li style={{ paddingLeft: "200px", listStyleType: "none" }}>
            <img src={QuestionAnswer} alt="Quiz Options" />
          </li>
          <li>
            feel free to quit at any time In that case your score will be
            revealed afterwards.
          </li>
          <li>The timer starts as soon as the Test Loads</li>
          <b>
            <br />
            <li style={{ paddingLeft: "2px", listStyleType: "none" }}>
              Let's do this if you think you are got what it takes ?
            </li>
          </b>
        </ul>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "2px",
          }}
        >
          <span style={{ textAlign: "left", paddingLeft: "29px" }}>
            <Link
              to="/general-test/QuizHome"
              style={{ textDecoration: "none" }}
            >
              No take me back
            </Link>
          </span>
          <span style={{ textAlign: "right", paddingLeft: "9px" }}>
            <Link
              to="/general-test/play/quiz"
              style={{ textDecoration: "none" }}
            >
              Okay Let's Do this
            </Link>
          </span>
        </div>
      </div>
    </Fragment>
  </>
);

export default QuizInstruction;
