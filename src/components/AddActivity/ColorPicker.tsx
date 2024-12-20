import React from 'react';
import { ACTIVITY_COLORS } from '../../constants/colors';

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorSelect,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Color</label>
      <div className="mt-2 flex flex-wrap gap-2">
        {ACTIVITY_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onColorSelect(color)}
            className={`w-8 h-8 rounded-full ${
              selectedColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};