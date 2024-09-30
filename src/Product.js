import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateSession } from './sessionUtils';
import Layout from './Layout';
import { useRecipe } from './RecipeContext';
import ScrollContainer from './ScrollContainer';


export const skincareProducts = {
  'Face Moisturizing Cream or Lotion': {
    description:
      "Maintain your skin's hydration and keep it soft and supple with a moisturizing cream or lotion. Regular use supports a healthy skin barrier, protecting against dryness and environmental stressors while promoting a balanced complexion.",
    mustIncludeIngredients: [],
    typeOrder: [
      'emulsifier',
      'carrier',
      'aqueous',
      'active',
      'fragrance',
      'preservative',
    ],
  },
  'Body Moisturizing Cream or Body Butter': {
    description:
      'A deeply hydrating and nourishing body moisturizer that locks in moisture and rejuvenates the skin. Its rich, thick texture is ideal for the body\'s less sensitive, resilient skin.',
    mustIncludeIngredients: [],
    typeOrder: [
      'emulsifier',
      'carrier',
      'aqueous',
      'active',
      'fragrance',
      'preservative',
    ],
  },
  'Face Oil': {
    description:
      "Face oil offers intense hydration and nourishment, absorbing deeply to enhance skin's natural glow. Unlike lotions, oils lock in moisture and provide a concentrated boost, ideal for restoring softness and radiance.",
    mustIncludeIngredients: [],
    typeOrder: ['carrier', 'fragrance'],
  },
  'Hair and Scalp Oil': {
    description:
      'A soothing and revitalizing oil that nourishes the scalp, strengthens hair roots, and adds a healthy shine. Use as a pre-shampoo treatment or leave-in conditioner.',
    mustIncludeIngredients: [],
    typeOrder: ['carrier', 'fragrance'],
  },
};

function Product() {
  const { dispatch } = useRecipe();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState('');
  const itemRefs = useRef([]);

  const updateProductData = (newProductData) => {
    dispatch({ type: 'SET_PRODUCT_DATA', payload: newProductData });
  };

  const productItems = Object.entries(skincareProducts).map(([key, value]) => ({
    title: key,
    description: value.description,
  }));

  const handleSelection = (item, index) => {
    setSelectedProduct(item.title);

    // Scroll the selected item into view
    if (itemRefs.current[index]) {
      itemRefs.current[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProductData(selectedProduct);
    // Use updateSession to send selectedProduct and update lastDateTime
    updateSession({ selectedProduct }).then(() => {
      navigate('/goals'); // Navigate after session is updated
    });
  };

  return (
    <Layout
      title="Select a Skincare Product Type"
      handleSubmit={handleSubmit}
      isSubmitDisabled={!selectedProduct}
      buttonText="Next"
    >
      <ScrollContainer
        items={productItems}
        handleSelection={handleSelection}
        selectedItem={selectedProduct}
        isMultipleSelection={false}
        itemRefs={itemRefs}
        big={true}
      />
    </Layout>
  );
}

export default Product;
