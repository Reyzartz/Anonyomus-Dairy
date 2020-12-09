import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddPage = () => {
    const [handwritingFont,setHandwritingFont] = useState('font1');
    const date =new Date();
    const history = useHistory();
    

    const getMonth=(date)=>{
        let d = new Date(date)
        const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
        return months[d.getMonth()]
    }
    const getDay=(date)=>{
        let d = new Date(date);
        d = d.getDate();
        d+="";
        if(d.length===1){
            d= "0"+d
        }
        return d;
    }

    const submitPage=async (e)=>{
        e.preventDefault();
        const snippet = e.target.snippet.value
        const body = JSON.stringify({snippet,handwritingFont})
        try{
            const url="http://localhost:5000/page/add"
            const res = await fetch(url,{
                credentials:"include",
                method:"POST",
                body:body,
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const data = await res.json();

            if(data.pageid){
                history.push("/")
            }
        }
        catch(err){
            console.log(err);
        }
    }
    return ( 
        <form className="form" onSubmit={submitPage}>
            <div className="page">
                <div className="page-header">
                    <img src="/assets/bookMark.png" alt="|" className="bookmark-icn"/>
                    <div><big>{getDay(date)}</big><small>{getMonth(date)}</small></div>
                </div>
                <div className="page-text">
                    <div className="lines">
                        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
                    </div>
                    <textarea name="snippet" className={handwritingFont} autoFocus required/>
                    <label forhtml="handwriting-style" ></label>
                    <select 
                        name="handwritingFont"
                        className={handwritingFont}
                        onClick={(e)=>{console.log(e);setHandwritingFont(e.target.value)}}
                        defaultValue={handwritingFont}>
                        {[1,2,3,4,5,6].map(e=>(
                           <option
                                key={Math.random()}
                                value={`font${e}`}
                                className={`font${e}`}
                                >Handwriting style</option> 
                        ))}
                    </select>
                </div>
            </div>
            <button type="submit" className="btn active-btn">ADD PAGE</button>
        </form>
     );
}
 
export default AddPage;