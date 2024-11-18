import React, { useState } from 'react';
import { useRecipe } from '../RecipeContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';

const PRODUCT_AREAS = {
  face: {
    label: 'Face',
    description: 'Formulations specifically designed for delicate facial skin, focusing on concerns like aging, acne, and hydration',
    types: {
      cream: {
        label: 'Face Cream',
        description: 'Rich moisture barrier that protects and nourishes throughout the day'
      },
      lotion: {
        label: 'Face Lotion',
        description: 'Lightweight daily hydration that absorbs quickly without feeling heavy'
      },
      oil: {
        label: 'Face Oil',
        description: 'Deep nourishment and glow, perfect for targeted treatment and overnight care'
      },/*,
      serum: {
        label: 'Face Serum',
        description: 'Concentrated treatment targeting specific skin concerns'
      }*/
    }
  },
  body: {
    label: 'Body',
    description: 'Nourishing formulas for all-over body care, focusing on moisture, softness, and skin health',
    types: {
      cream: {
        label: 'Body Cream',
        description: 'Deep hydration for dry or mature skin'
      },
      lotion: {
        label: 'Body Lotion',
        description: 'Everyday moisture that absorbs quickly'
      },
      oil: {
        label: 'Body Oil',
        description: 'Rich, lasting moisture that leaves skin silky and glowing'
      }
    }
  },
  hair_scalp: {
    label: 'Hair & Scalp',
    description: 'Specialized treatments for hair health and scalp care',
    types: {
      oil: {
        label: 'Hair & Scalp Oil',
        description: 'Nourishing treatment for shine, strength, and manageability'
      }
    }
  }
};

function ProductTypeSelector() {
  const [selectedArea, setSelectedArea] = useState(null);
  const { dispatch } = useRecipe();
  const navigate = useNavigate();

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
  };

  const handleTypeSelect = (type) => {
    const productType = `${selectedArea}_${type}`;
    dispatch({ 
      type: 'SET_PRODUCT_DATA', 
      payload: productType 
    });
    navigate('/goals');
  };

  return (
    <Layout
      title={selectedArea ? `Choose Your ${PRODUCT_AREAS[selectedArea].label} Product` : "Where Would You Like to Use Your Product?"}
      buttonText="Back"
      handleSubmit={() => selectedArea ? setSelectedArea(null) : navigate('/summary')}
    >
      <div className="product-selector">
        {!selectedArea ? (
          <div className="area-selection">
            {Object.entries(PRODUCT_AREAS).map(([key, area]) => (
              <button
                key={key}
                className="area-button"
                onClick={() => handleAreaSelect(key)}
              >
                <h3>{area.label}</h3>
                <p>{area.description}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="type-selection">
            {Object.entries(PRODUCT_AREAS[selectedArea].types).map(([key, type]) => (
              <button
                key={key}
                className="type-button"
                onClick={() => handleTypeSelect(key)}
              >
                <h3>{type.label}</h3>
                <p>{type.description}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default ProductTypeSelector; 