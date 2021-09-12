const { Schema, model } = require("mongoose");

const serviceCategorySchema = Schema({
    categoryCode: {
        type:String,
        maxlength:10,
        unique: 1,
        trim:true
    },
    categoryLevel: {
        type:String,
        trim:true
    },
    categoryName: {
        type:String,
        maxlength:100,
        trim:true
    },
    parentCategoryCode: {
        type:String,
        maxlength:10,
        trim:true
    },
    categoryOrder: {
        type:Number,
        default: 0 
    },
    releaseDate: {
        type:String,
        maxlength:8,
        trim:true
    },
    imageUri: String
}, {timestamp:true})

const ServiceCategory = model('serviceCategory', serviceCategorySchema);

module.exports = { ServiceCategory }