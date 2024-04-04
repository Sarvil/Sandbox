const Question = require("../Models/question-model");


const question = async (req, res) => {
    try {
        const response = req.body;
        await Question.create(response);
        return res.status(200).json({ message: "Question successfully Uploaded" });
    } catch (error) {
        //next(error);
        console.log(error);
        return res.status(500).json({ message: error });
    }
};

module.exports = { question };