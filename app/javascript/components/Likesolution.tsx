import styled from 'styled-components';

// import Typography from '@mui/material/Typography';
import  React,{useMemo, useState, useEffect} from 'react';
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
import {useNavigate} from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Wrapper from './Wrapper';
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

interface Props {
    logged_in: {
        bool: boolean
        id: number
        image: string,
        name: string
    }
}

const  Searchproblem:React.VFC<Props> = (props: Props) => {
    const [times, setTimes] = useState(0);
    const search_url = useMemo(() => {return  url + '/users/like_solutions/'; },[])
    const [problems,setProblems] = useState<any[]>([])
    const [load, setLoad] = useState(true)
    const [circular, setCircular] = useState(false);
    const [disable, setDisable] = useState(false);
    var real_url = ''
    const navigate = useNavigate()
    
    useEffect(() => {
        var mount = true
        if (mount) {
            if (!props.logged_in.bool) {
                navigate('/login')
            }
            setTimes(0)
            axios.get(search_url + '0').then(resp => {
                setProblems([...resp.data.solution]);
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
    }, [props.logged_in.bool,search_url]);
    
    const toProblem = (id: number) => {
        navigate('/problems/'+String(id))
    }
    
    const handlescroll = () => {
        setCircular(true)
        real_url = search_url + String(times+1);
        setTimes(times + 1)
        axios.get(real_url).then(resp => {
            setProblems([...problems,...resp.data.solution]);
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
            <Loadingwrapper>
                <Loading2 />
            </Loadingwrapper>
            :
                <Wrapper className='box'>
                    <List  sx={{ paddingTop: '0' ,marginTop: '0'}} >
                        <Divider key='divider1'/>
                        {problems.map((val: any,index) => {
                            return (<div key={index}>
                                <ListItemButton sx={{ padding: '0' }} onClick={() => {toProblem(val.id)}}>
                                    <ListItem  key={val.id.to_String+'item'} sx={{ height: '90px', padding: '0' }}>
                                        <Avatar key={val.id.to_String+'avatar'} alt={val.user_name} src={val.user_image} sx={{ height: '40px', width: '40px', marginLeft: '10px' }} />
                                        <List key={val.id.to_String+'list'} sx={{ width: '80%', paddingLeft: '10px', padding: '0 0 0 5px' }}>
                                            <ListItemText  key={val.id.to_String+'item1'} primary={val.user_name} primaryTypographyProps={{ fontSize: '18px', paddingLeft: '25px',paddingTop: '5px' }} />
                                            <Divider key={val.id.to_String+'divider1'} />
                                            <ListItemText key={val.id.to_String+'item3'}  primary={'#'+val.category} primaryTypographyProps={{ fontSize: '14px', paddingLeft: '30px', color: 'blue' }} />
                                            <Count>{val.slike_count }いいね</Count>
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
                </Wrapper>
                }
        </>
    )
}

export default Searchproblem
