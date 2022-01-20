import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import  React  from 'react';

const Floatbutton = styled.div`
    height: 45px;
    width: 45px;
    border-radius: 50%;
    background-color: rgb(70,70,70);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    position: fixed;
    bottom: 20px;
    right: 20px;
    text-width: bold;
    font-size: 33px;
    box-shadow: 1px 1px 5px 5px rgb(0,0,0);
    z-index: 500;
    &:active {
        background-color: rgb(100,100,100);
    }
    @media(min-width: 1025px){
        right: calc(35vw + 20px);
    }
`

const Plusbutton:React.VFC = () => {
    const navigate = useNavigate()
    return (
        <Floatbutton onClick={() => {navigate('/problems/new')}}>
            +
        </Floatbutton>
    )
}

export default Plusbutton
