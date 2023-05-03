import React from 'react';
import './styles/Result.css';

const Results = ({ accuracy, wpm }) => {
    return (
        <div className="results-container">
            <div className="result">
                <div className="result-value">{accuracy.toFixed(2)}%</div>
                <div className="result-label">Accuracy</div>
            </div>
            <div className="result">
                <div className="result-value">{wpm.toFixed(1)}</div>
                <div className="result-label">WPM</div>
            </div>
        </div>
    );
};

export default Results;
