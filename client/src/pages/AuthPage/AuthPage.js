import React, { useContext, useState } from 'react';
import { AuthContext } from '../../shared/Context/AuthContext';

const AuthPage = (props) => {
    const [errors,setErrors] = useState({email:'',password:''})
    const {loginSignupUser,logoutUser} = useContext(AuthContext);
    
    const submitForm = async (e) =>{
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        const errors = await loginSignupUser(email,password,props.url);
        if(errors)
            setErrors({...errors})
    }
    const logoutUserHandler = async () =>{
        await logoutUser(props.url)
    }
    switch(true){
        case (props.name==="login" || props.name==="sign up"):
            return ( 
                <form className="form" onSubmit={submitForm}>
                    <div className="page">
                        <div className="page-header">
                            <img src="/assets/bookMark.png" className="bookmark-icn" alt="bookmark"/>
                            <div >{props.name}</div>
                        </div>
                        <div className="page-text">
                            <br/>
                            <hr/>
                            <label htmlFor="email">Email:</label>
                            <input type="email"  name="email" autoFocus/>
                            <hr/>
                            <div className="error" id="email-error">{errors.email}</div>
                            <hr/>
                            <label htmlFor="password">Password:</label>
                            <input type="password"  name="password"/>
                            <hr/>
                            <div className="error" id="password-error">{errors.password}</div>
                            <hr/>
                            <br/>
                        </div>
                    </div>
                    <button type="submit" className="btn active-btn">{props.name}</button>
                </form>
             );
        case props.name==="logout":
            logoutUserHandler();
            return(<div>logout</div>)
        default :
                return null;
    }
    
}
 
export default AuthPage;