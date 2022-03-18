import styled from 'styled-components';
import React from 'react';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import Latex from 'react-latex-next';
const  Latex = require('react-latex');
import ReactDOM from 'react-dom';
import '../../assets/stylesheets/index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';


const Title = styled.div`
    font-size: 20px;
`

ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Title>
            <Latex>
                $Mathematical$ $App$ $for$ $Math$ $Lovers$
            </Latex>
        </Title>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root_about_title')
  );

reportWebVitals();