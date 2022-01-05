import styled from 'styled-components';

// import Typography from '@mui/material/Typography';
import  React,{ useState, useEffect } from 'react';
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
import { useLocation ,useNavigate} from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@mui/material/CircularProgress';


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
const Title = styled.div`
    width: 100%;
    text-align: left;
    font-size: 18px;
    padding-left: 15px;
`
const Loadingwrapper2 = styled(Loadingwrapper)`
    height: calc(100vh - 114px);
`



const Searchproblem:React.VFC = () => {
    const [times, setTimes] = useState(0);
    const search_url = url + '/problems/search/';
    const [problems,setProblems] = useState<any[]>([])
    const [load, setLoad] = useState(true)
    const [circular, setCircular] = useState(false);
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate()
    const query = new URLSearchParams(useLocation().search)
    
    useEffect(() => {
        setTimes(0)
        axios.get(query.get('keyword') ? '/api/v1/problems/search/0/' + query.get('keyword') : '/api/v1/problems/search/0/').then(resp => {
            setProblems([...resp.data.problem]);
            setLoad(false)
            if (resp.data.ifend) {
                setDisable(true)
            }
        }).catch(e => {
            console.log(e)
            setTimes(0)
        })
    }, []);
    
    const toProblem = (id: number) => {
        navigate('/problems/'+id)
    }
    
    const handlescroll = () => {
        setCircular(true)
        setTimes(times + 1)
        axios.get(query.get('keyword') ? search_url + 0 + '/' + query.get('keyword') : search_url+0+'/').then(resp => {
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
            {load ? 
            <Loadingwrapper2>
                <Loading2 />
            </Loadingwrapper2>
            :
                
                    <List  sx={{ paddingTop: '0' ,marginTop: '0'}} >
                        <Divider key='divider1'/>
                        {problems.map((val: any,index) => {
                            return (<div key={index}>
                                <ListItemButton sx={{ padding: '0' }} onClick={() => {toProblem(val.id)}}>
                                    <ListItem  key={val.id.to_String+'item'} sx={{ height: '120px', padding: '0' }}>
                                        <Avatar key={val.id.to_String+'avatar'} alt={val.user_name} src={val.user_image} sx={{ height: '40px', width: '40px', marginLeft: '10px' }} />
                                        <List key={val.id.to_String+'list'} sx={{ width: '80%', paddingLeft: '10px', padding: '0 0 0 5px' }}>
                                            <ListItemText  key={val.id.to_String+'item1'} primary={val.user_name} primaryTypographyProps={{ fontSize: '18px', paddingLeft: '25px',paddingTop: '5px' }} />
                                            <Divider key={val.id.to_String + 'divider1'} />
                                            <Title>{val.title }</Title>
                                            <ListItemText key={val.id.to_String+'item3'}  primary={'#'+val.category} primaryTypographyProps={{ fontSize: '14px', paddingLeft: '30px', color: 'blue' }} />
                                            <Count>{val.plike_count }いいね</Count>
                                        </List>
                                    </ListItem>
                                </ListItemButton>
                                <Divider key={val.id.to_String+'divider2'}/>
                            </div>
                            )
                        })}
                        <ListItem id='miniload' key='loaditem' sx={{ height: '70px', padding: '0' }}>
                        {!circular ? <>
                        {!disable && <Fab aria-label="add" sx={{  border: '1px rgb(98,224,224) solid',margin: 'auto', color: 'rgb(98,224,224)', bgcolor: 'rgb(400,400,400)' ,'&:hover': {bgcolor: 'rgb(200,200,200)',color: 'rgb(400,400,400)',border:'none'}, '&:disabled': {opacity: '0.7', border: 'none'}}} onClick={handlescroll}>
                            <AddIcon  />
                            </Fab> }</>: 
                            <CircularProgress sx={{margin: 'auto'}} />
                        }
                        </ListItem>
                        <Divider key='divider3'/>
                    </List>
                }
        </>
    )
}

export default Searchproblem
