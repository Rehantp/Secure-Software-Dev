import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import Icon from "@mdi/react";
import { mdiEyeCircleOutline } from "@mdi/js";
import { Link } from "react-router-dom";

const Qhome = () => (
  <Fragment>
    <Helmet>
      <title>Eye Quiz</title>
    </Helmet>
    <div id="Qhome">
      <section>
        <br />
        <h1>
          <b>Eye Testing Quiz</b>
          <br /> <br />
        </h1>
        <span>
          {" "}
          <div style={{ textAlign: "center" }}>
            <Icon path={mdiEyeCircleOutline} size={4} color="black" />
          </div>
        </span>
        <br /> <br />
        <h1>Welcome To Eye Quiz</h1>
        <br /> <br />
        <div className="play-button-container">
          <ul>
            <li style={{ listStyleType: "none", fontSize: "17px" }}>
              <Link className="play-btn" to="/general-test/quiz-instruction">
                Lets Test Your Eyes
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </Fragment>
);
export default Qhome;
