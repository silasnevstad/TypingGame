import React from 'react';
import './styles/Settings.css';

const Settings = ({ show, time, onTimeChange, onColorChange }) => {
  if (!show) {
    return null;
  }

  const timeOptions = [30, 45, 60];

  const handleTimeChange = (value) => {
    onTimeChange(value);
  };

  return (

    <div className="settings-menu">
        <div id="time-limit" className="time-options">
            {timeOptions.map((option) => (
                <div
                    key={option}
                    className={`time-option ${time === option ? 'active' : 'inactive'}`}
                    onClick={() => handleTimeChange(option)}
                >
                    {option}
                </div>
            ))}
        </div>
    </div>
  );
};

export default Settings;