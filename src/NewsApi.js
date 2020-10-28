import React from 'react';
// import alpacaApi from './services/alpaca';
import polygonApi from './util/polygon';
// import {Ionicons} from '@expo/vector-icons'


class NewsApi extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      buying_power: 0,
      cash: 0,
      long_market_value: 0,
      portfolio_value: 0,
      positions: [],
      symbols: [],
      stockChartXValues: [],
      stockChartYValues: [],
  }
  }
  componentDidMount(){
  //alpaca account fetch -------------------------------------------------------------

    // const api = alpacaApi()
    // api.getAccount().then((response) => {
    //   console.log('fetch data from alpaca')
    //   console.log(response)

    //   if(response.ok){
    //     this.setState({
    //       buying_power: response.data.buying_power,
    //       cash: response.data.cash,
    //       long_market_value: response.data.long_market_value,
    //       portfolio_value: response.data.portfolio_value
    //     })
    //   }
    // })

    // api.getPositions().then((response) => {
    //   console.log(response)
    
    //   if(response.ok){
    //     this.setState({
    //       positions: response.data
    //     })
    //   }
    // })
//polygon news fetch -------------------------------------------------------------
    const polygon = polygonApi()
    polygon.getQuote('SPY').then((response) => {
      console.log('fetch data from polygon')
      console.log(response)
      if(response.ok){
        this.setState({
          symbols: response.data
          // image: response.data.image,
          // title: response.data.title,
          // summary: response.data.summary,
          // url: response.data.url
        })
      }
    });

    this.fetchStock();
  }

  //alphavantage stock fetch -------------------------------------------------------------
fetchStock(){
  const pointerToThis = this;
  console.log(pointerToThis);
  const API_Key = '06N03QCM2TDKP6QS';
  let stockSymbol = 'TSLA'
  let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=5min&apikey=${API_Key}`;
  let stockChartXValuesFunction = [];
  let stockChartYValuesFunction = [];


  fetch(API_CALL)
  .then(
      function(response){
          return response.json()
      }
  )
  .then(
      function(data){
          console.log(data);
          for(let key in data['Time Series (5min)']){
              stockChartXValuesFunction.push(key);
              stockChartYValuesFunction.push(data['Time Series (5min)'][key]['1. open']);
          }
          console.log(stockChartXValuesFunction);
          console.log(stockChartYValuesFunction);
          pointerToThis.setState({
              stockChartXValues: stockChartXValuesFunction,
              stockChartYValues: stockChartYValuesFunction
          })
      }
  )
}

  renderProduct = (value) => {
    return (
      <section className="product-detail">
        
        <div className='stockApp'>
        <h1>Stock Application</h1>
          <div className='accountOverview'>
          <h2>Portfolio Value</h2>
          <h2>${this.state.portfolio_value}</h2>
          <h2>Cash</h2>
          <h2>${this.state.cash}</h2>
          <h2>Buying Power</h2>
          <h2>${this.state.buying_power}</h2>
          </div>
          <div className='marketOverview'>
            <div className='indices'>DIA</div>
            <div className='indices'>QQQ</div>
            <div className='indices'>SPY</div>
          </div>
          <div className='positions'>
            {this.state.positions.map(position => {
              return (
                <div className='stocks' key={position.asset_id}>
                  {position.symbol}
                  {position.current_price}
                  {position.qty}
                  {/* <Ionicons name='md-arrow-dropup' size={32} color='green'></Ionicons> */}
                  {(position.change_today * 100).toFixed(2)}
                </div>
              )
            })}
            

          </div>
          <div className='newsFeed'>
          {this.state.symbols.map(symbol => {
              return (
                <div className='newsContainer' key={symbol.timestamp}>
                    <div className='newsTitle'>
                      {symbol.title}
                    </div>
                    <div className='newsSummary'>
                    {symbol.summary}
                    </div>
                     <img height='100%' width='100%' src={symbol.image}></img>
                 </div>
              )
            })}
          </div>

        </div>
      </section>
    );
  }

  render() {
    return (
      <NewsApi>
        {this.renderProduct}
      </NewsApi>
    )
  }
}

export default NewsApi;
