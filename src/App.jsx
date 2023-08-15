import { useState } from 'react';
import './index.css';
import Card from './components/Card';
import Album from './components/Album';


function App() {
  const [currentPage, setCurrentPage] = useState('card');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <button onClick={() => handlePageChange('card')}>Obtener láminas</button>
          <button onClick={() => handlePageChange('album')}>Mi álbum</button>
        </nav>
        <div className="content">
          {currentPage === 'card' ? <Card /> : null}
          {currentPage === 'album' ? <Album /> : null}
        </div>
      </header>
    </div>
  );
}

export default App;
