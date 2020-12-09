import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import ElementLinkBtn from './ElementLinkBtn'

const Nav = ({navElements}) => { 
    const {isAuthenticated,setAuthentication} = useContext(AuthContext)
    useEffect(()=>{setAuthentication()},[isAuthenticated,setAuthentication]);
    console.log("navrun");
    return ( 
    <nav>
        <ul>
            {   isAuthenticated?
                navElements.map(element=>(
                    <li key={Math.random()}>
                        <ElementLinkBtn
                            path={element.path}
                            exact={element.exact}
                        >
                            {element.name}
                        </ElementLinkBtn>
                    </li>    
                )):
                <ElementLinkBtn
                path={navElements[0].path}
                exact={navElements[0].exact}
            >
                {navElements[0].name}
                </ElementLinkBtn>
            }
            
        </ul>
    </nav>
    );
}



export default Nav;