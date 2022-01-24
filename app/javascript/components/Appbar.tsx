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
import InputBase from '@mui/material/InputBase';
import MediaQuery from 'react-responsive';
import Latex from 'react-latex-next';

const SearchInput = styled(InputBase)`
    width: 100%;
    padding: 0;
    border-radius: 15px;
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
    handledelete: () => void 
}

function Appbar(props: Props) {
    const [state, setState] = useState(false);
    const { pathname } = useLocation();
    const patharray: string[] = useMemo(() => {
        return ['/users/:id','/users/:id/solutions','/users/:id/followers','/users/:id/followings','/users/:id/edit','/problems/:id/','/problems/:id/solutions/new','/problems/:id/solutions','/problems/:id/edit','/problems/:id/comments/new','/solutions/:id','/solutions/:id/edit','/solutions/:id/comments/new','/comments/:id','/comments/:id/edit']
    },[])
    const match = useMemo(() => {
        return patharray.find((path) => !!matchPath(path, pathname));
    }, [pathname]);
    const navigate = useNavigate();
    const ifsearch = useMatch('/search')
    const ifsearchprocess = useMatch('/searchprocess')
    const query = new URLSearchParams(useLocation().search)
    const [search, setSearch] = useState(query.get('text') ? query.get('text') : '');
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
    useEffect(() => {
        var mount = true
        if (mount) {
            const element = document.querySelector('input')
            if (element) {
                element.focus();
            }
        }
        return () => {mount=false}
    },[])
    const toProfile = () => {
        navigate('/users/'+props.logged_in.id)
    }
    return (<>
        <AppBar position="sticky"  sx={{height: '64px', bgcolor: 'rgb(50,50,50)',color: 'rgb(400,400,400)',zIndex: '500', boxShadow: '0 1px 5px rgb(50,50,50)' , padding: '0', width: '100vw'}}>
            <Container maxWidth="xl" sx={{height: '64px',padding: '0px',width: '100vw',margin: '0px',maxWidth: '100vw'}}>
                <Toolbar disableGutters sx={{height: '64px'}}>
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
                                <SearchInput onChange={(e) => { handlechangekeyword(e) }} placeholder="検索キーワード..." sx={{color: 'white'}} defaultValue={ query.get('keyword')} onKeyPress={e => {handlekeypress(e)}} />
                                <IconButton sx={{ p: 0}} onClick={handlesubmit} color='inherit'>
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
                        <Box sx={{ position: 'absolute', left: '30vw', width: '40vw', textAlign: 'center' }}>
                            <Title>
                                <Latex>
                                    $Mualphatheta$
                                </Latex>
                            </Title>
                        </Box>
                    

                        <Box sx={{ flexGrow: 0, position: 'absolute', right: '18px' }}>
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
                <Sidebar state={state} setState={setState} toggleDrawer={toggleDrawer} logged_in={props.logged_in} handledelete={props.handledelete}/>
            </MediaQuery>
            </AppBar>
            
    </>
    );
    };



export default Appbar
