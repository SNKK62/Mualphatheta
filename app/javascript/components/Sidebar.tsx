// import styled from 'styled-components';
import React from 'react';
import {useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';



interface Props {
    state: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    toggleDrawer: any
    logged_in: {
      bool: boolean
      id: number
      image: string,
      name: string
    }
    handledelete: () => void
  }


function Sidebar(props: Props) {
  const navigate = useNavigate()
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
    }else if (s === 'ログアウト') {
      props.handledelete()
    } else if (s === 'トップ') {
      navigate('/')
    } else if (s === 'KaTexの書き方') {
      navigate('/katex')
    }
  }
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const list = () => (
    <Box
          sx={{ width: '250px' }}
      role="presentation"
      onClick={props.toggleDrawer(false)}
      onKeyDown={props.toggleDrawer(false)}
    >{props.logged_in.bool && <>
      <Avatar src={props.logged_in.image} onChange={(e) => { e.stopPropagation(); toPage('プロフィール')}} sx={{ width: '80px', height: '80px', margin: '20px auto 20px auto' }} />
      <Typography id='name' sx={{ textAlign: 'center', fontSize: '22px', marginBottom: '10px' }} >
        {props.logged_in.name}
      </Typography>
      <Divider /></>}
      {props.logged_in.bool ? <>
        <List>
          {['トップ','プロフィール', 'いいねした問題', 'いいねした解答', '問題投稿', 'KaTexの書き方'].map((text, index) => (
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
  );

  return (
    <div>
        <React.Fragment key={'left'}>
          <SwipeableDrawer
            anchor={'left'}
            open={props.state}
          onClose={e => { props.toggleDrawer(false)(e) }}
          onOpen={e => { props.toggleDrawer(true)(e) }}   
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          >
            {list()}
          </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}

export default Sidebar
