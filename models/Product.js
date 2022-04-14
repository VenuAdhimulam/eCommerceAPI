const mongoose = require("mongoose"); //improting Mongoose/MongoDB features

//Crearing User schema for MongoDB using Mongoose
const ProductSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique: true},
        desc:{type:String, required: true},
        img:{type:String, required: true},
        categories:{tyep:Array},
        size:{type:String},
        color:{type:String},
        price:{type:Number,required:true},
    },
    {timestamps:true}
);

module.exports = mongoose.model("Product",ProductSchema);