import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';


const ElementLinkBtn = ({path,exact,children})=>{
    let match =
        useRouteMatch({
            path,
            exact
        })
        return(
        <Link to={path} className={`btn ${ match ? "active-btn":''}` }>{children}</Link>
        )
}

export default ElementLinkBtn;