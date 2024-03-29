import styled from 'styled-components'
import axios from './axios'
import React, { useState, useRef,useEffect} from 'react'
import {url} from './url'
import { TextField } from '@material-ui/core'
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import Wrapper from './Wrapper';
import TextareaAutosize from '@mui/material/TextareaAutosize';
// import Latex from 'react-latex-next';
import '../../assets/stylesheets/index.css';
const  Latex = require('react-latex');


const Textareawrapper = styled.div`
    margin: 20px auto 30px auto;
    width: 79%;
    max-width: 448px;
`



const Input = styled(TextField)`
    width: 100%;
`
const Fileinput = styled.input`
    display: none;
    width:100%;
    height: 100%;
`
const Filewrapper = styled.label`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    cursor: pointer;
`
const Filewrapper2 = styled.div`
    width: 100px;
    display: flex;
    justify-content: center;
    margin: auto;
`
const Preview = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin : 5px auto 15px auto;
`
const Inputwrapper = styled.div`
    width: 80%;
    margin: 30px auto 15px auto;
    max-width: 450px;
`
const Message = styled.div`
    font-size: 30px;
    width: 100%;
    text-align: center;
    margin: 30px auto;
    white-space: pre-wrap;
`
const Button = styled(LoadingButton)`
    width: 150px;
    text-align: center;
    margin: 20px atuo 20px auto;
`
const Recommend = styled.div`
    margin:auto;
    margin-top: 10px;
    margin-bottom: 150px;
    padding: 10px;
    text-align: center;
`
const Tologin = styled.div`
    color: blue;
`
const Defaultdiv = styled.div`
    width: 200px;
    margin: 30px auto 20px auto;;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 10px;
    padding: 5px 0 5px 0;
    cursor: pointer;
`
const Errortext = styled.div`
    width: 80%;
    margin: 0 auto 35px auto;
    text-align: left;
    padding-left: 10px;
    color: red;
    font-size: 13px;
`


interface Props {
    logged_in: {
        bool: boolean
        id: number
        image: string
        name: string
    };
    setLogged_in:React.Dispatch<React.SetStateAction<{
        bool: boolean;
        id: number;
        image: string;
        name: string;
    }>>
}

const Signup: React.FC<Props> = (props) => {
    const Nameref = useRef(null);
    const Passref = useRef(null);
    const Passconfref = useRef(null);
    const Imageref = useRef(null);
    const textref = useRef(null);
    const navigate = useNavigate();
    const [nameerror, setNameerror] = useState('');
    const [passerror, setPasserror] = useState(false);
    const [passconferror, setPassconferror] = useState(false);
    
    const create_url: string = url + '/users';
    const [imgurl, setImgurl] = useState('/newuserimage.png');
    const [load, setLoad] = useState(false);
    const [ifdefault, setIfdefault] = useState('default');
    useEffect(() => {
        if (props.logged_in.bool) {
            navigate('/users/'+props.logged_in.id, { replace: true})
        }
    },[])
    const handle = () => {
        setLoad(true);
        var error1 = false;
        var error2 = false;
        var error3 = false;
        setNameerror('');
        setPasserror(false);
        setPassconferror(false);
        const name: any = Nameref.current;
        const pass: any = Passref.current;
        const passconf: any = Passconfref.current;
        const text: any = textref.current;
        const image: any = Imageref.current;
        if (!name || !name.childNodes[1].childNodes[0].value) {
            error1 = true;
            setNameerror('empty')
        } else if (name.childNodes[1].childNodes[0].value.length >10) {
            setNameerror('long')
        }
        if (!pass || pass.childNodes[1].childNodes[0].value.length<6) {
            error2 = true;
            setPasserror(true)
        }
        if (!passconf || pass.childNodes[1].childNodes[0].value !== passconf.childNodes[1].childNodes[0].value) {
            error3 = true;
            setPassconferror(true)
        }
        if (error1 || error2 || error3) {
            setLoad(false)
            return 
        }
        const data = new FormData()
        data.append('user[name]', name.childNodes[1].childNodes[0].value)
        data.append('user[password]', pass.childNodes[1].childNodes[0].value)
        data.append('user[password_confirmation]', passconf.childNodes[1].childNodes[0].value)
        if (!image.files[0] || ifdefault==='default') {
            data.append('user[image]', '')
        } else {
            data.append('user[image]', image.files[0])
        }
        if (text && text.value) {
            data.append('user[description]', text.value)
        }
        // console.log(image.files[0])
        // console.log(data)
        axios.post(create_url, data).then(resp => {
            setLoad(false)
            const id = resp.data.user.id
            axios.get(url + '/logged_in').then(resp => {
                props.setLogged_in(resp.data)
                navigate('/users/' + id, {replace: true});
            }).catch(e => {
                console.log(e)
            })
        }).catch(e => {
            setNameerror('exist')
            console.log(e.response.data.error);
            setLoad(false);
        })
    };
    const imghandle = (e: any) => {
        if (e.target.files[0]) {
            setIfdefault('nondefault')
            setImgurl(URL.createObjectURL(e.target.files[0]));
        }
    };
    const defaulthandle = () => {
        setIfdefault('default');
        setImgurl('/newuserimage.png');
    }
   
    return (
        <Wrapper className='box'>
            <Message><Latex>$Sign$ $up$</Latex></Message>
            <Filewrapper2>
                <Filewrapper htmlFor='fileinput'>
                    <Preview src={imgurl}  />
                </Filewrapper>
                <Fileinput  id='fileinput' ref={Imageref} type='file' accept="image/*" onChange={(e)=>{imghandle(e)}}/>
            </Filewrapper2>
            <Defaultdiv onClick={defaulthandle} >デフォルト画像</Defaultdiv>
            <Inputwrapper><Input ref={Nameref} error={nameerror ? true : false} label="ユーザー名" variant="outlined" placeholder='10文字以下' /></Inputwrapper>
            {nameerror && <>
                {nameerror === 'empty' && 'ユーザー名を入力してください'}
                {nameerror === 'exist' && 'そのユーザー名は使えません'}
                {nameerror === 'long' && '名前は10文字以下です'}</>}
            <Textareawrapper>
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                    style={{ width: '100%' }}
                    placeholder='紹介文を書いてください(任意)'
                ref={textref}
                    />
            </Textareawrapper>
            <Inputwrapper><Input  ref={Passref} error={passerror} label="パスワード" variant="outlined" type='password' placeholder='６文字以上'/></Inputwrapper>
            {passerror && <Errortext>パスワードは６文字以上です</Errortext>}
            <Inputwrapper><Input ref={Passconfref} error={passconferror} label="パスワード確認" variant="outlined" type='password' /></Inputwrapper>
            {passconferror && <Errortext>パスワードと一致していません</Errortext>}
            
            
            <Button loading={load} onClick={handle} variant="outlined" >
                登録
            </Button>
            <Recommend>
                アカウントをお持ちの方は→<Tologin onClick={() => {navigate('/login')}}>ログイン画面へ</Tologin>
            </Recommend>
        </Wrapper>
    )
}

export default Signup
