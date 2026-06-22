import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import App from './App';

const mockItems = [
  { id: '1', name: 'Leite' },
  { id: '2', name: 'Pão' },
];

beforeEach(() => {
  global.fetch = jest.fn((url, options) => {
    if (url.endsWith('/items') && !options) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve(mockItems) });
    }
    if (url.endsWith('/items') && options?.method === 'POST') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: '3', name: JSON.parse(options.body).name }),
      });
    }
    if (url.includes('/items/') && options?.method === 'DELETE') {
      return Promise.resolve({ ok: true });
    }
    return Promise.reject(new Error('Not found'));
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renderiza a lista inicial de itens', async () => {
  render(<App />);

  expect(await screen.findByText('Leite')).toBeInTheDocument();
  expect(screen.getByText('Pão')).toBeInTheDocument();
});

test('adiciona um novo item', async () => {
  render(<App />);

  const input = screen.getByLabelText('Novo item');
  const button = screen.getByRole('button', { name: /adicionar/i });

  fireEvent.change(input, { target: { value: 'Café' } });
  await waitFor(() => expect(input.value).toBe('Café'));

  fireEvent.click(button);

  expect(await screen.findByText(/Cafés/i)).toBeInTheDocument();
});

test('remove um item existente', async () => {
  render(<App />);

  const item = await screen.findByText('Leite');
  const listItem = item.closest('li');
  const removeButton = within(listItem).getByRole('button', { name: /remover/i });

  fireEvent.click(removeButton);

  await waitFor(() => expect(screen.queryByText('Leite')).not.toBeInTheDocument());
});
