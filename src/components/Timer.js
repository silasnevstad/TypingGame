// Timer.js
import React from 'react';
import './styles/Timer.css';

const Timer = ({ time }) => {
    const seconds = time % 60;
    return (
        <div className="timer-container">
            <div className="timer">{`${seconds < 10 ? '0' : ''}${seconds}`}</div>
        </div>
    );
};

export default Timer;
