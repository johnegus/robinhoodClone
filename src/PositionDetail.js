import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import polygonApi from './util/polygon';
import { exitPosition } from "./store/actions/positions";


import { getOnePosition } from "./store/actions/current-position";

const PositionDetail = ({ positions, getOnePosition }) => {
  const { id } = useParams();

  // useEffect(() => {
  //   getOnePosition(positions.stockSymbol);
  // }, [positions.stockSymbol]);

  useEffect(() => {
    getOnePosition(id);
  }, [id]);

  if (!positions) {
    return null;
  }
 
  // const polygon = polygonApi()
  // polygon.getQuote(positions.stockSymbol).then((response) => {
  //   console.log('fetch data from polygon')
  //   console.log(response)
  //   if(response.ok){
  //     this.setState({
  //       symbols: response.data
  //       // image: response.data.image,
  //       // title: response.data.title,
  //       // summary: response.data.summary,
  //       // url: response.data.url
  //     })
  //   }
  // });







  return (
    <div className="pokemon-detail">
      <div
        className={`pokemon-detail-image-background`}
        
      >
        <div
          className="pokemon-detail-image"
          
        ></div>
        <h1 className="bigger">{positions.stockName}</h1>
      </div>
      <div className="pokemon-detail-lists">
        <div>
          <h2>Information</h2>
          <ul>
            <li>
              <b>Symbol</b> {positions.stockSymbol}
            </li>
            <li>
              <b>Stock Name</b> {positions.stockName}
            </li>
            <li>
              <b>Current Price</b> ${positions.currentPrice}
            </li>
            
          </ul>
        </div>
        <div>
          <h2>Your Position</h2>
            <ul>
              <li>
                <b>Shares:</b> {positions.shares}
              </li>
              <li>
                <b>Equity:</b> ${positions.shares*positions.currentPrice}
              </li>
              <li>
                <b>Cost:</b> ${positions.buyPrice}
              </li>
            </ul>
            <button onClick={exitPosition(positions.id)}>Exit Position</button>
        </div>
      </div>
    </div>
  );
};

const PositionDetailContainer = () => {
  const positions = useSelector((state) => state.positions[state.currentPosition]);
  const dispatch = useDispatch();

  return (

    <PositionDetail
    positions={positions}
      getOnePosition={(id) => dispatch(getOnePosition(id))}
      exitPosition={(id) => dispatch(exitPosition(id))}
    />
  
  );
};

export default PositionDetailContainer;
