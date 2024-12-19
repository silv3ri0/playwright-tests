import { test, expect } from '@playwright/test';

const API_BASE_URL = 'https://api.chucknorris.io/jokes';

test.describe('Chuck Norris API Tests', () => {
  test('should return a random joke', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/random`);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('value'); // La battuta
    expect(data).toHaveProperty('id'); // ID della battuta
    console.log('Random Joke:', data.value);
  });

  test('should return a list of categories', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/categories`);
    expect(response.status()).toBe(200);

    const categories = await response.json();
    expect(Array.isArray(categories)).toBeTruthy(); // Verifica che sia un array
    expect(categories.length).toBeGreaterThan(0); // Almeno una categoria
    console.log('Categories:', categories);
  });

  test('should return a joke for a specific category', async ({ request }) => {
    const category = 'science'; // Scegli una categoria valida
    const response = await request.get(`${API_BASE_URL}/random?category=${category}`);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('value'); // La battuta
    expect(data.value).toContain('Chuck'); // Verifica che la battuta contenga il nome "Chuck"
    console.log(`Joke from category "${category}":`, data.value);
  });

  test('should return 404 for an invalid endpoint', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/invalid-endpoint`);
    expect(response.status()).toBe(404); // Verifica che l'endpoint non esista
    const error = await response.json();
    console.log('Error Message:', error);
  });
});
