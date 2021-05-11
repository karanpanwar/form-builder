import React from "react";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          question: "",
          answerType: "text",
          answerOptions: [{ value: "Option 1" }],
        },
      ],
    };
  }

  handleInput = (e, i) => {
    const questions = [...this.state.questions];
    questions[i][e.target.id] = e.target.value;
    this.setState({ questions });
  };

  handleAnswerOptions = (e, i, j) => {
    const questions = [...this.state.questions];
    const question = { ...questions[i] };
    const answerOptions = [...question.answerOptions];
    answerOptions[j].value = e.target.value;
    this.setState({ questions });
  };

  addOption = (i) => {
    const questions = [...this.state.questions];
    const question = questions[i];
    question.answerOptions.push({
      value: `Option ${question.answerOptions.length + 1}`,
    });
    if (question.answerOptions.length <= 4) {
      this.setState({ questions });
    }
  };

  addQuestion = (i) => {
    this.setState({
      ...this.state,
      questions: [
        ...this.state.questions,
        {
          question: "",
          answerType: "text",
          answerOptions: [{ value: "Option 1" }],
        },
      ],
    });
  };

  renderAnswerType = (i) => {
    const question = this.state.questions[i];
    if (question.answerType === "text") {
      return (
        <Form.Control readOnly size="sm" type="text" placeholder="Answer" />
      );
    } else if (question.answerType === "multiChoiceCheckbox") {
      return (
        <Form.Group controlId="multiChoiceCheckbox">
          {question.answerOptions.map((o, j) => (
            <InputGroup key={j} className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Checkbox disabled aria-label="checkbox" />
              </InputGroup.Prepend>
              <FormControl
                aria-label="Text label"
                onClick={(e) => e.target.select()}
                onChange={(e) => this.handleAnswerOptions(e, i, j)}
                value={o.value}
              />
            </InputGroup>
          ))}
          <Button
            disabled={question.answerOptions.length === 4}
            onClick={() => this.addOption(i)}
          >
            Add option
          </Button>
        </Form.Group>
      );
    } else if (question.answerType === "singleRadio") {
      return (
        <Form.Group controlId="singleRadio">
          {question.answerOptions.map((o, j) => (
            <InputGroup key={j} className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Radio disabled aria-label="radio" />
              </InputGroup.Prepend>
              <FormControl
                aria-label="Text label"
                onClick={(e) => e.target.select()}
                onChange={(e) => this.handleAnswerOptions(e, i, j)}
                value={o.value}
              />
            </InputGroup>
          ))}
          <Button
            disabled={question.answerOptions.length === 4}
            onClick={() => this.addOption(i)}
          >
            Add option
          </Button>
        </Form.Group>
      );
    }
  };

  render() {
    return (
      <>
        {this.state.questions.map((question, i) => (
          <React.Fragment key={i}>
            <Form.Group controlId="question">
              <Form.Label>Questions</Form.Label>
              <Form.Control
                onChange={(e) => this.handleInput(e, i)}
                value={question.question}
                required
                size="sm"
                type="text"
                placeholder="Question"
              />
            </Form.Group>
            <Form.Group controlId="answerType">
              <Form.Label>Answer Type</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => this.handleInput(e, i)}
                value={question.answerType}
              >
                <option value={"text"}>Text</option>
                <option value={"multiChoiceCheckbox"}>
                  Multichoice checkbox
                </option>
                <option value={"singleRadio"}>Single select radio</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="answerInputType">
              {this.renderAnswerType(i)}
            </Form.Group>
          </React.Fragment>
        ))}
        <Button onClick={this.addQuestion}> Add Question </Button>
      </>
    );
  }
}
