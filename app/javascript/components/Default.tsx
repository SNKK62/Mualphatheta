import { useNavigate } from 'react-router-dom'
import React,{useEffect} from 'react'
// interface Props {
//     logged_in: {
//         bool: boolean
//         id: number
//         image: string
//         name: string
//     }
// }

const Default:React.VFC = () => {
    const navigate = useNavigate()
    useEffect(() => {
        var mount = true
        if (mount) {
            navigate('/top', { replace: true })
        }
        return () => {mount=false}
    },[navigate])
    return (
        <div>
            
        </div>
    )
}

export default Default
