const Album = ({ cardData, albumData }) => {
  return (
    <div>
      <h2>Mi álbum</h2>
      {cardData.map((card, index) => (
        
        <div key={index}>
          <div>
            <span>Categoría: {card.category}</span>
          </div>
          <div>
            <span>Sección: {card.section}</span>
          </div>
          <div>
            <span>Número de lámina: {card.number}</span>
          </div>
          <div>
            <span>Nombre: {card.resource}</span>
          </div>
          <div>
            {albumData.some((albumItem) => albumItem.number === card.number) ? (
              <button>Descartar</button>
            ) : (
              <button>Agregar al álbum</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Album;
