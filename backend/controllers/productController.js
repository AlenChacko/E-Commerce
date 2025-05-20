import productModel from "../models/productModel.js";

import { v2 as cloudinary } from "cloudinary";

// const addProduct = async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       category,
//       subCategory,
//       sizes,
//       bestseller,
//     } = req.body;

//     const image1 = req.files.image1 && req.files.image1[0];
//     const image2 = req.files.image2 && req.files.image2[0];
//     const image3 = req.files.image3 && req.files.image3[0];
//     const image4 = req.files.image4 && req.files.image4[0];

//     const images = [image1, image2, image3, image4].filter(
//       (item) => item !== undefined
//     );

//     let imagesUrl = await Promise.all(
//       images.map(async (item) => {
//         let result = await cloudinary.uploader.upload(item.path, {
//           resource_type: "image",
//         });
//         return result.secure_url;
//       })
//     );

//     const productData = {
//         name,
//         description,
//         price:Number(price),
//         category,
//         subCategory,
//         sizes:JSON.parse(sizes),
//         bestseller:bestseller === "true" ? true : false,
//         image:imagesUrl,
//         date:Date.now()
//     }
//     console.log(productData);

//     const product = new productModel(productData)
//     await product.save()

//     res.json({success:true,message:"Product added"});
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

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
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the product",
      error: error.message,
    });
  }
};

const listProducts = async (req, res) => {};

const removeProduct = async (req, res) => {};

const singleProduct = async (req, res) => {};

export { addProduct, listProducts, removeProduct, singleProduct };
