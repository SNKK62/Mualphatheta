import styled from 'styled-components';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
// import Latex from 'react-latex-next';
const  Latex = require('react-latex');
import ReactDOM from 'react-dom';
import '../../assets/stylesheets/index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';


const Title = styled.div`
    margin-top: 15px;
    font-size: 20px;
    @media(min-width: 600px){
        font-size: 20px;
    }
    @media(min-width: 1025px){
        font-size: 22px;
    }
`
const Menu = styled.div`
    @media(max-width: 600px){
        margin: 10px 5px 15px 5px;
        font-size: 13px;
    }
    @media(min-width: 601px){
        margin: 0px 16px 15px 16px;
    }
    cursor: pointer;
    color: rgb(220,220,260);
`
const ThinToolbar = styled(Toolbar)`
    min-height: 36px;
    height: 36px;
`
const ThickToolbar = styled(Toolbar)`
    min-height: 44px;
    height: 44px;
`

const Topage = (path: string) => {
    window.location.href = '/' + path;
};

ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <AppBar position="sticky"  sx={{height: '80px', bgcolor: 'rgb(50,50,50)',color: 'rgb(400,400,400)',zIndex: '500', boxShadow: '0 1px 5px rgb(50,50,50)' , padding: '0', width: '101vw'}}>
            <Container maxWidth="xl" sx={{height: '80px',padding: '0px 20px 20px 20px',width: '100vw',margin: '0px',maxWidth: '100vw'}}>
                <ThickToolbar disableGutters sx={{height: '64px', width: '95vw'}}>
                    <Box sx={{ margin: 'auto', textAlign: 'center' }}>
                        <Title>
                            <Latex>
                                $Mualphatheta$
                            </Latex>
                        </Title>
                    </Box>
                </ThickToolbar>    
                <ThinToolbar sx={{ minHeight: '36px', height: '16px'}}>
                    <Menu onClick={() => {Topage('top')}}>トップ</Menu>
                    <Menu onClick={() => {Topage('login')}}>ログイン</Menu>   
                    <Menu onClick={() => {Topage('signup')}}>サインアップ</Menu>    

                </ThinToolbar>
            </Container>    
        </AppBar>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root_about')
  );

reportWebVitals();