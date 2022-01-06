import {TextField} from '@material-ui/core'
import styled from 'styled-components'
import axios from './axios';
import { LoadingButton } from '@mui/lab';
import React,{ useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { url } from './url';
import Wrapper from './Wrapper';
require('katex/dist/katex.min.css')
import Latex from 'react-latex-next';

const Text = styled(TextField)`
    width: 100%;
`;
const Textwrapper = styled.div`
    width: 80%;
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
    width: 100%;
    margin: 0 auto 30px auto ;
    text-align: center;
    color: red;
`
interface Props {
    logged_in: {
        bool: boolean
        id: number
        image: string
        name: string
    };
    setLogged_in: React.Dispatch<React.SetStateAction<{
        bool: boolean;
        id: number;
        image: string;
        name: string;
    }>>
}

const  Login:React.VFC<Props> = (props: Props) => {

    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);
    const Nameref = useRef(null);
    const Passref = useRef(null);
    const login_url = url + '/login'
    const navigate = useNavigate()

    useEffect(() => {
        if (props.logged_in.bool) {
            navigate('/users/'+props.logged_in.id,{replace: true})
        }
    })

    const handle = () => {
        setLoad(true);
        setError(false);
        const name: any = Nameref.current;
        const pass: any = Passref.current;
        const data = new FormData()
        data.append('session[name]', name.childNodes[1].childNodes[0].value);
        data.append('session[password]', pass.childNodes[1].childNodes[0].value);
        axios.post(login_url, data).then((resp) => {
            const id = resp.data.id;
            axios.get(url + '/logged_in').then(resp => {
                setLoad(false);
                props.setLogged_in(resp.data)
                navigate('/users/'+ id);
            })
        }).catch((e) => {
            setError(true);
            console.log(e);
            setLoad(false);
        })
    };


    return (
        <Wrapper>
            <Message>
                <Latex>
                    $Log$ $in$
                </Latex>
            </Message>
               {error && <Errortext>ユーザー名またはパスワードが正しくありません</Errortext>}
            <Textwrapper>
                <Text id="outlined" ref={Nameref} error={false} label="ユーザー名" variant="outlined" />
            </Textwrapper>
            <Textwrapper>
                <Text id="outlined-basic" ref={Passref} error={false} label="Password" type='password' variant="outlined" />
            </Textwrapper>
            <Button loading={load} onClick={handle} variant="contained" >
                ログイン
            </Button>
        </Wrapper>
        
    )
}

export default Login
