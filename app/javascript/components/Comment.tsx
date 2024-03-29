
import styled from 'styled-components';
import dataFetch from './DataFetch';
import React,{ useReducer,useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from './axios';
import { url } from './url';
import Loading from './Loading';
import Loadingwrapper from './Loadingwrapper';
import Wrapper from './Wrapper';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@mui/material/Button';
// import Latex from 'react-latex-next';

import Modal from './Modal';
import '../../assets/stylesheets/index.css';


const  Latex = require('react-latex');


const Userwrapper = styled.div`
    display: grid;
    grid-template-columns: 80px 1fr;
    width: 90%;
    height: 80px;
    margin: 0 5% 0 5%;
`
const Image = styled.img`
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
`
const Username = styled.div`
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    padding-left: 10px;
    display: flex;
    align-items: center;
    margin: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
    
    font-size: 22px;
`
const Imagewrapper = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    display: flex;
    align-items: center;
    margin: auto;
`

const Description = styled.div`
    white-space: pre-wrap;
    word-wrap: break-word;
    width: 90%;
    border: 1px solid black;
    border-radius: 10px;
    background-color: rgb(230,230,230,0.4);
    margin: 10px auto;
    text-align: left;
    font-size: 18px;
    margin-bottom: 10px;
    padding: 30px 10px 30px 10px;
`
const Buttonwrapper = styled.div`
    width: 30%;
`
const Towrapper = styled.div`
    width: 30%;
`
const Bigwrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`

const initialState = {
    isLoading: true,
    isError: '',
    post: {}
};

interface Props {
    logged_in: {
        bool: boolean,
        id: number,
        image: string,
        name: string
    }
}

const Comment:React.VFC<Props> = (props: Props) => {
    const { id } = useParams()
    const comment_url = url + '/comments/' + id 
    const [dataState, dispatch] = useReducer(dataFetch, initialState);
    const navigate = useNavigate()
    const [modal , setModal] = useState(false)
    useEffect(() => {
        var mount = true
        if (mount) {
            axios.get(comment_url).then(resp => {
                dispatch({ type: 'success', payload: resp.data })
            }).catch(e => {
                console.log(e);
            })
        }
        return () => {mount=false}
    }, [comment_url,id])
    const toproblem = () => {
        dispatch({ type: 'init', payload: '' })
        if (dataState.post.comment.problem_id) {
            navigate('/problems/'+dataState.post.comment.problem_id, {state:{back: true}})
        } else {
            navigate('/solutions/'+dataState.post.comment.solution_id)
        }
    }
    const toedit = () => {
        navigate('/comments/'+id+'/edit')
    }
    const handledelete = () => {
        axios.delete(url + '/comments/' + id).then(() => {
            setModal(false)
            if (dataState.post.comment.problem_id) {
                navigate('/problems/'+dataState.post.comment.problem_id, {state:{back: true}, replace: true})
            } else {
                navigate('/solutions/'+dataState.post.comment.solution_id, {replace: true})
            }
        }).catch(e => {
            console.log(e)
        })
    }
    const modalopen = () => {
        setModal(true)
    }
    const modalclose = () => {
        setModal(false)
    }
    return (<>
            {modal &&
                <Modal delete={handledelete} close={modalclose} />
            }
        {dataState.isLoading ?
            <Loadingwrapper><Loading /></Loadingwrapper> : 
            <Wrapper className='box'>
            <Userwrapper>
                <Imagewrapper>
                        <Image src={dataState.post.user_image} onClick={() => {navigate('/users/'+String(dataState.post.comment.user_id))}} />
                </Imagewrapper>
                    <Username>
                        {dataState.post.user_name}</Username>
            </Userwrapper>
                        <Bigwrapper><Towrapper>
                        <Button variant='text' sx={{ width: '100%' }} onClick={toproblem}>{dataState.post.comment.problem_id ? '問題' : '解答'}に戻る</Button>
                    </Towrapper>
                    
                    {props.logged_in.id === dataState.post.comment.user_id && <Buttonwrapper>
                        <IconButton onClick={toedit}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton sx={{color: 'red'}} onClick={modalopen}>
                            <DeleteForeverIcon />
                        </IconButton>
                    </Buttonwrapper>}
                </Bigwrapper>
            <Description className='tetete'><Latex>{dataState.post.comment.text}</Latex></Description>
        </Wrapper>
            }
    </>)
}

export default Comment
