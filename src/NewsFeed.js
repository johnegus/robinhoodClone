import React, { useEffect, useState } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';


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
        <h2>News</h2>
        {loading}
        
        <div> 
          {stories.length === 0 ? <Alert severity="error">You have exceeded the amount of free news fetches, try again later.</Alert> :
          stories.map(story => {
            return (
              <div className='newsContainer' key={story.timestamp}>
                  <div className='newsTitle'>
                    
                    <a className='newsLink' href={story.url}>{story.title}</a>
                    

                    <Link href={`/stock/${story.symbol}`}>
                    <div>{story.symbol}</div>
                   </Link>
                    <div>{story.publishedDate}</div>
                  </div>
                  <div className='newsSummary'>
                    
                    <div>{story.text}</div>
                
                  </div>
                   <img height='100%' width='100%' src={story.image} alt='news'></img>
               </div>
            )
          })}
          </div>
        </div>
      )
}



export default NewsFeed;