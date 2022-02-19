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
import Fab from '@mui/material/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from 'react-router-dom'

const Loading2 = styled(Loading)`
    height: 100%;
    width: 100%;
`
const Loadingwrapper2 = styled.div`
    width: 35vw;
    height: 70vh;
    position: relative;
    z-index: 200;
    overflow-x: hidden;
    
`

interface Props {
    keyword: String
}

const Searchusersub:React.VFC<Props> = (props: Props) => {
    const [times, setTimes] = useState(0);
    const search_url = useMemo(() => {return  url + '/users/search/'; },[])
    const [users,setUsers] = useState<any[]>([])
    const [load, setLoad] = useState(true)
    const [circular, setCircular] = useState(false);
    const [disable, setDisable] = useState(false);
    var real_url = ''
    const navigate = useNavigate();
    
    
    useEffect(() => {
        var mount = true
        if (mount) {
            setLoad(true)
            setTimes(0)
            axios.get(search_url + 0 + '/' + props.keyword).then(resp => {
                setUsers([...resp.data.user]);
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
    }, [props.keyword, search_url]);
    
    const toUsers = (id: number) => {
        navigate('/users/'+String(id))
    }
    
    const handlescroll = () => {
        setCircular(true)
        real_url = search_url + String(times+1) + '/'+props.keyword ;
        setTimes(times + 1)
        console.log(users)
        axios.get(real_url).then(resp => {
            setUsers([...users,...resp.data.user]);
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
        
            {load ? 
            <Loadingwrapper2>
                <Loading2 />
            </Loadingwrapper2>
            :
                
                    <List  sx={{ paddingTop: '0' ,marginTop: '0'}} >
                        <Divider key='divider1'/>
                        {users.map((val: any,index) => {
                            return (<div key={index}>
                                <ListItemButton  sx={{ padding: '0' }} onClick={() => {toUsers(val.id)}}>
                                    <ListItem  key={val.id.to_String+'item'} sx={{ minHeight: '90px', padding: '0' }}>
                                        <Avatar key={val.id.to_String+'avatar'} alt={val.name} src={val.image_url} sx={{ height: '40px', width: '40px', marginLeft: '10px' }} />
                                        <List key={val.id.to_String+'list'} sx={{ width: '80%', paddingLeft: '10px', padding: '0 0 0 5px' }}>
                                            <ListItemText  key={val.id.to_String+'item1'} primary={val.name} primaryTypographyProps={{ fontSize: '23px', paddingLeft: '10px', textAlign: 'center',paddingTop: '5px' }} />
                                            <Divider key={val.id.to_String+'divider1'} />
                                            <ListItemText key={val.id.to_String+'item2'} primary={val.problems_count + '投稿 ' + val.solutions_count + '解答'} primaryTypographyProps={{ fontSize: '14px', paddingLeft: '5px' }} />
                                            <ListItemText key={val.id.to_String+'item3'} primary={val.follower_count + 'フォロワー ' + val.following_count + 'フォロー'} primaryTypographyProps={{ fontSize: '14px', paddingLeft: '5px' }} />
                                        </List>
                                    </ListItem>
                                </ListItemButton>
                                <Divider key={val.id.to_String+'divider2'}/>
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
                    </List>
                }
        </>
    )
}

export default Searchusersub
