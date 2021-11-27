const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ nbProducts: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;

  const queryObj = {};

  if (featured) {
    queryObj.featured = featured === 'true' ? true : false;
  }

  if (company) {
    queryObj.company = company;
  }

  if (name) {
    queryObj.name = { $regex: name, $options: 'i' };
  }
  const products = await Product.find(queryObj);
  res.status(200).json({ nbProducts: products.length, products });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
