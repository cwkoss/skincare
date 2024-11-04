import React, { useState, useEffect } from 'react';
import ingredients from '../ingredients';

function IngredientTypeahead({ onSelect, existingIngredients }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.length >= 2) {
      const filteredIngredients = Object.entries(ingredients)
        .filter(([name, details]) => 
          name.toLowerCase().includes(query.toLowerCase()) &&
          !existingIngredients.includes(name) &&
          details.type // Only show ingredients that have a type defined
        )
        .map(([name, details]) => ({
          name,
          description: details.description || '',
          type: details.type
        }))
        .slice(0, 10); // Limit to 10 suggestions
      
      setSuggestions(filteredIngredients);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query, existingIngredients]);

  const handleSelect = (ingredient) => {
    onSelect(ingredient.name);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="ingredient-typeahead">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to search ingredients..."
        className="typeahead-input"
        autoFocus
      />
      {isOpen && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((ingredient) => (
            <div
              key={ingredient.name}
              className="suggestion-item"
              onClick={() => handleSelect(ingredient)}
            >
              <div className="suggestion-name">{ingredient.name}</div>
              <div className="suggestion-meta">
                <span className="suggestion-type">{ingredient.type}</span>
                {ingredient.description && (
                  <span className="suggestion-description">{ingredient.description}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {isOpen && query.length >= 2 && suggestions.length === 0 && (
        <div className="no-suggestions">
          No ingredients found
        </div>
      )}
    </div>
  );
}

export default IngredientTypeahead; 