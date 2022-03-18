import styled from 'styled-components'
import axios from './axios';
import { LoadingButton } from '@mui/lab';
import React,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { url } from './url';
import Wrapper from './Wrapper';
// import Latex from 'react-latex-next';
import '../../assets/stylesheets/index.css';
import TextareaAutosize from '@mui/material/TextareaAutosize';


// const  Latex = require('react-latex');

const Textwrapper = styled.div`
    width: 80%;
    max-width: 450px;
    margin: 40px auto 40px auto;
`
const Button = styled(LoadingButton)`
    width: 150px;
    text-align: center;
`

const Message = styled.div`
    font-size: 30px;
    margin: 10vh auto 0 auto;
    white-space: pre-wrap;
`
const Errortext = styled.div`
    width: 80%;
    margin: 10px auto 30px auto ;
    text-align: center;
    background-color: red;
    color: white;
    padding: 5px 15px 5px 15px;
    border-radius: 30px;
`
const Successtext = styled.div`
    width: 80%;
    margin: 10px auto 30px auto ;
    text-align: center;
    background-color: rgb(0,200,150);
    color: white;
    padding: 5px 15px 5px 15px;
    border-radius: 30px;
`
const CustomTextareaAutosize = styled(TextareaAutosize)`
    width: 100%;
    height: 200px;
    min-height: 200px;
`

interface Props {
    logged_in: {
        bool: boolean
        id: number
        image: string
        name: string
    };
}

const  Login:React.VFC<Props> = (props: Props) => {

    const [load, setLoad] = useState(false);
    const [error, setError] = useState('none');
    const [description, setDescription] = useState('')
    const form_url = url + '/forms'
    const navigate = useNavigate()

    useEffect(() => {
        var mount = true
        if (mount) {
            if (!props.logged_in.bool) {
                navigate('/login')
            }
        }
        return () => {mount=false}
    })

    const handle = () => {
        setLoad(true);
        setError('none');
        if (description.length === 0) {
            setError('error')
            setLoad(false);
            return
        }
        const data = new FormData()
        data.append('form[description]', description);
        axios.post(form_url, data).then(() => {
            setDescription('')
            setError('success')
            setLoad(false)
        }).catch((e) => {
            setError('error');
            console.log(e);
            setLoad(false);
        })
    };


    return (
        <Wrapper className='box'>
            <Message>
                お問い合わせ・ご意見
            </Message>
               {(error === 'error') && <Errortext>空欄では送信できません</Errortext>}
               {(error === 'success') && <Successtext>送信しました</Successtext>}
            <Textwrapper>
                <CustomTextareaAutosize  placeholder='ご意見などを記入してください' value={description} onChange={e => {setDescription(e.target.value)}} />
            </Textwrapper>
            
            <Button loading={load} onClick={handle} variant="contained" >
                送信
            </Button>
        </Wrapper>
        
    )
}

export default Login
