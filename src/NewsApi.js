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


  renderProduct = (value) => {
    return (
      <section className="product-detail">
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
