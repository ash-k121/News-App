// import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { BrowserRouter as Router,Routes, Route,Navigate,Link, useNavigate} from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import Category from './categoryPage.js';
import { setArticles ,fetchInitialArticles,fetchArticlesByCategory,setCategory} from '../features/article/articleSlice.js';
import React, { useEffect, useState } from 'react';

const categories = [
  'Business',
  'Entertainment',
  'General',
  'Health',
  'Science',
  'Sports',
  'Technology'
];

export default function MultipleSelect() {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');

  const handleChange = async (event) => {
    const { value } = event.target;
    setCategoryName(value);
    try {
      const response = await dispatch(fetchArticlesByCategory(value));
      dispatch(setArticles(response.payload));
      dispatch(setCategory(value)); // Update Redux state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    navigate('/page'); 
  };
  
  return (
   
    <div>
      <div className="mb-3 search">
        <label htmlFor="categoryDropdown" className="form-label"></label>
        <select
          className="form-select"
          id="categoryDropdown"
          value={categoryName}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          {categories.map((name) => (
            <option key={name} value={name}><i>{name}</i></option>
          ))}
        </select>

        <form class="form-inline form">
              <span className='search2'>
              <input class="form-control mr-sm-6" type="search" placeholder="Search" aria-label="Search"/>
              
              <button class="btn btn-outline-success my-2 my-sm-0 custom-search-button" type="submit">Search</button>
              </span>
            
            </form>
      </div>
    
  </div>
  );
}
