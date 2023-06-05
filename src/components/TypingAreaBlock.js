import React, { useRef, useEffect, useState } from 'react';
import './styles/TypingAreaBlock.css';

const TypingAreaBlock = ({ sentence, cursorPosition, attempt, previousAttemptWPM, colors }) => {
    const cursorRef = useRef(null);
    const secondCursorRef = useRef(null);
    const containerRef = useRef(null);
    const [displayedLineIndex, setDisplayedLineIndex] = useState(0);
    const [secondCursorPosition, setSecondCursorPosition] = useState(0);
    const charsPerLine = Math.min(Math.floor(window.innerWidth / 15), 75);


    const splitSentenceIntoChunks = (text, chunkSize) => {
        const chunks = [];
        let index = 0;
        while (index < text.length) {
            let endIndex = index + chunkSize;
            if (endIndex < text.length) {
                while (text[endIndex] !== ' ' && endIndex > index) {
                    endIndex--;
                }
                if (endIndex !== index) {
                    endIndex++;
                }
            }
            const chunk = text.slice(index, endIndex).trim();
            chunks.push(chunk);
            index = endIndex;
        }
        for (let i = 0; i < chunks.length - 1; i++) {
            chunks[i] = chunks[i] + " ";
        }
        return chunks;
    };  

    const sentenceChunks = splitSentenceIntoChunks(sentence, charsPerLine);
    const displayedChunks = sentenceChunks.slice(displayedLineIndex, displayedLineIndex + 3);

    const sentenceWithCursorAndColors = displayedChunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex}>
          {chunk.split('').map((char, charIndex) => {
                const charsInPreviousChunks = sentenceChunks
                    .slice(0, displayedLineIndex + chunkIndex)
                    .reduce((sum, chunk) => sum + chunk.length, 0);
                const absoluteIndex = charsInPreviousChunks + charIndex;
                const isCursor = absoluteIndex === cursorPosition;
                const isSecondCursor = absoluteIndex === secondCursorPosition;
                const isSpace = char === ' ';
                const isTyped = absoluteIndex < attempt.length;
                const isCorrect = isTyped && attempt[absoluteIndex] === char;
                const charClass = isTyped
                    ? isCorrect
                        ? isSpace
                            ? 'space-placeholder'
                            : 'correct'
                        : isSpace
                        ? 'space-wrong'
                        : 'incorrect'
                    : isCursor ? '' : 'not-typed'
                // get the color (if its cursor = highlight, if its not typed = undefined, if its correct = correct color, if its incorrect = incorrect color)
                const color = isTyped ? (isCorrect ? colors.correct : colors.incorrect) : isCursor ? colors.highlight : undefined; 
                return (
                    <span
                        key={charIndex}
                        ref={isCursor ? cursorRef : null}
                        className={`${charClass} ${isCursor ? 'cursor' : ''} ${isSecondCursor ? 'second-cursor' : ''}`}
                        style={{ color: color }}
                    >
                        {char}
                    </span>
                );
            })}
        </div>
    ));

    useEffect(() => {
        const checkAndUpdateDisplayedLines = () => {
            if (cursorRef.current && containerRef.current) {
                const lineIndex = Math.floor(cursorPosition / charsPerLine);
                if (lineIndex > displayedLineIndex + 1) {
                    setDisplayedLineIndex(lineIndex - 1);
                }
            }
        };

        checkAndUpdateDisplayedLines();
    }, [cursorPosition, attempt, charsPerLine, displayedLineIndex]);

    useEffect(() => {
        const moveSecondCursor = () => {
            if (secondCursorRef.current && containerRef.current) {
                const lineIndex = Math.floor(secondCursorPosition / charsPerLine);
                if (lineIndex > displayedLineIndex + 1) {
                    setDisplayedLineIndex(lineIndex - 1);
                }
            }
            setSecondCursorPosition(secondCursorPosition + 1);
        };

        const timer = setInterval(moveSecondCursor, previousAttemptWPM); // Move the second cursor at the speed of the previous attempt

        return () => {
            clearInterval(timer);
        };
    }, [previousAttemptWPM, displayedLineIndex, charsPerLine, secondCursorPosition]);

    return (
        <div className="typing-area-block-container" ref={containerRef}>
            <div className="sentence-block-container">
                <div className="typing-area-block">{sentenceWithCursorAndColors}</div>
            </div>
        </div>
    );
};

export default TypingAreaBlock;