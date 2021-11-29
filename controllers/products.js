const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ nbProducts: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;

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

  let result = Product.find(queryObj);

  // sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  // select
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ nbProducts: products.length, products });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
