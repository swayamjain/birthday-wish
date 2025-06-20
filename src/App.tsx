import React, { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import CandleWithMicrophone from './components/CandleWithMicrophone';
import './App.css';
import typingSound from '/typewriter.mp3';
import themeSong from '/music002.mp3'

const messages = [
  "It's your special day",
  "I wanted to make something special for you"
];

const App: React.FC = () => {
  const typingAudio = new Audio(typingSound);
  const [displayedText, setDisplayedText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [stage, setStage] = useState(0);
  const [noClickCount, setNoClickCount] = useState(0);
  const [noButtonStyle, setNoButtonStyle] = useState({ top: '0px', left: '120px' });
  const [step, setStep] = useState(0);
  const [lightsOn, setLightsOn] = useState(false);
  const [musicPlayed, setMusicPlayed] = useState(false);
  const [decorated, setDecorated] = useState(false);
  const [balloons, setBalloons] = useState(false);
  const [cakeCut, setCakeCut] = useState(false);
  const [finalMessage, setFinalMessage] = useState('');
  const [fade, setFade] = useState(true);
  const [onCandlesBlownOut, setCandlesBlownOut] = useState(false);
  const [showFinalButton, setShowFinalButton] = useState(false);



  const quirkyMessages = [
    "Hmm, why so shy?",
    "Are you sure? This is going to be fun!",
    "I promise you'll love it!"
  ];


  const playTypingSound = () => {
    typingAudio.currentTime = 0;
    typingAudio.play();
  };


  // Typewriter effect for first two messages
  useEffect(() => {
    if (stage !== 1 && stage !== 2) { // Only run if stage is 1 or 2
      return;
    }
    if (messageIndex >= messages.length) {
      setStage(3); // Move to Yes/No stage
      return;
    }

    const currentMessage = messages[messageIndex];

    if (charIndex < currentMessage.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + currentMessage[charIndex]);
        setCharIndex((prev) => prev + 1);
        playTypingSound();
      }, 85); // Typing speed

      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setDisplayedText(""); // Reset text for next message
        setCharIndex(0);
        setMessageIndex((prev) => prev + 1);
      }, 1500); // Pause before switching messages
    }
  }, [charIndex, messageIndex, stage]);

  // Stage 2: Yes/No Button Handlers
  const handleYes = () => {
    typingAudio.pause();
    setFade(true);
    setStage(1);
  };

  const handleNo = () => {
    typingAudio.pause();
    setNoClickCount(prevCount => prevCount + 1);

    if (noClickCount >= 0) {
      const newTop = Math.random() * 60 + 20;
      const newLeft = Math.random() * 60 + 20;
      setNoButtonStyle({ top: `${newTop}%`, left: `${newLeft}%` });
    }
  };

  // Lights On Handler
  const handleLightsOn = () => {
    setLightsOn(true);
    setTimeout(() => {
      setFade(false);
      setStage(4);
    }, 1000);
  };

  // Interactive Steps
  const handleStep = () => setStep(prev => prev + 1);
  const handlePlayMusic = () => { setMusicPlayed(true); handleStep(); };
  const handleDecorate = () => { setDecorated(true); handleStep(); };
  const handleFlyBalloons = () => { setBalloons(true); handleStep(); };
  const handleCutCake = () => { setCakeCut(true); handleStep(); };
  const handleFinalMessage = () => {
    setShowFinalButton(false);
    setFinalMessage("Happy Birthday! Wishing you a day filled with joy, laughter, and endless love. Thank you for being so special!");
  };

  return (
    <div className={`app-container ${lightsOn ? 'lights-on' : ''}`}>
      {/* Stage 2: Yes/No Buttons */}
      {stage === 0 && (
        <div className="question-container">
          <h1>Do you wanna see what I made ??</h1>
          <div className="button-group">
            <button className="yes-button" onClick={handleYes}>Yes!!!</button>
            <button
              className={`no-button ${noClickCount > 0 ? 'absolute' : ''}`}
              onClick={handleNo}
              style={noClickCount > 0 ? noButtonStyle : {}}
            >
              Rehne dete hai
            </button>
          </div>
          {noClickCount > 0 && (
            <p className="quirky-message">
              {quirkyMessages[(noClickCount - 1) % quirkyMessages.length]}
            </p>
          )}
        </div>
      )}

      {/* Stage 0 & 1: Typewriter Messages */}
      {(stage === 1 || stage === 2) && (
        <div className="message">
          <h1>{displayedText}</h1>
        </div>
      )}

      {/* Stage 3: Fade-to-Black with Lights On */}
      {stage === 3 && (
        <div className="fade-container">
          {fade && <div className={`fade-overlay ${lightsOn ? 'fade-out' : ''}`}></div>}
          <button className="action-button lights-button" onClick={handleLightsOn}>Lights On</button>
        </div>
      )}

      {/* Stage 4: Interactive Phase */}
      {stage === 4 && (
        <div className="interactive-container">
          {step === 0 && <button className="action-button" onClick={handlePlayMusic}>Play Music</button>}
          {step === 1 && <button className="action-button" onClick={handleDecorate}>Decorate</button>}
          {step === 2 && <button className="action-button" onClick={handleFlyBalloons}>Fly the Balloons</button>}
          {step === 3 && <button className="action-button" onClick={handleCutCake}>Let's Cut the Cake</button>}
          {step === 4 && onCandlesBlownOut && showFinalButton && <button className="action-button" onClick={handleFinalMessage}>I Have a Message for You</button>}
        </div>
      )}

      {musicPlayed && (
        <audio id="bg-music" src={themeSong} autoPlay loop />
      )}

      {decorated && (
        <ReactConfetti width={window.innerWidth} height={window.innerHeight} />
      )}

{balloons && (
  <div className="balloons-container">
    {Array.from({ length: 10 }).map((_, index) => {
      const randomLeft = Math.random() * 100; // Random horizontal position
      const randomSize = Math.random() * 20 + 30; // Random size between 30px and 50px
      const randomDelay = Math.random() * 5; // Random animation delay

      return (
        <div
          key={index}
          className="balloon"
          style={{
            left: `${randomLeft}%`,
            width: `${randomSize}px`,
            height: `${randomSize * 1.2}px`,
            animationDelay: `${randomDelay}s`,
          }}
        >
          🎈
        </div>
      );
    })}
  </div>
)}



      {cakeCut && (
        <CandleWithMicrophone
          onCandlesBlownOut={() => {
            setCandlesBlownOut(true);
            // Hide the cake 1.5 seconds after the candles are blown out
            setTimeout(() => {
              setCakeCut(false);
              setShowFinalButton(true);
            }, 1500);
          }}
        />
      )}

      {finalMessage && stage === 4 && step >= 4 && (
        <div className="final-message">
          <h1>{finalMessage}</h1>
        </div>
      )}
    </div>
  );
};

export default App;
