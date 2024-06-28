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

  // Style for background image
  const homePageStyle = {
    backgroundImage: 'url("bgimg.png")',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top',
    height: '100vh',
    color: '#61685f',
  };

  return (
    <FeatureFlagProvider>
      <RecipeProvider>
        <Router>
          <Routes>
            <Route path="/" element={
              <div style={homePageStyle} className="homePageContainer">
                <div className="title">
                  <h1><img src="/logo.png" className="logo" alt="A logo of a leaf inside a drop"></img> Skincremental</h1>
                  <h4>Revolutionizing Skincare, One Batch at a Time!</h4>
                </div>
                <Link to="/product"><button className="startbutton">Design Custom <br /> Skincare Recipe</button></Link>
                <div className="homepageText">
                  <p><strong>Tailored to You, Evolving with You:</strong> <br /> Small batch custom-crafted skincare that adapts to your unique needs, lifestyle, and environmental changes.</p>
                  <p><strong>Double the Discovery, Double the Impact:</strong> <br /> Embark on a skincare adventure with every order as you try two variations of your custom formulation. Use, assess, and let us know your favorite. Our AI assistant will refine your choice into two new exploratory batches for your next order. Your skincare journey is an ongoing adventure of discovery and optimization.</p>
                  <p><strong>Tired of skincare cluttered with unnecessary preservatives, stabilizers and cheap synthetic fillers?</strong> We are too! Our mission is to provide you with skincare essentials free from the non-beneficial ingredients that are only added so it can sit in a warehouse for a year before it reaches you.  Our commitment to using only deeply nourishing ingredients means your skin receives only the best.</p>
                  <p><strong>Knowledge is Power, Especially for Your Skin:</strong>  Dive into the world of ingredients without the complexity. As you customize your formulation, we'll guide you through each ingredient's purpose. Say goodbye to mystery chemicals and hello to informed skincare choices.</p>
                  <p><strong>Empowered by AI:</strong>  Say hello to your new skincare partner, our AI-powered formulation assistant. It's not just about the initial match but how your skincare evolves with you, ensuring you always have the best for your skin.</p>
                  <p><strong>Natural Preservation, Naturally Better:</strong> Delivering small batches within days of mixing means minimal need for preservatives. When needed, we opt for natural, plant-based options. Healthier for your skin, gentler on the planet.</p>
                  <p><strong>Adapt with the Seasons:</strong> As the seasons change, so should your skincare. We fine-tune your formulation to adapt to seasonal shifts, ensuring your skin always gets what it needs, when it needs it.</p>
                  <p><strong>Craft, Share, Earn:</strong> Ready to be a skincare trendsetter? Create and perfect your unique formulation, then share it with the world. Every time someone chooses your creation, you can earn rewards or support a cause close to your heart. Empower your skin and your community!</p>
                  <p><strong>Conscious, Clean, and Community-Driven:</strong> We're not just about great skincare; we're about a healthier planet. Our packaging? Recycled, sterilized, and reused for future orders. Our ingredients? We strive to source from local Pacific Northwest small and family-owned businesses whenever possible. For each jar you return for recycling, we’ll donate $1 to a local charity.</p>
                  <p><strong>Join the Skincremental Revolution:</strong> Where skincare is more than a routine – it's a dynamic, personalized journey. Be a part of a community that chooses sustainability, customization, and innovation.</p>
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
            <Route path="/phase-choices" element={<PhaseChoices/>} />
            <Route path="/confirm-recipe" element={<ConfirmRecipe/>} />
          </Routes>
        </Router>
      </RecipeProvider>
    </FeatureFlagProvider>
  );
}

export default App;
