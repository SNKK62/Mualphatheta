import Loadingwrapper from './Loadingwrapper';
import Loading from './Loading';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchprocess:React.VFC = () => {
    const navigate = useNavigate();
    useEffect(() => {
        var mount = true
        if (mount) {
            if (window.innerWidth >= 1025) {
                navigate('/users', { replace: true })
            }
        }
        return () => {mount=false}
    },[])
    return (
        <Loadingwrapper>
            
            <Loading/>
        </Loadingwrapper>
    )
}

export default Searchprocess
