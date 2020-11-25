import React, { useEffect, useState } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

const TopLosers = props => {
    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    
    //  financial modeling prep fetch---------------------------------------------------
  useEffect(() => {
    
    const fetchCompanyInfo = async () =>{
      const API_Key = 'f04ddc95561236e9dccd1ffa355ad55b';
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
            // for(let key in data){
            //   stockChartXValuesFunction.push(key);
            //   stockChartYValuesFunction.push(data[key]['ticker']);
            // }
            //   console.log(stockChartXValuesFunction[0][companyName]);
            //   console.log(stockChartYValuesFunction);
            // setCompanyDescription(data[0]['description'])
            // setExchange(data[0]['exchangeShortName'])
            // setImage(data[0]['image'])
              
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
        <div>
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