import React, { useState } from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Goals from './Goals';
import Product from './Product';
import Summary from './Summary'; 
import RecipeBuilder from './RecipeBuilder';
import FinalizeRecipe from './FinalizeRecipe';
import SavedRecipe from './SavedRecipe';
import OrderFormulation from './OrderFormulation';


function App() {
  const [goalsData, setGoalsData] = useState([]);
  const [includeFragrance, setIncludeFragrance] = useState('no');
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [productData, setProductData] = useState('');

  const setIncludeFragranceApp = (fragrance) => {
    setIncludeFragrance(fragrance);
  };

  const setSelectedMoodsApp = (moods) => {
    setSelectedMoods(moods);
  };

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
    <Router>
      <Routes>
        <Route path="/" element={
          <div style={homePageStyle} className="homePageContainer">
            <h1>Welcome to the Skincare <br /> Formulation App!</h1>
            <Link to="/goals"><button className="startbutton">Design Custom <br /> Skincare Recipe</button></Link>
            <p>Plant based, Cruelty Free, Custom made to order</p>
            <p>Our AI-powered assistant will help you create </p>
            <p>the perfect formulation for your skin's needs</p>
          </div>
        } />
        <Route path="/goals" element={
          <Goals setGoalsData={setGoalsData} 
                 setIncludeFragranceApp={setIncludeFragranceApp}
                 setSelectedMoodsApp={setSelectedMoodsApp}/>
        } />
        <Route path="/product" element={<Product setProductData={setProductData} />} />
        <Route path="/summary" element={<Summary goalsData={goalsData} 
                                                 productData={productData} 
                                                 includeFragrance={includeFragrance} 
                                                 selectedMoods={selectedMoods} />} />
        <Route path="/recipe-builder" element={<RecipeBuilder />} />
        <Route path="/finalize-recipe" element={<FinalizeRecipe />} />
        <Route path="/saved-recipe" element={<SavedRecipe />} />
        <Route path="/order-formulation" element={<OrderFormulation />} />
      </Routes>
    </Router>
  );
}

export default App;
