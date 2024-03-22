const Question = require("../Models/question-model");


const question = async (req, res) => {
    try {
        const response = req.body;
        console.log(response);
        await Question.create(response);
        return res.status(200).json({ message: "Question successfully Uploaded" });
    } catch (error) {
        next(error);
        //return res.status(500).json({ message: "Question successfully NOT Uploaded" });
    }
};

module.exports = { question };