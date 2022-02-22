import styled from 'styled-components';
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation, useMatch, matchPath} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
import Sidebar from './Sidebar';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import InputBase from '@mui/material/InputBase';
import MediaQuery from 'react-responsive';
import Notification from './Notification';
// import Latex from 'react-latex-next';
const  Latex = require('react-latex');

import axios from './axios';
import { url } from './url';

const SearchInput = styled(InputBase)`
    width: 100%;
    padding: 0;
    border-radius: 30px;
    border: 1px rgb(100,100,100,0.7) solid;
    background: rgb(80,80,80);
    padding-left: 15px;
    color: rgb(300,300,300);
    display: flex;
    align-items: center;
`
const Title = styled.div`
    font-size: 15px;
    @media(min-width: 600px){
        font-size: 20px;
    }
    @media(min-width: 1025px){
        font-size: 22px;
    }
`
interface Props {
    logged_in: {
        bool: boolean,
        id: number,
        image: string,
        name: string
    };
    handledelete: () => void,
    notification_show: boolean, 
    setNotification_show: React.Dispatch<React.SetStateAction<boolean>>,
}


function Appbar(props: Props) {
    const [state, setState] = useState(false);
    const [notification, setNotification] = useState<any[]>([]);
    const [checked, setChecked] = useState(false);
    const { pathname } = useLocation();
    const patharray: string[] = useMemo(() => {
        return ['/users/:id','/users/:id/solutions','/users/:id/followers','/users/:id/followings','/users/:id/edit','/problems/new','/problems/:id/solutions/new','/problems/:id/solutions','/problems/:id/edit','/problems/:id/comments/new','/solutions/:id','/solutions/:id/edit','/solutions/:id/comments/new','/comments/:id','/comments/:id/edit']
    }, [])
    const match = useMemo(() => {
        return patharray.find((path) => !!matchPath(path, pathname));
    }, [pathname]);
    const problem_path: string[] = useMemo(() => {
        return ['/problems/:id']
    }, [])
    const problem_match = useMemo(() => {
        return problem_path.find((path) => !!matchPath(path, pathname))
    }, [pathname])
    const navigate = useNavigate();
    const ifsearch = useMatch('/search')
    const ifsearchprocess = useMatch('/searchprocess')
    const query = new URLSearchParams(useLocation().search)
    const [search, setSearch] = useState(query.get('text') ? query.get('text') : '');
    type Locprops = { back: boolean };
    const location = useLocation();
    const locback = location.state as Locprops;
    const back: boolean = locback ? locback.back : false;
    const toggleDrawer = (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) =>{
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
              (event as React.KeyboardEvent).key === 'Shift')
          ) {
            return;
          }
            setState( open );
        };
    const handlesearch = (b: boolean) => {
        b ? navigate('/search?keyword=') : navigate(-1)
    };
    const handlechangekeyword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearch(e.target.value)
    };
    const handlesubmit = () => {
        navigate('/searchprocess',{replace: true})
        window.setTimeout(() => { navigate('/search?keyword=' + search, { replace: true }) },500)
    }
    const handlekeypress = (e: any) => {
        if (e.key === 'Enter') { 
            handlesubmit()
        }
    }
    const handlenotice = () => {
        if (props.notification_show) {
            props.setNotification_show(false)
        } else {
            props.setNotification_show(true)
            setChecked(false)
        }
    }
    useEffect(() => {
        var mount = true
        if (mount) {
            const element = document.querySelector('input')
            if (element) {
                element.focus();
            }
            if (props.logged_in.id > 0) {
                axios.get(url + '/users/' + props.logged_in.id + '/notifications').then(resp => {
                    setNotification([...resp.data.notification]);
                    setChecked(resp.data.exist);
                }).catch(e => {
                    console.log(e)
                })
            }
        }
        return () => {mount=false}
    },[props.logged_in])
    const toProfile = () => {
        navigate('/users/'+props.logged_in.id)
    }
    return (<>
        <AppBar position="sticky"  sx={{height: '64px', bgcolor: 'rgb(50,50,50)',color: 'rgb(400,400,400)',zIndex: '500', boxShadow: '0 1px 5px rgb(50,50,50)' , padding: '0', width: '101vw'}}>
            <Container maxWidth="xl" sx={{height: '64px',padding: '0px 20px 20px 20px',width: '100vw',margin: '0px',maxWidth: '100vw'}}>
                <Toolbar disableGutters sx={{height: '64px', width: '95vw'}}>
                    {(ifsearch || ifsearchprocess) ?
                        <>
                            <IconButton
                                    size="medium"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={() => {handlesearch(false)}}
                                >
                                <ArrowBackIcon  />
                            </IconButton>
                            <Box sx={{ flexGrow: 1, display: 'flex' }}>
                                <SearchInput onChange={(e) => { handlechangekeyword(e) }} placeholder="検索キーワード..." sx={{color: 'white', width: '85%'}} defaultValue={ query.get('keyword')} onKeyPress={e => {handlekeypress(e)}} />
                                <IconButton sx={{ p: 0, margin: '10px'}} onClick={handlesubmit} color='inherit'>
                                    <SearchIcon />
                                </IconButton>
                            </Box>
                        </> : <>
                            <Box sx={{ flexGrow: 1, display: 'flex',position: 'absolute',left:'0' }}  >
                                {match &&
                                    <IconButton
                                        size="medium"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        color="inherit"
                                        onClick={() => { navigate(-1) }}
                                    >
                                        <ArrowBackIcon />
                                    </IconButton>
                                }
                                {(!match && problem_match && !back) &&
                                    <IconButton
                                        size="medium"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        color="inherit"
                                        onClick={() => { window.close(); }}
                                    >
                                        <CloseRoundedIcon />
                                    </IconButton>
                                }
                                {(!match && problem_match && back) &&
                                    <IconButton
                                        size="medium"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        color="inherit"
                                        onClick={() => { navigate(-1) }}
                                    >
                                        <ArrowBackIcon />
                                    </IconButton>
                                }
                            <MediaQuery query='(max-width: 600px)'>
                            <Tooltip title="サイドバーを開く">
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={(e: any) => { toggleDrawer(true)(e) }}
                                >
                                    <MenuIcon  />
                                </IconButton>
                            </Tooltip>
                            </MediaQuery>
                        </Box >
                        <Box sx={{ position: 'absolute', left: '25vw', width: '40vw', textAlign: 'center' }}>
                            <Title>
                                <Latex>
                                    $Mualphatheta$
                                </Latex>
                            </Title>
                        </Box>
                    

                        <Box sx={{ flexGrow: 0, position: 'absolute', right: '18px' }}>
                            { props.logged_in.bool && <>
                                {checked ?
                                    <IconButton sx={{ p: 0, marginRight: '5px', display: 'static', color: 'rgb(229,107,238)'}} onClick={() => { handlenotice() }} color='inherit'>
                                        <NotificationsRoundedIcon />
                                    </IconButton> : 
                                    <IconButton sx={{ p: 0, marginRight: '5px', display: 'static' }} onClick={() => { handlenotice() }} color='inherit'>
                                        <NotificationsRoundedIcon />
                                    </IconButton>
                                }
                            </>}
                            <MediaQuery query='(max-width: 1025px)'>
                                <IconButton sx={{ p: 0, marginRight: '5px', display:'static'}} onClick={() => { handlesearch(true) }} color='inherit'>
                                    <SearchIcon />
                                </IconButton>
                            </MediaQuery>        
                                {props.logged_in.bool &&
                                    <IconButton sx={{ p: 0 }} onClick={toProfile}>
                                        <Avatar alt="U" src={props.logged_in.image} />
                                    </IconButton>}
                        </Box>
                    </>}
                </Toolbar>
            </Container>
            <MediaQuery query='(max-width: 599px)'>
                <Sidebar setNotification_show={props.setNotification_show} state={state} setState={setState} toggleDrawer={toggleDrawer} logged_in={props.logged_in} handledelete={props.handledelete}/>
            </MediaQuery>
            </AppBar>
            {props.notification_show &&
                <Notification notification={notification} setShow={props.setNotification_show} show={props.notification_show} logged_in={props.logged_in} />
            }
    </>
    );
    };



export default Appbar
