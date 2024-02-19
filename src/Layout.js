import React from 'react';

const Layout = ({ children, title, handleSubmit, isSubmitDisabled, buttonText }) => {
    if (!buttonText) {
        buttonText = "Next";
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
                {isSubmitDisabled && <p className="why-disabled">Please make a selection</p>}
            </div>
        </div>
    );
}; 

export default Layout;
