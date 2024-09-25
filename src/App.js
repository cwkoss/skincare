import React, { useEffect, useState } from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Goals from './Goals';
import Product from './Product';
import Summary from './Summary';
import RecipeBuilder from './RecipeBuilder';
import FinalizeRecipe from './FinalizeRecipe';
import SavedRecipe from './SavedRecipe';
import OrderFormulation from './OrderFormulation';
import OrderSuccess from './OrderSuccess';
import Contact from './Contact';
import OrderPricing from './OrderPricing';
import VariationSelection from './VariationSelection';
import OrderSurvey from './OrderSurvey';
import { pushFirstPageLoadInfo } from './sessionUtils';
import IngredientsTable from './IngredientsTable';
import { RecipeProvider } from './RecipeContext'; // Adjust the path as needed
import PhaseSelection from './PhaseSelection';
import { FeatureFlagProvider } from './FeatureFlagContext';
import PhaseChoices from './PhaseChoices';
import ConfirmRecipe from './ConfirmRecipe';
import Login from './Login';
import { auth } from "./firebase-config";
import { UserProvider } from './UserContext';


import posthog from 'posthog-js';

if (window.location.hostname !== "localhost") {
  posthog.init('phc_pYiz1K4qlGNQD0HUMYzAwTQy2H67FhJvNJj3j4JtGw5', {
    api_host: 'https://us.i.posthog.com'
  });
}
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    pushFirstPageLoadInfo();
  }, []); // The empty array ensures this effect runs only once after the initial render

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <UserProvider>
      <FeatureFlagProvider>
        <RecipeProvider>
          <Router>
            <Routes>
              <Route path="/" element={
                <div className="homePageContainer">
                  <div className="title">
                    <h1><img src="/logo.png" className="logo" alt="A logo of a leaf inside a drop"></img> Skincremental</h1>
                    <h4>Revolutionizing Skincare, One Batch at a Time!</h4>
                  </div>
                  <Link to="/product"><button className="startbutton">Design Custom <br /> Skincare Recipe</button></Link>
                  <div className="homepageText">
                    <p><strong>Personalized Skincare, Evolving with You:</strong> Custom-crafted skincare that adapts to your unique needs, environment and the seasons.</p>

                    <p><strong>Experience Double Discovery:</strong> With every order, try two variations of your custom formulation. Use, assess, and select your favorite. Our AI refines your choice for your next order, making your skincare journey a continuous evolution.</p>

                    <p><strong>Pure Ingredients, No Fillers:</strong> We provide skincare free from unnecessary fillers or excessive preservatives. Only deeply nourishing ingredients for your skin.</p>

                    <p><strong>Informed Choices:</strong> Customize your formulation with guidance on each ingredient's purpose. Say goodbye to mystery chemicals.</p>

                    <p><strong>Conscious & Sustainable:</strong> Committed to a healthier planet. Our packaging is recycled, sterilized, and reused. We source locally whenever possible. Return your jars for recycling, and we'll donate to charity.</p>

                    <p><strong>Join the Skincare Revolution:</strong> Skincare is more than a routine—it's a personalized journey. Join a community embracing sustainability, customization, and innovation.</p>
                  </div>

                  <Link to="/product"><button className="bottomstartbutton">Begin Your Skincare Journey</button></Link>
                  <Link to="/contact"><span>Contact us</span></Link>
                  <Login />
                </div>
              } />
              <Route path="/goals" element={<Goals />} />
              <Route path="/product" element={<Product />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/recipe-builder" element={<RecipeBuilder />} />
              <Route path="/finalize-recipe" element={<FinalizeRecipe />} />
              <Route path="/saved-recipe" element={<SavedRecipe />} />
              <Route path="/order-formulation" element={<OrderFormulation />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/order-pricing" element={<OrderPricing />} />
              <Route path="/variation-selection" element={<VariationSelection />} />
              <Route path="/order-survey" element={<OrderSurvey />} />
              <Route path="/ingredients-table" element={<IngredientsTable />} />
              <Route path="/phase-selection" element={<PhaseSelection />} />
              <Route path="/phase-choices" element={<PhaseChoices />} />
              <Route path="/confirm-recipe" element={<ConfirmRecipe />} />
            </Routes>
          </Router>
        </RecipeProvider>
      </FeatureFlagProvider>
    </UserProvider>
  );
}

export default App;
