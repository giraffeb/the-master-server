const { Schema, model } = require("mongoose");

const quotQuestionSchema = Schema({
    quotStepID: {
        type: Schema.Types.ObjectId, ref: 'QuotStep'
    },
    seq: {
        type:Number,
        default: 1 
    },
    order: {
        type:Number,
        default: 1 
    },
    question : {
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

const QuotQuestion = model('QuotQuestion', quotQuestionSchema);
module.exports = { QuotQuestion }