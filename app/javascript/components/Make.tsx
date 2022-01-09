import styled from 'styled-components';
import Wrapper from './Wrapper';
import React,{ useRef, useState, useEffect,  } from 'react';
import axios from './axios';
import { LoadingButton } from '@mui/lab';
import Fab from '@mui/material/Fab';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@mui/material/CircularProgress';
import {green, blue, red} from '@mui/material/colors';
import { url } from './url';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Latex from 'react-latex-next';
import TextField from '@mui/material/TextField';
import '../../assets/stylesheets/index.css';


const Textareawrapper = styled.div`
    margin: 40px auto 30px auto;
    width: 80%;
`


interface Props  {
    type: string;
    onClickfunction?: void;
    ifproblem: boolean;
    logged_in: {
        bool: boolean,
        id: number,
        image: string,
        name: string
    }
}
const Fileinput = styled.input`
    display: none;
`
const Filediv = styled.div`
    width: 100%;
    text-align: center;
    margin: 40px auto 40px auto;
`
const Filewrapper = styled.label`
    width: 150px;
    height: 40px;
    margin: auto;
    padding-top: 8px;
    cursor: pointer;
`
const File3wrapper = styled.div`
    width: 100%;
    margin: 15px auto 60px auto;
    display: flex;
    justify-content: space-around;
`

const Message = styled.div`
    width: 100%;
    font-size: 25px;
    margin: 30px auto;
`
const Submitbutton = styled(LoadingButton)`
    width: 100px;
    margin: 60px auto 0 auto;
    `
const Categoryinput = styled(InputBase)`
    width: 160px;
    margin: 0px 10px 0px 30px;
    border: 1px solid rgb(100,100,100);
    border-radius: 5px;
    padding-left: 5px;
    ${({ error }) => error && `
        border-color: red;
    `}
`
const Categorywrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`
const Keyword = styled.div`
    margin-left: 5px;
`
const Buttonwrapper = styled.div`
    margin-top: 80px;
    margin-bottom: 30px;
`
const Errortext = styled.div`
    text-align: left;
    color: red;
    margin-left: 65px;
    font-size: 14px;
`
const Fab1 = styled.div`
    width: 12%;
`
const Warn = styled.p`
    font-size: 13px;
`
const Inputwrapper = styled.div`
    width: 80%;
    max-width: 450px;
    margin: 20px auto 30px auto;
`
const Titleinput = styled(TextField)`
    width: 100%;
`
const TitleError = styled.div`
    text-align: left;
    color: red;
    margin: 5px auto 20px auto;
    font-size: 14px
    width: 80%;
