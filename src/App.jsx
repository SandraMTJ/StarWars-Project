import { useState } from 'react';
import './index.css';
import Album from './components/Album';
import Modal from './components/Modal';


function App() {
  const [currentPage, setCurrentPage] = useState('card');
  const [cardData, setCardData] = useState([]);
  const [countdown, setCountdown] = useState(0);
  const [openedEnvelopeIndex, setOpenedEnvelopeIndex] = useState(null);
  const [remainingCooldowns, setRemainingCooldowns] = useState([0, 0, 0, 0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [albumData, setAlbumData] = useState([]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const fetchRandomData = async () => {
    const randomConfig = getRandomInt(1, 2);
    const modalData = [];

    for (let i = 0; i < 5; i++) {
      let resource = '';
      let section = '';

      if (randomConfig === 1) {
        if (i === 0) {
          resource = 'films';
          section = 'Películas';
        } else if (i < 4) {
          resource = 'people';
          section = 'Personajes';
        } else {
          resource = 'starships';
          section = 'Naves';
        }
      } else {
        if (i < 3) {
          resource = 'people';
          section = 'Personajes';
        } else {
          resource = 'starships';
          section = 'Naves';
        }
      }

      const response = await fetch(`https://swapi.dev/api/${resource}/${getRandomInt(1, 10)}/`);
      const data = await response.json();

      modalData.push({
        category: 'Especial',
        section: section,
        number: i + 1,
        resource: data.name,
        inAlbum: false,
      });
    }

    return modalData;
  };

  const handleCardClick = async (index) => {
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

    const modalData = await fetchRandomData();
    setModalContent(modalData);
    setIsModalOpen(true);
  };

  const handleAddToAlbum = (index) => {
    const newModalContent = [...modalContent];
    newModalContent[index].inAlbum = true;

    const newAlbumData = [...albumData];
    newAlbumData.push(newModalContent[index]);

    setModalContent(newModalContent);
    setAlbumData(newAlbumData);
  };

  const handleDiscardFromAlbum = (index) => {
    const discardedItem = albumData.find(item => item.number === modalContent[index].number);

    const newModalContent = [...modalContent];
    newModalContent[index].inAlbum = false;

    const newAlbumData = albumData.filter(item => item.number !== modalContent[index].number);

    setModalContent(newModalContent);
    setAlbumData(newAlbumData);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalContent([]);
  };

  return (
    <>
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
                        className={`envelope ${openedEnvelopeIndex === index ? 'active' : ''} ${remainingCooldowns.some(cooldown => cooldown > 0) && openedEnvelopeIndex !== index ? 'cooldown' : ''
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
                  {isModalOpen && (
                    <Modal content={modalContent} onAddToAlbum={handleAddToAlbum} onDiscardFromAlbum={handleDiscardFromAlbum} onClose={handleModalClose} />
                  )}
                </div>
              ) : null}
              {currentPage === 'album' ? <Album cardData={cardData} albumData={albumData} /> : null}
            </div>
          </header>
        </main>
      </div>
    </>
  );
}

export default App;
