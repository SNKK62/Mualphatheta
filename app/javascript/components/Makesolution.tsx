import Make from './Make';
import React from 'react'
interface Props {
    logged_in: {
        bool: boolean,
        id: number,
        image: string,
        name: string 
    }
}

const Makesolution:React.VFC<Props> = (props: Props) => {
    return (
        <Make type='$Solution$' ifproblem={false} logged_in={props.logged_in}/>  
    )
}

export default Makesolution