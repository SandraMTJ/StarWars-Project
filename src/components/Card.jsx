import { useEffect, useState } from 'react';

const Card = () => {
  const [CardData, setCardData] = useState([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/people/')
      .then(response => response.json())
      .then(data => setCardData(data.results));
  }, []);

  return (
    <div>
      <h2>Obtener láminas</h2>
      {CardData.map((Card, index) => (
        <div key={index}>{Card.name}</div>
      ))}
    </div>
  );
};

export default Card;