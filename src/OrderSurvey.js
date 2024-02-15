import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import surveyData from './SurveyQs.json';
import { db } from './firebase-config';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore'

const OrderSurvey = () => {
    const navigate = useNavigate();
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const currentSection = surveyData[currentSectionIndex];
    const [responses, setResponses] = useState({});
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get('orderId');
    const [responseId, setResponseId] = useState(null);

    useEffect(() => {
        const pushEmptyResponse = async () => {
            const docRef = await addDoc(collection(db, "survey"), {
                orderId: orderId,
                responses: {} // Initially empty
            });
            setResponseId(docRef.id); // Save the generated document ID
        };

        pushEmptyResponse();
    }, []);

    const handleNextClick = async () => {
        const updateResponses = async () => {
            const docRef = doc(db, "survey", responseId);
            await updateDoc(docRef, {
                responses: { ...responses }
            });
        };

        await updateResponses();

        if (currentSectionIndex < surveyData.length - 1) {
            setCurrentSectionIndex(currentSectionIndex + 1);
        } else {
            navigate('/');
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
                <button onClick={handleNextClick} style={{ marginTop: '20px' }}>
                    {currentSectionIndex === surveyData.length - 1 ? "Complete and Return Home" : "Next"}
                </button>
            </div>
        </div>
    );
};

export default OrderSurvey;
