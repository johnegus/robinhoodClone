import React, { useEffect, useState } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import leaf from "./leaf-clipart-12-transparent.png";
import { NavLink } from "react-router-dom";



const NewsFeed = props => {
    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    
    useEffect(() => {
        const fetchPositionNews = async () =>{
           const API_Key = process.env.REACT_APP_FMP_API_KEY;
 
      let API_CALL = `https://financialmodelingprep.com/api/v3/stock_news?limit=20&apikey=${API_Key}`;
     
    
      fetch(API_CALL)
      .then(
          function(response){
              return response.json()
          }
      )
      .then(
          function(data){
            setStories(data)
            setIsLoading(false)
              
          }
      )
    }
        fetchPositionNews();  
        //setinterval would go here return the clear interval
        //return ()=> clearInterval
      }, []); 
      const loading = () => {
        if (isLoading) {
        return (
        <>
        
        <main className="centered middled">
          <b>Fetching market data...</b>
          <CircularProgress />
          </main>
        </>
        )
      }
    }
      return (
        <div>
        <h2>Market News</h2>
        {loading()}
        
        <div> 
          {stories.length === 0 ? <Alert severity="error">You have exceeded the amount of free news fetches, try again later.</Alert> :
          stories.map(story => {
            return (
              <div className='newsContainer' key={story.url}>
                  <div className='newsTitle'>
                    
                    <a className='newsLink' href={story.url}>{story.title}</a>
                    

                    <NavLink className='navlinks' to={`/dashboard/stock/${story.symbol}`}>
                    <div>{story.symbol}</div>
                   </NavLink>
                    <div>{story.publishedDate}</div>
                  </div>
                  <div className='newsSummary'>
                    
                    <div>{story.text}</div>
                
                  </div>
                   <img height='100%' width='100%' src={story.image ? story.image : leaf} alt='news'></img>
               </div>
            )
          })}
          </div>
        </div>
      )
}



export default NewsFeed;