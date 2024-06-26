/*const mongoose = require("mongoose");
const validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("This id is not valid or not Found");
};
module.exports = validateMongoDbId;*/

const mongoose = require('mongoose');

const validateMongoDbId = (id) => {
    console.log(`Validating ID: ${id}`);  // Debugging line
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error(`Invalid ID: ${id}`);  // Debugging line
        throw new Error("This id is not valid or not Found");
    }
};

module.exports = validateMongoDbId;




