const { Schema, model } = require("mongoose");

const quotStepSchema = Schema({
    _id: { type: Schema.Types.ObjectId },
    categoryID: {
        type: Schema.Types.ObjectId, required: true, ref: 'ServiceCategory'
    },
    categoryCode: {
        type:String,
        maxlength:10,
    },
    step: {
        type:Number,
        default: 1 
    },
    order: {
        type:Number,
        default: 1 
    },
    title : {
        type:String,
        maxlength:1000,
        trim:true
    },
    useYN: {
        type:String,
        default: 'Y',
        maxlength:1,
        trim:true
    }
}, {timestamp:true})

const QuotStep = model('QuotStep', quotStepSchema);

module.exports = { QuotStep }