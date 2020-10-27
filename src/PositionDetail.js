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
              <b>Type</b> {positions.stockSymbol}
            </li>
            <li>
              <b>Attack</b> {positions.stockName}
            </li>
            <li>
              <b>Defense</b> {positions.currentPrice}
            </li>
            
          </ul>
        </div>
        <div>
          <h2>Items</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Happiness</th>
                <th>Price</th>
              </tr>
            </thead>
            
          </table>
        </div>
      </div>
    </div>
  );
};

const PositionDetailContainer = () => {
  const positions = useSelector((state) => state.positions);
  const dispatch = useDispatch();

  return (
    <PositionDetail
    positions={positions}
      getOnePosition={(id) => dispatch(getOnePosition(id))}
    />
  );
};

export default PositionDetailContainer;
