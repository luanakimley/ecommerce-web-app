const productsModel = require("../models/products");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// get all products
exports.getAllProducts = (req, res) => {
  const query = {};
  if (req.query.categories) {
    query.categories = req.query.categories;
  }
  if (req.query.minprice || req.query.maxprice) {
    query.price = { $gte: req.query.minprice, $lte: req.query.maxprice };
  }

  if (req.query.colours) {
    query.colours = { $all: req.query.colours };
  }

  if (req.query.q) {
    query.productName = { $regex: req.query.q, $options: "i" };
  }

  const sortQuery = {};
  if (req.query.sortBy || req.query.orderBy) {
    if (req.query.sortBy === "productName") {
      sortQuery.productName = parseInt(req.query.orderBy);
    } else if (req.query.sortBy === "price") {
      sortQuery.price = parseInt(req.query.orderBy);
    }
  }

  productsModel
    .find(query, (error, data) => {
      res.json(data);
    })
    .sort(sortQuery);
};

// Read one record
exports.getOneProduct = (req, res) => {
  productsModel.findById(req.params.id, (error, data) => {
    res.json(data);
  });
};

// add new product
exports.addProduct = (req, res) => {
  if (req.body.productName === "") {
    res.json({ errorMessage: `Product name is required.` });
  } else if (req.body.description === "") {
    res.json({ errorMessage: `Product description is required.` });
  } else if (req.body.price < 0) {
    res.json({ errorMessage: `Price must be a positive number.` });
  } else if (req.body.stock < 0) {
    res.json({ errorMessage: `Stock must be a positive number.` });
  } else {
    let productDetails = new Object();
    (productDetails.productName = req.body.productName),
      (productDetails.description = req.body.description),
      (productDetails.categories = req.body.categories),
      (productDetails.colours = req.body.colours),
      (productDetails.price = req.body.price),
      (productDetails.stock = req.body.stock),
      (productDetails.photos = []);

    req.files.map((file, index) => {
      productDetails.photos[index] = { filename: `${file.filename}` };
    });

    productsModel.create(productDetails, (error, data) => {
      res.json(data);
    });
  }
};

// delete product
exports.deleteProduct = (req, res) => {
  productsModel.findByIdAndRemove(req.params.id, (error, data) => {
    res.json(data);
  });
};

// edit product
exports.editProduct = (req, res) => {
  if (req.body.productName === "") {
    res.json({ errorMessage: `Product name is required.` });
  } else if (req.body.description === "") {
    res.json({ errorMessage: `Product description is required.` });
  } else if (req.body.price < 0) {
    res.json({ errorMessage: `Price must be a positive number.` });
  } else if (req.body.stock < 0) {
    res.json({ errorMessage: `Stock must be a positive number.` });
  } else {
    let productDetails = new Object();
    (productDetails.productName = req.body.productName),
      (productDetails.description = req.body.description),
      (productDetails.categories = req.body.categories),
      (productDetails.colours = req.body.colours),
      (productDetails.price = req.body.price),
      (productDetails.stock = req.body.stock),
      (productDetails.photos = []);

    req.files.map((file, index) => {
      productDetails.photos[index] = { filename: `${file.filename}` };
    });
    productsModel.findByIdAndUpdate(
      req.params.id,
      productDetails,
      (error, data) => {
        res.json(data);
      }
    );
  }
};

// get product photo
exports.getProductPhoto = (req, res) => {
  fs.readFile(
    `${process.env.UPLOADED_FILES_FOLDER}/${req.params.filename}`,
    "base64",
    (err, fileData) => {
      if (fileData) {
        res.json({ image: fileData });
      } else {
        res.json({ image: null });
      }
    }
  );
};
