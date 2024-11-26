// src/pages/SearchResults.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Import useLocation

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  
  // Extract query parameter
  const query = new URLSearchParams(location.search).get('query') || '';

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim() === '') {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://world.openfoodfacts.org/api/v0/products?search_terms=${query}&categories=vegetables&fields=product_name,ingredients_text,nutrition_grades_tags`);
        setSearchResults(response.data.products || []);
      } catch (error) {
        setError('Failed to fetch search results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="search-results-container">
      <h1>Search Results for "{query}"</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((veg, index) => (
            <li key={index}>
              <h3>{veg.product_name}</h3>
              <p>Ingredients: {veg.ingredients_text || 'N/A'}</p>
              <p>Nutrition Grade: {veg.nutrition_grades_tags ? veg.nutrition_grades_tags.join(', ') : 'N/A'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
