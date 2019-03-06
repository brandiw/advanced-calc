import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor (props) {
    // make call to parent class' (Component) constructor
    super(props);

    // define an initial state
    this.state = { // initialize this.state
      currentNum: '',
      num1: '',
      operator: '',
      answer: '',
      error: ''
    }
  }
  setNum = (e) => {
    this.setState({ currentNum: this.state.currentNum + e.target.value });
  }
  setOperator = (e) => {
    if(this.state.operator){
      this.setState({ error: 'Operator has already been set. Press clear to reset.' });
    }
    else if(!this.state.currentNum && e.target.value === '-'){
      this.setState({ currentNum: e.target.value, error: '' });
    }
    else if(!this.state.currentNum){
      this.setState({ error: 'A numerical value must be set first' });
    }
    else{
      this.setState({
        operator: e.target.value,
        num1: this.state.currentNum,
        currentNum: '',
        error: ''
      });
    }
  }
  calculate = (e) => {
    e.preventDefault();

    if(!this.state.num1 || !this.state.operator){
      this.setState({ error: 'Please enter a valid expression'});
    }
    else if(!this.state.currentNum){
      this.setState({error: 'Please select a second number'});
    }
    else {
      //Ideal case
      var answer = '';

      if(!this.state.operator || this.state.operator === '+'){
        answer = (Number(this.state.num1) + Number(this.state.currentNum)).toString();
      }
      else if(this.state.operator === '-'){
        answer = (Number(this.state.num1) - Number(this.state.currentNum)).toString();
      }
      else if(this.state.operator === '*'){
        answer = (Number(this.state.num1) * Number(this.state.currentNum)).toString();
      }

      //Set the answer to display
      this.setState({ answer: answer, error: '' });
    }
  }
  clear = () => {
    this.setState({
      currentNum: '',
      num1: '',
      operator: '',
      answer: '',
      error: ''
    });
  }
  render() {
    return (
      <div className="container">
        <h1>Calculator with React!</h1>
        <div className="calc-container">
          <p>Values: {this.state.num1 || this.state.currentNum} {this.state.operator} {this.state.operator ? this.state.currentNum : ''}</p>
          <input type="text" value={this.state.answer} placeholder="=" />
          <hr />
          <div className="calc-row">
            <button className="calc-button" onClick={this.setNum} value="1">1</button>
            <button className="calc-button" onClick={this.setNum} value="2">2</button>
            <button className="calc-button" onClick={this.setNum} value="3">3</button>
            <button className="calc-button" onClick={this.setOperator} value="+">+</button>
          </div>
          <div className="calc-row">
            <button className="calc-button" onClick={this.setNum} value="4">4</button>
            <button className="calc-button" onClick={this.setNum} value="5">5</button>
            <button className="calc-button" onClick={this.setNum} value="6">6</button>
            <button className="calc-button" onClick={this.setOperator} value="-">-</button>
          </div>
          <div className="calc-row">
            <button className="calc-button" onClick={this.setNum} value="7">7</button>
            <button className="calc-button" onClick={this.setNum} value="8">8</button>
            <button className="calc-button" onClick={this.setNum} value="9">9</button>
            <button className="calc-button" onClick={this.setOperator} value="*">x</button>
          </div>
          <div className="calc-row">
            <button className="calc-button" onClick={this.setNum} value="0">0</button>
            <button className="calc-button-clear" onClick={this.clear}>Clear</button>
            <button className="calc-button" onClick={this.calculate}>=</button>
          </div>
        </div>
        <p className="error">{this.state.error}</p>
      </div>
    );
  }
}

export default App;
