import styled from 'styled-components';

// import Typography from '@mui/material/Typography';
import  React,{ useMemo,useState, useEffect} from 'react';
import axios from './axios';
import { url } from './url';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Loading from './Loading';
import Loadingwrapper from './Loadingwrapper';
import Fab from '@mui/material/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Wrapper from './Wrapper';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@mui/material/IconButton';
import '../../assets/stylesheets/index.css';



const Loading2 = styled(Loading)`
    height: 100%;
    width: 100%;
`
const Count = styled.div`
    width: 100%;
    text-align: right;
    font-size: 12px;
    padding-right: 15px;
`
const Date = styled.div`
    width: 100%;
    text-align: right;
    font-size: 12px;
    padding-right: 15px;
    color: rgb(200,200,200);
`
const Title = styled.div`
    width: 100%;
    text-align: left;
    font-size: 18px;
    padding-left: 15px;
`
const Menubutton = styled.div`
    width: 100%;
    text-align: right;
    position: fixed;
    top: 64px;
    left: 0px;
    height: 40px;
    z-index: 500;
    box-shadow: 0px 2px 1px 0 rgb(100,100,100,0.2) inset;
    background: rgb(250,250,250);
    @media(min-width: 600px){
        width: 60vw;
        left: 40vw;
    }
    @media(min-width: 1025px){
        border-right: 1px solid rgb(200,200,200);
        width: calc(45vw - 1px);
        left: 20vw;
    }
`
const Wrapper2 = styled(Wrapper)`
    margin-top: 40px;
    height: calc(100vh - 104px);
`
const Shadow = styled.div`
    width: 100%;
    position: fixed;
    top: 64px;
    left: 0px;
    height: 40px;
    z-index: 400;
    box-shadow: 0 2px 3px 0 rgb(100,100,100,0.2);
    @media(min-width: 600px){
        width: 60vw;
        left: 40vw;
    } 
    @media(min-width: 1025px){
        width: calc(45vw - 1px);
        left: 20vw;
    }
`

const Feed: React.VFC = () => {
    const [type, setType] = useState('search')
    const [times, setTimes] = useState(0);
    const search_url = useMemo(() => {return  url + '/problems/'; },[])
    const [problems,setProblems] = useState<any[]>([])
    const [load, setLoad] = useState(true)
    const [circular, setCircular] = useState(false);
    const [disable, setDisable] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (typ: string) => {
        setType(typ)
        setAnchorEl(null);
    };
    const handleClosewithouttype = () => {
        setAnchorEl(null);
    }
    var real_url = ''
    const navigate = useNavigate();
    
    useEffect(() => {
        var mount = true
        if (mount) {
            setLoad(true)
            window.scroll({ top: 0, behavior: "auto" })
            setTimes(0)
            axios.get(search_url + type + '/' + 0 + '/').then(resp => {
                // console.log(resp.data.problem)
                setProblems([...resp.data.problem]);
                setLoad(false)
                if (resp.data.ifend) {
                    setDisable(true)
                }
            }).catch(e => {
                console.log(e)
                setTimes(0)
            })
        }
        return () => {mount=false}
    }, [search_url,type]);
    
    const toProblem = (id: number) => {
        navigate('/problems/'+String(id))
    }
    
    const handlescroll = () => {
        setCircular(true)
        real_url = search_url + type + '/' + String(times + 1) + '/';
        setTimes(times + 1)
        axios.get(real_url).then(resp => {
            setProblems([...problems,...resp.data.problem]);
            setCircular(false)
            if (resp.data.ifend) {
                setDisable(true)
            }
            }).catch(e => {
                console.log(e)
            })
    }
    

    return (
        <>
            <Shadow/>
            <Menubutton>
                    {type == 'recommend' && 'おすすめ'}
                    {type == 'rank' && '人気順'}
                    {type == 'search' && '新着順'}
                    <IconButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MoreVertIcon/>
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClosewithouttype}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                            <MenuItem onClick={() => { handleClose('recommend') }}>おすすめ</MenuItem>
                            <MenuItem onClick={() => { handleClose('rank') }}>人気順</MenuItem>
                            <MenuItem onClick={() => { handleClose('search')}}>新着順</MenuItem>
                    </Menu>
                </Menubutton>
            {load ? 
            <Loadingwrapper>
                <Loading2 />
            </Loadingwrapper>
                :<>
            <Wrapper2 className='box'>
                    <List  sx={{ paddingTop: '0' ,marginTop: '0'}} >
                        <Divider key='divider1'/>
                        {problems.map((val: any,index) => {
                            return (<div key={index}>
                                <ListItemButton sx={{ padding: '0' }} onClick={() => {toProblem(val.id)}} >
                                    <ListItem  key={val.id.to_String+'item'} sx={{ height: '120px', padding: '0' }}>
                                        <Avatar key={val.id.to_String+'avatar'} alt={val.name} src={val.user_image} sx={{ height: '40px', width: '40px', marginLeft: '10px' }} />
                                        <List key={val.id.to_String+'list'} sx={{ width: '80%', paddingLeft: '10px', padding: '0 0 0 5px' }}>
                                            <Date>{val.update_time_of_problem }</Date>
                                            <ListItemText  key={val.id.to_String+'item1'} primary={val.user_name} primaryTypographyProps={{ fontSize: '18px', paddingLeft: '30px',paddingTop: '5px' }} />
                                            <Divider key={val.id.to_String+'divider1'} />
                                            <Title>{ val.title}</Title>
                                            <ListItemText key={val.id.to_String+'item2'} primary={'#'+val.category } primaryTypographyProps={{ fontSize: '14px', paddingLeft: '30px', color: 'blue' }} />
                                            <Count>{ val.plike_count}いいね</Count>
                                        </List>
                                    </ListItem>
                                </ListItemButton>
                                <Divider key={val.id.to_String + 'divider2'} />
                            </div>
                            )
                        })}
                        {!circular ? 
                            <ListItem id='miniload' key='loaditem' sx={{ height: '70px', padding: '0' }}>
                        { !disable && <><Fab aria-label="add" sx={{  border: '1px rgb(98,224,224) solid',margin: 'auto', color: 'rgb(98,224,224)', bgcolor: 'rgb(400,400,400)' ,'&:hover': {bgcolor: 'rgb(200,200,200)',color: 'rgb(400,400,400)',border:'none'}, '&:disabled': {opacity: '0.7', border: 'none'}}} onClick={handlescroll} >
                            <AddIcon  />
                                </Fab>
                        </>}
                        </ListItem>:
                        <ListItem id='miniload' key='loaditem' sx={{ height: '70px', padding: '0' }}>
                            <CircularProgress sx={{margin: 'auto'}} />
                        </ListItem>
                        }
                    </List></Wrapper2></>
                }
        </>
    )
}

export default Feed
