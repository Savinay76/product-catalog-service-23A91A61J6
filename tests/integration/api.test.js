const request = require('supertest');
const express = require('express');
const productRoutes = require('../../src/routes/productRoutes');
const { sequelize } = require('../../src/models');

// Initialize the app for testing
const app = express();
app.use(express.json());
app.use('/products', productRoutes);

describe('Product API Integration Tests', () => {
  
  /**
   * FIX: Teardown logic to prevent Jest worker leaks.
   * This closes the database connection once all tests are finished.
   */
  afterAll(async () => {
    await sequelize.close(); //
  });

  describe('POST /products', () => {
    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/products')
        .send({ name: "Incomplete Product" }); // Missing price and SKU

      expect(res.statusCode).toEqual(400); //
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /products/:id', () => {
    it('should return 404 for a non-existent valid UUID', async () => {
      // Uses a valid UUID format that is guaranteed not to be in the database
      const res = await request(app).get('/products/00000000-0000-0000-0000-000000000000');
      
      expect(res.statusCode).toEqual(404); //
    });
  });

  describe('GET /products/search', () => {
    it('should return 200 and handle advanced query parameters', async () => {
      const res = await request(app)
        .get('/products/search?q=Mouse&limit=2');

      expect(res.statusCode).toEqual(200); //
      expect(res.body).toHaveProperty('rows'); //
      expect(Array.isArray(res.body.rows)).toBe(true);
    });
  });
});