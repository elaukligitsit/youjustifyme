import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentString, setCurrentString] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [strings] = useState([
    'First string',
    'Second string',
    'Third string',
    'Fourth string',
    'Fifth string',
  ]);

  useEffect(() => {
    if (isTyping) {
      if (currentIndex === 0) {
        setCurrentString(strings[currentIndex].substring(0, currentString.length + 1));
      } else if (currentIndex > 0 && currentIndex <= strings.length) {
        let timeout = setTimeout(() => {
          setCurrentString(strings[currentIndex - 1].substring(0, currentString.length + 1));
        }, 100);

        return () => {
          clearTimeout(timeout);
        };
      }
    }
  }, [currentIndex, currentString, isTyping, strings]);

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      if (currentIndex === strings.length) {
        setCurrentIndex(0);
        setCurrentString('');
        setIsTyping(true);
      } else {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setCurrentString('');
        setIsTyping(true);
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="App">
      <div className="Container">
        <h1 className="TypedString">{currentString}</h1>
        {currentIndex === strings.length && !isTyping && <div className="EnterBox">Enter</div>}
      </div>
    </div>
  );
}

export default App;
