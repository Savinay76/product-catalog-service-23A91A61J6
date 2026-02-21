const { Product, Category } = require('../models');

async function seedDatabase() {
  try {
    const categoryCount = await Category.count();
    if (categoryCount > 0) return; // Don't seed if data already exists

    console.log('🌱 Seeding database...');

    // 1. Create Categories
    const categories = await Category.bulkCreate([
      { name: 'Electronics', description: 'Gadgets and devices' },
      { name: 'Computing', description: 'Laptops and accessories' },
      { name: 'Home Office', description: 'Equipment for working from home' }
    ]);

    // 2. Create Products
    const products = await Product.bulkCreate([
      { name: 'MacBook Pro', description: 'Apple M3 chip laptop', price: 1999.99, sku: 'APL-MBP' },
      { name: 'Dell XPS 15', description: 'Premium Windows laptop', price: 1599.00, sku: 'DEL-XPS' },
      { name: 'Mechanical Keyboard', description: 'RGB backlit keyboard', price: 89.99, sku: 'KEY-001' },
      { name: 'UltraWide Monitor', description: '34-inch curved display', price: 450.00, sku: 'MON-34' },
      { name: 'Wireless Mouse', description: 'Ergonomic optical mouse', price: 25.50, sku: 'MOU-002' },
      { name: 'USB-C Hub', description: '7-in-1 adapter', price: 35.00, sku: 'HUB-007' },
      { name: 'Noise Cancelling Headphones', description: 'Over-ear wireless', price: 299.00, sku: 'HDP-SNC' },
      { name: 'Standing Desk', description: 'Adjustable height desk', price: 350.00, sku: 'DSK-STD' },
      { name: 'Webcam 4K', description: 'Ultra HD for meetings', price: 120.00, sku: 'CAM-4K' },
      { name: 'Laptop Stand', description: 'Aluminum foldable stand', price: 19.99, sku: 'LST-001' }
    ]);

    // 3. Link some products to categories (Junction table)
    // Link MacBook to Electronics and Computing
    await products[0].addCategories([categories[0].id, categories[1].id]);
    
    console.log('✅ Seeding complete!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
}

module.exports = seedDatabase;