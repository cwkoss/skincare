import React from 'react';

const Layout = ({ children, title, handleSubmit, isSubmitDisabled }) => {
    return (
        <div className="layout">
            <div className="body-container">
                <h2>{title}</h2>
                <div className="scroller">
                    {children} {/* This will render the passed-in JSX content */}
                </div>
            </div>
            <div className="button-footer">
                <button className="footer-submit" type="submit" disabled={isSubmitDisabled} onClick={handleSubmit}>Next</button>
            </div>
        </div>
    );
};

export default Layout;
