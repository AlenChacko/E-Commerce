import productModel from "../models/productModel.js";

import { v2 as cloudinary } from "cloudinary";



const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !subCategory ||
      !sizes
      
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Extract uploaded files
    const files = req.files || {};
    const images = ["image1", "image2", "image3", "image4"]
      .map((key) => files[key]?.[0])
      .filter(Boolean); // Removes undefined

    // Upload images to Cloudinary
    const imagesUrl = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // Prepare product data
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: Array.isArray(sizes)
        ? sizes
        : (() => {
            try {
              return JSON.parse(sizes);
            } catch {
              return [];
            }
          })(),
      bestseller: bestseller === "true",
      image: imagesUrl,
      date: Date.now(),
    };

    // Save to database
    const product = new productModel(productData);
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.log("Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the product",
      error: error.message,
    });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log("Failed to list products:", error);

    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the products.",
      error: error.message,
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product removed successfully.",
    });
  } catch (error) {
    console.log("Failed to remove product:", error);

    return res.status(500).json({
      success: false,
      message: "An error occurred while removing the product.",
      error: error.message,
    });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Failed to get product:", error);

    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the product.",
      error: error.message,
    });
  }
};


export { addProduct, listProducts, removeProduct, singleProduct };
