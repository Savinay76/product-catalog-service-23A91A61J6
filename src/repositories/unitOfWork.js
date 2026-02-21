const sequelize = require('../config/db');
const productRepository = require('./productRepository');
const categoryRepository = require('./categoryRepository');

class UnitOfWork {
  constructor() {
    this.products = productRepository;
    this.categories = categoryRepository;
    this.transaction = null;
  }

  async begin() {
    this.transaction = await sequelize.transaction();
  }

  async commit() {
    if (this.transaction) {
      await this.transaction.commit();
      this.transaction = null;
    }
  }
  
  async rollback() {
    if (this.transaction) {
      await this.transaction.rollback();
      this.transaction = null;
    }
  }

  
  async dispose() {
    this.transaction = null;
  }
}

module.exports = UnitOfWork;