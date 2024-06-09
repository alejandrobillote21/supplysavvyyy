const fs = require("fs").promises;
const asyncHandler = require("express-async-handler");

const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");

const uploadImages = asyncHandler(async (req, res) => {
  try {
      const uploader = (path) => cloudinaryUploadImg(path, "images");
      const urls = [];
      const files = req.files;

      for (const file of files) {
          const { path } = file;
          try {
              const newpath = await uploader(path);
              urls.push(newpath);
              await fs.unlink(path);
          } catch (error) {
              console.error(`Failed to upload or delete file at path: ${path}`, error);
          }
      }

      const images = urls.map((file) => file);
      res.json(images);
  } catch (error) {
      console.error("Error uploading images", error);
      res.status(500).json({ message: "Error uploading images" });
  }
});


const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
      await cloudinaryDeleteImg(id, "images");
      res.json({ message: "Deleted" });
  } catch (error) {
      console.error("Error deleting image", error);
      res.status(500).json({ message: "Error deleting image" });
  }
});

module.exports = {
  uploadImages,
  deleteImages,
};
