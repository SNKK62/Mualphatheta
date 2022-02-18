
import styled from 'styled-components';
import dataFetch from './DataFetch';
import React,{ useReducer,useEffect,useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from './axios';
import { url } from './url';
import Loading from './Loading';
import Loadingwrapper from './Loadingwrapper';
import Slider from 'react-slick';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@mui/material/Button';
import Comments from './Comments'
import Latex from 'react-latex-next';
import Modal from './Modal'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import { CircularProgress } from '@material-ui/core';
import '../../assets/stylesheets/index.css';


const Userwrapper = styled.div`
    display: grid;
    grid-template-columns: 50px 1fr;
    grid-template-rows: 50px;
    width: 90%;
    height: 50px;
    margin: 0;
`
const Image = styled.img`
    width: 45px;
    height: 45px;
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
`
const Username = styled.div`
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    padding-left: 20px;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-size: 20px;
    padding-top: 15px;
`
const Imagewrapper = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    margin 5px 0 0 5px;
`
const Tagdiv = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
`
const Tagwrapper = styled.div`
    width: 70%;
    color: blue;
    text-align: left;
    padding-left: 10px;
`

const Problemimage = styled.div`
    margin: auto;
    width: 80%;
    text-align: center;
    display: flex;
    justify-content: center;
    height: 200px;
`
const Images = styled.img`
    margin: auto;
    object-fit: contain;
    height: 200px;
    cursor: pointer;
`
const Bigimage = styled.img`
    object-fit: contain;
    height: 100%;
    width: 100%; 
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
const Slide = styled(Slider)`
    width: 100%;
    height: 200px;
    margin: auto;
`
const Buttonwrapper = styled.div`
    width: 30%;
`
const Slidewrapper = styled.div`
    width: 80%;
    margin: auto;
    .slick-prev:before,
    .slick-next:before {
        color: black;
    }
    padding: 30px 20px 30px 20px;
`
const Buttonarea = styled.div`
    width: 100%;
    height: 40px;
    text-align: right;
    margin: auto;
    border-top: 1px solid rgb(200,200,200);
`
const Buttonarea2 = styled.div`
    width: 100%;
    height: 40px;
    text-align: left;
    padding-left: 10px;
    border-top: 1px solid rgb(200,200,200);
    display: flex;

`
const Allwrapper = styled.div`
    position: fixed;
    z-index: 900;
    width: 101vw;
    height: 102vh;
    background-color: rgb(0,0,0,0.8);
    top: 0;
`

const Wrapper = styled.div`
    width: 100%;
    height: clac(100vh - 64px);
    overflow-y: auto;
    overflow-x: hidden;

    @media(min-width: 600px){
        width: 60vw;
        box-sizing: border-box;
        z-index: 100;
    }
    @media(min-width: 1025px){
        width: 45vw;
        box-sizing: border-box;
        z-index: 100;
    }
`
const Like = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`
const Iconwrapper = styled.div`
    
`
const Title = styled.div`
    width: 90%;
    text-align: center;
    font-size: 22px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    padding: 0 10px;
    white-space: pre-wrap;
    word-wrap: break-word;
`
const initialState = {
    isLoading: true,
    isError: '',
    post: {}
};
interface Propsstate {
    ifproblem: boolean;
    logged_in: {
        bool: boolean,
        id: number,
        image: string,
        name: string
    }
};

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    accessibility: true,
}
interface imageprops {
    url: string,
    close: ()=> void
}
function Openimage(props: imageprops) {
    return (
        <Allwrapper onClick={props.close}>
            <Bigimage src={props.url} />
        </Allwrapper>
    )
}

