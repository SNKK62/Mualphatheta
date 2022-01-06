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
const  Makeproblem:React.VFC<Props> = (props: Props) => {
    return (
     <Make type='$Problem$' ifproblem={true} logged_in={props.logged_in}/>       
    )
}

export default Makeproblem