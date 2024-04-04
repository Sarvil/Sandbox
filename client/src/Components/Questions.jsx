
export const Questions = ({element}) => {
    const {user, question, answer, answers} = element;
    console.log(element)
        return (
            <>
            <div className="questions-box">
                <h1>: {user[0].username}</h1>
                {question ? <h1>question: {question}</h1> : <></>}
                <h1>Answer: {answer}</h1>
                <button type="input" className="btn btn-submit">Reply</button>
                <button type="input" className="btn btn-submit">Delete</button>
            </div>
            {
                answers.map((curComment, key) => {
                    return(
                        <div className="question-box" key={key}> 
                            <Questions element={curComment} />
                        </div>  
                    );
                })
            }
            </>
        );
};