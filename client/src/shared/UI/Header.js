import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import ElementLinkBtn from './ElementLinkBtn';

const Header = () => {
    const {isAuthenticated,setAuthentication} = useContext(AuthContext)
    useEffect(()=>{setAuthentication()},[isAuthenticated,setAuthentication]);
    return (  
    <header>
        <div className="logo">
            <img src="/assets/Anon Dai.png" alt="anonyomus dairy"/>
            <div className="main-text">ANONYOMUS DAIRY</div>
            <div className="sub-text">KEEP IT SERECT</div>
        </div>
        <div className="login-signup-btns">
            {
                !isAuthenticated?
                <React.Fragment>
                <ElementLinkBtn
                    path="/login"
                    exact={true}>
                    log in
                </ElementLinkBtn>
                <ElementLinkBtn
                path="/signup"
                exact={true}>
                    sign up
                </ElementLinkBtn>  
                </React.Fragment>:
                 <ElementLinkBtn
                 path="/logout"
                 exact={true} >
                     logout
                 </ElementLinkBtn> 
            
            }
            
        </div>
    </header>
    );
}
 
export default Header;