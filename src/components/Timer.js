// Timer.js
import React from 'react';
import './styles/Timer.css';

const Timer = ({ time, colors }) => {
    const seconds = time;
    return (
        <div className="timer-container">
            <div className="timer" style={{ color: colors.highlight }}>
                {`${seconds < 10 ? '0' : ''}${seconds}`}
            </div>
        </div>
    );
};

export default Timer;
