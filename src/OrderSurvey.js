import React, { useState } from 'react';
import surveyData from './SurveyQs.json'; // Adjust the import path as needed

const OrderSurvey = () => {
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const currentSection = surveyData[currentSectionIndex];
    const [responses, setResponses] = useState({});

    console.log(currentSection);

    const handleNextClick = () => {
        if (currentSectionIndex < surveyData.length - 1) {
            setCurrentSectionIndex(currentSectionIndex + 1);
        } else {
            console.log('Survey responses:', responses);
            alert('Survey completed!');
            // Here you would typically handle the survey submission,
            // e.g., sending the data to a backend server.
        }
    };

    const handleInputChange = (questionId, value) => {
        setResponses({
          ...responses,
          [questionId]: value,
        });
      };

    const renderInput = (question) => {
        const inputValue = responses[question.id] || "";

        switch (question.type) {
            case 'choice':
                return (
                    <div>
                        {question.options.map((option, index) => (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value={option}
                                    checked={inputValue === option}
                                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                );
            case 'rating':
                return (
                    <div>
                        {[...Array(question.scale).keys()].map((number) => (
                            <label key={number}>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value={number + 1}
                                    checked={parseInt(inputValue) === number + 1}
                                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                                />
                                {number + 1}
                            </label>
                        ))}
                    </div>
                );
            case 'open_text':
                return (
                    <textarea
                        name={question.id}
                        value={inputValue}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        placeholder="Your answer..."
                    />
                );
            case 'yes_no':
                return (
                    <div>
                        <label>
                            <input
                                type="radio"
                                name={question.id}
                                value="Yes"
                                checked={inputValue === "Yes"}
                                onChange={(e) => handleInputChange(question.id, e.target.value)}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name={question.id}
                                value="No"
                                checked={inputValue === "No"}
                                onChange={(e) => handleInputChange(question.id, e.target.value)}
                            />
                            No
                        </label>
                    </div>
                );
            default:
                return null;
        }
    };


    const renderSectionContent = (section) => {
        // Check if the section contains questions
        if (section.questions) {
            return section.questions.map((question, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <p>{question.question}</p> 
                    {renderInput(question)}
                </div>
            ));
        } else if (section.content) { // Handle sections that are purely informational
            return <p>{section.content}</p>;
        }
    };

    return (
        <div className="body-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ margin: '0 auto', textAlign: 'center' }}>
                <h2>{currentSection.section}</h2>
                {renderSectionContent(currentSection)}
                <button onClick={handleNextClick} style={{ marginTop: '20px' }}>Next</button>
            </div>
        </div>
    );
};

export default OrderSurvey;
