import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CircularProgressBarProps {
  value: number; // Value for the progress (0-100)
  text?: string; // Optional text to display inside the circle
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  value,
  text,
}) => {
  return (
    <div style={{ width: 200, height: 200, margin: '0 auto' }}>
      <CircularProgressbar
        value={value}
        text={text || `${value}%`}
        strokeWidth={20} // Adjust the thickness of the progress bar
        styles={buildStyles({
          // Customize the progress bar appearance
          strokeLinecap: 'butt',
          textColor: '#000',
          pathColor: '#4caf50',
          trailColor: '#d6d6d6',
          textSize: '16px',
        })}
      />
    </div>
  );
};

export default CircularProgressBar;
