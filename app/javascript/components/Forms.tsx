import React,{ useMemo,useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CircularProgress from '@mui/material/CircularProgress';
import axios from './axios';
import { url } from './url';
import Divider from '@mui/material/Divider';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'
// import Latex from 'react-latex-next';
import '../../assets/stylesheets/index.css';
// const  Latex = require('react-latex');



const Textwrapper = styled.div`
    width: 100%;
    white-space: pre-wrap;
    word-wrap: break-word;
    padding: 5px 0 5px 10px;
    font-size: 14px;
`
const Loadingwrapper = styled.div`
    padding: 15px 0 15px 0;
    margin: auto;
    width: 100%;
    text-align: center;
`

interface Props {
    logged_in: {
        bool: boolean
        id: number
        image: string,
        name: string
      }
}

const Forms:React.VFC<Props> = (props: Props) => {
    const form_url = useMemo(() => { return  url + '/forms'} ,[])
    const [forms, setForms] = useState<any[]>([])
    const [load, setLoad] = useState(true)
    const navigate = useNavigate()

    

    useEffect(() => {
        var mount = true
        if (mount) {
            if (props.logged_in.id !== 1) {
                navigate('/top', {replace: true})
            }
            setLoad(true)
            axios.get(form_url).then(resp => {
                setForms([...resp.data.forms]);
                setLoad(false)
            }).catch(e => {
                console.log(e)
            })
        }
        return () => {mount=false}
    }, [form_url]);
    
    
    return (
        <><Wrapper>
            {load ? 
                <Loadingwrapper>
                    <CircularProgress/>
                </Loadingwrapper>
            :
            <List  sx={{ paddingTop: '0' ,marginTop: '0'}} >
                        <Divider key='divider1'/>
                        {forms.map((val: any,index) => {
                            return (<div key={index}>
                                    <ListItem  key={val.id.to_String+'item'} sx={{ padding: '0' }}>
                                        <Textwrapper>
                                            {val.text}
                                        </Textwrapper>
                                    </ListItem>
                                <Divider key={val.id.to_String+'divider2'}/>
                            </div>
                            )
                        })}
            </List>
                }  </Wrapper>
        </>
    )
}

export default Forms
