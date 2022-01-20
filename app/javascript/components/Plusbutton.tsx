import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Floatbutton = styled.button`
    height: 45px;
    width: 45px;
    border-radius: 50%;
    text-align: center;
    padding-top: 18px;
    background-color: rgb(0,167,255);
    color: white;
    position: fixed;
    bottom: 20px;
    right: 20px;
    text-width: bold;
    box-shadow: 1px 1px 5px 5px;
    &:active {
        background-color: rgb(6,129,194);
    }
    @media(min-width: 1025px){
        right: calc(35vw + 20px);
    }
`

function Plusbutton() {
    const navigate = useNavigate()
    return (
        <Floatbutton onClick={() => {navigate('/problems/new')}}>
            +
        </Floatbutton>
    )
}

export default Plusbutton