const Problem:React.VFC<Propsstate> = (props: Propsstate) => {
    const { id } = useParams()
    const problem_url = props.ifproblem ? url + '/problems/' + id : url + '/solutions/' + id
    const [dataState, dispatch] = useReducer(dataFetch, initialState);
    const [open, setOpen] = useState(false);
    const [imageurl, setImageurl] = useState('');
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const [like, setLike] = useState(false)
    const [count, setCount] = useState(0)
    const [loadlike, setLoadlike] = useState(true)

    useEffect(() => {
        var mount = true
        if (mount) {
            dispatch({ type: 'init', payload: '' })
            window.scroll({ top: 0, behavior: 'auto' });
            axios.get(problem_url).then(resp => {
                props.ifproblem ? setCount(resp.data.problem.plike_count) : setCount(resp.data.problem.slike_count)
                dispatch({ type: 'success', payload: resp.data })
                // console.log(resp.data)
                if (props.logged_in.bool && props.logged_in.id !== resp.data.problem.user_id) {
                    axios.get(problem_url + '/iflike').then(resp => {
                        setLike(resp.data.iflike)
                        setLoadlike(false)
                    }).catch(e => {
                        console.log(e)
                    })
                } else {
                    setLoadlike(false)
                }
            }).catch(e => {
                console.log(e);
            })
        }
        return () => {mount=false}
    }, [props.ifproblem,id, problem_url,props.logged_in.id,props.logged_in.bool])
    const toproblem = () => {
        dispatch({type: 'init', payload: ''})
        navigate('/problems/'+dataState.post.problem.problem_id)
    }
    const toedit = () => {
        props.ifproblem ?  navigate('/problems/'+id+'/edit') : navigate('/solutions/'+id+'/edit')
    }
    const handledelete = () => {
        if (props.ifproblem) {
            axios.delete(url + '/problems/' + id).then(() => {
                setModal(false)
                navigate('/users/' + props.logged_in.id, { replace: true })
            }).catch(e => {
                console.log(e)
            })
        } else {
            axios.delete(url + '/solutions/' + id).then((resp) => {
                setModal(false)
                navigate('/problems/'+resp.data.problem_id , { replace: true })
            }).catch(e => {
                console.log(e)
            })
        }
    }
    const handlelike = () => {
        setLike(true)
        setCount(count+1)
        axios.post(problem_url + '/like').then(() => {
            // console.log('Success to like')
        }).catch(e => {
            setLike(false)
            console.log(e)
        })
    }
    const handleunlike = () => {
        setLike(false)
        setCount(count-1)
        axios.delete(problem_url + '/unlike').then(() => {
            // console.log('Success to unlike')
        }).catch(e => {
            setLike(true)
            console.log(e)
        })
    }
    const handleopen = (propurl: string) => {
        setImageurl(propurl)
        setOpen(true)
    }
    const handleclose = () => {
        setOpen(false)
        setImageurl('')
    }
    const modalopen = () => {
        setModal(true)
    }
    const modalclose = () => {
        setModal(false)
    }
    
    return (<>
        {open && Openimage({ url: imageurl, close: handleclose })}
        {modal &&
            <Modal delete={handledelete} close={modalclose} />
        }
        {dataState.isLoading ?
        <Loadingwrapper><Loading /></Loadingwrapper> : <>
            <Wrapper className='box'>
            <Userwrapper>
                <Imagewrapper>
                        <Image src={dataState.post.user_image} onClick={() => {navigate('/users/'+String(dataState.post.problem.user_id))} }/>
                </Imagewrapper>
                    <Username>{dataState.post.user_name}</Username>
            </Userwrapper>
            <Title>{ dataState.post.problem.title}</Title>
            <Tagdiv>
                        {props.ifproblem ? <Tagwrapper id='tag'>#{dataState.post.problem.category}</Tagwrapper> : <Button sx={{width: '30%',margin: 'auto'}} variant='text' onClick={toproblem}>問題を見る</Button>}
                {dataState.post.problem.user_id === props.logged_in.id && <Buttonwrapper>
                    <IconButton onClick={toedit}>
                        <EditIcon/>        
                    </IconButton>
                    <IconButton onClick={modalopen} sx={{color: 'red'}}>
                        <DeleteForeverIcon/>
                    </IconButton>    
                </Buttonwrapper>}
            </Tagdiv>        
            {dataState.post.problem.description.length > 0 &&
            <Description id='tex' className='tetete' ><Latex>{dataState.post.problem.description}</Latex></Description>
            }
                <Slidewrapper>
                    {!(!dataState.post.problem.image1_url && !dataState.post.problem.image2_url && !dataState.post.problem.image3_url && !dataState.post.problem.image1s_url && !dataState.post.problem.image2s_url && !dataState.post.problem.image3s_url) &&
                        <>{
                            props.ifproblem ?
                                <Slide {...settings}>
                                {dataState.post.problem.image1_url &&
                                        <Problemimage  >
                                            <Images src={dataState.post.problem.image1_url} onClick={() => {handleopen(dataState.post.problem.image1_url)}}/>
                                        </Problemimage>}
                                    
                                    {dataState.post.problem.image2_url &&
                                        <Problemimage >
                                            <Images src={dataState.post.problem.image2_url} onClick={() => {handleopen(dataState.post.problem.image2_url)}}/>
                                        </Problemimage>}
                                    {dataState.post.problem.image3_url &&
                                        <Problemimage >
                                            <Images src={dataState.post.problem.image3_url} onClick={() => {handleopen(dataState.post.problem.image3_url)}}/>
                                        </Problemimage>}
                                </Slide> :
                                <Slide {...settings}>
                                    {dataState.post.problem.image1s_url &&
                                        <Problemimage >
                                            <Images src={dataState.post.problem.image1s_url} onClick={() => {handleopen(dataState.post.problem.image1s_url)}}/>
                                        </Problemimage>}
                                    {dataState.post.problem.image2s_url &&
                                        <Problemimage >
                                            <Images src={dataState.post.problem.image2s_url} onClick={() => {handleopen(dataState.post.problem.image2s_url)}}/>
                                        </Problemimage>}
                                    {dataState.post.problem.image3s_url &&
                                        <Problemimage >
                                            <Images src={dataState.post.problem.image3s_url} onClick={() => {handleopen(dataState.post.problem.image3s_url)}}/>
                                        </Problemimage>}
                                </Slide>}</>
                    }
                </Slidewrapper>
                    <Buttonarea2>
                    <Iconwrapper>
                    {(props.logged_in.bool && props.logged_in.id !== dataState.post.problem.user_id) && <>
                        {like ? <IconButton sx={{ color: 'pink' }} onClick={handleunlike}>
                            <FavoriteIcon />
                                </IconButton> : <IconButton onClick={handlelike} sx={{ color: 'pink' }} >
                            <FavoriteBorderIcon />
                        </IconButton>}
                            </>}  </Iconwrapper> <Like id='count'>{count}いいね・{dataState.post.problem.comments_count}件のコメント{props.ifproblem && '・'+dataState.post.problem.solutions_count+'件の解答' }</Like>
                </Buttonarea2>    
                <Buttonarea>
                    {(props.ifproblem && !loadlike) &&<>
                        <Button variant='text' onClick={() => { navigate('/problems/' + id + '/solutions') }} sx={{color: 'red'}}>解答を見る</Button>
                        <Button variant='text' onClick={() => { navigate('/problems/' + id + '/solutions/new') }}>解答する</Button>
                    </>}
                    <Button variant='text' onClick={() => {props.ifproblem ? navigate('/problems/'+id+'/comments/new') : navigate('/solutions/'+id+'/comments/new')}}>コメントする</Button>
                </Buttonarea>
                <Comments ifproblem={props.ifproblem}/>
            </Wrapper></>
            }
    </>)
}

export default Problem
