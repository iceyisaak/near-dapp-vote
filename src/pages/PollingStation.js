import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LoadingCircles from "../assets/loadingcircles.svg";

const PollingStation = () => {
  const [candidate1URL, setCandidate1Url] = useState(LoadingCircles);
  const [candidate2URL, setCandidate2Url] = useState(LoadingCircles);
  const [showResults, setResultsDisplay] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [candidate1Votes, setVote1] = useState("--");
  const [candidate2Votes, setVote2] = useState("--");
  const [prompt, setPrompt] = useState("--");


  useEffect(() => {

    // getInfo() from the blockchain
    const getInfo = async () => {
      // Get Vote Count
      let voteCount = await window.contract.getVotes({
        prompt: localStorage.getItem("prompt"),
      });
      setVote1(voteCount[0]);
      setVote2(voteCount[1]);

      // Get Image URLs for both Candidates
      setCandidate1Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate1"),
        })
      );
      setCandidate2Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate2"),
        })
      );

      // Get Prompt from localStorage
      setPrompt(localStorage.getItem("prompt"));

      // Check if the user voted by getting prompt & user ID (AccountID).
      let didUserVote = await window.contract.didParticipate({
        prompt: localStorage.getItem("prompt"),
        user: window.accountId,
      });

      // Set states for resultsDisplay & buttonStatus
      setResultsDisplay(didUserVote);
      setButtonStatus(didUserVote);
    };

    // Call getInfo()
    getInfo();
    // On every single page refresh
  }, []);

  const addVote = async (index) => {
    setButtonStatus(true);
    await window.contract.addVote({
      prompt: localStorage.getItem("prompt"),
      index: index,
    });

    await window.contract.recordUser({
      prompt: localStorage.getItem("prompt"),
      user: window.accountId,
    });

    let voteCount = await window.contract.getVotes({
      prompt: localStorage.getItem("prompt"),
    });
    setVote1(voteCount[0]);
    setVote2(voteCount[1]);
    setResultsDisplay(true);
  };

  return (
    <Container>
      <Row >
        <Col>
          <h1>
            {prompt}
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container>
            <Row style={{ marginTop: "5vh" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "3vw",
                }}
                onClick={() => addVote(0)}
              >
                <img
                  style={{
                    height: "35vh",
                    width: "20vw",
                  }}
                  src={candidate1URL}
                />
              </div>
            </Row>
            {showResults ? (
              <Row style={{ marginTop: "5vh" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "8vw",
                    padding: "10px"
                  }}
                >
                  {candidate1Votes}
                </div>
              </Row>
            ) : null}

          </Container>
        </Col>

        <Col>
          <Container>
            <Row style={{ marginTop: "5vh" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "3vw",
                }}
              >
                <img
                  style={{
                    height: "35vh",
                    width: "20vw",
                  }}
                  src={candidate2URL}
                />
              </div>
            </Row>
            {showResults ? (
              <Row style={{ marginTop: "5vh" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "8vw",
                    padding: "10px",
                  }}
                  onClick={() => addVote(1)}
                >
                  {candidate2Votes}
                </div>
              </Row>
            ) : null}

          </Container>
        </Col>
      </Row>
      <Row
        style={{
          marginTop: "5vh",
          marginBottom: "20vh"
        }}>
        <Button href="/" variant="secondary">
          Back
        </Button>
      </Row>
    </Container>
  );
};

export default PollingStation;
