import styled from 'styled-components';
import Wrapper from './Wrapper';
import React,{ useRef, useState, useEffect, useReducer } from 'react';
import axios from './axios';
import { LoadingButton } from '@mui/lab';
import Fab from '@mui/material/Fab';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@mui/material/CircularProgress';
import {green, blue, red} from '@mui/material/colors';
import { url } from './url';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';
import Loadingwrapper from './Loadingwrapper';
import dataFetch from './DataFetch';
import InputBase from '@mui/material/InputBase';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import '../../assets/stylesheets/index.css';
const Latex = require('react-latex');


const Textareawrapper = styled.div`
    margin: 20px auto 30px auto;
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
const Filewrapper = styled.label`
    width: 100%;
    height: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
`
const File3wrapper = styled.div`
    width: 80%;
    margin: 30px auto 50px auto;
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
`
const Categoryinput = styled(InputBase)`
    width: 200px;
    margin: 0px 5px 0px 30px;
    border: 1px solid rgb(100,100,100);
    border-radius: 5px;
    padding-left: 10px;
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
    margin-left: 30px;
`
const Errortext = styled.div`
    text-align: left;
    color: red;
    margin-left: 110px;
    font-size: 14px;
    margin-bottom: 5px;
`
const Errortext2 = styled.div`
    text-align: left;
    color: red;
    margin-left: 110px;
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
const Submitbuttonwrapper = styled.div`
    margin-bottom: 100px;
`

const initialState = {
    isLoading: true,
    isError: '',
    post: {}
};

