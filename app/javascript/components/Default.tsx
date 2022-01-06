import { useNavigate } from 'react-router-dom'
import React,{useEffect} from 'react'
interface Props {
    logged_in: {
        bool: boolean
        id: number
        image: string
        name: string
    }
}

const Default:React.VFC<Props> = (props: Props) => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(props.logged_in.bool ? '/users/'+props.logged_in.id : '/login',{replace: true})
    },[navigate])
    return (
        <div>
            
        </div>
    )
}

export default Default
