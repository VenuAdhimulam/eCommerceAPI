const mongoose = require("mongoose"); //improting Mongoose/MongoDB features

//Crearing User schema for MongoDB using Mongoose
const UserSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        email:{type:String, required: true, unique: true},
        password:{type:String, required: true},
        isAdmin: {
            type: Boolean,
            default:false
        },
    },
    {timestamps:true}
);

module.export = mongoose.model("User",UserSchema);