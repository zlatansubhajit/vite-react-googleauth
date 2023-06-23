import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

type signInProps = {
    isSignedIn: any
}
function Protected( props: PropsWithChildren<signInProps>){
    if(!props.isSignedIn) {
        return <Navigate to="/" replace />
    } 
    return props.children
}

export default Protected