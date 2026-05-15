const request = require('supertest');
const { default: app } = require('../src/app');

let restaurantId;
let menuItemId;

beforeAll(async () => {
  // Resolve IDs from live data so tests don't hardcode assumptions about row order
  const listRes = await request(app).get('/restaurants');
  restaurantId = listRes.body[0].id;

  const menuRes = await request(app).get(`/restaurants/${restaurantId}/menu`);
  const firstCategory = Object.keys(menuRes.body)[0];
  menuItemId = menuRes.body[firstCategory][0].id;
});

describe('GET /restaurants', () => {
  it('returns 200 and a non-empty array', async () => {
    const res = await request(app).get('/restaurants');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('filters by cuisine=italian and returns only italian restaurants', async () => {
    const res = await request(app).get('/restaurants?cuisine=italian');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    res.body.forEach((r) => expect(r.cuisine).toBe('italian'));
  });
});

describe('GET /restaurants/:id', () => {
  it('returns the restaurant with the correct id', async () => {
    const res = await request(app).get(`/restaurants/${restaurantId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(restaurantId);
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('cuisine');
    expect(res.body).toHaveProperty('rating');
  });

  it('returns 404 for a non-existent id', async () => {
    const res = await request(app).get('/restaurants/999999');
    expect(res.status).toBe(404);
  });
});

describe('GET /restaurants/:id/menu', () => {
  it('returns an object keyed by category', async () => {
    const res = await request(app).get(`/restaurants/${restaurantId}/menu`);
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(Array.isArray(res.body)).toBe(false);

    const categories = Object.keys(res.body);
    expect(categories.length).toBeGreaterThan(0);
    categories.forEach((cat) => {
      expect(Array.isArray(res.body[cat])).toBe(true);
      expect(res.body[cat].length).toBeGreaterThan(0);
    });
  });
});

describe('POST /cart', () => {
  it('adds an item and returns 201 with the created entry', async () => {
    const res = await request(app)
      .post('/cart')
      .send({ menu_item_id: menuItemId, quantity: 1 });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.menu_item_id).toBe(menuItemId);
  });

  it('returns 400 when menu_item_id is missing', async () => {
    const res = await request(app).post('/cart').send({});
    expect(res.status).toBe(400);
  });
});

describe('GET /cart', () => {
  it('returns an array', async () => {
    const res = await request(app).get('/cart');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
