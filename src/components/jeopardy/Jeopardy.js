import React, { Component } from "react";
//import our service
import JeopardyService from "../../jeopardyService";
import Display from "../display/Display";

class Jeopardy extends Component {
  //set our initial state and set up our service as this.client on this component
  constructor(props) {
    super(props);
    this.client = new JeopardyService();
    this.state = {
      data: {},
      score: 0,
      userAnswer: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState((state) => {
      let score = state.score;
      let value = state.data.value;
      let userAnswer = state.userAnswer;
      let answer = state.data.answer;
      if (userAnswer === answer) {
        score += Number(value);
      } else {
        score -= Number(value);
      }
      return { score, userAnswer: "" };
    });

    this.getNewQuestion();
  };

  handleChange = (event) => {
    const userAnswer = event.target.value;
    this.setState({ userAnswer });
  };
  //get a new random question from the API and add it to the data object in state
  getNewQuestion() {
    return this.client.getQuestion().then((result) => {
      this.setState({
        data: result.data[0],
      });
    });
  }
  //when the component mounts, get a the first question
  componentDidMount() {
    this.getNewQuestion();
  }
  //display the results on the screen
  render() {
    let category = "loading";
    if (this.state.data.category) {
      category = this.state.data.category.title;
    }
    return (
      <div>
        <Display
          score={this.state.score}
          data={this.state.data}
          category={category}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          userAnswer={this.state.userAnswer}
        />
        {/* {JSON.stringify(this.state.data)} */}
        {/* <strong>Question:</strong>
        {this.state.data.question} <br />
        <strong>Value:</strong>
        {this.state.data.value} <br />
        <strong>Category:</strong>
        {category} <br /> */}
      </div>
    );
  }
}
export default Jeopardy;
