import { useState, useEffect } from 'react';
const Card = () => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/people/')
      .then(response => response.json())
      .then(data => setCardData(data.results));
  }, []);

  return (
    <div>
      <h2>Obtener láminas</h2>
      {cardData.map((card, index) => (
        <div key={index}>{card.name}</div>
      ))}
    </div>
  );
};

export default Card; 
