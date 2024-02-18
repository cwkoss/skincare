import React, { useState, useMemo } from 'react';
import {getFilteredIngredientList} from './ingredients';
console.log('hi"') ;

const ingredientsData = getFilteredIngredientList("Before Bed Face Moisturizing Cream");
console.log(ingredientsData);

const IngredientsTable = () => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const sortedIngredients = useMemo(() => {
        const sortableIngredients = Object.entries(ingredientsData).map(([name, values]) => ({
            name,
            ...values,
        }));

        if (sortConfig.key !== null) {
            sortableIngredients.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableIngredients;
    }, [sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => requestSort('name')}>Ingredient Name</th>
                        <th onClick={() => requestSort('light_heavy')}>Light/Heavy</th>
                        <th onClick={() => requestSort('penetrating_occlusive')}>Penetrating/Occlusive</th>
                        <th onClick={() => requestSort('soothing_stimulating')}>Soothing/Stimulating</th>
                        <th onClick={() => requestSort('gentle_active')}>Gentle/Active</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedIngredients.map((ingredient) => (
                        <tr key={ingredient.name}>
                            <td>{ingredient.name}</td>
                            <td>{ingredient.light_heavy}</td>
                            <td>{ingredient.penetrating_occlusive}</td>
                            <td>{ingredient.soothing_stimulating}</td>
                            <td>{ingredient.gentle_active}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IngredientsTable;
