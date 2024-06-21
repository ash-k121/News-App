import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import {setSelectedArticle} from '../features/article/articleSlice';

import { useNavigate } from 'react-router-dom';
export default function Pagelayout({ data}) {
 
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data,currentPage]);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const singleArticle=useSelector((state) => state.article.setSelectedArticle);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!data || data.length === 0) {
    return null;
  }
  
  const handlereadMore = (articleTitle) => {
    console.log('Read more clicked for article with title:', articleTitle);
    dispatch(setSelectedArticle(articleTitle));; // Dispatch action to update selected article in Redux state
    navigate('/onearticle'); // Navigate to detail page for single article
  };


  return (
    <div className='container justify-content-center page '>
    <div className="row">
      {currentItems.map((article, index) => (
        <div key={index} className="col-12 col-xl-4 col-md-6 mb-3">
        <div className="card" style={{ maxWidth: '345px', height: '400px', display: 'flex', flexDirection: 'column' }}>
        <img src={article.urlToImage|| `"${article.urlToImage}"` || `"/placeholder.jpg"`} height="140" class="card-img-top" alt={article.title}/>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{article.title.slice(0, 75) + '..'}</h5>
          <p className="card-text">{(article.description || '').slice(0, 75)}</p>
          <button onClick={() => handlereadMore(article.title)} className="btn btn-dark mt-auto">Read More</button>
        </div>
        </div>
        </div>
      ))}
    </div>
    <div className="container d-flex justify-content-center mt-3">
    <ul className="pagination" >
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} style={{backgroundColor:'black'}}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&laquo;</button>
          </li>
          {[...Array(totalPages)].map((_, idx) => (
            <li key={idx} className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(idx + 1)}>{idx + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>&raquo;</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
