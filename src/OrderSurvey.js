import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import surveyData from './SurveyQs.json';
import { db } from './firebase-config';
import { getDoc, setDoc, doc, updateDoc } from 'firebase/firestore'

const OrderSurvey = () => {
    const navigate = useNavigate();
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const currentSection = surveyData[currentSectionIndex];
    const [responses, setResponses] = useState({});
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get('orderId');
    const [docId, setDocId] = useState('');
    const [order, setOrder] = useState({});
    const [orderInitialized, setOrderInitialized] = useState(false);
    const [surveyInitialized, setSurveyInitialized] = useState(false);



    useEffect(() => {
        if (orderId) {
            var now = new Date();
            setDocId(now.getTime() + "-" + orderId);
        }
    }, [orderId]);

    useEffect(() => {
        const getOrder = async (orderId) => {
            const docRef = doc(db, "orders", orderId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists() && !orderInitialized) {
                setOrder(docSnap.data());
                setOrderInitialized(true);
            } else {
                console.log("No such document!");
            }
        }

        if (orderInitialized === false) {   
            getOrder(orderId);
        }

    }, [orderId, orderInitialized]);

    useEffect(() => {
        const pushEmptyResponse = async () => {
            if (docId) {
                const docRef = doc(db, "survey", docId);
                await setDoc(docRef, {
                    orderId: orderId,
                    startTime: new Date(),
                    responses: {} // Initially empty
                });
                setSurveyInitialized(true);
            }
        };
        if (!surveyInitialized && orderInitialized && docId) {
            pushEmptyResponse();
        }
    }, [docId, orderId, surveyInitialized, orderInitialized]);


    const handleNextClick = async () => {
        const updateResponses = async () => {
            const docRef = doc(db, "survey", docId);
            await updateDoc(docRef, {
                responses: { ...responses },
                lastTime: new Date()
            });
        };

        await updateResponses();

        console.log([surveyData[currentSectionIndex].section, order]);

        if (surveyData[currentSectionIndex].section === "Future Orders") {
            if (responses["repeat_order_interest"] === "Yes, I'd like to evolve this recipe") {
                setCurrentSectionIndex(currentSectionIndex + 1);
            }
            else {
                setCurrentSectionIndex(currentSectionIndex + 2);
            }
        } else if (surveyData[currentSectionIndex].section ===  "Product Experience Feedback" && order.type === "oil") {
            // skip consistency question for oil orders
            setCurrentSectionIndex(currentSectionIndex + 2);
        } else if (currentSectionIndex < surveyData.length - 1) {
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
                                {question.shouldAddLineBreak && index !== question.options.length - 1 ? <br /> : null}
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
        <div className="body-container survey" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
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
