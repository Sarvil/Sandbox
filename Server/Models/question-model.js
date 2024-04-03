const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
    email: {
        type: String,
        require: true,
    },
    question: {
        type: String,
        require: true,
    },
    answer: {
        type: String,
        require: true,
    },
    answers: {
        type: Array,
        require: true,
    },
    timestamp: {
        type: String,
        require: true,
    }
});

const Question = new model("Question", questionSchema);

module.exports = Question;