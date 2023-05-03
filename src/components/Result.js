import React, { useState } from 'react';
import './styles/Result.css';

const Results = ({ accuracy, wpm, submitScore, submitted, updateSubmitted, updateLeaderboard, setHighlightedEntry }) => {
    const [showSubmission, setShowSubmission] = useState(false);
    const [name, setName] = useState('');
    
    if (!accuracy || !wpm) {
        return null;
    }

    const handleSubmission = async (wpm, accuracy) => {
        const docID = await submitScore(name, wpm, accuracy);
        if (docID) {
            updateSubmitted();
            updateLeaderboard();
            setHighlightedEntry({name, wpm, accuracy});
        }
    };

    return (
        <div className="results-outer-container">
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
            <div className="results-submission">
                {!submitted && ( <>
                    {!showSubmission && <button className="submit-button" onClick={() => setShowSubmission(!showSubmission)}>Submit</button>}
                    {showSubmission && (
                        <div className="results-submission-input">
                            <input className="submit-input" type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                            <button className="submit-button-small" onClick={() => handleSubmission(wpm, accuracy)}>Submit</button>
                        </div>
                    )}
                </>)}                
            </div>
        </div>
    );
};

export default Results;
