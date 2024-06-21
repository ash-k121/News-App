import React from 'react';
import { useSelector } from 'react-redux';
import './style.css'
import  { useState } from 'react';
import Navbar from './navbar';

const DetailPage = () => {
  const articles = useSelector(state => state.article.articles); 
  const selectedArticle = useSelector(state => state.article.selectedArticle); 
  const article = articles.find(article => article.title === selectedArticle);

  if (!article) {
    return null; 
  }
 
  return (
    <div>
      <Navbar></Navbar>
      <div className="detailPage">
          <div className='detailPagecontent'>
            <h1 >{article.title}</h1>
            <img src={article.urlToImage || '/placeholder.jpg'} height="140" alt={article.title} />
            <h4><i>Author ~ {article.author}</i></h4>
            <br></br><br></br>
            <p ><h4>{(article.content || 'Article not available')}</h4></p>
      </div>
      
    </div>
    </div>
    
  );
};

export default DetailPage;
