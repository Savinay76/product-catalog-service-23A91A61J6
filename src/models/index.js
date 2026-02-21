const sequelize = require('../config/db');
const Product = require('./product');
const Category = require('./category');

// Define the Many-to-Many relationship
Product.belongsToMany(Category, { through: 'ProductCategories' });
Category.belongsToMany(Product, { through: 'ProductCategories' });

module.exports = {
  sequelize,
  Product,
  Category
};