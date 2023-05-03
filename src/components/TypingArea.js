import React, { useRef, useEffect } from 'react';
import './styles/TypingArea.css';

const TypingArea = ({ sentence, remainingSentence, cursorPosition, attempt, colors }) => {

    const remainingWords = remainingSentence.split(' ');
    let totalChars = 0;
    let currentWordIndex = 0;

    for (let i = 0; i < remainingWords.length; i++) {
        if (cursorPosition >= totalChars && cursorPosition <= totalChars + remainingWords[i].length) {
            currentWordIndex = i;
            break;
        }
        totalChars += remainingWords[i].length + 1;
    }

    const cursorRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (cursorRef.current && containerRef.current) {
            const halfWidth = containerRef.current.offsetWidth / 2;
            const scrollLeft = cursorRef.current.offsetLeft - halfWidth + cursorRef.current.offsetWidth / 2;
            containerRef.current.style.transform = `translateX(-${scrollLeft}px)`;
        }
    }, [cursorPosition, attempt]);

    const sentenceWithCursor = remainingWords.map((word, wordIndex) => (
        <span key={wordIndex} className={wordIndex === currentWordIndex ? 'current-word' : ''}>
            {word.split('').map((char, charIndex) => {
                const isCursor = wordIndex === currentWordIndex && charIndex === cursorPosition - totalChars;
                return (
                    <span
                        key={charIndex}
                        ref={isCursor ? cursorRef : null}
                        className={`${isCursor ? 'cursor' : 'normal'}`}
                        style={{ color: isCursor ? colors.highlight : undefined }}
                    >
                        {char}
                    </span>
                );
            })}
            {wordIndex !== remainingWords.length - 1 && ' '}
        </span>
    ));

    const sentenceWithColors = sentence.split('').map((char, charIndex) => {
        // continue if the char has been typed
        if (charIndex < attempt.length) {
            const isSpace = char === ' ';
            const isCorrect = attempt[charIndex] === char;
            const charClass = isCorrect ? (isSpace ? 'space-placeholder' : 'correct') : (isSpace ? 'space-wrong' : 'incorrect');
            return (
                <span key={charIndex} className={charClass} style={{ color: isCorrect ? colors.correct : colors.incorrect }}>
                    {char}
                </span>
            );
        } else if (char === ' ' && charIndex === attempt.length) {
            return <span key={charIndex} className="space-placeholder">{' '}</span>;
        }
    });

                

    return (
        <div className="typing-area-container" ref={containerRef}>
            <div className="sentence-container">
                <div className="typing-area-attempt">{sentenceWithColors}</div>
                <div className="typing-area">{sentenceWithCursor}</div>
            </div>
        </div>
    );
};

export default TypingArea;
