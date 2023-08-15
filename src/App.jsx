import React, { useState, useEffect } from 'react';
import './index.css';
import Album from './Album';

function App() {
  const [currentPage, setCurrentPage] = useState('card');
  const [cardData, setCardData] = useState([]);
  const [countdown, setCountdown] = useState(0);
  const [openedEnvelopeIndex, setOpenedEnvelopeIndex] = useState(null);
  const [remainingCooldown, setRemainingCooldown] = useState(0);
  const [overConfig, setOverConfig] = useState(null);
  const [cooldownActive, setCooldownActive] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCardClick = (index) => {
    if (openedEnvelopeIndex !== null || countdown > 0 || cooldownActive) {
      return;
    }

    setOpenedEnvelopeIndex(index);
    setCountdown(60000);
    setOverConfig(Math.floor(Math.random() * 2));
    setCardData(cardData.filter((_, i) => i !== index));
    setRemainingCooldown(60000);

    // Bloquear los demás sobres durante el enfriamiento
    setCooldownActive(true);
    setTimeout(() => {
      setCooldownActive(false);
    }, 60000);
  };

  useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1000);
      }, 1000);

      return () => clearInterval(interval);
    }

    if (openedEnvelopeIndex !== null && remainingCooldown > 0) {
      const interval = setInterval(() => {
        setRemainingCooldown((prevCooldown) => prevCooldown - 1000);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [countdown, openedEnvelopeIndex, remainingCooldown]);

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
                        cooldownActive && openedEnvelopeIndex !== index ? 'cooldown' : ''
                      }`}
                    >
                      <button onClick={() => handleCardClick(index)}>Abrir sobre</button>
                      {openedEnvelopeIndex === index && countdown > 0 && (
                        <div>
                          <span>Tiempo restante: {Math.ceil(countdown / 1000)} segundos</span>
                        </div>
                      )}
                      {openedEnvelopeIndex !== index && remainingCooldown > 0 && (
                        <div>
                          <span>Enfriamiento: {Math.ceil(remainingCooldown / 1000)} segundos</span>
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
