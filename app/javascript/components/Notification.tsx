import React from 'react';
import styled from 'styled-components';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { useNavigate } from 'react-router-dom';
import { url } from './url';
import axios from './axios';
import '../../assets/stylesheets/index.css';




const Div = styled.div`
    background-color: rgb(205,254,255);
`
const Div2 = styled.div`
`

const Wrapper2 = styled.div`
    border-right: 1px solid rgb(200,200,200);
    background-color: white;
    width: 100%;
    text-align: center;
    height: calc(100vh - 64px);
    padding: 0px 0px 0px 0px;
    scrollbar-width: none;
    overflow-y: auto;
    overflow-x: auto;
    position: fixed;
    left: 0vw;
    top: 64px;
    @media (min-width: 600px) {
        box-sizing: border-box;
        width: 60vw;
        left: 40vw;
        top: 64px;
    }
    @media (min-width: 1025px) {
        box-sizing: border-box;
        width: 45vw;
        left: 20vw;
        top: 64px;
    }
    z-index: 491;
`
const Bold = styled.span`
    font-weight: bold;
    font-size: 20px;
`
interface Notice {
    id: number,
    visitor_id: number,
    visited_id: number,
    problem_id: number,
    solution_id: number,
    comment_id: number,
    action: string,
    checked: boolean,
}
interface Props {
    logged_in: {
        bool: boolean,
        id: number,
        image: string,
        name: string
    },
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    notification: Notice[],
}
const Notification: React.VFC<Props> = (props: Props) => {
    const navigate = useNavigate();
    
    const Topage = (val: any) => {
        val.checked = true;
        props.setShow(false);
        axios.patch(url + '/users/' + props.logged_in.id + '/notifications').catch(e => {
            console.log(e)
        })
        if (val.action === 'solution') {
            navigate('/solutions/' + val.solution_id);
        } else if (val.action === 'comment') {
            if (val.problem_id ) {
                navigate('/comments/' + val.comment_id)
            } else if (val.solution_id ) {
                navigate('/comments/' + val.comment_id)
            }
        } else if (val.action === 'follow') {
            navigate('/users/' + val.visitor_id)
        } else if (val.action === 'problem') {
            navigate('/problems/' + val.problem_id, {state: {back: true}})
        }
    };

    const Totext = (val: any) => {
        if (val.action === 'solution') {
            if (val.problem.user_id === props.logged_in.id) {
                return (<>
                    <Bold>{val.user.name}</Bold>さんがあなたの<Bold>{val.problem.title}</Bold>に解答しました
                </>)
            } else if (val.problem.user_id !== props.logged_in) {
                return (<>
                    <Bold>{val.user.name}</Bold>さんが<Bold>{val.problem.title}</Bold>に解答しました
                </>)
            }
        } else if (val.action === 'comment') {
            if (val.problem_id) {
                if (val.problem.user_id === props.logged_in.id) {
                    return (<>
                        <Bold>{val.user.name}</Bold> さんがあなたの < Bold > {val.problem.title}</Bold> にコメントしました
                    </>)
                } else if (val.problem.user_id !== props.logged_in.id) {
                    return (<>
                        <Bold>{val.user.name}</Bold> さんが < Bold > {val.problem.title}</Bold> にコメントしました
                    </>)
                }
            } else if (val.solution_id) {
                if (val.solution.id === props.logged_in.id) {
                    return (<>
                        <Bold>{val.user.name}</Bold> さんが  <Bold>あなた</Bold>の解答にコメントしました
                    </>)
                } else if (val.solution.id !== props.logged_in.id) {
                    return (<>
                        <Bold>{val.user.name}</Bold> さんが  <Bold>{val.solution.name}</Bold> さんの解答にコメントしました
                    </>)
                }
            }
        } else if(val.action === 'follow') {
            return (<>
                <Bold>{val.user.name}</Bold> さんがあなたをフォローしました
            </>)
        } else if (val.action === 'problem') {
            return (<>
                <Bold>{val.user.name}</Bold> さんが問題を投稿しました
            </>)
        }
        return 'nothing'
    }

    return (
        <>
            <Wrapper2 className='box'>
                <List sx={{ paddingTop: '0', marginTop: '0' }}>
                    <Divider key='divider1' />
                    {props.notification.map((val: any, index) => {
                        if (val.checked) {
                            return (<Div2 key={index}>
                                <ListItemButton sx={{ paddingTop: '10px',paddingBottom: '10px', paddingLeft: '5px',minHeight: '40px' }} onClick={() => { Topage(val) }}>
                                    <ListItem key={val.id.to_String + 'item'} sx={{ padding: '0' }}>
                                        <List key={val.id.to_String + 'list'} sx={{ width: '80%', paddingLeft: '10px', padding: '0 0 0 5px' }}>
                                            <ListItemText key={val.id.to_String + 'item2'} primary={Totext(val)} primaryTypographyProps={{ fontSize: '20px' }} />
                                        </List>
                                    </ListItem>
                                </ListItemButton>
                                <Divider key={val.id.to_String + 'divider2'} />
                            </Div2>)
                        } else {
                            return (
                                <Div key={index}>
                                    <ListItemButton sx={{ paddingTop: '10px',paddingBottom: '10px',paddingLeft: '5px', minHeight: '40px' }} onClick={() => { Topage(val) }}>
                                        <ListItem key={val.id.to_String + 'item'} sx={{ padding: '0' }}>
                                            <List key={val.id.to_String + 'list'} sx={{ width: '80%', paddingLeft: '10px', padding: '0 0 0 5px' }}>
                                                <ListItemText key={val.id.to_String + 'item2'} primary={Totext(val)} primaryTypographyProps={{ fontSize: '20px' }} />
                                            </List>
                                         </ListItem>
                                    </ListItemButton>
                                    <Divider key={val.id.to_String + 'divider2'} />
                                </Div>
                            )
                        }
                    })}
                </List>
            </Wrapper2>
        </>
    )

}


export default Notification