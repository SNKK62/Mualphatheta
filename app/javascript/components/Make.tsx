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
// import Latex from 'react-latex';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import '../../assets/stylesheets/index.css';

const Latex = require('react-latex');
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
    margin: 20px auto 40px auto;
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
    margin: 15px auto 0px auto;
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
    margin: 30px auto 0 auto;
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
    margin-top: 10px;
`
const Categorywrapper2 = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`
const Keyword = styled.div`
    margin-left: 5px;
`
const Buttonwrapper = styled.div`
    margin-top: 10px;
    margin-bottom: 100px;
`
const Errortext = styled.div`
    text-align: left;
    color: red;
    margin-left: 65px;
    font-size: 14px;
    margin-bottom: 5px;
`
const Errortext2 = styled.div`
    text-align: left;
    color: red;
    margin-left: 65px;
    font-size: 14px;
    margin-top: 12px;
    height: 20px;
`
const Errortext2empty = styled.div`
    text-align: left;
    color: red;
    margin-left: 110px;
    font-size: 14px;
    margin-top: 12px;
    height: 5px;
`
const Fab1 = styled.div`
    width: 12%;
`
const Warn = styled.p`
    font-size: 13px;
`
const Redwarn = styled.p`
    font-size: 13px;
    color: red;
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
const Description = styled.div`
    white-space: pre-wrap;
    word-wrap: break-word;
    width: 90%;
    border: 1px solid black;
    border-radius: 10px;
    background-color: rgb(230,230,230,0.4);
    margin: 20px auto;
    text-align: left;
    font-size: 18px;
    margin-bottom: 10px;
    padding: 30px 10px 30px 10px;
