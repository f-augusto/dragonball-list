const request = require('supertest');
const app = require('../src/index');

describe('Backend de lista de compras', () => {
  it('retorna a lista de itens', async () => {
    const response = await request(app).get('/items');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body.some((item) => item.name === 'Senzu Bean')).toBe(true);
  });

  it('adiciona um item novo', async () => {
    const response = await request(app).post('/items').send({ name: 'Esfera do Dragão' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Esferas dos Dragão');
  });

  it('remove um item existente', async () => {
    const createResponse = await request(app).post('/items').send({ name: 'Senzu Bean' });

    const itemId = createResponse.body.id;
    const deleteResponse = await request(app).delete(`/items/${itemId}`);

    expect(deleteResponse.status).toBe(204);
  });

  it('retorna 200 em /health', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
  });
});
