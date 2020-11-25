import React, { useEffect, useState } from "react";
import polygonApi from './util/polygon';
import CircularProgress from '@material-ui/core/CircularProgress';

const NewsFeed = props => {
    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    
    useEffect(() => {
        const fetchPositionNews = async () =>{
          const polygon = polygonApi()
          polygon.getQuote('SPY').then((response) => {
          
          
            if(response.ok){
                setIsLoading(false);
              setStories(response.data)
            }
          });
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
        {stories === [] ? 'You have reached your news fetch limit, try again later.' :
        <div> 
        {stories.map(story => {
            return (
              <div className='newsContainer' key={story.timestamp}>
                  <div className='newsTitle'>
                    
                    <a className='newsLink' href={story.url}>{story.title}</a>
                  </div>
                  <div className='newsSummary'>
                  {story.summary}
                  </div>
                   <img height='100%' width='100%' src={story.image} alt='news'></img>
               </div>
            )
          })}
          </div>}
        </div>
      )
}



export default NewsFeed;