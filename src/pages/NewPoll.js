import React, { useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const NewPoll = () => {
  const candidateName1 = useRef();
  const candidateName2 = useRef();

  const candidateName1URL = useRef();
  const candidateName2URL = useRef();

  const promptRef = useRef();

  const [disableButton, setDisableButton] = useState(false);

  const sendToBlockChain = async () => {
    setDisableButton(true);
    await window.contract.addUrl({
      name: candidateName1.current.value,
      url: candidateName1URL.current.value,
    });

    await window.contract.addUrl({
      name: candidateName2.current.value,
      url: candidateName2URL.current.value,
    });

    await window.contract.addCandidatePair({
      prompt: promptRef.current.value,
      name1: candidateName1.current.value,
      name2: candidateName2.current.value,
    });

    await window.contract.addToPromptArray({
      prompt: promptRef.current.value
    });

    window.location.replace('/');
  };

  return (
    <Container style={{ marginTop: "10px" }}>
      <Form>
        <h1>
          Create New Poll
        </h1>
        <Form.Group className='mb-3'>
          <Form.Label>Poll Question</Form.Label>
          <Form.Control
            ref={promptRef}
            placeholder='e.g. Which sushi is yummier?'
            required
          />
          <Form.Control.Feedback type="invalid">
            Please add the poll question.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Name for Candidate 1</Form.Label>
          <Form.Control
            ref={candidateName1}
            placeholder='e.g. Salmon Sushi'
            required
          />
          <Form.Control.Feedback type="invalid">
            Please add a name for Candidate 1.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Image URL for Candidate 1</Form.Label>
          <Form.Control
            ref={candidateName1URL}
            placeholder='e.g. www.website.com/image1.jpg'
            required
          />
          <Form.Control.Feedback type="invalid">
            Please add the image URL for Candidate 1.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Name for Candidate 2</Form.Label>
          <Form.Control
            ref={candidateName2}
            placeholder='e.g. Veggie Sushi'
            required
          />
          <Form.Control.Feedback type="invalid">
            Please add a name for Candidate 2.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Image URL for Candidate 2</Form.Label>
          <Form.Control
            ref={candidateName2URL}
            placeholder='e.g. www.website.com/image2.jpg'
            required
          />
          <Form.Control.Feedback type="invalid">
            Please add the image URL for Candidate 2.
          </Form.Control.Feedback>
        </Form.Group>

      </Form>
      <div style={{
        marginTop: "5vh",
        marginBottom: "20vh"
      }}>
        <Button
          disabled={disableButton}
          onClick={sendToBlockChain}
          variant='primary'
        >
          Submit
        </Button>
      </div>
    </Container>
  );
};

export default NewPoll;
