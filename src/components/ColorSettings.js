import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import './styles/ColorSettings.css';

const ColorSettings = ({ show, colors, onColorChange }) => {
  const [selectedColor, setSelectedColor] = useState(null);

  if (!show) {
    return null;
  }

  const handleColorClick = (index) => {
    setSelectedColor(index);
  };

  const handleColorChange = (color, index) => {
    onColorChange(color.hex, index);
  };

  const colorKeys = Object.keys(colors);

  return (
    <div className="color-settings-menu">
      <div className="color-options">
        {colorKeys.map((key, index) => (
          <div
            key={index}
            className="color-option"
            style={{ backgroundColor: colors[key] }}
            onClick={() => handleColorClick(index)}
          />
        ))}
      </div>
      {selectedColor !== null && (
        <SketchPicker
          color={colors[colorKeys[selectedColor]]}
          onChange={(color) => handleColorChange(color, colorKeys[selectedColor])}
        />
      )}
    </div>
  );
};

export default ColorSettings;