const Editproblem:React.VFC<Props> = (props: Props) => {
    const { id } = useParams()
    const get_url = props.ifproblem ? url + '/problems/' + id : url + '/solutions/' + id; 
    const [dataState, dispatch] = useReducer(dataFetch, initialState);
    const [level, setLevel] = useState('');
    const [unit, setUnit] = useState('');
    const [error, setError] = useState('');
    const [titleerror, setTitleerror] = useState('');
    const [level_error, setLevel_error] = useState(false);
    const [unit_error, setUnit_error] = useState(false);
    const [textarea, setTextarea] = useState('');
    const [source, setSource] = useState('');
    const [keyword, setKeyword] = useState('');
    const [title, setTitle] = useState('')
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [load, setLoad] = useState(false);
    const [circleloading, setCircleloading] = useState([false,false,false]);
    const [success, setSuccess] = useState([false, false, false]);
    const timer = useRef<number>();
    const navigate = useNavigate();

    const level_currencies = [
        {
            value: '未選択',
            label: '未選択',
        }, {
            value: '数I・A',
            lavel: '数I・A',
        }, {
            value: '数Ⅱ・B',
            label: '数Ⅱ・B',
        }, {
            value: '数Ⅲ',
            label: '数Ⅲ',
        }, {
            value: '大学数学',
            label: '大学数学',
        }, {
            value: '中学数学',
            label: '中学数学',
        },{
            value: '算数',
            label: '算数',
        }, {
            value: 'その他',
            label: 'その他',
        }
    ];
    const unit_currencies = [
        {
            value: '未選択',
            label: '未選択',
        }, {
            value: '積分',
            label: '積分',
        }, {
            value: '微分',
            label: '微分',
        }, {
            value: '極限',
            label: '極限',
        }, {
            value: '数列',
            label: '数列',
        }, {
            value: '複素数',
            label: '複素数',
        }, {
            value: 'ベクトル',
            label: 'ベクトル',
        }, {
            value: '整数',
            label: '整数',
        }, {
            value: '幾何',
            label: '幾何',
        }, {
            value: '式・計算',
            label: '式・計算',
        }, {
            value: '因数分解',
            label: '因数分解',
        }, {
            value: '集合・論理',
            label: '集合・論理',
        }, {
            value: '二次関数',
            label: '二次関数',
        }, {
            value: '統計',
            label: '統計',
        }, {
            value: '場合の数',
            label: '場合の数',
        }, {
            value: '確率',
            label: '確率', 
        }, {
            value: '三角関数',
            label: '三角関数',
        }, {
            value: '指数',
            label: '指数',
        }, {
            value: '対数',
            label: '対数',
        }, {
            value: '関数',
            label: '関数',
        }, {
            value: '二次曲線',
            label: '二次曲線',
        }, {
            value: 'その他',
            label: 'その他',
        }
    ];

    useEffect(() => {
        var mount = true
        if (mount) {
            dispatch({ type: 'init', payload: '' })
            axios.get(get_url).then(resp => {
                if (resp.data.problem.user_id !== props.logged_in.id) {
                    navigate('/problems/' + id, { replace: true })
                    return
                }
                if (resp.data.problem.image1_url || resp.data.problem.image1s_url) {
                    setImage1('1')
                    if (resp.data.problem.image2_url || resp.data.problem.image2s_url) {
                        setImage2('2')
                        if (resp.data.problem.image3_url || resp.data.problem.image3s_url) {
                            setImage3('3')
                            setSuccess([true, true, true])
                        } else {
                            setSuccess([true, true, false])
                        }
                    } else {
                        if (resp.data.problem.image3_url || resp.data.problem.image3s_url) {
                            setImage3('3')
                            setSuccess([true, false, true])
                        } else {
                            setSuccess([true, false, false])
                        }
                    }
                } else {
                    if (resp.data.problem.image2_url || resp.data.problem.image2s_url) {
                        setImage2('2')
                        if (resp.data.problem.image3_url || resp.data.problem.image3s_url) {
                            setImage3('3')
                            setSuccess([false, true, true])
                        } else {
                            setSuccess([false, true, false])
                        }
                    } else {
                        if (resp.data.problem.image3_url || resp.data.problem.image3s_url) {
                            setImage3('3')
                            setSuccess([false, false, true])
                        } else {
                            setSuccess([false, false, false])
                        }
                    }
                }
                    
               
                setTextarea(resp.data.problem.description);
                setKeyword(resp.data.problem.category);
                setSource(resp.data.problem.source);
                setLevel(resp.data.problem.level);
                setUnit(resp.data.problem.unit);
                setTitle(resp.data.problem.title)
                dispatch({ type: 'success', payload: resp.data })
            }).catch(e => {
                console.log(e);
            })
        }
        return () => {mount=false}
    }, [props.logged_in.id, navigate,  get_url])
    useEffect(() => {
        return() => {
            clearTimeout(timer.current);
        };
    }, []);
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
        var kerror = false;
        var terror = false;
        var lerror = false;
        var uerror = false;
        if (props.ifproblem) {
            if (!keyword) {
                kerror = true
                setError('empty')
                setLoad(false);
            } else if (keyword.length > 12) {
                setError('long')
                kerror = true
                setLoad(false)
            }
            if (!title) {
                terror = true
                setTitleerror('empty')
                setLoad(false)
            } 
            if (unit === '未選択') {
                uerror = true
                setUnit_error(true)
                setLoad(false)
            }
            if (level === '未選択') {
                lerror = true
                setLevel_error(true)
                setLoad(false)
            }
            if (terror || kerror || lerror || uerror) {
                return 
            }
        }
        const data = new FormData()
        var edit_url = '';
        var new_url:string = '';
        if (props.ifproblem) {
            data.append('problem[title]', title);
            data.append('problem[description]', textarea);
            data.append('problem[category]', keyword);
            data.append('problem[source]', source);
            data.append('problem[level]', level);
            data.append('problem[unit]', unit);
            data.append('problem[image1]', image1);
            data.append('problem[image2]', image2);
            data.append('problem[image3]', image3);
            edit_url = url + '/problems/' + id;
            new_url = '/problems/' + id;
        } else {
            data.append('solution[description]', textarea);
            data.append('solution[image1]', image1);
            data.append('solution[image2]', image2);
            data.append('solution[image3]', image3);
            edit_url = url + '/solutions/' + id;
            new_url = '/solutions/' + id;
        }
        axios.patch(edit_url, data).then(() => {
            setLoad(false);
            navigate(new_url,{replace: true});
        }).catch(err => {
            setLoad(false);
            console.log(err.response)
        })
    };
    const handlechange = (e: any, i: number) => {
        if (i === 1) {
            setImage1(e.target.files[0])
        }
        else if (i === 2) {
            setImage2(e.target.files[0])
        }
        else if (i === 3) {
            setImage2(e.target.files[0])
        }
    }
    const changetitle = (e: any) => {
        setTitle(e.target.value)
    }
    const handlechangetext = (e: any) => {
        setTextarea(e.target.value);
    }
    const handlechangekeyword = (e: any) => {
        setKeyword(e.target.value);
    }
    const handledelete = (i: number) => {
        if (i === 1 && success[0]) {
            if (success[1]) {
                setImage1('');
                setSuccess(success.map((suc,index) => (index === 0 ? false : suc)))
            }
        } else if (i === 2 && success[1]) {
                setImage2('');
                setSuccess(success.map((suc,index) => (index === 1 ? false : suc)))
        } else if (i === 3 && success[2]) {
            setImage3('');
            setSuccess(success.map((suc,index) => (index === 2 ? false : suc)))
        }
    }
    
    return (
        <>
        {
            dataState.isLoading ? <Loadingwrapper><Loading /></Loadingwrapper> : 
                <Wrapper className='box'>
                        <Message>
                            {props.type}の編集<br /><Warn>KaTexのテキストは$(半角)で囲んでください</Warn>
                            <Redwarn>数式のみ$で囲んでください</Redwarn>
                        </Message>
                        {props.ifproblem && <>
                <Inputwrapper>
                                <Titleinput error={titleerror ? true : false} onChange={e => { changetitle(e) }} label='Title' variant='standard' defaultValue={title}/>
                {titleerror && <TitleError>{titleerror==='empty' && 'タイトルを入力してください'}</TitleError>}
                </Inputwrapper></>
            }    
                    <Textareawrapper>
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={5}
                            style={{ width: '80%' }}
                            id='textarea'
                            onChange={e => { handlechangetext(e) }}
                            defaultValue={dataState.post.problem.description}
                            />
                    </Textareawrapper>
                        <Description>
                            <Latex>{textarea }</Latex>
                        </Description>  
                        {props.ifproblem && (<>
                    <Categorywrapper>
                        <Keyword>キーワード:</Keyword>
                        <Categoryinput onChange={e => {handlechangekeyword(e)}} error={error ? true: false} type='text' placeholder='12文字以下' defaultValue={dataState.post.problem.category} />
                    </Categorywrapper>
                    {error && <Errortext>{error === 'empty' ? 'キーワードを入力してください' : 'キーワードは12文字以下です'}</Errortext>}
                    <Categorywrapper>
                        <Keyword>出典・引用元:</Keyword>
                        <Categoryinput onChange={e => {setSource(e.target.value) }} type='text' defaultValue={dataState.post.problem.source} />
                    </Categorywrapper>
                    <Categorywrapper>
                        <Keyword>履修範囲:　</Keyword>
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
                            defaultValue={dataState.post.problem.level}
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
                    {level_error ? <Errortext2>履修範囲を選択してください</Errortext2> : <Errortext2empty/>}
                    <Categorywrapper2>
                        <Keyword>単元:　</Keyword>
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
                            value={unit}
                            defaultValue={dataState.post.problem.unit}
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
                    {unit_error ? <Errortext2>単元を選択してください</Errortext2> : <Errortext2empty/>}
                    </>
                )}
                        
                        <File3wrapper><Fab1>
                            {(!circleloading[0] && success[0]) && (
                    
                                <Fab aria-label='save' color='primary' sx={{
                                    bgcolor: green[500],
                                    
                        
                                    '&:hover': { bgcolor: red[700] }
                                }} onClick={() => { handledelete(1) }} >
                                    <CheckIcon />
                                </Fab>)}
                            {(!circleloading[0] && !success[0]) && (
                                <Fab aria-label='save' color='primary' sx={{
                                    bgcolor: blue[500],
                                  
                                    margin: '0',
                                    padding: '0',
                                    '&:hover': { bgcolor: blue[700] }
                                }}>
                                    <Filewrapper htmlFor='1'>
                                        1
                                    </Filewrapper>
                                </Fab>
                            )}
                            {circleloading[0] && (
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
                                }} onClick={() => { handledelete(2) }} >
                                    <CheckIcon />
                                </Fab>)}
                            {(!circleloading[1] && !success[1]) && (
                                <Fab aria-label='save' color='primary' sx={{
                                    bgcolor: blue[500],
                                    
                                    margin: '0',
                                    padding: '0',
                                    
                                    '&:hover': { bgcolor: blue[700] }
                                }}>
                                    <Filewrapper htmlFor='2'>
                                        2
                                    </Filewrapper>
                                </Fab>
                            )}
                            {circleloading[1] && (
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
                                }} onClick={() => { handledelete(3) }} >
                                    <CheckIcon />
                                </Fab>)}
                            {(!circleloading[2] && !success[2]) && (
                                <Fab aria-label='save' color='primary' sx={{
                                    bgcolor: blue[500],
                                    
                                    margin: '0',
                                    padding: '0',
                                   
                                    '&:hover': { bgcolor: blue[700] }
                            
                                }}>
                                    <Filewrapper htmlFor='3'>
                                        3
                                    </Filewrapper>
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

                        <Fileinput type='file' accept='images/*' id='1' onChange={(e) => { handlecircular(0); handlechange(e,1) }} />
                        <Fileinput type='file' accept='images/*' id='2' onChange={(e) => { handlecircular(1); handlechange(e,2) }} />
                        <Fileinput type='file' accept='images/*' id='3' onChange={(e) => { handlecircular(2); handlechange(e,3) }} />
                        <Submitbuttonwrapper>
                            <Submitbutton loading={load} onClick={handle} variant='contained' sx={{ margin: '30px' }} >変更</Submitbutton>
                        </Submitbuttonwrapper>
                    </Wrapper>
                    }
            
                </>
    )
}



export default Editproblem
