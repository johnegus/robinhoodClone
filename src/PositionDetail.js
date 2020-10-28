import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getOnePosition } from "./store/actions/current-position";

const PositionDetail = ({ positions, getOnePosition }) => {
  const { id } = useParams();
  useEffect(() => {
    getOnePosition(id);
  }, [id]);

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
    />
  );
};

export default PositionDetailContainer;
