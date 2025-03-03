import React, { useState } from 'react';
import './Candle.css';

interface CandleProps {
  onBlowOut?: () => void;
}

const Candle: React.FC<CandleProps> = ({ onBlowOut }) => {
  const [isLit, setIsLit] = useState(true);

  const blowOut = () => {
    setIsLit(false);
    if (onBlowOut) {
      onBlowOut();
    }
  };

  return (
    <div className="candle">
      <div className="candle-body"></div>
      {isLit && <div className="candle-flame"></div>}
      {/* For testing without microphone, you can also include a manual "blow" button */}
      <button onClick={blowOut} className="blow-button">Blow</button>
    </div>
  );
};

export default Candle;
