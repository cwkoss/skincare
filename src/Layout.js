import React from 'react';

const Layout = React.memo(({ 
    children, 
    title, 
    handleSubmit, 
    isSubmitDisabled = false, 
    buttonText = "Next", 
    whyDisabled = "Please make a selection" 
}) => {
    return (
        <div className="layout">
            <div className="body-container">
                <h2>{title}</h2>
                <div className="scroller">
                    {children}
                </div>
            </div>
            <div className="button-footer">
                <button
                    className={`footer-submit${isSubmitDisabled ? " disabled" : ""}`}
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled}
                    aria-label={isSubmitDisabled ? whyDisabled : buttonText}
                >
                    {buttonText}
                </button>
                {isSubmitDisabled && <p className="why-disabled" aria-live="polite">{whyDisabled}</p>}
            </div>
        </div>
    );
});

Layout.displayName = 'Layout';

export default Layout;