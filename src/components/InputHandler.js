import { useEffect } from 'react';

const InputHandler = ({ onKeyPress }) => {
  useEffect(() => {
    window.addEventListener('keypress', onKeyPress);
    return () => {
      window.removeEventListener('keypress', onKeyPress);
    };
  }, [onKeyPress]);

  return null;
};

export default InputHandler;
