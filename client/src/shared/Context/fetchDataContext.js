const { createContext } = require("react");

export const FetchDataContext = createContext();


export const FetchDataContextProvider = (props)=>{
    const baseURL="http://localhost:5000"
    const getPages = async (url) =>{
       
        try{
            const res = await fetch(baseURL+url,{
                credentials:"include",
                method:"GET"
            })
            let data = await res.json()
            data = Object.values(data)
            data = data.reverse();
            console.log(data);
            return data
        }
        catch(err){
            console.log(err);
            return []
        }
    }
    const deletePage =async (id,updatePages) =>{
        try{
            await fetch(baseURL+`/page/delete/${id}`,{
                method:'DELETE',
                credentials:'include'
            })
            updatePages();
        }
        catch(err){

        }
    }
    return  <FetchDataContext.Provider value={{getPages,deletePage}}>
                {props.children}
            </FetchDataContext.Provider>
}