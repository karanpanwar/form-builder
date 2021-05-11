import React from "react";
import { connect } from "react-redux";
import { getFormList } from "../../redux/selecter";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";

class FormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.form = React.createRef();
  }

  handleInput = (e, question) => {
    this.setState({
      ...this.state,
      [question]: { answer: e.target.value },
    });
  };

  renderTextInput = (item, idx) => {
    return (
      <React.Fragment key={idx}>
        <Form.Group>
          <Form.Label>{item.question}</Form.Label>
          <Form.Control
            onChange={(e) => this.handleInput(e, item.question)}
            value={
              this.state[item.question] ? this.state[item.question].answer : ""
            }
            required
            size="sm"
            type="text"
            placeholder="Answer"
          />
        </Form.Group>
      </React.Fragment>
    );
  };

  renderCheckboxInput = (item, idx) => {
    return (
      <React.Fragment key={idx}>
        <Form.Group>
          <Form.Label>{item.question}</Form.Label>
          {item.answerOptions.map((checkboxItem, j) => (
            <Form.Check
              key={j}
              onChange={(e) => {
                let copy = { ...this.state };
                const question = copy[item.question];
                if (question) {
                  if (question.answer[checkboxItem.value]) {
                    delete copy[item.question].answer[checkboxItem.value];
                  } else {
                    copy[item.question].answer[checkboxItem.value] =
                      e.target.checked;
                  }
                } else {
                  const o = {
                    [item.question]: {
                      answer: {
                        [checkboxItem.value]: e.target.checked,
                      },
                    },
                  };
                  Object.assign(copy, o);
                }
                this.setState({ ...copy });
              }}
              required
              size="sm"
              type="checkbox"
              label={checkboxItem.value}
            />
          ))}
        </Form.Group>
      </React.Fragment>
    );
  };

  renderRadio = (item, idx) => {
    return (
      <React.Fragment key={idx}>
        <Form.Group controlId={item.question}>
          <Form.Label>{item.question}</Form.Label>
          {item.answerOptions.map((checkboxItem, j) => (
            <Form.Check
              name={item.question}
              key={j}
              onChange={(e) => {
                let copy = { ...this.state };
                const question = copy[item.question];
                if (question) {
                    copy[item.question].answer = {};
                    copy[item.question].answer[checkboxItem.value] = e.target.checked;
                } else {
                  const o = {
                    [item.question]: {
                      answer: {
                        [checkboxItem.value]: e.target.checked,
                      },
                    },
                  };
                  Object.assign(copy, o);
                }
                this.setState({ ...copy });
              }}
              required
              size="sm"
              type="radio"
              label={checkboxItem.value}
            />
          ))}
        </Form.Group>
      </React.Fragment>
    );
  };

  
  handleSubmit = () => {
    this.setState({ validated: true });
    if (this.form.current.checkValidity()) {
      const {validated, ...form} = this.state;
      localStorage.setItem(this.props.form.formTitle,JSON.stringify(form));
      this.props.history.push('/create-form');
    }
  };

  render() {
    return (
      <div className={"container"}>
        {this.props.form && (
          <Form noValidate validated={this.state.validated} ref={this.form}
            style={{
              border: "1px solid #e8e8e8",
              borderRadius: "4px",
              padding: "20px",
            }}

          >
            {this.props.form.questions.map((item, idx) => {
              if (item.answerType === "text") {
                return this.renderTextInput(item, idx);
              } else if (item.answerType === "multiChoiceCheckbox") {
                return this.renderCheckboxInput(item, idx);
              } else if (item.answerType === "singleRadio") {
                return this.renderRadio(item, idx);
              }
            })}
            <Button  onClick={this.handleSubmit}>Submit</Button>
          </Form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const formList = getFormList(state).forms;
  const form = formList.find((form) => form.url === ownProps.match.params.slug);
  return { form };
};

export default connect(mapStateToProps)(FormView);
