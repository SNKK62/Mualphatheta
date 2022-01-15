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
    keyword: string
}
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
const Date = styled.div`
    width: 100%;
    text-align: right;
    font-size: 12px;
    padding-right: 15px;
    color: rgb(200,200,200);
`

const Searchproblemsub:React.VFC<Props> = (props: Props) => {
    const [times, setTimes] = useState(0);
    const search_url = useMemo(() => { return url + '/problems/search/'; },[])
    const [problems,setProblems] = useState<any[]>([])
    const [load, setLoad] = useState(true)
    const [circular, setCircular] = useState(false);
    const [disable, setDisable] = useState(false);
    var real_url = ''
    const navigate = useNavigate();

    const toProblem = (id: number) => {
        navigate('/problems/'+String(id))
    }
    
    useEffect(() => {
        var mount = true
        if (mount) {
            setLoad(true)
            setTimes(0)
            axios.get(search_url + 0 + '/' + props.keyword).then(resp => {
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
    }, [props.keyword,search_url]);
    
    
    
    const handlescroll = () => {
        setCircular(true)
        real_url = search_url + String(times+1) + '/' + props.keyword;
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
            {load ? 
            <Loadingwrapper2>
                <Loading2 />
            </Loadingwrapper2>
            :
                
                    <List  sx={{ paddingTop: '0' ,marginTop: '0'}} >
                        <Divider key='divider1'/>
                        {problems.map((val: any,index) => {
                            return (<div key={index}>
                                <ListItemButton  sx={{ padding: '0' }} onClick={() => {toProblem(val.id)}}>
                                    <ListItem  key={val.id.to_String+'item'} sx={{ height: '135px', padding: '0' }}>
                                        <Avatar key={val.id.to_String+'avatar'} alt={val.user_name} src={val.user_image} sx={{ height: '40px', width: '40px', marginLeft: '10px' }} />
                                        <List key={val.id.to_String+'list'} sx={{ width: '80%', paddingLeft: '10px', padding: '0 0 0 5px' }}>
                                            <Date>{val.update_time_of_problem }</Date>
                                            <ListItemText  key={val.id.to_String+'item1'} primary={val.user_name} primaryTypographyProps={{ fontSize: '18px', paddingLeft: '25px', paddingTop: '5px' }} />
                                            <Divider key={val.id.to_String+'divider1'} />
                                            <ListItemText key={val.id.to_String+'item3'} primary={'#'+val.category} primaryTypographyProps={{ fontSize: '14px',paddingTop: '5px', paddingLeft: '30px', color: 'blue' }} />
                                            <Title>{ val.title}</Title>
                                            <Count>{val.plike_count }いいね</Count>
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

export default Searchproblemsub