`

const  Make:React.VFC<Props> = (props: Props) => {
    const textref = useRef(null);
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const keywordref = useRef(null);
    const titleref = useRef(null);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState('');
    const [titleerror, setTitleerror] = useState('')
    const [circleloading, setCircleloading] = useState([false,false,false]);
    const [success, setSuccess] = useState([false, false, false]);
    const [inputid, setInputid] = useState('1');
    const timer = useRef<number>();
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        var mount = true
        if (mount) {
            if (!props.logged_in.bool) {
                navigate('/login', { replace: true })
                return
            }
            return () => {
                clearTimeout(timer.current);
            };
        }
        return () => {mount=false}
    }, [navigate,props.logged_in.bool]);
    const handlecircular = (i: number) => {
        if (!circleloading[i]) {
            setSuccess(success.map((suc, index) => (index === i ? false : suc)));
            setCircleloading(circleloading.map((circle, index) => (index === i ? true : circle)));
            timer.current = window.setTimeout(() => {
                setSuccess(success.map((suc,index) => (index === i ? true: suc)));
                setCircleloading(circleloading.map((circle, index) => (index === i ? false : circle)));
            }, 2000);
        }
    };
    const handle = () => {
        setLoad(true);
        setError('');
        if (props.ifproblem) {
            const keyword: any = keywordref.current;
            const title: any = titleref.current;
            var kerror = false
            var terror = false
            if (!keyword || !keyword.childNodes[0].value) {
                setError('empty')
                kerror = true
                setLoad(false);
            } else if (keyword.childNodes[0].value.length > 12) {
                kerror = true
                setError('long')
                setLoad(false)
            }
            if (!title || !title.childNodes[1].childNodes[0].value) {
                terror = true
                setTitleerror('empty')
                setLoad(false)
            }
            else if (title.childNodes[1].childNodes[0].value.length > 16) {
                terror = true
                setTitleerror('long')
                setLoad(false)
            }
            if (kerror || terror) {
                return 
            }
        }
        const data = new FormData()
        const text: any = textref.current;
        var create_url = '';
        var new_url:string = '';
        if (props.ifproblem) {
            const keyword: any = keywordref.current;
            const title: any = titleref.current;
            data.append('problem[description]', text.value);
            data.append('problem[category]', keyword.childNodes[0].value);
            data.append('problem[title]', title.childNodes[1].childNodes[0].value);
            data.append('problem[image1]', image1);
            data.append('problem[image2]', image2);
            data.append('problem[image3]', image3);
            create_url = url + '/problems';
            new_url = '/problems/'
        } else {
            data.append('solution[description]', text.value);
            data.append('solution[image1]', image1);
            data.append('solution[image2]', image2);
            data.append('solution[image3]', image3);
            create_url = url + '/problems/'+ id +'/solutions';
            new_url = '/solutions/'
        }
        axios.post(create_url, data).then(resp => {
            const id:string = resp.data.id;
            setLoad(false);
            new_url = new_url + id;
            navigate(new_url,{replace: true});
        }).catch(err => {
            setLoad(false);
            console.log(err.response)
        })
    };
    const handlechange = (e: any) => {
        if (inputid === '1') {
            setImage1(e.target.files[0])
            setInputid('2');
        } else if (inputid === '2') {
            setImage2(e.target.files[0])
            setInputid('3')
        } else if (inputid === '3') {
            setImage3(e.target.files[0])
        }
    }
    const handledelete = (i: number) => {
        if (i === 1 && success[0]) {
            if (success[1]) {
                if (success[2]) {
                    setImage1(image2);
                    setImage2(image3);
                    setImage3('');
                    setSuccess(success.map((_, index) => (index === 2 ? false : true)))
                } else {
                    setImage1(image2);
                    setImage2('');
                    setSuccess(success.map((suc,index) => (index === 1 ? false : suc)))
                    setInputid('2');
                }
            } else {
                setImage1('');
                setInputid('1');
                setSuccess(success.map((suc,index) => (index === 0 ? false : suc)))
            }
        } else if (i === 2 && success[1]) {
            if (success[2]) {
                setImage2(image3);
                setImage3('');
                setSuccess(success.map((suc,index) => (index === 2 ? false : suc)))
            } else {
                setImage2('');
                setSuccess(success.map((suc,index) => (index === 1 ? false : suc)))
                setInputid('2');
            }
        } else if (i === 3 && success[2]) {
            setImage3('');
            setSuccess(success.map((suc,index) => (index === 2 ? false : suc)))
        }
    }
    
    return (
        <>
            <Wrapper className='box'>
                <Message>
                    <Latex>{props.type}</Latex><br/><Warn>texのテキストは$(半角)で囲んでください</Warn>
                </Message>
            <Textareawrapper>
            {props.ifproblem && <>
                <Inputwrapper>
                    <Titleinput error={titleerror ? true : false} ref={titleref} label='Title' placeholder='タイトル(16文字以下)' variant='standard'/>
                {titleerror && <TitleError>{titleerror==='empty' ? 'タイトルを入力してください' : 'タイトルは16文字以下です'}</TitleError>}
                </Inputwrapper></>
            }    
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={5}
                    style={{ width: '80%' }}
                ref={textref}
                    />
            </Textareawrapper>
                {props.ifproblem && (<>
                    <Categorywrapper>
                        <Keyword>キーワード:</Keyword>
                        <Categoryinput ref={keywordref} error={error ? true: false} type='text' placeholder='12文字以下'/>
                    </Categorywrapper>
                    {error && <Errortext>{error==='empty' ? 'キーワードを入力してください' : 'キーワードは12文字以下です'}</Errortext>}</>
                )}
                <Filediv>
                    <Button variant='outlined' sx={{  paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, width: '150px', height: '40px', }}>
                        <Filewrapper htmlFor={inputid}>
                            画像を追加する
                        </Filewrapper>
                    </Button>
                </Filediv>
                <File3wrapper>
                    <Fab1>
                    {(!circleloading[0] && success[0]) && (
                    
                        <Fab aria-label='save' color='primary' sx={{
                            bgcolor: green[500],
                           
                        
                            '&:hover': { bgcolor: red[700] }
                        }} onClick={() => {handledelete(1)}} >
                            <CheckIcon />
                        </Fab>)}
                    {(!circleloading[0] && !success[0]) && (
                        <Fab aria-label='save' color='primary' sx={{
                            bgcolor: blue[500],
                            
                            '&:hover': { bgcolor: blue[500] }
                        }}>
                             1
                        </Fab>
                    )}
                        { circleloading[0] && (
                            <CircularProgress
                                size={68}
                                sx={{
                                    color: green[500],
                                   
                            }}
                            />
                        )}</Fab1>
                    <Fab1>
                    {(!circleloading[1] && success[1]) && (
                        <Fab aria-label='save' color='primary' sx={{
                            bgcolor: green[500],
                            
                            '&:hover': { bgcolor: red[700] }
                        }} onClick={() => {handledelete(2)}} >
                            <CheckIcon /> 
                        </Fab>)}
                    {(!circleloading[1] && !success[1]) && (
                        <Fab aria-label='save' color='primary' sx={{
                            bgcolor: blue[500],
                            
                            '&:hover': { bgcolor: blue[500] }
                        }}>
                             2
                        </Fab>
                    )}
                        {circleloading[1] &&  (
                            <CircularProgress
                                size={68}
                                sx={{
                                    color: green[500],
                                    
                            }}
                            />
                        )}</Fab1>
                    <Fab1>
                    {(!circleloading[2] && success[2]) && (
                        <Fab aria-label='save' color='primary' sx={{
                            bgcolor: green[500],
                            
                            '&:hover': { bgcolor: red[700] }
                        }} onClick={() => {handledelete(3)}} >
                            <CheckIcon /> 
                        </Fab>)}
                    {(!circleloading[2] && !success[2]) && (
                        <Fab aria-label='save' color='primary' sx={{
                            bgcolor: blue[500],
                            
                            '&:hover': { bgcolor: blue[500] }
                            
                        }}>
                            3
                        </Fab>
                    )}
                         {circleloading[2] && (
                            <CircularProgress
                                size={68}
                                sx={{
                                    color: green[500],
                                    
                            }}
                            />
                        )}</Fab1>
                </File3wrapper>

                <Fileinput  type='file' accept='images/*' id='1' onChange={(e) => { handlecircular(0); handlechange(e) }} />
                <Fileinput  type='file' accept='images/*' id='2' onChange={(e) => { handlecircular(1);  handlechange(e)}} />
                <Fileinput  type='file' accept='images/*' id='3' onChange={(e) => { handlecircular(2);  handlechange(e)}} />
                <Buttonwrapper>
                    <Submitbutton loading={load} onClick={handle} variant='contained' >投稿</Submitbutton>
                </Buttonwrapper>
            </Wrapper>
            
        </>
    )
}



export default Make
