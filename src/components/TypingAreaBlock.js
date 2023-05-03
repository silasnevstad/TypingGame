import React, { useRef, useEffect, useState } from 'react';
import './styles/TypingAreaBlock.css';

const TypingAreaBlock = ({ sentence, cursorPosition, attempt }) => {
    const cursorRef = useRef(null);
    const containerRef = useRef(null);
    const [displayedLineIndex, setDisplayedLineIndex] = useState(0);
    const charsPerLine = 70;

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
            chunks.push(text.slice(index, endIndex));
            index = endIndex;
        }
        return chunks;
    };

    const sentenceChunks = splitSentenceIntoChunks(sentence, charsPerLine);
    const displayedChunks = sentenceChunks.slice(displayedLineIndex, displayedLineIndex + 3);

    const sentenceWithCursorAndColors = displayedChunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex}>
            {chunk.split('').map((char, charIndex) => {
                const absoluteIndex = charsPerLine * (displayedLineIndex + chunkIndex) + charIndex;
                const isCursor = absoluteIndex === cursorPosition;
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
                return (
                    <span
                        key={charIndex}
                        ref={isCursor ? cursorRef : null}
                        className={`${charClass} ${isCursor ? 'cursor' : ''}`}
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
    }, [cursorPosition, attempt]);

    return (
        <div className="typing-area-block-container" ref={containerRef}>
            <div className="sentence-block-container">
                <div className="typing-area-block">{sentenceWithCursorAndColors}</div>
            </div>
        </div>
    );
};

export default TypingAreaBlock;