import "@mdi/font/css/materialdesignicons.min.css";
import { mdiFormatListBulleted } from "@mdi/js";
import Icon from "@mdi/react";
import { Alert, Modal as AntdModal, message } from "antd";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import classnames from "classnames";
import jsPDF from "jspdf";
import React, { Fragment } from "react";
import { Modal } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import buttonSound from "../../../assets/GeneralTest_assets/audio/button-sound.mp3";
import correctNotification from "../../../assets/GeneralTest_assets/audio/correct-answer.mp3";
import wrongNotification from "../../../assets/GeneralTest_assets/audio/wrong.mp3";
import questions from "../../../question.json";
import isEmpty from "../../../utils/is-empty";
// import { AuthContext } from "../../contexts/User_context/AuthContext";
// import { useAuthContext } from "../../../hooks/User_hooks/useAuthContext";

class play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: "",
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      nextButtonDisabled: false,
      previousButtonDisabled: true,
      wrongAnswers: 0,
      time: {},
    };
    this.interval = null;
    this.correctSound = React.createRef();
    this.wrongSound = React.createRef();
    this.buttonSound = React.createRef();
  }

  displayQuestions = (
    questions = this.state.questions,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    let { currentQuestionIndex } = this.state;
    if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion) {
        nextQuestion = questions[currentQuestionIndex + 1];
        previousQuestion = questions[currentQuestionIndex - 1];
        const answer = currentQuestion.answer;

        if (currentQuestionIndex === 6) {
          this.showAdviceMessage("Close Left Eye and Check");
        } else if (currentQuestionIndex === 7) {
          this.showAdviceMessage("Close Right Eye and Check");
        }

        this.setState(
          {
            currentQuestion,
            nextQuestion,
            previousQuestion,
            numberOfQuestions: questions.length,
            answer,
          },
          () => {
            this.handleDisabledButton();
          }
        );
      }
    }
  };

  showAdviceMessage = (messageText) => {
    message.info(messageText, 5);
  };

  componentDidMount() {
    const { questions, currentQuestion, nextQuestion, previousQuestion } =
      this.state;
    this.displayQuestions(
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion
    );

    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  handleOptionClick = (e) => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      setTimeout(() => {
        this.correctSound.current.play();
      }, 500);
      this.correctAnswers();
    } else {
      this.wrongTimeout = setTimeout(() => {
        this.wrongSound.current.play();
      }, 500);
      this.wrongAnswers();
    }
  };

  handleNextButtonClick = () => {
    this.playButtonSound();
    if (this.state.nextQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }),
        () => {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handlePreviousButtonClick = () => {
    this.playButtonSound();
    if (this.state.previousQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
        }),
        () => {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handleQuitButtonClick = () => {
    this.playButtonSound();

    AntdModal.confirm({
      title: "Confirm Quit ",
      content: "Are you sure you want to quit?",
      onOk: () => {
        window.location.href = "/general-test/QuizHome";
      },
      onCancel: () => {},
    });
  };

  handleButtonClick = (e) => {
    switch (e.target.id) {
      case "next-button":
        this.handleNextButtonClick();
        break;
      case "previous-button":
        this.handlePreviousButtonClick();
        break;

      case "quit-button":
        this.handleQuitButtonClick();
        break;
      default:
        break;
    }
  };

  playButtonSound = () => {
    this.buttonSound.current.play();
  };

  correctAnswers = () => {
    message.success("Correct Answer", 0.6);

    this.setState(
      (prevState) => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };
  wrongAnswers = () => {
    navigator.vibrate(1000);
    message.error("Wrong Answer", 0.6);
    this.setState(
      (prevState) => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };
  startTimer = () => {
    const countDownTime = Date.now() + 600000;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;
      const minutes = Math.floor(distance / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(this.interval);
        this.setState(
          {
            time: {
              minutes: 0,
              seconds: 0,
            },
          },
          () => {
            window.location.href = "/general-test/QuizHome";
          }
        );
      } else {
        this.setState({
          time: {
            minutes,
            seconds,
          },
        });
      }
    }, 1000);
  };

  handleDisabledButton = () => {
    if (
      this.state.previousQuestion === undefined ||
      this.state.currentQuestionIndex === 0
    ) {
      this.setState({
        previousButtonDisabled: true,
      });
    } else {
      this.setState({
        previousButtonDisabled: false,
      });
    }

    if (
      this.state.nextQuestion === undefined ||
      this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions
    ) {
      this.setState({
        nextButtonDisabled: true,
      });
    } else {
      this.setState({
        nextButtonDisabled: false,
      });
    }
  };

  generatePDF = () => {
    const { state } = this;
    const playerStats = {
      score: state.score,
      numberOfQuestions: state.numberOfQuestions,
      numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
    };

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const textWidth =
      (pdf.getStringUnitWidth("Sight Sense") * pdf.internal.getFontSize()) /
      pdf.internal.scaleFactor;
    const xOffset = (pageWidth - textWidth) / 2;

    pdf.setFontSize(22);

    pdf.line(10, 20, pageWidth - 10, 20);

    pdf.text("Sight Sense", xOffset, 30);

    pdf.setFontSize(12);
    pdf.text(`         Score: ${playerStats.score}`, 10, 50);
    pdf.text(
      `         Number of Questions: ${playerStats.numberOfQuestions}`,
      10,
      60
    );
    pdf.text(
      `         Number of Answered Questions: ${playerStats.numberOfAnsweredQuestions}`,
      10,
      70
    );
    pdf.text(`         Correct Answers: ${playerStats.correctAnswers}`, 10, 80);
    pdf.text(`         Wrong Answers: ${playerStats.wrongAnswers}`, 10, 90);

    const footerText = "All Rights Reserved";
    const footerTextWidth =
      (pdf.getStringUnitWidth(footerText) * pdf.internal.getFontSize()) /
      pdf.internal.scaleFactor;
    const footerXOffset = (pageWidth - footerTextWidth) / 2;

    pdf.setFontSize(10);
    pdf.text(footerText, footerXOffset, pdf.internal.pageSize.getHeight() - 10);

    pdf.save("Eye-Test-Score.pdf");
  };

  endGame = () => {
    this.setState({ showAlert: true });
    setTimeout(() => {
      this.setState({ showAlert: false }, () => {
        this.setState({ showModal: true });
      });
    }, 1800); //1.8 Seconds show the alert

    const { state } = this;
    const playerStats = {
      score: state.score,
      numberOfQuestions: state.numberOfQuestions,
      numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
    };
    console.log(playerStats);
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  showSummaryModal = () => {
    this.setState({ showModal: true });
  };

  handleSaveButtonClick = () => {
    const { score } = this.state;
    const user = JSON.parse(localStorage.getItem("user")); // Retrieve the user object from localStorage

    if (user && user.token) {
      const token = user.token;
      const data = {
        test_name: "General Test",
        user_id: user.firstname,
        test_date: new Date(),
        test_score: score,
      };

      const headers = {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
      };

      console.log("Data:", data);
      console.log("Headers:", headers);

      axios
        .post("http://localhost:4000/GeneralTest/addTest", data, { headers })
        .then((response) => {
          message.success("Test Data saved successfully");
          console.log("Data saved successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    } else {
      console.error("Token not found in user object in localStorage");
    }
  };

  handleDeleteAllDataClick = () => {
    const user = JSON.parse(localStorage.getItem("user")); // Retrieve the user object from localStorage

    if (user && user.token) {
      const token = user.token;

      // Include the token in the request headers
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Pass user_id as user.firstname in the request data
      const requestData = {
        user_id: user.firstname, // Assuming user.firstname is the user_id
      };

      axios
        .delete("http://localhost:4000/GeneralTest/delete-all", {
          headers,
          data: requestData, // Send user_id in the request data
        })
        .then((response) => {
          message.warning("All General Test data deleted successfully");
          console.log("Data deleted successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        });
    } else {
      console.error("Token not found in user object in localStorage");
    }
  };

  render() {
    const { showModal } = this.state;
    const { showAlert } = this.state;
    const { state } = this;
    const { currentQuestion, currentQuestionIndex, numberOfQuestions, time } =
      this.state;

    return (
      <Fragment>
        <Helmet>
          <title>Quiz Page</title>
        </Helmet>
        <Fragment>
          {showAlert && (
            <Alert
              message="You are Completed the Quiz"
              type="success"
              showIcon
              closable
            />
          )}
        </Fragment>
        <div>
          <Modal
            show={showModal}
            onHide={this.handleClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "1900vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>General Test Result</Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                maxHeight: "900vh",
                overflowY: "auto",
                textAlign: "center",
              }}
            >
              <p>Score: {state.score}</p>
              <p>Number of Tests: {state.numberOfQuestions}</p>
              <p>Number of Answered Tests: {state.numberOfAnsweredQuestions}</p>
              <p>Correct Tests: {state.correctAnswers}</p>
              <p>Faild Tests: {state.wrongAnswers}</p>
              <p style={{ fontWeight: "bold" }}>
                Score Percentage:{" "}
                {((state.score / state.numberOfQuestions) * 100).toFixed(2)}%
              </p>
              <center>
                <b>If your score is below 50% please take the Advanced Test</b>
              </center>
            </Modal.Body>
            <Modal.Footer style={{ minHeight: "16vh" }}>
              <button
                className="btn btn-primary"
                onClick={this.generatePDF}
                style={{ marginRight: "7px" }}
              >
                Download PDF
              </button>
              <button
                className="btn btn-success"
                onClick={this.handleSaveButtonClick}
                style={{ marginRight: "7px" }}
              >
                Save
              </button>
              <Link to="/advanced-test/upload-image">
                <button className="btn btn-warning">Advance Test</button>
              </Link>
              <button
                className="btn btn-danger"
                onClick={this.handleDeleteAllDataClick}
              >
                Reset
              </button>
            </Modal.Footer>
          </Modal>
        </div>
        <Fragment>
          <audio ref={this.correctSound} src={correctNotification}></audio>
          <audio ref={this.wrongSound} src={wrongNotification}></audio>
          <audio ref={this.buttonSound} src={buttonSound}></audio>
        </Fragment>

        <div className="questions">
          <b>
            <h2>Test Mode</h2>
          </b>
          <div className="linfeline-container">
            {currentQuestionIndex < 15 && (
              <p>
                <span>
                  {currentQuestionIndex + 1} of {numberOfQuestions}
                </span>
                <span
                  className="timer"
                  style={{
                    float: "Right",
                    display: "inline-block",
                    marginRight: "10px",
                  }}
                >
                  <i className="mdi mdi-clock" /> {time.minutes}:{time.seconds}
                </span>
              </p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            {currentQuestion.image && (
              <img
                src={currentQuestion.image}
                alt=""
                style={{
                  maxWidth: "150%",
                  maxHeight: "410px",
                }}
              />
            )}
          </div>

          <h5>{currentQuestion.question}</h5>
          <div className="options-container">
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionA}
            </p>
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionB}
            </p>
          </div>
          <div className="options-container">
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionC}
            </p>
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionD}
            </p>
          </div>
          <div className="button-container">
            <button
              className={classnames("", {
                disable: this.state.previousButtonDisabled,
              })}
              id="previous-button"
              onClick={this.handleButtonClick}
            >
              Perivous
            </button>
            <button
              className={classnames("", {
                disable: this.state.nextButtonDisabled,
              })}
              id="next-button"
              onClick={this.handleButtonClick}
            >
              Next
            </button>
            <button id="quit-button" onClick={this.handleButtonClick}>
              Quit
            </button>
          </div>
          {currentQuestionIndex === 15 && (
            <button
              onClick={this.showSummaryModal}
              style={{
                backgroundColor: "green",
                color: "white",
                borderRadius: "5px",
                position: "absolute",
                padding: "5px",
                right: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Icon path={mdiFormatListBulleted} size={1} color="white" />
              <span style={{ marginLeft: "5px" }}>Summary</span>{" "}
            </button>
          )}
        </div>
      </Fragment>
    );
  }
}
export default play;
