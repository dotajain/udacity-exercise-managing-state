import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//const value1 = Math.floor(Math.random() * 100);
//const value2 = Math.floor(Math.random() * 100);
//const value3 = Math.floor(Math.random() * 100);
//const proposedAnswer = Math.floor(Math.random() * 3) + value1 + value2 + value3;
//const numQuestions = 0;
//const numCorrect = 0;

class App extends Component {
   constructor() {
    super();
    const randomNumber = this.randomNumbers();
    this.state = {
      numCorrect: 0,
      numQuestions: 0,
      value1: randomNumber[0],
      value2: randomNumber[1],
      value3: randomNumber[2],
      proposedAnswer: randomNumber[3]
    }
  }

  randomNumbers = () => {
    const value1 = Math.floor(Math.random() * 100);
    const value2 = Math.floor(Math.random() * 100);
    const value3 = Math.floor(Math.random() * 100);
    const proposedAnswer = Math.floor(Math.random() * 3) + value1 + value2 + value3;
    return [value1, value2, value3, proposedAnswer];
  }

  updateRandomNumberState = newRandomNumber => {
    this.setState(currentState => ({
      value1: newRandomNumber[0],
      value2: newRandomNumber[1],
      value3: newRandomNumber[2],
      proposedAnswer: newRandomNumber[3],
    }));
  }

  handleAnswer = e => {
    const newRandomNumbers = this.randomNumbers();
    this.updateRandomNumberState(newRandomNumbers);
    const givenAnswer = e.target.name;
    const isCorrctAnswer = this.validateAnswer(givenAnswer);
    this.updateAnswerState(isCorrctAnswer);
  }
  
  updateAnswerState = answer => {
    if(answer) {
      this.setState(currentState => ({
        numCorrect: currentState.numCorrect + 1
      }));
    }

    this.setState(currentState => ({
      numQuestions: currentState.numQuestions + 1
    }));
  }

  validateAnswer = givenAnswer => {
    const { value1, value2, value3, proposedAnswer } = this.state;
    const currectAnswer = value1 + value2 + value3;
    return (
      (currectAnswer === proposedAnswer && givenAnswer === 'true') ||
      (currectAnswer !== proposedAnswer && givenAnswer === 'false')
    );
  }
  render() {
    const { numCorrect, numQuestions, value1, value2, value3, proposedAnswer } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactND - Coding Practice</h1>
        </header>
        <div className="game">
          <h2>Mental Math</h2>
          <div className="equation">
            <p className="text">{`${value1} + ${value2} + ${value3} = ${proposedAnswer}`}</p>
          </div>
          <button name="true" onClick={this.handleAnswer}>True</button>
          <button name="false" onClick={this.handleAnswer}>False</button>
          <p className="text">
            Your Score: {numCorrect}/{numQuestions}
          </p>
        </div>
      </div>
    );
  }
}

export default App;
