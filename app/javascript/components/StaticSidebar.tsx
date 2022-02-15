import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import MediaQuery from 'react-responsive';
import React from 'react'
import '../../assets/stylesheets/index.css';


const Sidewrapper = styled.div`
border-right: 1px solid rgb(200,200,200);
height: calc(100vh - 64px);
overflow: auto;
position: fixed;
@media(min-width: 600px) {
    width: 40vw;
    margin-left: 0;
    box-sizing: border-box;
}
@media(min-width: 1025px) {
    width: 20vw;
    margin-left: 0;
    box-sizing: border-box;
}
`

interface Props {
    logged_in: {
      bool: boolean
      id: number
      image: string,
      name: string
    }
    handledelete: () => void
  }
const StaticSidebar:React.VFC<Props> = (props: Props) => {
    const navigate = useNavigate();
  const toPage = (s: string) => {
    if (s === 'プロフィール') {
      navigate('/users/'+props.logged_in.id)
    } else if (s === 'いいねした問題') {
        navigate('/users/like_problems')
    } else if (s === 'いいねした解答') {
        navigate('/users/like_solutions')
    } else if (s === '問題投稿') {
      navigate('/problems/new')
    } else if (s === 'サインアップ') {
      navigate('/signup')
    } else if (s === 'ログイン') {
      navigate('/login')
    } else if (s === 'ログアウト') {
      props.handledelete()
    } else if (s === 'トップ') {
      navigate('/')
    } else if (s === 'KaTexの書き方') {
      navigate('/katex')
    }
  }
    return (
        <Sidewrapper className='box'>
            <MediaQuery query='(min-width: 600px) and (max-width: 1024px)'>
            <Box
          sx={{ width: '40vw' ,height: '100vh'}}
      role="presentation"
    >{props.logged_in.bool && <>
      <Avatar src={props.logged_in.image} onClick={() => {toPage('プロフィール')}} sx={{cursor: 'pointer', width: '80px', height: '80px', margin: '20px auto 20px auto' }} />
      <Typography id='name' sx={{ textAlign: 'center', fontSize: '22px', marginBottom: '10px' }} >
        {props.logged_in.name}
      </Typography>
      <Divider /></>}
      {props.logged_in.bool ? <>
        <List>
            {['トップ', 'プロフィール', 'いいねした問題', 'いいねした解答', '問題投稿','KaTexの書き方'].map((text, index) => (
              <ListItem button key={index} onClick={() => { toPage(text) }}  >
                <ListItemText primary={text} sx={{ marginLeft: '20px' }} />
              </ListItem>
            ))}
          <Divider />
              <ListItem button onClick={() => { toPage('ログアウト') }}>
                <ListItemText primary={'ログアウト'}  sx={{marginLeft: '20px', color: 'red'}}/>
              </ListItem>      
        </List>
        </> :
        <List>
          {['トップ','ログイン', 'サインアップ'].map((text, index) => (<div key={index}>
            <ListItem button  onClick={() => { toPage(text) }}  >
              <ListItemText primary={text} sx={{ marginLeft: '20px' }} />
            </ListItem>
            <Divider/></div>
          ))}
        </List>}
        
                </Box>
            </MediaQuery>
        <MediaQuery query='(min-width: 1025px)'>
        <Box
          sx={{ width: '20vw',height: '100vh'}}
      role="presentation"
    >{props.logged_in.bool && <>
      <Avatar src={props.logged_in.image} onClick={() => {toPage('プロフィール')}} sx={{cursor: 'pointer' ,width: '80px', height: '80px', margin: '20px auto 20px auto' }} />
      <Typography id='name' sx={{ textAlign: 'center', fontSize: '22px', marginBottom: '10px' }} >
        {props.logged_in.name}
      </Typography>
      <Divider /></>}
      {props.logged_in.bool ? <>
        <List>
          {['トップ','プロフィール', 'いいねした問題', 'いいねした解答', '問題投稿','KaTexの書き方'].map((text, index) => (
            <ListItem button key={index} onClick={() => { toPage(text) }}  >
              <ListItemText primary={text} sx={{ marginLeft: '20px' }} />
            </ListItem>
          ))}
           <Divider />
              <ListItem button onClick={() => { toPage('ログアウト') }}>
                <ListItemText primary={'ログアウト'}  sx={{marginLeft: '20px', color: 'red'}}/>
              </ListItem> 
        </List>
        </> :
        <List>
          {['トップ','ログイン', 'サインアップ'].map((text, index) => (<div key={index}>
            <ListItem button onClick={() => { toPage(text) }}  >
              <ListItemText primary={text} sx={{ marginLeft: '20px' }} />
            </ListItem>
            <Divider/></div>
          ))}
        </List>}
        
                </Box>
        </MediaQuery>
        </Sidewrapper>
    )
}

export default StaticSidebar
