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

const reply = async (req, res) => {
    try{
        const response = req.body;
        console.log(response.question.user[0]._id)
        const reply ={
            "user": [response.question.user[0]._id, response.question.user[0].email, response.question.user[0].username],
            "answer": response.answer,
            "answers":[],
            "timestamp": response.timestamp
        }
        const questionBody = await Question.updateOne(
            {
                _id: response.question._id,
            },
            {
                $push: {
                    answers: reply,
                }
            }
        );
        console.log(questionBody);
        return res.status(200).json({message: "Successfully replied"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Failed to add comment"});
    }
}

module.exports = { question, reply };