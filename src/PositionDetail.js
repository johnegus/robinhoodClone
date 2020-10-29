import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import polygonApi from './util/polygon';
import { exitPosition } from "./store/actions/positions";


import { getOnePosition } from "./store/actions/current-position";

const PositionDetail = ({ positions, getOnePosition }) => {
  // const [symbols, setSymbols] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    exitPosition(id);
  }, [id]);

  

  useEffect(() => {
    getOnePosition(id);
  }, [id]);

  // useEffect(() => {
  //   const fetchPositionNews = async () =>{
  //     const polygon = polygonApi()
  //     polygon.getQuote('SPY').then((response) => {
  //       console.log('fetch data from polygon')
  //       console.log(response)
  //       if(response.ok){
  //         setSymbols({
  //           symbols: response.data.title
  //           // image: response.data.image,
  //           // title: response.data.title,
  //           // summary: response.data.summary,
  //           // url: response.data.url
  //         })
  //       }
  //     });
  //   }
  //   fetchPositionNews();
  // }, []);


  if (!positions) {
    return null;
  }
 








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
            <button onClick={()=> dispatch(exitPosition(positions.id))}>Exit Position</button>
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
