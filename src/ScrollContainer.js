import React from 'react';
import ingredients from './ingredients'; // Import ingredients

const ScrollContainer = ({ items, handleSelection, selectedItem, itemRefs, big }) => {
  const renderExpandedIngredient = (key, value) => {
    return (
      <React.Fragment key={key}>
        <p className='expanded-ingredient'>{key}: {value} Parts</p>
        <p className='ingredient-description'>{ingredients[key]?.description || 'Description not available.'}</p>
      </React.Fragment>
    );
  };

  return (
    <div className="scroll-items">
      {items.map((item, index) => (
        <div
          key={index}
          ref={(el) => (itemRefs.current[index] = el)}
          className={`scroll-item ${selectedItem === item.title ? 'selected-item' : ''}`}
          onClick={() => handleSelection(item, index)}
        >
          <h2>{item.title}</h2>
          <p className={big ? 'big' : ''}>{item.description}</p>
          {item.ingredients && Object.keys(item.ingredients).length > 0 && (
            <>
              <p>Ingredients:</p>
              {Object.entries(item.ingredients).map(([key, value]) =>
                renderExpandedIngredient(key, value, index)
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScrollContainer;
