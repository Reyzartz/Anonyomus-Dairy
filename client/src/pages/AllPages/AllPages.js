import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../shared/Context/AuthContext';
import { FetchDataContext } from '../../shared/Context/fetchDataContext';

const AllPages = (props) => {
    const [pages,setPages] = useState([]);
    const {getPages,deletePage} = useContext(FetchDataContext)
    const {isAuthenticated} = useContext(AuthContext)
    
    useEffect(()=>{
        fetchData();
        // eslint-disable-next-line
    },[])

    const fetchData=async ()=>{
        const pages = await getPages(props.url)
        setPages(pages)
    }
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
    const pageLayout =  (page)=>(
        <article className="page" key={page._id}>
            <div className="page-header">
                <img className="bookmark-icn" src="/assets/bookMark.png" alt="|"/>
                <div className="created-at">{getDay(page.createdAt)}<span className="month">{getMonth(page.createdAt)}</span></div>
                {   isAuthenticated && props.url==='/pages/my'?
                    <div className="delete-btn" onClick={()=>{deletePage(page._id,fetchData)}} title="Remove Page">
                        <img alt="bookmark" src="/assets/delete-icn.png"/>
                    </div>:
                    null
                }
            </div>
            <div className={`page-text ${page.handwritingFont} `}>
                <div className="lines">
                    <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
                </div>
                {page.snippet}
            </div>
        </article>
    )
    return ( 
    <section className="pages">
        {
            [0,3,2,1].map((e)=>(
                pages?
                <div className="pages-wrapper" key={Math.random()}>
                {
                   pages.map((page,i)=>{
                       if((i+e)%4===0)
                           return pageLayout(page);
                       else
                           return null;
                   })
               }
               </div>
               :null
            ))
        }
    </section>
);
}
 
export default AllPages;