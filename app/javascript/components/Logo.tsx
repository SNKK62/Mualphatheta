import styled from 'styled-components';
import React from 'react'

const Image = styled.img`
    object-fit: cover;
    width: 50vw;
    height: 50vw;
    -webkit-filter: drop-shadow(0px 3px 10px rgba(0,0,0,.8));
    filter: drop-shadow(0px 0px 10px rgba(0,0,0,.8));
    @media(min-width: 600px){
        height: 50vh;
        width: 50vh;
    }
`
const Overlay = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`

const  Logo:React.VFC = () => {
    return (
        <Overlay>
            <Image src='/icon-512x512.png' />
        </Overlay>
    )
}



export default Logo
