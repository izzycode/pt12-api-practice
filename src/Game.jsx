import React, { Component } from 'react'
import {shuffle} from './Utils'

export default class Game extends Component {

  state = {
    correct_answer: '',
    incorrect_answers: [],
    category: '',
    question:'',
    correct: 0,
    wrong: 0
  }

  getTrivia = () => {
    fetch('https://opentdb.com/api.php?amount=1&difficulty=medium')
      .then(res => res.json())
      .then(trivia => {
        this.setState({ ...trivia['results'][0] },
          () => document.getElementById('question').innerHTML = this.state.question
        )
      })
  }

  componentDidMount() {
    this.getTrivia()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.correct !== prevState.correct || this.state.wrong !== prevState.wrong)  this.getTrivia()
  }

  checkWinner = e => {
    if (e.target.textContent.trim() === this.state.correct_answer){
      alert("Correct!")
      this.setState({correct: this.state.correct + 1})
    }
    else {
      alert(`Sorry. The correct answer is: \n${this.state.correct_answer}`)
      this.setState({ wrong: this.state.wrong + 1 })
    }
  }

  get answers() {
    let { correct_answer, incorrect_answers } = this.state
    return shuffle([correct_answer, ...incorrect_answers])
  }

  render() {
    let { category, correct, wrong  } = this.state
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-around'}}>
          <h3><span className="badge success">{correct}</span></h3>
          <h3><span className="badge danger">{wrong}</span></h3>
        </div>
        <h1>{category}</h1>
        <h2 id="question"></h2>
        <ul>
          {
            this.answers.map( (a,i) => (
              <li
                key={i}
                className="li-hover"
                onClick={this.checkWinner}
              >
                {`    ${a}`}
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}
