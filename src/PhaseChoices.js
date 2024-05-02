import React, { useState, useEffect } from 'react';
import Layout from './Layout'; // Ensure this path is correct

function PhaseChoices() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
        <div style={{textAlign: "center"}}>
      <div className="loading-container">
        <div className="loader"></div>
      </div>
      Loading...
      </div>
    );
  }

  return (
    <Layout title="Choose Your Oil Phase">
      <div>
        <h2>Phase 1: Light Oils</h2>
        <p>Ingredients: Coconut Oil, Jojoba Oil</p>
        <p>Description: Best for oily skin types, absorbs quickly without leaving a residue.</p>
        <button>Choose Phase 1</button>
      </div>
      <div>
        <h2>Phase 2: Medium Oils</h2>
        <p>Ingredients: Almond Oil, Argan Oil</p>
        <p>Description: A balanced blend that works for most skin types, providing hydration without heaviness.</p>
        <button>Choose Phase 2</button>
      </div>
      <div>
        <h2>Phase 3: Heavy Oils</h2>
        <p>Ingredients: Olive Oil, Shea Butter</p>
        <p>Description: Ideal for dry or mature skin, offering deep moisturization and protective benefits.</p>
        <button>Choose Phase 3</button>
      </div>
    </Layout>
  );
}

export default PhaseChoices;
