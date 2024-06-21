import React, { useEffect, useState } from 'react';
import MultipleSelect from './dropdown';
import Pagelayout from './pagelayout';
import { fetchArticlesByCategory, fetchInitialArticles ,setArticles} from '../features/article/articleSlice';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import Navbar from './navbar';

export default function LandingPage(){
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.article.articles);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await dispatch(fetchInitialArticles());
        dispatch(setArticles(response.payload));
      } catch (error) {
        console.error('Error fetching initial articles:', error);
      }
    };

    fetchArticles();
  }, [dispatch]); 

    return(

         <div className='container landingPage' > 
            <Navbar></Navbar>
             <MultipleSelect></MultipleSelect>
            <br></br>
            <div className='landingPagecontent'>
            <h2 >Today</h2>
            <Pagelayout data={articles}></Pagelayout>
            </div>
         </div>
            
          
     
    )
}