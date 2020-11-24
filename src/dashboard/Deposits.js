import React, { useEffect, useState }  from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import {getHistoricalData} from '../store/actions/history';
import { getPositions } from "../store/actions/positions";
import { useSelector, useDispatch } from "react-redux";
import AddMoney from './AddMoney/AddMoney'
// import { createInstance } from "./../store/actions/history";


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export function Deposits({getHistoricalData, history}) {
  const classes = useStyles();
  const year = new Date().getFullYear();
  const month =new Date().getMonth();
  const date = new Date().getDate()
  // const [stockChartXValues, setstockChartXValues] = useState([]);
  // const [stockChartYValues, setstockChartYValues] = useState([]);

  useEffect(() => {
    getHistoricalData();
  }, []);

  // const handleClick = async (e) => {
  //   const deposit = 10000;
    
  //   const payload ={
  //   deposit
  //   };
  //   createInstance(payload);
  // }

  const deposits = (history.reduce(function (accumulator, instance){
    return accumulator +  parseFloat(instance.deposit);
  }, 0)).toFixed(2);
  return (
    <React.Fragment>
      <Title>Portfolio Value</Title>
      <Typography component="p" variant="h4">
        {/* {history.map((instance) => (
        <div>
          Change: {parseInt(instance.deposit) + (parseInt(instance.soldPrice)*parseInt(instance.shares))-(parseInt(instance.boughtPrice)*parseInt(instance.shares))}
        </div>
        ))} */}
        ${(history.reduce(function (accumulator, instance){
          return accumulator + (instance.soldPrice*instance.shares)-(instance.boughtPrice*instance.shares);
        }, parseFloat(deposits))).toFixed(2)}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {month + '/' + date + '/' + year}
      </Typography>
      <div>
        {/* <AddMoney /> */}
        {/* <button onClick={handleClick} >Add $10000</button> */}
      </div>
    </React.Fragment>
  );
}

const DepositsContainer = () => {
  const history = useSelector((state) => Object.values(state.history));
  const dispatch = useDispatch();
  return (
    <Deposits
      history={history}
      getHistoricalData={() => dispatch(getHistoricalData())}
      
    />
  );
};

export default DepositsContainer;
