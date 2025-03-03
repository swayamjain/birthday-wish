import React, { useState, useEffect } from "react";
import "./CandleWithMicrophone.css"; // Ensure styles are correctly updated
import cake from "/cake001.svg"

const CandleWithMicrophone: React.FC = () => {
    const [flamesVisible, setFlamesVisible] = useState(true);

    useEffect(() => {
        const startListening = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const audioContext = new AudioContext();
                const analyser = audioContext.createAnalyser();
                const microphone = audioContext.createMediaStreamSource(stream);
                microphone.connect(analyser);
                analyser.fftSize = 256;

                const dataArray = new Uint8Array(analyser.frequencyBinCount);

                const detectBlow = () => {
                    analyser.getByteFrequencyData(dataArray);
                    const volume = dataArray.reduce((a, b) => a + b) / dataArray.length;

                    if (volume > 30) { // Adjust sensitivity if needed
                        setFlamesVisible(false);
                        stream.getTracks().forEach((track) => track.stop());
                    } else {
                        requestAnimationFrame(detectBlow);
                    }
                };

                detectBlow();
            } catch (error) {
                console.error("Microphone access denied", error);
            }
        };

        startListening();
    }, []);

    return (
        <div className="cake-container">
            {/* 🎂 External Cake Image */}
            <img src={cake} alt="Cake" className="cake-image" />

            {/* 🕯️ Candles with Flames */}
            {[75, 115, 155].map((x, index) => (
                <div key={index} className="candle" style={{ left: `${x}px` }}>
                    <div className="candle-body"></div>
                    <div className="candle-detail"></div>
                    
                    {/* 🔥 Animated Flame */}
                    {flamesVisible && (
                        <div className="flame">
                            <div className="flame-inner"></div>
                            <div className="flame-glow"></div>
                        </div>
                    )}
                </div>
            ))}

            {!flamesVisible && <h2 className="blown-out-text">🎉 Candles Blown Out! 🎉</h2>}
        </div>
    );
};

export default CandleWithMicrophone;
