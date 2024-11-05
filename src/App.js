import React, { useEffect, useState } from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Goals from './Goals';
import Product from './Product';
import Summary from './Summary';
import SavedRecipe from './SavedRecipe';
import OrderFormulation from './OrderFormulation';
import OrderSuccess from './OrderSuccess';
import Contact from './Contact';
import OrderPricing from './OrderPricing';
import OrderSurvey from './OrderSurvey';
import { pushFirstPageLoadInfo } from './sessionUtils';
import IngredientsTable from './IngredientsTable';
import { RecipeProvider } from './RecipeContext'; // Adjust the path as needed
import { FeatureFlagProvider } from './FeatureFlagContext';
import PhaseChoices from './PhaseChoices';
import ConfirmRecipe from './ConfirmRecipe';
import Login from './Login';
import { auth } from "./firebase-config";
import { UserProvider } from './UserContext';
import VariationRequest from './VariationRequest';
import Admin from './Admin';
import AdminOrderDetails from './AdminOrderDetails';
import Dashboard from './Dashboard';
import RecipeCopier from './RecipeCopier';
import BuildVariation from './BuildVariation';
import ProductTypeSelector from './components/ProductTypeSelector';

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
                <div className="content-container homePageContainer">
                  <div className="title">
                    <h1><img src="/logo.png" className="logo" alt="A logo of a leaf inside a drop"></img> Skincremental</h1>
                    <h4>Experience Skincare Made Exclusively for You</h4>
                  </div>
                  <Link to="/summary"><button className="startbutton">Start Your Personalized Skincare Journey</button></Link>
                  <div className="homepageText">
                    <p><strong>Personalized Skincare, Evolving With You:</strong> Custom-crafted skincare that adapts to your unique needs, environment, and the seasons. Because your skin deserves nothing less.</p>

                    <p><strong>Discover Your Perfect Match:</strong> Try two custom formulas, choose your favorite, and let our smart algorithm enhance it for next time. Skincare that learns and grows with you.</p>

                    <p><strong>Pure Ingredients, Transparent Choices:</strong> Only pure, nourishing ingredients your skin will love—no unnecessary fillers or confusing preservatives. Understand exactly what's in your skincare.</p>

                    <p><strong>Empower Your Skincare Journey:</strong> Customize your formulation with clear guidance on each ingredient's purpose. Crafting your perfect skincare is now within your reach.</p>

                    <p><strong>Conscious & Sustainable:</strong> We're committed to a healthier planet. Our packaging is recycled, sterilized, and reused. We source locally whenever possible. Return your jars for recycling, and we'll donate to charity on your behalf.</p>

                    <p><strong>Join the Skincare Revolution:</strong> Skincare is more than a routine—it's your personal journey. Join a community embracing sustainability, personalization, and innovation.</p>
                  </div>

                  <Link to="/summary"><button className="bottomstartbutton">Begin Your Skincare Journey</button></Link>
                  <Link to="/contact" className="modern-link"><span>Contact us</span></Link>
                  <Login />
                </div>
              } />
              <Route path="/goals" element={<Goals />} />
              <Route path="/product-select" element={<ProductTypeSelector />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/saved-recipe" element={<SavedRecipe />} />
              <Route path="/order-formulation" element={<OrderFormulation />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/order-pricing" element={<OrderPricing />} />
              <Route path="/order-survey" element={<OrderSurvey />} />
              <Route path="/ingredients-table" element={<IngredientsTable />} />
              <Route path="/phase-choices" element={<PhaseChoices />} />
              <Route path="/confirm-recipe" element={<ConfirmRecipe />} />
              <Route path="/variation-request" element={<VariationRequest />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/order/:orderId" element={<AdminOrderDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/admin/recipe-copier"
                element={<RecipeCopier />}
              />
              <Route path="/build-variation/:orderId" element={<BuildVariation />} />
            </Routes>
          </Router>
        </RecipeProvider>
      </FeatureFlagProvider>
    </UserProvider>
  );
}

export default App;
