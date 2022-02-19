import  React,{ useState, useEffect} from 'react';
import axios from './axios';
import { url } from './url';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Fab from '@mui/material/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams} from 'react-router-dom';
import styled from 'styled-components';

const Loadingwrapper = styled.div`
    padding-top: 15px 0 15px 0;
    margin: auto;
    width: 100%;
    text-align: center;
`
const Count = styled.div`
    width: 100%;
    text-align: right;
    font-size: 12px;
    padding-right: 10px;
    height: 12px;
`
const Tag = styled.div`
    width: 100%;
    font-size: 14px;
    padding-left: 20px;
    color: blue;
`
const Listwrapper = styled.div`
    width: 95%;
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
const Redtext = styled.p`
    color: red;
`

const Userproblems:React.VFC = () => {
    const { id } = useParams();
    const [times, setTimes] = useState(0);
    const [problems,setProblems] = useState<any[]>([])
    const [load, setLoad] = useState(true)
    const [circular, setCircular] = useState(false);
    const [disable, setDisable] = useState(false);
    var real_url = ''
    // const navigate = useNavigate()
    
    useEffect(() => {
        var mount = true
        if (mount) {
            setTimes(0)
            axios.get(url + '/users/' + id + '/problems/0').then(resp => {
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
    }, []);
    
    const toProblem = (id: number) => {
        // navigate('/problems/'+String(id))
        window.open('/problems/'+String(id))
    }
    
    const handlescroll = () => {
        setCircular(true)
        real_url = url+'/users/'+id+'/problems/'+String(times + 1);
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
                <Loadingwrapper>
                    <CircularProgress/>
                </Loadingwrapper>
            :
                
                    <List  sx={{ paddingTop: '0' ,marginTop: '0'}} >
                        <Divider key='divider1'/>
                        {problems.map((val: any,index) => {
                            return (<div key={index}>
                                <ListItemButton sx={{ padding: '0', minHeight: '150px' }} onClick={() => { toProblem(val.id) }} >
                                    <Listwrapper>
                                        <Date>{val.update_time_of_problem }</Date>
                                        <Title>{val.title }</Title>
                                        <Tag>#{ val.category}</Tag>
                                        <Count>{val.ideal ? <Redtext>模範解答(想定解)有り</Redtext> : <Redtext>模範解答なし</Redtext>  }　{val.solutions_count}解答　{ val.comments_count}コメント　{ val.plike_count}いいね</Count>
                                    </Listwrapper>
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

export default Userproblems
