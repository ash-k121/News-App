import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card,Container, Grid, Select, MenuItem, Pagination } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import LandingPage from './pages/landingPage';
import Category from './pages/categoryPage';
import {Provider} from 'react-redux';
import { store } from './app/store';
// require('dotenv').config();
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Pagelayout from './pages/pagelayout';
import DetailPage from './pages/detailPage';
const App = () => {
 
  return (
  <Provider store={store}>
     <Router>
        <Routes>
          <Route exact path='/' Component={LandingPage}/>
          <Route exact path='/page' Component={Category}/>
          <Route exact path='/onearticle' Component={DetailPage}/>
          
        </Routes>
     </Router>
  </Provider>
    
     
  )}
      
     
    

  


export default App;
