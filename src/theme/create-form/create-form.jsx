import React from "react";
import { connect } from "react-redux";
import "./style.css";
import { Button, Form, InputGroup } from "react-bootstrap";
import Dialog from "../../_component/dialog";
import Question from '../../_component/question';
import {createForm} from '../../redux/action';
import GridView from "../../_component/grid-view";
import {getFormList} from "../../redux/selecter";

class CreateForm extends React.Component {
  constructor() {
    super();
    this.state = {
      modalShow: false,
      validated: false,
      formTitle: "",
    };
    this.form = React.createRef();
    this.questions = React.createRef();
  }

  convertToSlug = (Text) => {
    return Text.toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  };

  handleSubmit = () => {
    this.setState({ validated: true });
    if (this.form.current.checkValidity()) {
      const key = this.convertToSlug(this.state.formTitle);
      const form = {
        formTitle: this.state.formTitle,
        questions: this.questions.current.state.questions,
        url: key,
        createdAt: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      };
      localStorage.setItem(key,JSON.stringify(form));
      this.props.createForm(form);
      this.closeModal();
    }
  };

  closeModal = () => {
    this.setState({
      modalShow: false,
      validated: false,
      formTitle: "",
    });
  };

  handleInput = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
    });
  };

  render() {
    return (
      <>
        <div className={"container"}>
          <div className="main-header">
            <div className="title-heading">
              <h5 className="report-title">Form List</h5>
            </div>

            <div className="filter-btn">
              <InputGroup>
                <Button
                  className={"ml-2"}
                  onClick={() => this.setState({ modalShow: true })}
                >
                  New Form
                </Button>
              </InputGroup>
            </div>
          </div>
        </div>
        <Dialog
          title={"Form"}
          buttons={[
            { onClick: this.closeModal, text: "Close" },
            {
              onClick: () => this.handleSubmit(),
              text: "Create",
            },
          ]}
          modalProps={{
            show: this.state.modalShow,
            onHide: this.closeModal,
            size: "lg",
          }}
        >
          <Form noValidate validated={this.state.validated} ref={this.form}>
            <Form.Group controlId="formTitle">
              <Form.Control
                onChange={this.handleInput}
                value={this.state.formTitle}
                required
                size="sm"
                type="text"
                placeholder="Form title"
              />
              <Form.Control.Feedback type={"invalid"}>
                Please provide title for form.
              </Form.Control.Feedback>
            </Form.Group>
            <hr />
            <Question ref={this.questions} />
          </Form>
        </Dialog>
        <GridView
          columns={[
            { label: "Form Name", key: "formTitle" },
            { label: "url", key: "url" },
            { label: "created at", key: "createdAt" },
          ]}
          data={this.props.formList}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const formList = getFormList(state).forms;
  return {formList};
};
export default connect(mapStateToProps,{createForm})(CreateForm);
