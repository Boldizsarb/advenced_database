const mongoose = require("mongoose");
const { Schema } = mongoose;

const cardSchema = new Schema(
    {
        front: { type: String, required: [true, 'Email required'] },
        back: { type: String, required: [true, 'Password  required'] },
        userId:{type: String, required: [true, "User Id needed. Login first!"]},
        createdAt:{type:Date, immutable: true, default:()=>Date.now(),}, // wont let modify
        updatedAt:{type:Date, immutable: true, default:()=>Date.now(),}
    },
    { timestamps: true }
);

cardSchema.static.findByUser = function(id){
    return this.where({userId:id});
}

module.exports = mongoose.model("cards", cardSchema);