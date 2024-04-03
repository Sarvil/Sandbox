
export const Questions = ({element}) => {
    if(element == undefined || element == undefined)
    {
        return(<></>);
    }
    else{
        const {email, question, answer, answers} = element;
        return (
            <>
            <div className="questions-box">
                <h1>email: {email}</h1>
                {question ? <h1>question: {question}</h1> : <></>}
                <h1>Answer: {answer}</h1>
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
    }

    
};