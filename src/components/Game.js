import React, { Component } from 'react';
import TypingArea from './TypingArea';
import TypingAreaBlock from './TypingAreaBlock';
import Timer from './Timer';
import InputHandler from './InputHandler';
import Result from './Result';
import Settings from './Settings';
import words from './words.json';
import './styles/Game.css';
import refresh from '../images/refresh-ccw.svg';
import minus from '../images/minus.svg';
import clock from '../images/clock.svg';
import menu from '../images/menu.svg';
import rgb from '../images/rgb.svg';

function getRandomWord(maxLength = 10) {
    const word = words[Math.floor(Math.random() * words.length)];
    if (word.length <= maxLength) {
        return word.toLowerCase();
    }
    return getRandomWord(maxLength);
}

function getRandomSentence() {
    let sentence = [];
    const numberOfWords = 100;
    for (let i = 0; i < numberOfWords; i++) {
        const word = getRandomWord();
        sentence.push(word);
    }
    // make sure there are no duplicate words
    sentence = sentence.filter((word, index) => sentence.indexOf(word) === index);
    sentence = sentence.join(' ');
    return sentence;
}

class Game extends Component {
    constructor(props) {
        super(props);
        const sentence = getRandomSentence();
        this.state = {
            sentence: sentence,
            remainingSentence: sentence,
            cursorPosition: 0,
            time: 30,
            timer: null,
            attempt: '',
            gameStarted: false,
            accuracy: 0,
            wpm: 0,
            showSettings: false,
            alignment: 'block',
        };
    }

    startGame = () => {
        const timer = setInterval(() => {
            this.setState((prevState) => {
                if (prevState.time === 0) {
                    clearInterval(prevState.timer);
                    this.showResults();
                } else {
                    return { time: prevState.time - 1 };
                }
            });
        }, 1000);
        this.setState({ timer, gameStarted: true });
    };

    showResults = () => {
        const { sentence, attempt } = this.state;
        const correctChars = attempt.split('').filter((char, index) => char === sentence[index]).length;
        const accuracy = (correctChars / attempt.length) * 100;
        const wpm = (correctChars / 5) / 0.5;
    
        this.setState({
            accuracy,
            wpm,
        });
    };

    reset = () => {
        const sentence = getRandomSentence();
        this.setState({
            sentence: sentence,
            remainingSentence: sentence,
            cursorPosition: 0,
            time: 30,
            timer: null,
            attempt: '',
            accuracy: 0,
            wpm: 0,
        });
    };

    toggleAlignment = () => {
        const alignment = this.state.alignment === 'line' ? 'block' : 'line';
        this.reset();
        this.setState({ alignment });
    };

    toggleSettings = () => {
        this.setState((prevState) => {
            return { showSettings: !prevState.showSettings };
        });
    };

    onTimeChange = (value) => {
        const time = parseInt(value);
        this.setState({ time });
    };

    onColorChange = (color) => {
        document.body.className = color;
    };

    handleKeyPress = (e) => {
        const { sentence, cursorPosition, time, gameStarted, alignment } = this.state;
        if (!gameStarted) {
            this.startGame();
        }
    
        if (e.key === 'Enter' || time === 0) {
            return;
        }
    
        if (e.key === 'Backspace') {
            // Handle backspace
            const attempt = this.state.attempt.slice(0, -1);
            const remainingSentence = sentence.slice(attempt.length);
            const cursorPos = alignment === 'block' ? cursorPosition - 1 : cursorPosition;
            this.setState({
                remainingSentence: remainingSentence,
                attempt: attempt,
                cursorPosition: cursorPos,
            });
            return;
        }
        const attempt = this.state.attempt + e.key;
        const remainingSentence = sentence.slice(attempt.length);
        const correctChars = attempt.split('').filter((char, index) => char === sentence[index]).length;
        const accuracy = (correctChars / attempt.length) * 100;
        const wpm = (correctChars / 5) / ((30 - this.state.time) / 60);
        const cursorPos = alignment === 'block' ? cursorPosition + 1 : cursorPosition;
    
        this.setState({
            remainingSentence: remainingSentence,
            cursorPosition: cursorPos,
            attempt,
            accuracy,
            wpm,
        });
    };    

    render() {
        return (
            <div className="game">
                <div className="utils-container">
                    <Timer time={this.state.time} />
                    <div className="button-container">
                        <button className="reset-button" onClick={this.reset}>
                            <img src={refresh} alt="reset" />
                        </button>
                        <button className="time-button" onClick={this.toggleSettings}>
                            <img src={clock} alt="settings" />
                        </button>
                        <button className="align-button" onClick={this.toggleAlignment}>
                            <img src={this.state.alignment === 'line' ? menu : minus} alt="align" />
                        </button>
                        <button className="color-button" onClick={this.toggleSettings}>
                            <img src={rgb} alt="color" />
                        </button>
                    </div>
                    <Settings show={this.state.showSettings} time={this.state.time} onTimeChange={this.onTimeChange} onColorChange={this.onColorChange} />
                </div>
                {this.state.alignment === 'line' ? (
                    <TypingArea
                        sentence={this.state.sentence}
                        remainingSentence={this.state.remainingSentence}
                        cursorPosition={this.state.cursorPosition}
                        attempt={this.state.attempt}
                        alignment={this.state.alignment}
                    />
                ) : (
                    <TypingAreaBlock
                        sentence={this.state.sentence}
                        remainingSentence={this.state.remainingSentence}
                        cursorPosition={this.state.cursorPosition}
                        attempt={this.state.attempt}
                        alignment={this.state.alignment}
                    />
                )}
                {this.state.time === 0 && (
                    <>
                        <Result accuracy={this.state.accuracy} wpm={this.state.wpm} />
                    </>
                )}
                <InputHandler onKeyPress={this.handleKeyPress} />
            </div>
        );
    }
}

export default Game;
