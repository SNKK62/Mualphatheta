import  React,{ useState, useEffect} from 'react';
import axios from './axios';
import { url } from './url';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
// import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams,useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../assets/stylesheets/index.css';


const Loadingwrapper = styled.div`
    padding-top: 15px;
    padding-bottom: 15px;
    margin: auto;
    width: 100%;
    text-align: center;
    @media(min-width: 600px){
        width: 60vw;
    }
    @media(min-width: 1025px){
        width: 45vw
    }
`
const Count = styled.div`
    width: 95%;
    text-align: right;
    font-size: 12px;
    padding-right: 15px;
    height: 20px;
    margin-right: 5%;
`
const Title = styled.div`
    width: 100%;
    text-align: left;
    font-size: 18px;
    padding-left: 15px;
`
const Date = styled.div`
    width: 95%;
    text-align: right;
    font-size: 12px;
    padding-right: 15px;
    color: rgb(200,200,200);
`

const Idealsolutions:React.VFC = () => {
    const { id } = useParams();
    const [problems,setProblems] = useState<any[]>([])
    const [load, setLoad] = useState(true)
    const navigate = useNavigate()
    
    useEffect(() => {
        var mount = true
        if (mount) {
            axios.get(url + '/problems/' + id + '/ideal').then(resp => {
                setProblems([...resp.data.solution]);
                setLoad(false)
            }).catch(e => {
                console.log(e)
            })
        }
        return () => {mount=false}
    }, []);
    
    

    return (
        <>
        
            {load ? 
                <Loadingwrapper>
                    <CircularProgress/>
                </Loadingwrapper>
            :
                
                    <List  sx={{ padding: '0' ,marginTop: '0'}} >
                        <Divider key='divider1'/>
                        {problems.map((val: any,index) => {
                            return (<div key={index}>
                                <ListItemButton  sx={{ padding: '0',minHeight: '80px' }} onClick={() => {navigate('/solutions/'+String(val.id))}} >
                                    <List sx={{width: '100%'}}>
                                    <Date>{val.update_time_of_solution }</Date>
                                    <Title>{val.title }</Title>    
                                    <Count>{ val.slike_count}いいね</Count>
                                    </List>
                                </ListItemButton>
                                <Divider key={val.id.to_String+'divider2'}/>
                            </div>
                            )
                        })}
                    </List>
                }
        </>
    )
}

export default Idealsolutions
