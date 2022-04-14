const mongoose = require("mongoose"); //improting Mongoose/MongoDB features

//Crearing User schema for MongoDB using Mongoose
const CartSchema = new mongoose.Schema(
    {
        userId:{type:String, required: true},
        products:[
            {
                productId : {
                    type:String
                },
                quantity: {
                    type:Number,
                    default:1,
                }
            }
        ],
    },
    {timestamps:true}
);

module.exports = mongoose.model("Cart",CartSchema);