`


const Make: React.VFC<Props> = (props: Props) => {
    const [source, setSource] = useState('');
    const [level, setLevel] = useState('?????????')
    const [unit, setUnit] = useState('?????????')
    const [text, setText] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const keywordref = useRef(null);
    const titleref = useRef(null);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState('');
    const [titleerror, setTitleerror] = useState('');
    const [level_error, setLevel_error] = useState(false);
    const [unit_error, setUnit_error] = useState(false);
    const [circleloading, setCircleloading] = useState([false, false, false]);
    const [success, setSuccess] = useState([false, false, false]);
    const [inputid, setInputid] = useState('1');
    const timer = useRef<number>();
    const navigate = useNavigate();
    const { id } = useParams();
    const level_currencies = [
        {
            value: '?????????',
            label: '?????????',
        }, {
            value: '???I???A',
            lavel: '???I???A',
        }, {
            value: '?????????B',
            label: '?????????B',
        }, {
            value: '??????',
            label: '??????',
        }, {
            value: '????????????',
            label: '????????????',
        }, {
            value: '????????????',
            label: '????????????',
        },{
            value: '??????',
            label: '??????',
        }, {
            value: '?????????',
            label: '?????????',
        }
    ];
    const unit_currencies = [
        {
            value: '?????????',
            label: '?????????',
        }, {
            value: '??????',
            label: '??????',
        }, {
            value: '??????',
            label: '??????',
        }, {
            value: '??????',
            label: '??????',
        }, {
            value: '??????',
            label: '??????',
        }, {
            value: '?????????',
            label: '?????????',
        }, {
            value: '????????????',
            label: '????????????',
        }, {
            value: '??????',
            label: '??????',
        }, {
            value: '??????',
            label: '??????',
        }, {
            value: '????????????',
            label: '????????????',
        }, {
            value: '????????????',
            label: '????????????',
        }, {
            value: '???????????????',
            label: '???????????????',
        }, {
            value: '????????????',
            label: '????????????',
        }, {
            value: '??????',
            label: '??????',
        }, {
            value: '????????????',
            label: '????????????',
        }, {
            value: '??????',
            label: '??????', 
        }, {
            value: '????????????',
            label: '????????????',
        }, {
            value: '??????',
            label: '??????',
        }, {
            value: '??????',
            label: '??????',
        }, {
            value: '??????',
            label: '??????',
        }, {
            value: '????????????',
            label: '????????????',
        }, {
            value: '?????????',
            label: '?????????',
        }
    ];
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
        setTitleerror('');
        setLevel_error(false);
        setUnit_error(false);
        setError('');
        if (props.ifproblem) {
            const keyword: any = keywordref.current;
            const title: any = titleref.current;
            var kerror = false
            var terror = false
            var lerror = false
            var uerror = false
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
            if (unit === '?????????') {
                uerror = true
                setUnit_error(true)
                setLoad(false)
            }
            if (level === '?????????') {
                lerror = true
                setLevel_error(true)
                setLoad(false)
            }
            if (kerror || terror || lerror || uerror) {
                return 
            }
        }
        const data = new FormData()
        var create_url = '';
        var new_url:string = '';
        if (props.ifproblem) {
            const keyword: any = keywordref.current;
            const title: any = titleref.current;
            data.append('problem[description]', text);
            data.append('problem[source]', source);
            data.append('problem[level]', level);
            data.append('problem[unit]', unit);
            data.append('problem[category]', keyword.childNodes[0].value);
            data.append('problem[title]', title.childNodes[1].childNodes[0].value);
            data.append('problem[image1]', image1);
            data.append('problem[image2]', image2);
            data.append('problem[image3]', image3);
            create_url = url + '/problems';
            new_url = '/problems/'
        } else {
            data.append('solution[description]', text);
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
                    <Latex>{props.type}</Latex><br /><Warn>KaTex??????????????????$(??????)????????????????????????</Warn>
                    
                    <Redwarn>????????????$????????????????????????</Redwarn>
                </Message>
            <Textareawrapper>
            {props.ifproblem && <>
                <Inputwrapper>
                    <Titleinput error={titleerror ? true : false} ref={titleref} label='Title' variant='standard'/>
                {titleerror && <TitleError>{titleerror==='empty' && '???????????????????????????????????????'}</TitleError>}
                </Inputwrapper></>
            }    
                <TextareaAutosize
                        aria-label="minimum height"
                        minRows={5}
                        style={{ width: '80%' }}
                        onChange={e => { setText(e.target.value) }}
                    />
                </Textareawrapper>
                <Description className='tetete'>
                    <Latex>{ text}</Latex>
                </Description>
                {props.ifproblem && (<>
                    <Categorywrapper>
                        <Keyword>???????????????:</Keyword>
                        <Categoryinput ref={keywordref} error={error ? true: false} type='text' placeholder='12????????????'/>
                    </Categorywrapper>
                    {error && <Errortext>{error === 'empty' ? '??????????????????????????????????????????' : '??????????????????12??????????????????'}</Errortext>}
                    <Categorywrapper>
                        <Keyword>??????????????????:</Keyword>
                        <Categoryinput onChange={(e) => {setSource(e.target.value)}} type='text'/>
                    </Categorywrapper>
                    <Categorywrapper>
                        <Keyword>????????????:???</Keyword>
                        <TextField
                            id="outlined-select-currency"
                            select
                            InputProps={{
                                style: {
                                    height: 32,
                                    width: 150,
                                    padding: 5,
                                }
                            }}
                            value={level}
                            onChange={e => {setLevel(e.target.value)}}
                            sx={{height: '15px', width: '150px', padding: '5px'}}
                            >
                            {level_currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Categorywrapper>
                    {level_error ? <Errortext2>???????????????????????????????????????</Errortext2> : <Errortext2empty/>}
                    <Categorywrapper2>
                        <Keyword>??????:???</Keyword>
                        <TextField
                            id="outlined-select-currency"
                            select
                            value={unit}
                            InputProps={{
                                style: {
                                    height: 32,
                                    width: 150,
                                    padding: 5,
                                }
                            }}
                            onChange={e => {setUnit(e.target.value)}}
                            sx={{height: '15px', width: '150px', padding: '5px'}}
                            >
                            {unit_currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Categorywrapper2>
                    {unit_error ? <Errortext2>?????????????????????????????????</Errortext2> : <Errortext2empty/>}
                </>
                )}
                <Filediv>
                    <Button variant='outlined' sx={{ marginTop: '20px', paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, width: '150px', height: '40px', }}>
                        <Filewrapper htmlFor={inputid}>
                            ?????????????????????
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
                    <Submitbutton loading={load} onClick={handle} variant='contained' >??????</Submitbutton>
                </Buttonwrapper>
            </Wrapper>
            
        </>
    )
}



export default Make
