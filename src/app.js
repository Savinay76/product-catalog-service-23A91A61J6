const express = require('express');
const { sequelize } = require('./models'); // Import from our models/index.js
const productRoutes = require('./routes/productRoutes');
const seedDatabase = require('./config/seed');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');

require('dotenv').config();

const app = express();
app.use(express.json());
const categoryRoutes = require('./routes/categoryRoutes');
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check endpoint for container orchestration
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 8000;

// This function checks the DB connection and syncs the models (creates tables)
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');

    // sync({ force: true }) will drop tables and recreate them. 
    // Use this for development to ensure the schema matches your code.
    await sequelize.sync({ force: false });
    console.log('✅ Database models synced.');
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
}

startServer();