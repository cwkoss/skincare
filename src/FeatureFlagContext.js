import React, { createContext, useContext, useState, useEffect } from 'react';

const FeatureFlagContext = createContext();

export function useFeatureFlag() {
    return useContext(FeatureFlagContext);
}

export function FeatureFlagProvider({ children }) {
    const [isDevFeatureEnabled, setIsDevFeatureEnabled] = useState(false);

    useEffect(() => {
        // Check local storage for the feature flag
        const devFeature = localStorage.getItem('devFeature') === 'true';
        setIsDevFeatureEnabled(devFeature);
    }, []);

    const toggleFeature = () => {
        localStorage.setItem('devFeature', !isDevFeatureEnabled);
        setIsDevFeatureEnabled(!isDevFeatureEnabled);
    };

    return (
        <FeatureFlagContext.Provider value={{ isDevFeatureEnabled, toggleFeature }}>
            {children}
        </FeatureFlagContext.Provider>
    );
}
