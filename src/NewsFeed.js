import React, { useEffect, useState } from "react";
import polygonApi from './util/polygon';
import CircularProgress from '@material-ui/core/CircularProgress';

const NewsFeed = props => {
    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    
    useEffect(() => {
        if (!props) {
          return;
        }
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
      }, [props]); 
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
        {stories.map(story => {
            return (
              <div className='newsContainer' key={story.timestamp}>
                  <div className='newsTitle'>
                    
                    <a className='newsLink' target="_blank" href={story.url}>{story.title}</a>
                  </div>
                  <div className='newsSummary'>
                  {story.summary}
                  </div>
                   <img height='100%' width='100%' src={story.image}></img>
               </div>
            )
          })}
        </div>
      )
}

export default NewsFeed;