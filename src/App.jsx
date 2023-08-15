import React, { useState, useEffect } from 'react';
import './index.css';
import Album from './components/Album';

function App() {
  const [currentPage, setCurrentPage] = useState('card');
  const [cardData, setCardData] = useState([]);
  const [countdown, setCountdown] = useState(0);
  const [openedEnvelopeIndex, setOpenedEnvelopeIndex] = useState(null);
  const [remainingCooldowns, setRemainingCooldowns] = useState([0, 0, 0, 0]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCardClick = (index) => {
    if (remainingCooldowns.some(cooldown => cooldown > 0)) {
      return;
    }

    setOpenedEnvelopeIndex(index);
    setCardData(cardData.filter((_, i) => i !== index));
    setRemainingCooldowns(remainingCooldowns.map((_, i) => (i === index ? 60000 : 0)));

    setCountdown(60000);
    const cooldownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1000);
    }, 1000);

    setTimeout(() => {
      clearInterval(cooldownInterval);
      setOpenedEnvelopeIndex(null);
      setRemainingCooldowns(remainingCooldowns.map((_, i) => 0));
    }, 60000);
  };

  return (
    <div className="App">
      <main>
        <header className="App-header">
          <nav>
            <button onClick={() => handlePageChange('card')}>Obtener láminas</button>
            <button onClick={() => handlePageChange('album')}>Mi álbum</button>
          </nav>
          <div className="content">
            {currentPage === 'card' ? (
              <div>
                <h2>Obtener láminas</h2>
                <div className="envelope-container">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div
                      key={index}
                      className={`envelope ${openedEnvelopeIndex === index ? 'active' : ''} ${
                        remainingCooldowns.some(cooldown => cooldown > 0) && openedEnvelopeIndex !== index ? 'cooldown' : ''
                      }`}
                    >
                      <button onClick={() => handleCardClick(index)}>Abrir sobre</button>
                      {openedEnvelopeIndex === index && countdown > 0 && (
                        <div className="countdown">
                          Contador: {Math.ceil(countdown / 1000)} segundos
                        </div>
                      )}
                      {remainingCooldowns[index] > 0 && (
                        <div className="countdown1">
                          Enfriamiento: {Math.ceil(remainingCooldowns[index] / 1000)} segundos
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {currentPage === 'album' ? <Album cardData={cardData} /> : null}
          </div>
        </header>
      </main>
    </div>
  );
}

export default App;
