import React, { useEffect, useState } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';

const TopLosers = props => {
    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    
    //  financial modeling prep fetch---------------------------------------------------
  useEffect(() => {
    
    const fetchCompanyInfo = async () =>{
      const API_Key = process.env.REACT_APP_FMP_API_KEY;
      let API_CALL = `https://financialmodelingprep.com/api/v3/losers?limit=10&apikey=${API_Key}`;
    //   let stockChartXValuesFunction = [];
    //   let stockChartYValuesFunction = [];
    
      fetch(API_CALL)
      .then(
          function(response){
              return response.json()
          }
      )
      .then(
          function(data){
            setIsLoading(false)
            setStories(data)
          
          }
      )
    }
    fetchCompanyInfo();  
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
        <div className='losersandwinners'>
        <h2 style={{color: 'red'}}>Top Losers</h2>
        {loading}
        {stories.slice(0, 5).map(story => {
            return (
              <div className='moversContainer' key={story.ticker}>
                  <div className='newsTitle'>
                  {story.ticker}
                  <div>
                  {story.companyName}
                  </div>
                  <Link href={`/stock/${story.ticker}`} color='secondary'>
                  {story.ticker}
                   </Link>
                  </div>
                  <div className='newsSummary'>
                  
                  {story.price} {story.changes}  <span style={{color: 'red'}} >{story.changesPercentage}</span>
                  </div>
                   
               </div>
            )
          })}
        </div>
      )
}

export default TopLosers;