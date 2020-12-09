import { useHistory } from "react-router-dom";
const { createContext, useState } = require("react");

export const AuthContext = createContext()

export const AuthProvider = (props) =>{
    const history = useHistory();
    const baseURL = 'http://localhost:5000/'

    const [isAuthenticated,setIsAuthenticated] = useState(false)

    const setAuthentication = () =>{
        if(document.cookie){
            setIsAuthenticated(true)
        }
        else{
            setIsAuthenticated(false)
        }
    }

    const loginSignupUser = async (email,password,url) =>{
        const body = JSON.stringify({email,password});
        try{
            const res = await fetch(baseURL+url,{
                credentials:'include',
                method:'POST',
                body:body,
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const data = await res.json()
            console.log(data);
            if(data.errors){
                console.log(data.errors);
                return data.errors
            }
            if(data.user){
                setAuthentication();
                console.log("in");
                history.push("/")
                return null
            }
        }
        catch(err){
            console.log(err.errors);
        }
    }

    const logoutUser = async (url) =>{
        try{
            if(isAuthenticated){
                await fetch(baseURL+url,{
                    credentials:"include",
                    method:'GET'
                })
                setAuthentication(); 
            }
            
            history.push("/");
            
        }
        catch(err){
            console.log(err.errors);
        }
    }
    return(
        <AuthContext.Provider value={{isAuthenticated,loginSignupUser,setAuthentication,logoutUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}