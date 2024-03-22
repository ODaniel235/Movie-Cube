import express from "express";
import Product from "./productSchema.js"; 
const router = express.Router();
const createProducts = async (req, res) => {
  try {
    const createProduct = await Product.create(req.body);
    res.status(200).json(createProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await Product.findById(id);
    res.status(200).json(findProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getProducts = async (req, res) => {
  try {
    const getAllProducts = await Product.find({});
    res.status(200).json(getAllProducts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getAndEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const findAndEdit = await Product.findByIdAndUpdate(id, req.body);
    if (!findAndEdit) {
      res.status(404).json({ message: "Product not found" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getAndDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const find = await Product.findById(id);
    if (!find) {
      res.status(400).json({ message: "Product not found" });
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

router.post("/", createProducts);
router.get("/:id", getById);
router.get("/", getProducts);
router.put("/:id", getAndEdit);
router.delete("/:id", getAndDelete);

export default router;
