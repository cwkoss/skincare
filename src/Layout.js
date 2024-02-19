import React from 'react';

const Layout = ({ children, title, handleSubmit, isSubmitDisabled, buttonText, whyDisabled }) => {
    if (!buttonText) {
        buttonText = "Next";
    }
    if (!whyDisabled) {
        whyDisabled = "Please make a selection";
    }
    return (
        <div className="layout">
            <div className="body-container">
                <h2>{title}</h2>
                <div className="scroller">
                    {children} {/* This will render the passed-in JSX content */}
                </div>
            </div>
            <div className="button-footer">
                <button className={"footer-submit" + (isSubmitDisabled ? " disabled" : "")} type="submit" onClick={handleSubmit}>{buttonText}</button>
                {isSubmitDisabled && <p className="why-disabled">{whyDisabled}</p>}
            </div>
        </div>
    );
}; 

export default Layout;
