const UnitOfWork = require('../repositories/unitOfWork');

class ProductService {
  // Create product with transactional category linking
  async createProduct(productData, categoryIds) {
    const uow = new UnitOfWork();
    await uow.begin();
    try {
      const product = await uow.products.add(productData, uow.transaction);
      if (categoryIds && categoryIds.length > 0) {
        await product.addCategories(categoryIds, { transaction: uow.transaction });
      }
      await uow.commit();
      return product;
    } catch (error) {
      await uow.rollback();
      throw error;
    } finally {
      await uow.dispose();
    }
  }

  // FIXED: RESTORED getAllProducts
  async getAllProducts(skip, limit) {
    const uow = new UnitOfWork();
    try {
      return await uow.products.getAll(skip, limit);
    } finally {
      await uow.dispose();
    }
  }

  // FIXED: RESTORED getProductById
  async getProductById(id) {
    const uow = new UnitOfWork();
    try {
      return await uow.products.getByIdWithCategories(id);
    } finally {
      await uow.dispose();
    }
  }

  // Advanced search with performance pagination
  async searchProducts(params) {
    const uow = new UnitOfWork();
    try {
      return await uow.products.search(params);
    } finally {
      await uow.dispose();
    }
  }

  // New Update logic with transactional relationship management
  async updateProduct(id, data) {
    const uow = new UnitOfWork();
    await uow.begin();
    try {
      const { categoryIds, ...productFields } = data;
      const product = await uow.products.update(id, productFields, uow.transaction);
      if (!product) return null;

      if (categoryIds) {
        await product.setCategories(categoryIds, { transaction: uow.transaction });
      }
      await uow.commit();
      return product;
    } catch (error) {
      await uow.rollback();
      throw error;
    } finally {
      await uow.dispose();
    }
  }

  async deleteProduct(id) {
    const uow = new UnitOfWork();
    try {
      return await uow.products.delete(id);
    } finally {
      await uow.dispose();
    }
  }
}

module.exports = new ProductService();