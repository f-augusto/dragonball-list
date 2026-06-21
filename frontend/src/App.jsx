import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:4000';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/items`)
      .then((response) => response.json())
      .then(setItems)
      .catch(() => setError('Não foi possível carregar a missão.'));
  }, []);

  const addItem = async () => {
    if (!newItem.trim()) {
      setError('Digite um item da missão.');
      return;
    }

    const response = await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newItem })
    });

    if (!response.ok) {
      setError('Falha ao reforjar o item.');
      return;
    }

    const item = await response.json();
    setItems((current) => [...current, item]);
    setNewItem('');
    setError('');
  };

  const removeItem = async (id) => {
    const response = await fetch(`${API_URL}/items/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      setItems((current) => current.filter((item) => item.id !== id));
    } else {
      setError('Não foi possível descartar o item.');
    }
  };

  return (
    <div className="app-container">
      <header className="hero">
        <div className="logo">Dragon Ball Z</div>
        <h1>Lista de Compras da equipe Z</h1>
        <p>Reúna itens para a próxima missão com Goku e a turma.</p>
      </header>

      <div className="input-group">
        <input
          type="text"
          value={newItem}
          onChange={(event) => setNewItem(event.target.value)}
          placeholder="Ex: Senzu Bean, Café, Esfera do Dragão"
          aria-label="Novo item"
        />
        <button onClick={addItem}>Adicionar</button>
      </div>

      {error && <div className="error">{error}</div>}

      <section className="items-panel">
        <h2>Itens da missão</h2>
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <button onClick={() => removeItem(item.id)}>Remover</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
