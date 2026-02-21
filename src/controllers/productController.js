const productService = require('../services/productService');

class ProductController {
  async create(req, res) {
    try {
      const { name, description, price, sku, categoryIds } = req.body;
      
      // Basic validation
      if (!name || !price || !sku) {
        return res.status(400).json({ error: "Missing required fields: name, price, and sku" });
      }

      const product = await productService.createProduct({ name, description, price, sku }, categoryIds);
      res.status(201).json(product);
    } catch (error) {
      // Handling SKU uniqueness or other database errors
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: "SKU already exists" });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const skip = parseInt(req.query.skip) || 0;
      const limit = parseInt(req.query.limit) || 10;
      const products = await productService.getAllProducts(skip, limit);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Add this inside the ProductController class
  async search(req, res) {
    try {
      const { q, categoryId, minPrice, maxPrice, skip, limit } = req.query;
      
      const results = await productService.searchProducts({
        q,
        categoryId,
        minPrice: minPrice ? parseFloat(minPrice) : null,
        maxPrice: maxPrice ? parseFloat(maxPrice) : null,
        skip: parseInt(skip) || 0,
        limit: parseInt(limit) || 10
      });

      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async update(req, res) {
  try {
    const { id } = req.params;
    const product = await productService.updateProduct(id, req.body);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async delete(req, res) {
  try {
    const { id } = req.params;
    const deleted = await productService.deleteProduct(id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.status(204).send(); // 204 No Content is standard for successful deletes
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
}

module.exports = new ProductController();