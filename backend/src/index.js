const express = require('express');
const cors = require('cors');
const { randomUUID } = require('crypto');
const config = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

const items = [
  { id: randomUUID(), name: 'Senzu Bean' },
  { id: randomUUID(), name: 'Esfera do Dragão' },
];

app.get('/items', (req, res) => {
  res.json(items);
});

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.get('/character', (req, res) => {
  res.json({ character: config.character });
});

app.post('/items', (req, res) => {
  const { name } = req.body;
  if (!name || !name.toString().trim()) {
    return res.status(400).json({ error: 'Nome do item da missão é obrigatório.' });
  }

  const item = {
    id: randomUUID(),
    name: name.toString().trim(),
  };
  items.push(item);
  res.status(201).json(item);
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Missão não encontrada: item inválido.' });
  }

  items.splice(index, 1);
  res.status(204).send();
});

if (require.main === module) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Backend rodando em http://localhost:${port}`);
  });
}

module.exports = app;
